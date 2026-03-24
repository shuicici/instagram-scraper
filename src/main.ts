import { Dataset, Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

interface Input {
    username: string;
}

async function main() {
    await Actor.init();
    const input = await Actor.getInput<Input>() as Input;
    if (!input?.username) throw new Error('Username required');
    
    const url = `https://www.instagram.com/${input.username}/`;
    
    const crawler = new PlaywrightCrawler({
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
            
            await Dataset.pushData({ username: input.username, data });
            log.info('Profile data extracted');
        }
    });
    
    await crawler.run([{ url }]);
    await Actor.exit();
}
main().catch(e => { console.error(e); process.exit(1); });
