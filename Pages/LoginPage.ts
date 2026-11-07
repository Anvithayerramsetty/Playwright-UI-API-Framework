import { Page, Locator, expect } from "@playwright/test"

export class LoginPage {
    page: Page;
    useremail: Locator;
    password: Locator
    rememberme: Locator;
    Loginclick: Locator;

    constructor(page: Page) {
        this.page = page
        this.useremail = page.getByRole("textbox", { name: "Username or email" })
        this.password = page.getByRole("textbox", { name: "Password" })
        this.rememberme = page.locator("#rememberMe")
        this.Loginclick = page.getByRole("button", { name: "Login" }).first()

    }
    async goto() {
        await this.page.goto("https://www.playwrightautomation.com/login.html")
    }

    async login(useremail: string, password: string) {
        await this.useremail.fill(useremail);
        await this.password.fill(password);
        await this.rememberme.check()
        await this.Loginclick.click()
    }
    async verifySuccessfulLogin(){
         await expect(this.page).toHaveURL("https://www.playwrightautomation.com/")
    }

}