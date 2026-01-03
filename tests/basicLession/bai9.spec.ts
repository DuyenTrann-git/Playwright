import { expect, Page, test } from '@playwright/test';
import { parse, isValid, getMonth, getYear } from 'date-fns';

// --- Các hàm hỗ trợ (Helpers) ---

async function openAntSelectedByCardTitle(page: Page, cardTitle: string, index: number) {
  const card = page.locator(
    `xpath=//div[contains(@class, 'ant-card')][.//div[contains(@class, 'ant-card-head-title') and normalize-space()='${cardTitle}']]`
  );
  const selects = card.locator(
    "xpath=.//div[contains(@class, 'ant-select')]//div[contains(@class, 'ant-select-selector')]"
  );
  const selector = selects.nth(index - 1);
  await selector.click();
  // Đợi dropdown xuất hiện để đảm bảo ổn định
  return page.locator('.ant-select-dropdown:visible').first();
}

async function pickAntOptionByText(page: Page, text: string) {
  const option = page.locator(
    `xpath=//div[contains(@class, 'ant-select-dropdown') and not(contains(@style, 'display: none'))]//div[contains(@class, 'ant-select-item-option-content') and normalize-space()='${text}']`
  ).first();
  // await option.scrollIntoViewIfNeeded();
  await option.click();
}

async function selectDateDemo2(page: Page, ymd: string) {
  const monthYearText = page.locator('#dp2-month-year');
  const parsed = parse(ymd, 'yyyy-MM-dd', new Date());

  if (!isValid(parsed)) throw new Error('Ngày không hợp lệ: ' + ymd);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed > today) throw new Error('Không thể chọn ngày tương lai: ' + ymd);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const demo2Title = 'Demo 2: Dropdown Navigation + Today highlight + Disable future dates';

  // 1. Chọn Tháng qua Dropdown
  await openAntSelectedByCardTitle(page, demo2Title, 1);
  await pickAntOptionByText(page, monthNames[getMonth(parsed)]);

  // 2. Chọn Năm qua Dropdown
  await openAntSelectedByCardTitle(page, demo2Title, 2);
  await pickAntOptionByText(page, String(getYear(parsed)));

  // 3. Verify tiêu đề hiển thị
  const targetMonthName = monthNames[getMonth(parsed)];
  const targetYear = getYear(parsed);
  const expectTitle = `${targetMonthName} ${targetYear}`;
  await expect(monthYearText).toHaveText(expectTitle);

  // 4. Chọn ngày trên bảng và kiểm tra kết quả
  const dayCell = page.locator(`//table[@id='dp2-table']//td[@data-date='${ymd}']`);
  await dayCell.click();
  await expect(page.locator('#dp2-selected')).toHaveText(ymd);
}

// --- Test Case ---

test('ví dụ date picker2', async ({ page }) => {
  await page.goto('https://demoapp-sable-gamma.vercel.app/');

  await page.getByRole('link', { name: 'Bài 4: Mouse Actions' }).click();
  await page.getByText('📅 jQuery Date Picker', { exact: true }).click();

  // Tạo ngày giả định: ngày 15 của tháng trước
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const y = lastMonth.getFullYear();
  const m = String(lastMonth.getMonth() + 1).padStart(2, '0');
  const d = '15';
  const ymd = `${y}-${m}-${d}`;

  await selectDateDemo2(page, ymd);
});