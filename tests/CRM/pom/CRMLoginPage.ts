import { BasePage } from './BasePage';
import { expect } from '@playwright/test';
export class CRMLoginPage extends BasePage {
    // khai báo locator
    private readonly emailInput = this.page.locator('#email');
    private readonly passwordInput = this.page.locator('#password');
    private readonly loginButton = this.page.getByRole('button', { name: 'Login' });


    // Vì CRMLoginPage của bạn không cần constructor riêng — nó đang kế thừa constructor của BasePage.

    // Trong TypeScript/JavaScript:

    // Nếu class con không khai báo constructor(), thì nó sẽ dùng constructor mặc định.

    // Constructor mặc định đó sẽ gọi super(...args) và truyền tất cả tham số lên class cha.

    async goto() {
        await this.page.goto('https://crm.anhtester.com/admin/authentication');
    }

    async expectOnPage(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.page).toHaveURL(/admin\/authentication/);
    }
    async login(email: string, password: string) {
        await this.fillWithLog(this.emailInput, email)
        await this.fillWithLog(this.passwordInput, password,{isSensitive:true})


        // await this.emailInput.fill(email);
        // await this.logFill(this.emailInput);
        // await this.passwordInput.fill(password);
        // await this.logFill(this.passwordInput);
        await this.loginButton.click();
    }
    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/admin/);
    }

}
