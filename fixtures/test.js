const base = require('@playwright/test');

exports.test = base.test.extend({

    screenshotOnFailure: [async ({ page }, use, testInfo) => {
        
        await use();

        if (testInfo.status !== testInfo.expectedStatus) {

            await page.screenshot({
                path: `screenshots/${testInfo.title}.png`,
                fullPage: true
            });
        }
    }, { auto: true }]

});

exports.expect = base.expect;