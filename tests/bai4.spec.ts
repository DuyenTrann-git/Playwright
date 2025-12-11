import { test, expect } from '@playwright/test';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

// Cấp 1: Mệnh lệnh của sếp (Inline Timeout)
test('Các cấp độ auto waiting trong PW', async ({ page }) => {

  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  // default Playwright là tầm 30s

  // const button = page.getByRole('button', { name: 'Click Me!' });
  // await button.click();

  // const wait locator status.getText() => Button Clicked Successfully!
  await expect(page.locator('#status')).toContainText('Button Clicked Successfully!');
});


/// 📝 Trong Playwright có 3 cấp độ để kiểm soát timeout:

/// ① Cấp độ cao nhất: Inline Timeout (Mệnh lệnh của sếp)
///     → Định nghĩa trực tiếp ngay trong hành động, ví dụ:
///     await page.click('#btn', { timeout: 5000 });

/// ② Cấp độ 2: Trung bình = actionTimeout → Quy định của phòng ban
///     → Đặt trong playwright.config.ts:
///     use: { actionTimeout: 10000 }

/// ③ Cấp độ 3: Thấp nhất = timeout global → Quy định của công ty
///     → Tổng thời gian cho 1 test hoặc project:
///     test.setTimeout(60000);
///     export default { timeout: 60000 };

/// => thứ tự ưu tiên timeout: Inline > actionTimeout > global timeout
test('Cấp 1: Mệnh lệnh của sếp', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page
    .locator("//span[contains(text(),' Bắt đầu Test')]")
    .click();

  const slowButton1 = page.locator('#button-1');

  // ❗ Lỗi timeout 5000ms
  // Vì đây là Inline Timeout -> cấp độ timeout cao nhất trong Playwright.
  // slowButton1.click() phải hoàn thành trong 5 giây.
  // Nhưng button-1 trong demo bị delay lâu hơn 5 giây.
  // => Playwright quăng lỗi:
  //    TimeoutError: locator.click: Timeout 5000ms exceeded.
  await slowButton1.click({ timeout: 5000 });

});


test('Cấp 2: Giới hạn phòng ban', async ({ page }) => {

  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();

  await page
    .locator("//span[contains(text(),' Bắt đầu Test')]")
    .click();

  const slowButton2 = page.locator('#button-2');

  await slowButton2.click();

});
test.setTimeout(30000);
test('Cấp 3: Giới hạn công ty', async ({ page }) => {
  await page.goto(DEMO_URL);

  await page.getByRole('link', { name: 'Bài 1: Auto-Wait Demo' }).click();
  await page.locator("//span[contains(text(),'Bắt đầu Test')]").click();

  const startBtn = page.locator('#start-btn');
  const continueBtn = page.locator('#continue-btn');
  const expectedBtn = page.locator('#final-btn');

  // actionTimeout trong config = 10s.
  // Nút start-btn cần 8s để sẵn sàng → 8s < 10s → hành động hợp lệ.
  await startBtn.click();     // mất ~8 giây

  // continue-btn cũng delay 8s → vẫn < 10s → vượt qua được.
  await continueBtn.click();  // mất ~8 giây

  // Tổng thời gian test phải chờ: 8s + 8s = 16 giây.
  // Nếu test timeout (giới hạn công ty) = 15 giây → test sẽ FAILED
  // dù từng action đều hợp lệ.
  await expectedBtn.click();
});

