import { test, expect } from '@playwright/test';

// test('hover trong PW', async ({ page }) => {
//   await page.goto('https://demoapp-sable-gamma.vercel.app/');

//   await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
// // <div class="ant-tooltip-inner" id="_r_1_" role="tooltip">Đây là tooltip thực tế! Hover vào đây để thấy tooltip hiển thị.</div>
//   // Hover vào text
//   await page.getByText('Hover để xem tooltip', { exact: true }).nth(0).hover();

//   // Tooltip (Ant Design) dùng role="tooltip"
//   const tooltip = page.getByRole('tooltip');

//   // Assert tooltip hiển thị
//   await expect(tooltip).toBeVisible();

//   // Assert nội dung tooltip
//   await expect(tooltip).toHaveText(
//     'Đây là tooltip thực tế! Hover vào đây để thấy tooltip hiển thị.'
//   );
//   await page.pause();
test('Click nhiều button 1 lúc', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');
  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  const files: string[] = [
    '📄 Document.pdf',
    '🖼️ Image.jpg',
    '📊 Report.xlsx',
    '🎵 Music.mp3',
    '📹 Video.mp4',
  ];

  // for each nó không dùng được await
  for (let i = 0; i < files.length; i++) {
    await page.getByRole('button', { name: files[i] }).click();
    console.log(`✅ Đã click: ${files[i]}`);
  }
  await expect(page.locator('#ac-selected-count-advanced')).toContainText('Selected: 5 items');

await page.locator('#ac-process').click();
await expect(page.locator('.ant-space-item .ant-alert-message')).toContainText('Processing Complete!');
// await expect(successMessage).toContain('Processing Complete!');
  //   for (const f of files) {
  //   await page.getByRole('button', { name: f }).click(); // 49ms (ran 5x)
  // }

  // await expect(page.locator('#ac-selected-count-advanced'))
  //   .toContainText('Selected: 5 items'); // 5ms

  // await page.pause(); // 6685ms
  await page.pause();

});


