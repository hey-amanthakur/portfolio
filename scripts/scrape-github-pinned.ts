import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import type { Browser } from 'puppeteer';

puppeteer.use(StealthPlugin());

const USERNAME = 'jhonsnow456';
const PROFILE_URL = `https://github.com/${USERNAME}`;

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

async function main() {
  console.log(`[github-scraper] Fetching from ${PROFILE_URL}…`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(UA);
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 40_000 });
    // Wait longer for React hydration
    await new Promise((r) => setTimeout(r, 5000));

    // Try multiple strategies to find pinned repos
    // Strategy 1: Look for pinned section via heading text
    const pinnedData = await page.evaluate(() => {
      const results: Array<{
        name: string;
        description: string;
        url: string;
        language: string;
        stars: number;
        forks: number;
      }> = [];

      // Find the pinned section — GitHub may use different structures
      // Look for heading containing "Pinned"
      const pinnedHeading = Array.from(document.querySelectorAll('h2, h3'))
        .find(h => h.textContent?.toLowerCase().includes('pinned'));

      if (!pinnedHeading) {
        console.log('No "Pinned" heading found');
        return { error: 'no-pinned-heading', html: document.body.innerHTML.slice(0, 500) };
      }

      // Get the parent section
      const section = pinnedHeading.closest('section, .js-profile-layout, div');
      const container = section || pinnedHeading.parentElement;
      if (!container) return { error: 'no-container' };

      // Look for repo links within the section
      const repoLinks = container.querySelectorAll('a[href^="/' + USERNAME + '/"]');
      for (const link of repoLinks) {
        const href = link.getAttribute('href') ?? '';
        // Skip non-repo links (avatar, settings pages)
        if (!href.match(/^\/[^/]+\/[^/]+$/) || href.includes('tab=') || href.includes('?')) continue;
        const name = href.split('/').pop() ?? '';
        if (!name) continue;

        // Find description — look in parent's siblings or descendants
        const parent = link.closest('li, .Box-row, [class*="col-"]') || link.parentElement;
        const desc = parent?.querySelector('[itemprop="description"], p')?.textContent?.trim() ?? '';
        const lang = parent?.querySelector('[itemprop="programmingLanguage"]')?.textContent?.trim() ?? '';

        results.push({
          name,
          description: desc,
          url: `https://github.com${href}`,
          language: lang,
          stars: 0,
          forks: 0,
        });
      }

      return results;
    });

    if (Array.isArray(pinnedData) && pinnedData.length > 0) {
      console.log(`Found ${pinnedData.length} repos:`);
      console.log(JSON.stringify(pinnedData, null, 2));
    } else {
      // Strategy 2: Dump page structure to find pinned section
      console.log('Strategy 1 failed. Trying broader search…');

      const altData = await page.evaluate(() => {
        // Look for turbo-frame that might contain pinned items
        const frames = Array.from(document.querySelectorAll('turbo-frame'));
        console.log('turbo-frames:', frames.map(f => ({ id: f.id, src: f.getAttribute('src') })));

        // Look for any list items with repo links
        const allRepoLinks = Array.from(document.querySelectorAll('a[href^="/jhonsnow456/"]'))
          .filter(a => {
            const href = a.getAttribute('href') ?? '';
            return href.match(/^\/[^/]+\/[^/]+$/);
          });

        console.log('Total repo links found:', allRepoLinks.length);
        return allRepoLinks.slice(0, 10).map(a => ({
          href: a.getAttribute('href'),
          text: a.textContent?.trim(),
          parentTag: a.parentElement?.tagName,
          parentClass: a.parentElement?.className?.slice(0, 80),
        }));
      });

      console.log('Repo links on page:', JSON.stringify(altData, null, 2));

      // Strategy 3: Use GitHub API approach — fetch from page meta or try the overview tab
      console.log('\nTrying to access the overview tab directly…');
      await page.goto(`${PROFILE_URL}?tab=repositories`, { waitUntil: 'networkidle2', timeout: 30_000 });
      await new Promise((r) => setTimeout(r, 3000));

      const reposFromList = await page.evaluate(() => {
        const repos: Array<{name: string; description: string; url: string; language: string}> = [];
        const items = document.querySelectorAll('[itemprop="owns"]');
        for (const item of items) {
          const link = item.querySelector('a[itemprop="codeRepository"]');
          const desc = item.querySelector('[itemprop="description"]');
          const lang = item.querySelector('[itemprop="programmingLanguage"]');
          if (link) {
            repos.push({
              name: (link.textContent?.trim() ?? '').split('/').pop() ?? '',
              description: desc?.textContent?.trim() ?? '',
              url: link.getAttribute('href') ?? '',
              language: lang?.textContent?.trim() ?? '',
            });
          }
        }
        return repos.slice(0, 8);
      });

      if (reposFromList.length > 0) {
        console.log(`Found ${reposFromList.length} repos from repository list:`);
        console.log(JSON.stringify(reposFromList, null, 2));
      } else {
        console.log('No repos found via any strategy.');
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[github-scraper] ❌ Error: ${message}`);
  } finally {
    await browser.close();
  }
}

main();
