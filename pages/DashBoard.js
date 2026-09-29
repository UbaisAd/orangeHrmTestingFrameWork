const {expect} = require("@playwright/test");  
class DashBoard {


    constructor(page){

        this.page = page;

        this.adminPanel = page.locator('.oxd-main-menu-item-wrapper');

        this.adminPanelVisible = page.locator('.oxd-main-menu-item-wrapper:visible');

        this.dashBoardVisible = page.locator('.oxd-topbar-header-breadcrumb');

        this.adminPanelSearchBar = page.locator("//input[@placeholder='Search']");
        
    }

    async isDashBoardVisible(){
        
        return await this.dashBoardVisible.isVisible();

    }

    async checkDashBoardAdminPanelCount() {

        await this.adminPanel.first().waitFor();
        return await this.adminPanel.count();
                
}

    async checkDashBoardAdminPanelOptions() {

        await this.adminPanel.last().waitFor();
        const count = await this.adminPanel.count()

        let options = [];

        for(let x = 0;x<count;x++){

            options.push(await this.adminPanel.nth(x).textContent());
            
        }

        let isDuplicate = (arr)=>new Set(arr).size==arr.length;

        return isDuplicate(options);


            
}
    async dashBoardSearchFunction(){

                let isSearchWorks = true;

                await this.adminPanel.first().waitFor();   

                const adminPanelElement = [];

                let count = await this.adminPanel.count();
                for(let x = 0; x<count;x++){

                        adminPanelElement.push((await this.adminPanel.nth(x).textContent()).trim());

                }
                
                for(let element of adminPanelElement){

                        await this.adminPanelSearchBar.fill(element);    
                                                
                    

                        let searchResult = (await this.adminPanelVisible.nth(0).textContent()).trim();

                        if(await this.adminPanelVisible.count()!=1){

                            isSearchWorks = false;
                            console.log("Search expect 1 but "+await searchResult.count());
                            break;

                        }
                        else if(searchResult!==element){

                            isSearchWorks  = false;
                            console.log("Expect"+element + "but"+ searchResult);
                            break;
                        }

                        
                        
                            console.log(element +" ✓ ");

                        
                      


                }

                return isSearchWorks;
                
        }
}

module.exports = DashBoard;