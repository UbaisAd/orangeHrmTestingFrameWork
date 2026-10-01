const DashBoard = require('../pages/DashBoard');
const LoginPage = require('../pages/LoginPage.js');

const {test,expect} = require('../fixtures/test');

test('Admin Panel Options', async({page})=>{

                const loginPage = new LoginPage(page);
                const dashBoard = new DashBoard(page);

                await page.goto(loginPage.Url());
                await loginPage.login('Admin','admin123');
                            
                await expect(await dashBoard.checkDashBoardAdminPanelOptions()).toBeTruthy();
                
})







