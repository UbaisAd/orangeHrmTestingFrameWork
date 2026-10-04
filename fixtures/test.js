const base = require('@playwright/test');

 base.test.beforeEach(async ({ page }, use) => {

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }),


exports.test = base.test.extend({


    screenshotOnFailure: [async ({ page }, use, testInfo) => {

        console.log("test running....")
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