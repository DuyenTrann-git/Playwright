import { test, expect } from '@playwright/test';

// test.describe('Trang nhân sự anh tester', () => {
//   test('TC01. Kịch bản đăng nhập và kiểm tra widget', async ({ page }) => {

//     await test.step('Bước 1: Điều hướng và đăng nhập', async () => {
//       await page.goto('https://hrm.anhtester.com/erp/login');

//       await page.getByRole('textbox', { name: 'Your Username' }).fill('admin_example');
//       await page.getByRole('textbox', { name: 'Enter Password' }).fill('123456');

//       await page.getByRole('button', { name: 'Login' }).click();
//     });

//     await test.step('Bước 2: Kiểm tra đăng nhập thành công', async () => {
//       await expect(page.getByRole('navigation')).toContainText('Your Apps');
//       await expect(page).toHaveURL('https://hrm.anhtester.com/erp/desk');
//     });

//   });
// });

test('Auto Wait Demo', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.getByText('Auto-Waiting').click();

  // await expect(page.locator('#status'))
  //   .toContainText('Button Clicked Successfully!');
});
