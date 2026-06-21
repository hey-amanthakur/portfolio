/**
 * Instagram post scraper — runs at build time.
 *
 * Uses Puppeteer + stealth plugin to load the Instagram profile page,
 * extracts post metadata, and writes a JSON file consumed by InstagramFeed.tsx.
 *
 * Usage:
 *   npx tsx scripts/scrape-instagram.ts                          # write to src/scraped/
 *   npx tsx scripts/scrape-instagram.ts --limit=6                # fetch N posts (default: 8)
 *   npx tsx scripts/scrape-instagram.ts --cookies=./insta-cookies.json  # inject session cookies
 *
 * To get your session cookies:
 *   1. Open Instagram in Chrome, log in
 *   2. Open DevTools → Application → Cookies → https://www.instagram.com
 *   3. Export or copy sessionid, ds_user_id, csrftoken, mid, ig_did
 *   4. Save as JSON: [{"name":"sessionid","value":"...","domain":".instagram.com","path":"/"},...]
 *
 * Output:  src/scraped/instagram-posts.json
 * Fallback: If scraping fails, the file is left untouched (previous data preserved).
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import type { Browser, Page } from 'puppeteer';
import { writeFileSync, readFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

puppeteer.use(StealthPlugin());

// ── Config ──────────────────────────────────────────────────────
const INSTA_HANDLE = 'yeh.safar.swaad.ka';
const PROFILE_URL = `https://www.instagram.com/${INSTA_HANDLE}/`;
const OUTPUT_DIR = join(__dirname, '..', 'src', 'scraped');
const OUTPUT_FILE = join(OUTPUT_DIR, 'instagram-posts.json');
const FALLBACK_FILE = join(OUTPUT_DIR, 'instagram-posts.fallback.json');
const PUBLIC_IMG_DIR = join(__dirname, '..', 'public', 'instagram');
const DEFAULT_LIMIT = 8;

// ── CLI args ────────────────────────────────────────────────────
const limitArg = process.argv.find((a) => a.startsWith('--limit'));
const cookiesArg = process.argv.find((a) => a.startsWith('--cookies'));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1] ?? '8', 10) : DEFAULT_LIMIT;
const COOKIES_FILE = cookiesArg ? cookiesArg.split('=')[1] : null;

// ── Types ───────────────────────────────────────────────────────
interface InstaPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  postUrl: string;
}

interface ScrapedNode {
  shortcode: string;
  displayUrl: string;
  caption: string;
  likes: number;
  comments: number;
}

// ── Helpers ─────────────────────────────────────────────────────

function log(msg: string) {
  // eslint-disable-next-line no-console
  console.log(`[insta-scraper] ${msg}`);
}

/**
 * Download an image URL to a local file in public/instagram/.
 * Returns the public path (e.g. /instagram/post-1.jpg) or null on failure.
 */
function downloadImage(url: string, destPath: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('https')) return resolve(null);

    mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

    const file = createWriteStream(destPath);
    https.get(url, { timeout: 15_000 }, (response) => {
      if (response.statusCode !== 200 || !response.headers['content-type']?.startsWith('image/')) {
        resolve(null);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', () => {
      resolve(null);
    });
  });
}

/**
 * Save scraped posts to JSON, downloading images to public/instagram/.
 * The JSON stores local paths like /instagram/post-1.jpg instead of CDN URLs.
 */
async function save(posts: InstaPost[], tag: string) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

  // Download images and update imageUrl to local paths
  const localPosts = await Promise.all(
    posts.map(async (post, i) => {
      const ext = '.jpg';
      const localPath = join(PUBLIC_IMG_DIR, `post-${i + 1}${ext}`);
      const publicPath = `/instagram/post-${i + 1}${ext}`;

      if (post.imageUrl && post.imageUrl.startsWith('https')) {
        const saved = await downloadImage(post.imageUrl, localPath);
        if (saved !== null) {
          log(`  ↓ downloaded ${post.imageUrl.slice(0, 60)}... → ${publicPath}`);
          return { ...post, imageUrl: publicPath };
        }
      }
      log(`  ⚠ failed to download ${post.imageUrl.slice(0, 60)}...`);
      return post; // keep original URL as fallback
    })
  );

  const json = JSON.stringify(localPosts, null, 2);
  writeFileSync(OUTPUT_FILE, json, 'utf-8');
  log(`${tag}: saved ${localPosts.length} posts to ${OUTPUT_FILE}`);
}

async function saveFallback(posts: InstaPost[]) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const localPosts = await Promise.all(
    posts.map(async (post, i) => {
      if (post.imageUrl && post.imageUrl.startsWith('https')) {
        const ext = '.jpg';
        const localPath = join(PUBLIC_IMG_DIR, `post-${i + 1}${ext}`);
        const publicPath = `/instagram/post-${i + 1}${ext}`;
        const saved = await downloadImage(post.imageUrl, localPath);
        if (saved !== null) return { ...post, imageUrl: publicPath };
      }
      return post;
    })
  );
  writeFileSync(FALLBACK_FILE, JSON.stringify(localPosts, null, 2), 'utf-8');
  log(`Fallback data written to ${FALLBACK_FILE}`);
}

// ── UA / viewport presets ───────────────────────────────────────

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

async function setupPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: 1920, height: 1080 });
  return page;
}

// ── Strategy 1: Parse embedded JSON from profile page ───────────

async function scrapeProfileJson(browser: Browser): Promise<ScrapedNode[]> {
  log('Strategy 1: loading profile page and parsing embedded JSON…');

  const page = await setupPage(browser);

  try {
    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 30_000 });
  } catch {
    log('Page navigation timed out, trying page content anyway…');
  }

  // Scroll a bit to trigger data loading
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise((r) => setTimeout(r, 2000));

  const results = await page.evaluate(() => {
    const out: ScrapedNode[] = [];

    // Try all script tags for embedded JSON payloads
    const scripts = document.querySelectorAll('script');
    for (const script of scripts) {
      const raw = script.textContent ?? '';
      if (!raw.includes('shortcode')) continue;

      // Try parsing as bare JSON
      try {
        const data = JSON.parse(raw);
        extractFromObj(data, out);
      } catch {
        // Try extracting JSON from a variable assignment like
        //   window.__INITIAL_STATE__ = {...}
        const m = raw.match(/=\s*({[\s\S]*})\s*;?\s*$/);
        if (m) {
          try {
            extractFromObj(JSON.parse(m[1]!), out);
          } catch { /* skip */ }
        }
      }

      if (out.length > 0) break;
    }

    return out;
  });

  await page.close();

  // De-duplicate by shortcode
  const seen = new Set<string>();
  const unique = results.filter((r) => {
    if (seen.has(r.shortcode)) return false;
    seen.add(r.shortcode);
    return true;
  });

  log(`Strategy 1 found ${unique.length} posts from embedded JSON`);
  return unique;
}

function extractFromObj(obj: unknown, out: ScrapedNode[]): void {
  if (!obj || typeof obj !== 'object') return;

  // Walk the object tree looking for edge_owner_to_timeline_media.edges
  const o = obj as Record<string, unknown>;

  // Direct hit: user.timeline or edge_owner_to_timeline_media
  const timeline =
    o.edge_owner_to_timeline_media ??
    (o.user as Record<string, unknown>)?.edge_owner_to_timeline_media;

  if (timeline && Array.isArray((timeline as Record<string, unknown>).edges)) {
    for (const edge of (timeline as Record<string, unknown>).edges as Array<Record<string, unknown>>) {
      const node = edge.node as Record<string, unknown>;
      if (!node?.shortcode) continue;

      const captionEdges = (node.edge_media_to_caption as Record<string, unknown>)
        ?.edges as Array<Record<string, unknown>> | undefined;
      const caption = captionEdges?.[0]?.node?.text as string
        ?? node.accessibility_caption as string
        ?? '';

      out.push({
        shortcode: node.shortcode as string,
        displayUrl: (node.display_url ?? node.thumbnail_src ?? node.display_resources?.[0]?.src ?? '') as string,
        caption,
        likes: (node.edge_media_preview_like?.count ?? node.edge_liked_by?.count ?? node.like_count ?? 0) as number,
        comments: (node.edge_media_to_comment?.count ?? node.comment_count ?? 0) as number,
      });
    }
    return;
  }

  // Recurse into child objects
  for (const val of Object.values(o)) {
    if (typeof val === 'object' && val !== null) {
      extractFromObj(val, out);
      if (out.length > 0) return; // stop at first meaningful hit
    }
  }
}

// ── Strategy 2: Full post page + GraphQL interception ───────────

async function scrapePostPages(
  browser: Browser,
  shortcodes: string[]
): Promise<InstaPost[]> {
  log(`Strategy 2: fetching ${Math.min(shortcodes.length, LIMIT)} full post pages with GraphQL intercept…`);

  const results: InstaPost[] = [];

  for (const shortcode of shortcodes.slice(0, LIMIT)) {
    const page = await setupPage(browser);

    // Intercept network responses to grab GraphQL JSON
    let graphQLData: Record<string, unknown> | null = null;

    await page.on('response', (response) => {
      const url = response.url();
      if (url.includes('/graphql/') || url.includes('query_id') || url.includes('doc_id')) {
        response.json()
          .then((data) => { graphQLData = data; })
          .catch(() => { /* ignore */ });
      }
    });

    try {
      await page.goto(
        `https://www.instagram.com/p/${shortcode}/`,
        { waitUntil: 'networkidle2', timeout: 20_000 }
      );

      // Wait a moment for any late GraphQL calls
      await new Promise((r) => setTimeout(r, 2000));

      // Try to extract data from the intercepted GraphQL response
      if (graphQLData) {
        const node = extractGraphNode(graphQLData);
        if (node?.display_url) {
          results.push({
            id: `insta-scraped-${results.length + 1}`,
            imageUrl: node.display_url as string,
            caption: (node.caption as string) || '',
            likes: (node.likes as number) || 0,
            comments: (node.comments as number) || 0,
            postUrl: `https://www.instagram.com/p/${shortcode}/`,
          });
          await page.close();
          continue; // got data from API, move to next post
        }
      }

      // Fallback: extract from DOM
      const dom = await page.evaluate(() => {
        // Large image: look for the main post image
        const imgs = Array.from(document.querySelectorAll('img'));
        // Prefer images with larger sizes (not s150x150 thumbnails)
        const bigImg = imgs.find((img) => {
          const src = img.src ?? '';
          return src.includes('e35') || src.includes('e15') || src.includes('s640x640') ||
                 src.includes('s1080x1080') || src.includes('s750x750');
        });

        // Caption: look for the first <a> with content after the username
        const links = Array.from(document.querySelectorAll('a[role="link"]'));
        const captionLink = links.find((a) => {
          const text = a.textContent ?? '';
          return text.length > 10 && !text.startsWith('@') && !text.startsWith('#');
        });

        return {
          imageUrl: bigImg?.src ?? imgs.find((i) => i.src)?.src ?? '',
          caption: captionLink?.textContent?.trim() ?? '',
        };
      });

      if (dom.imageUrl) {
        results.push({
          id: `insta-scraped-${results.length + 1}`,
          imageUrl: dom.imageUrl,
          caption: dom.caption || `View on Instagram (@${INSTA_HANDLE})`,
          likes: 0,
          comments: 0,
          postUrl: `https://www.instagram.com/p/${shortcode}/`,
        });
      }
    } catch {
      log(`  ⚠ failed for /p/${shortcode}/`);
    } finally {
      await page.close();
    }

    // Polite delay between requests
    if (results.length < LIMIT - 1) {
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  log(`Strategy 2 extracted ${results.length} posts`);
  return results;
}

/**
 * Walk a GraphQL response object and extract post fields.
 */
function extractGraphNode(data: unknown): {
  display_url?: string;
  caption?: string;
  likes?: number;
  comments?: number;
} | null {
  if (!data || typeof data !== 'object') return null;

  const obj = data as Record<string, unknown>;

  // Look for the shortcode item (short_media, media, xdt_shortcode_media)
  const mediaItems = obj.shortcode_media ?? obj.media ?? obj.xdt_shortcode_media;
  if (mediaItems && typeof mediaItems === 'object') {
    const m = mediaItems as Record<string, unknown>;
    return {
      display_url: (m.display_url ?? m.display_resources?.[m.display_resources.length - 1]?.src) as string,
      caption: (m.edge_media_to_caption?.edges?.[0]?.node?.text
        ?? m.caption?.text
        ?? m.accessibility_caption) as string,
      likes: (m.edge_media_preview_like?.count ?? m.like_count ?? m.likes?.count) as number,
      comments: (m.edge_media_to_comment?.count ?? m.comment_count) as number,
    };
  }

  // Recurse
  for (const val of Object.values(obj)) {
    if (typeof val === 'object' && val !== null) {
      const result = extractGraphNode(val);
      if (result?.display_url) return result;
    }
  }
  return null;
}

/**
 * Enrich posts with real captions by hitting each post page and reading
 * the og:description / twitter:description meta tags, which contain the
 * full caption text for public posts.
 */
async function enrichWithMetaCaptions(browser: Browser, posts: InstaPost[]): Promise<InstaPost[]> {
  log(`Enriching ${posts.length} posts via meta tag captions…`);
  const enriched: InstaPost[] = [];

  for (const post of posts) {
    const page = await setupPage(browser);
    try {
      await page.goto(post.postUrl, { waitUntil: 'domcontentloaded', timeout: 15_000 });

      const meta = await page.evaluate(() => {
        // og:description format:
        //   "X likes, Y comments - username on Date: "CAPTION TEXT""
        const og = document.querySelector('meta[property="og:description"]')
          ?? document.querySelector('meta[name="og:description"]');
        if (og) return og.getAttribute('content') ?? '';
        const tw = document.querySelector('meta[name="twitter:description"]');
        return tw?.getAttribute('content') ?? '';
      });

      if (meta && meta.length > 3) {
        // Parse the og:description structure
        // "4 likes, 0 comments - yeh.safar.swaad.ka on June 1, 2026: "Caption here". "
        // Greedy .* eats the closing ", so we use [\s\S] with a lookbehind-like pattern
        // Match everything between ": " and the LAST ". before trailing dot/space
        const captionMatch = meta.match(/on \w+ \d+, \d{4}: "([\s\S]*?)"\.\s*$/);
        const cleanCaption = captionMatch ? captionMatch[1]! : meta;

        // Try to extract like count
        const likesMatch = meta.match(/^(\d+)\s+likes/);
        const likes = likesMatch ? parseInt(likesMatch[1]!, 10) : post.likes;
        const commentsMatch = meta.match(/(\d+)\s+comments/);
        const comments = commentsMatch ? parseInt(commentsMatch[1]!, 10) : post.comments;

        enriched.push({
          ...post,
          caption: cleanCaption || post.caption,
          likes: likes || post.likes,
          comments: comments || post.comments,
        });
        log(`  ✓ /p/${post.postUrl.match(/\/p\/([A-Za-z0-9_-]+)/)?.[1]}/ → "${(cleanCaption || post.caption).slice(0, 60)}…" likes=${likes}`);
      } else {
        enriched.push(post);
      }
    } catch {
      log(`  ⚠ meta-caption failed for ${post.postUrl}`);
      enriched.push(post);
    } finally {
      await page.close();
    }

    await new Promise((r) => setTimeout(r, 600));
  }

  return enriched;
}

// ── Strategy 3: Scrape shortcodes from profile grid DOM ─────────

async function scrapeShortcodesOnly(browser: Browser): Promise<string[]> {
  log('Strategy 3: extracting shortcodes from profile grid DOM…');

  const page = await setupPage(browser);

  try {
    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 30_000 });
  } catch {
    log('Profile page timed out, trying DOM anyway…');
  }

  // Scroll to load more posts
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy(0, 1200));
    await new Promise((r) => setTimeout(r, 2000));
  }

  const shortcodes = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href*="/p/"]'));
    const seen = new Set<string>();
    for (const a of anchors) {
      const href = a.getAttribute('href');
      if (!href) continue;
      const m = href.match(/\/p\/([A-Za-z0-9_-]+)/);
      if (m && !seen.has(m[1])) {
        seen.add(m[1]);
      }
    }
    return Array.from(seen);
  });

  await page.close();
  log(`Found ${shortcodes.length} unique post shortcodes`);
  return shortcodes;
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  log(`Starting scrape — target: ${PROFILE_URL}, limit: ${LIMIT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
      '--window-size=1920,1080',
    ],
  });

  // ── Inject session cookies if provided ────────────────────────
  if (COOKIES_FILE) {
    log(`Loading session cookies from ${COOKIES_FILE}…`);
    if (existsSync(COOKIES_FILE)) {
      const cookies = JSON.parse(readFileSync(COOKIES_FILE, 'utf-8')) as Array<Record<string, string>>;
      const page = await setupPage(browser);
      await page.setCookie(...cookies);
      await page.close();
      log(`Injected ${cookies.length} cookies into browser session`);
    } else {
      log(`⚠ Cookie file not found: ${COOKIES_FILE}`);
    }
  }

  try {
    // ── Attempt 1: Embedded JSON from profile page ──────────────
    const profilePosts = await scrapeProfileJson(browser);

    if (profilePosts.length >= LIMIT && profilePosts.some((p) => p.displayUrl)) {
      await save(
        profilePosts.slice(0, LIMIT).map((p, i) => ({
          id: `insta-scraped-${i + 1}`,
          imageUrl: p.displayUrl,
          caption: p.caption || `View on Instagram (@${INSTA_HANDLE})`,
          likes: p.likes,
          comments: p.comments,
          postUrl: `https://www.instagram.com/p/${p.shortcode}/`,
        })),
        'SUCCESS (profile JSON)'
      );
      await browser.close();
      return;
    }

    // ── Attempt 2: Full post pages + GraphQL intercept ──────────
    const shortcodes = profilePosts.map((p) => p.shortcode).filter(Boolean);
    const enriched = shortcodes.length > 0
      ? await scrapePostPages(browser, shortcodes)
      : [];

    if (enriched.length > 0 && enriched.some((p) => !p.imageUrl.includes('s150x150'))) {
      // Filter out profile-pic-sized images
      let good = enriched.filter((p) => !p.imageUrl.includes('s150x150'));
      // Enrich with meta tags for real captions
      good = await enrichWithMetaCaptions(browser, good);
      await save(good, 'SUCCESS (post pages)');
      await browser.close();
      return;
    }

    // ── Attempt 3: Fresh shortcode scrape + post pages ──────────
    const freshShortcodes = await scrapeShortcodesOnly(browser);
    const freshEnriched = await scrapePostPages(browser, freshShortcodes);
    let goodFresh = freshEnriched.filter((p) => !p.imageUrl.includes('s150x150'));

    if (goodFresh.length > 0) {
      // Enrich with meta tags for real captions
      goodFresh = await enrichWithMetaCaptions(browser, goodFresh);
      await save(goodFresh, 'SUCCESS (fresh shortcodes + post pages)');
      await browser.close();
      return;
    }

    // ── All strategies failed ──────────────────────────────────
    log('⚠ All scraping strategies failed. Falling back to existing data.');

    if (existsSync(OUTPUT_FILE)) {
      log(`Keeping existing ${OUTPUT_FILE} (${readFileSync(OUTPUT_FILE, 'utf-8').length} bytes)`);
    } else {
      log('No existing data. Copying fallback…');
      if (existsSync(FALLBACK_FILE)) {
        const fallback = JSON.parse(readFileSync(FALLBACK_FILE, 'utf-8')) as InstaPost[];
        await save(fallback, 'FALLBACK COPY');
      } else {
        const seed: InstaPost[] = [
          {
            id: 'insta-seed-1',
            imageUrl: `https://www.instagram.com/${INSTA_HANDLE}/`,
            caption: `Follow @${INSTA_HANDLE} on Instagram for the latest posts!`,
            likes: 0,
            comments: 0,
            postUrl: `https://www.instagram.com/${INSTA_HANDLE}/`,
          },
        ];
        await save(seed, 'SEED');
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    log(`❌ Fatal error: ${message}`);

    if (existsSync(OUTPUT_FILE)) {
      log('Previous scraped data preserved.');
    }
  } finally {
    await browser.close();
  }
}

main();
