/**
 * Instagram post scraper — runs at build time.
 *
 * Uses Puppeteer (headless browser) to visit each post page and extract
 * og:image URLs, captions, and stats. NO cookies or login required.
 *
 * Usage:
 *   npx tsx scripts/scrape-instagram.ts            # scrape latest 8 posts
 *   npx tsx scripts/scrape-instagram.ts --limit=12 # scrape N posts
 *
 * Shortcodes are in the SHORTCODES array below — update when you post new content.
 *
 * Output:  src/scraped/instagram-posts.json
 */

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import type { Browser, Page } from 'puppeteer';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

puppeteer.use(StealthPlugin());

// ── Config ──────────────────────────────────────────────────────
const INSTA_HANDLE = 'yeh.safar.swaad.ka';
const OUTPUT_DIR = join(__dirname, '..', 'src', 'scraped');
const OUTPUT_FILE = join(OUTPUT_DIR, 'instagram-posts.json');
const DEFAULT_LIMIT = 8;

// ── CLI arg ─────────────────────────────────────────────────────
const limitArg = process.argv.find((a) => a.startsWith('--limit'));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1] ?? '8', 10) : DEFAULT_LIMIT;

// ── Your post shortcodes ────────────────────────────────────────
// Find shortcode in the URL: https://www.instagram.com/p/SHORTCODE/
// Update this list when you post new content.
const SHORTCODES = [
  'DZKu1JODN9p',
  'DZEWTcMDPHo',
  'DZD3A9zDBYo',
  'DY_elE9jOPn',
  'DY-4yldjGqg',
  'DY8lY9VjKKM',
  'DY4tpPbjJSh',
];

// ── Types ───────────────────────────────────────────────────────
interface InstaPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  postUrl: string;
}

function log(msg: string) {
  // eslint-disable-next-line no-console
  console.log(`[insta-scraper] ${msg}`);
}

async function setupPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1920, height: 1080 });
  return page;
}

/**
 * Visit an Instagram post page and extract og:image, caption, likes, comments.
 * This works WITHOUT login — the og:image meta tag is always present.
 */
async function scrapePost(browser: Browser, shortcode: string): Promise<InstaPost | null> {
  const postUrl = `https://www.instagram.com/p/${shortcode}/`;
  const page = await setupPage(browser);

  try {
    await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 20_000 });

    // Wait a moment for meta tags to render
    await new Promise((r) => setTimeout(r, 2000));

    const data = await page.evaluate(() => {
      // Try og:image (always present on public posts)
      const ogImage = document.querySelector('meta[property="og:image"]')
        ?? document.querySelector('meta[name="og:image"]');
      const imageUrl = ogImage?.getAttribute('content') ?? '';

      // Try og:description for caption + stats
      const ogDesc = document.querySelector('meta[property="og:description"]')
        ?? document.querySelector('meta[name="og:description"]');
      const descContent = ogDesc?.getAttribute('content') ?? '';

      // Parse: "4 likes, 0 comments - username on June 1, 2026: "CAPTION""
      let caption = '';
      let likes = 0;
      let comments = 0;

      if (descContent) {
        const likesMatch = descContent.match(/^(\d+)\s+likes/);
        const commentsMatch = descContent.match(/(\d+)\s+comments/);
        const captionMatch = descContent.match(/on \w+ \d+, \d{4}: "([\s\S]*?)"\.\s*$/);

        likes = likesMatch ? parseInt(likesMatch[1], 10) : 0;
        comments = commentsMatch ? parseInt(commentsMatch[1], 10) : 0;
        caption = captionMatch ? captionMatch[1] : descContent;
      }

      // Fallback: try JSON data embedded in page scripts
      if (!imageUrl) {
        const scripts = document.querySelectorAll('script');
        for (const script of scripts) {
          const raw = script.textContent ?? '';
          const jsonMatch = raw.match(/"display_url":"([^"]+)"/);
          if (jsonMatch?.[1]) {
            return {
              imageUrl: jsonMatch[1].replace(/\\u0026/g, '&'),
              caption: caption || `View on Instagram (@${document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ?? 'instagram'})`,
              likes,
              comments,
            };
          }
        }
      }

      return { imageUrl, caption: caption || `View post on Instagram`, likes, comments };
    });

    if (!data.imageUrl) {
      log(`  ⚠ no image found for /p/${shortcode}/`);
      return null;
    }

    return {
      id: `insta-${shortcode}`,
      imageUrl: data.imageUrl,
      caption: data.caption,
      likes: data.likes,
      comments: data.comments,
      postUrl,
    };
  } catch (err) {
    log(`  ✗ failed for /p/${shortcode}/: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  } finally {
    await page.close();
  }
}

// ── Main ────────────────────────────────────────────────────────
async function main() {
  log(`Launching browser to scrape ${Math.min(SHORTCODES.length, LIMIT)} posts from @${INSTA_HANDLE}…`);

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

  try {
    const results: InstaPost[] = [];

    for (const shortcode of SHORTCODES.slice(0, LIMIT)) {
      const post = await scrapePost(browser, shortcode);
      if (post !== null) {
        results.push(post);
        log(`  ✓ /p/${shortcode}/ → "${post.caption.slice(0, 60)}…" likes=${post.likes}`);
      }
      // Polite delay between requests
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (results.length > 0) {
      mkdirSync(OUTPUT_DIR, { recursive: true });
      writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
      log(`SUCCESS: saved ${results.length} posts to ${OUTPUT_FILE}`);
    } else {
      log('⚠ No posts scraped. Keeping existing data.');
      if (!existsSync(OUTPUT_FILE)) {
        log('No existing data found — nothing to fall back to.');
      }
    }
  } catch (err) {
    log(`❌ Fatal: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await browser.close();
  }
}

main();
