"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apify_1 = require("apify");
const crawlee_1 = require("crawlee");
async function main() {
    await apify_1.Actor.init();
    const input = await apify_1.Actor.getInput();
    if (!input?.username)
        throw new Error('Username required');
    const url = `https://www.instagram.com/${input.username}/`;
    const crawler = new crawlee_1.PlaywrightCrawler({
        maxConcurrency: 1,
        requestHandlerTimeoutSecs: 90,
        requestHandler: async ({ page }) => {
            await page.waitForTimeout(3000);
            const data = await page.evaluate(() => {
                const name = document.querySelector('h2')?.textContent?.trim();
                const posts = document.querySelector('span[title]')?.textContent?.trim();
                const followers = document.querySelectorAll('a')[0]?.textContent?.trim();
                const following = document.querySelectorAll('a')[1]?.textContent?.trim();
                const bio = document.querySelector('div.-v_qJ')?.textContent?.trim();
                return { name, posts, followers, following, bio };
            });
            await apify_1.Dataset.pushData({ username: input.username, data });
            apify_1.log.info('Profile data extracted');
        }
    });
    await crawler.run([{ url }]);
    await apify_1.Actor.exit();
}
main().catch(e => { console.error(e); process.exit(1); });
