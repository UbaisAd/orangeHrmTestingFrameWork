const {defineConfig} = require('@playwright/test');

module.exports  = defineConfig({

        testDir : './tests',
    

        use:{

            browserName : 'chromium',
            headless : false,
            screenshot : 'only-on-failure',
   
        }
});