const {expect,test } = require("../fixtures/test");

const DashBoard =require('../pages/DashBoard');
const LoginPage = require('../pages/LoginPage');

test("DashBoard Admin Panel Count", async ({page})=>{

    const loginPage = new LoginPage(page);
    const DashBoardPanel = new DashBoard(page);
    await page.goto(loginPage.Url());
    await loginPage.login('Admin','admin123');
    
    const adminPanelCount = await DashBoardPanel.checkDashBoardAdminPanelCount();

    console.log(adminPanelCount);

    await expect(adminPanelCount).toBe(12);

    

}
)

