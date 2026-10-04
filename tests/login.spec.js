const { test, expect } = require('../fixtures/test');
const loginData = require('../test-data/loginData');

const LoginPage = require('../pages/LoginPage');

test('Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    for(let credential of loginData){
        
        

    await loginPage.login(credential.username, credential.password);

        if(credential.expected=='success'){

            await expect(loginPage.isLogOutVisible()).toBeTruthy();
            await loginPage.logout();

            }
        else if(credential.expected=='failure'){

            await expect(await loginPage.loginError).toBeVisible();
            

        }

}   
});

    