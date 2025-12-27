import { test, expect } from '@playwright/test';
test('ví dụ về alert va modal', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

});
test('ví dụ về modal', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByRole('tab', { name: 'Alerts & Modals' }).click();

  // Mở modal, điền tên, xác nhận và assert kết quả
  await page.locator('#open-basic-modal').click();
  
  // assert là thằng modal sẽ hiện ra để thao tác
  const dialog = page.getByRole('dialog', { name: 'Thông báo' });
  await expect(dialog).toBeVisible();

  // thao tác với modal
  await dialog.locator('#basic-modal-input').fill('Alice');
  await dialog.getByRole('button', { name: 'Đồng ý' }).click();

  await expect(dialog).toHaveCount(0);
  await expect(page.locator('#basic-modal-result')).toHaveText('Submitted: Alice');

  await page.pause();
});