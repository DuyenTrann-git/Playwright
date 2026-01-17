import { test, expect } from '@playwright/test';

test.describe('HRML Login Page - Positive case', () => {

    // Positive cases
    test('TC_LOGIN_01 - Đăng nhập thành công (Click)', async ({ page }) => {
        // 1. Navigate to the login page
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('admin_example')
        await page.locator('#ipassword').fill('123456');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
        await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')
    });
    test('TC_LOGIN_02 - Đăng nhập thành công (Enter)', async ({ page }) => {
        // 1. Navigate to the login page
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo'); await page.locator('#iusername').fill('admin_example')
        await page.locator('#iusername').fill('admin_example');
        await page.locator('#ipassword').fill('123456');
        await page.locator('#ipassword').press('Enter');
        await expect(page.locator('#swal2-title')).toHaveText('Logged In Successfully.');
        await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk')
    });

});
test.describe('HRML Login Page - Negative cases', () => {
    // Negative cases
    test('TC_LOGIN_03 - Sai Password', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('admin_example');
        await page.locator('#ipassword').fill('1234567');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.')

    })
    test('TC_LOGIN_04 - Sai Username', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('admin_examplee');
        await page.locator('#ipassword').fill('123456');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('.toast-message')).toHaveText('Invalid Login Credentials.')

    })
    test('TC_LOGIN_05 - Username and Password empty', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('');
        await page.locator('#ipassword').fill('');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('.toast-message')).toHaveText('The username field is required.')

    })
    test('TC_LOGIN_06 - Username empty', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('');
        await page.locator('#ipassword').fill('123456');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('.toast-message')).toHaveText('The username field is required.')

    })

    test('TC_LOGIN_07 - Password empty', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('admin_examplee');
        await page.locator('#ipassword').fill('');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('.toast-message')).toHaveText('The password field is required.')

    })
     test('TC_LOGIN_08 - Password is too short', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('admin_examplee');
        await page.locator('#ipassword').fill('12345');
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.locator('.toast-message')).toContainText('Your password is too short, minimum 6 characters required.')

    })
    //UI
       test('TC_LOGIN_09 - Mask Password', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.locator('#iusername').fill('admin_examplee');
        await page.locator('#ipassword').fill('12345');
        await expect(page.locator('#ipassword')).toHaveAttribute('type', 'password');
    })
     test('TC_LOGIN_09 - Forget Password', async ({ page }) => {
        await page.goto('https://hrm.anhtester.com/');
        await expect(page.getByRole('heading')).toHaveText('Welcome to HRM | Anh Tester Demo');
        await page.getByText('Forgot password?').click();
        await expect(page).toHaveURL(/erp\/forgot-password/)
    })
})