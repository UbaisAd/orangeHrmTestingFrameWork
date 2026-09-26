const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');

test('Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto(loginPage.Url());

    await loginPage.login('Admin','admin123');

    });


    