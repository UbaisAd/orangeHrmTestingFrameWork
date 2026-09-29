const{expect , test} = require('@playwright/test');

exports.test = base.test.extends[{

        screenShotOnlyOnFailure : [async({page},use,testInfo)=>{

                await use();
                
                if(testInfo.status!==testInfo.expected){
                    
                     await page.screenshot({path: `../test-result/ScreenShot/${testInfo.titile}.png`,fullPage:true});
                    
                     


                }
 } ]

}]