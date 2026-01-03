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
})