import launcher from "k6/x/browser";
import { sleep } from "k6";
export default function() {
    const browser = launcher.launch('chromium', { headless: false });
    const context = browser.newContext();
    const page = context.newPage();
    page.goto('http://whatsmyuseragent.org/', { waitUntil: 'load' });
    const dimensions = page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });
    console.log(JSON.stringify(dimensions));
    sleep(5);
    page.close();
    browser.close();
}
