class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.locator('//button[@type="submit"]');

        this.loginError = page.locator('.oxd-alert-content-text');

            this.profileDropdown = page.locator('.oxd-userdropdown-tab');
        this.logOut = page.locator('//a[normalize-space()="Logout"]');

    }

    async loginError() {

    return await this.loginError;

}

    async isLogOutVisible() {
        
        return await this.logOut;

    }
    async logout() {
        
    await this.profileDropdown.click();

    await this.logOut.click();
    
}


    Url(){

        return "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        console.log("Login Successful......");
    
    }
}

module.exports = LoginPage;