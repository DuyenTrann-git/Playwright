import { test, expect, Page } from '@playwright/test';
import { format } from 'date-fns'
const LOGIN_URL = 'https://crm.anhtester.com/admin/';

async function loginAndNavigateToNewCustomer(page: Page, tabName: string) {
    //thực hiện hành động Login -> navigate tới customer
    //1. đầu tiên goto Page
    await page.goto(LOGIN_URL);

    //2. assert page có text Login
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Login');

    //3 nhập thông tin username. password -> ấn login
    await page.locator('#email').fill('admin@example.com');
    await page.locator('#password').fill('123456');
    await page.locator("button[type='submit']").click();

    //4 verify login thành công bởi url => và customer tab link hiển thị
    await expect(page).toHaveURL(/admin/);

    //5 // click vào tab customer
    //span[normalize-space(.) = '${tabName}']//parent::a
    //   await page.locator(`//span[normalize-space(.) = '${tabName}']//parent::a`).click();
    await expect(page.getByRole('link', { name: `${tabName}` })).toBeVisible();
    await page.getByRole('link', { name: `${tabName}` }).click();
    await page.getByRole('link', { name: 'New Customer' }).click();
}
test.describe('CRM Customer Page - Positive case', () => {
    test('TC_CUST_01- Tạo Customer (Chỉ nhập trường bắt buộc)', async ({ page }) => {
        // Thực hiện đăng nhập và mở tab Customer
        await loginAndNavigateToNewCustomer(page, 'Customer');

        // Thử nghiệm mở tab Subscriptions
        // await loginAndNavigateToNewCustomer(page, 'Subscriptions');
        //action dang nhap thanh cong
        // thu hep khoangh cah tim kiem -> dau tien la tim thang cha parent
        // -> duyng locator chain de tim trong thang cha
        const containerCompany = page.locator('label', { hasText: 'Company' });
        // const containerCompany = page.locator('Label').filter({ hasText: 'Company' });

        const asterik = containerCompany.locator('small', { hasText: '*' });
        await expect(asterik).toBeVisible();

        const now = new Date();
        const parsedDate = format(now, 'HH:mm:ss');
        const companyName = `Auto PW company ${parsedDate}`;
        await page.locator('#company').fill(companyName);

        await page
            .locator('#profile-save-section')
            .getByRole('button', { name: 'Save', exact: true })
            .click();

        await expect(page.locator('#alert_float_1')).toContainText('Customer added successfully.');
        await expect(page).toHaveURL(/clients\/client/);
        const currentUrl = page.url();
        const urlParst = currentUrl.split('/clients/client/');
        console.log(urlParst);
        const customerId = urlParst[1];
        const customerNameDisplay = page.locator('span.tw-truncate');
        await expect(page.locator('span.tw-truncate')).toContainText(companyName);
    });

});