const{expect,test} = require("@playwright/test");
const DashBoard = require("../pages/DashBoard");
const LoginPage = require("../pages/LoginPage");

test('Admin Search Funtionality', async({page})=>{

            const loginPage = new LoginPage(page);

            const dashBoard = new DashBoard(page);

            await page.goto(loginPage.Url());

           await loginPage.login('Admin','admin123');       

            await expect(await dashBoard.dashBoardSearchFunction()).toBeTruthy();
            

})