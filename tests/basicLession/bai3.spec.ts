import { test, expect } from '@playwright/test';

test('Vai tro ngam dinh', async ({ page }) => {
    await page.goto('https://demoapp-sable-gamma.vercel.app');

    await page.getByRole('link', { name: 'Bài 2: Playwright Locator' }).click();
    await page.getByRole('button', { name: 'Playwright getByRole' }).click();
    //   await page.getByRole('link', { name: 'Trang chủ' }).click();

    // const linkLocator = page.getByRole('link', { name: 'Trang chủ' });

    // // await linkLocator.hover(); // nếu muốn hover
    // //   await linkLocator.highlight(); // highlight element
    // await linkLocator.nth(0).hover();
    // const linkLocator = page.getByRole('textbox', { name: 'Tên:' })
    // await linkLocator.pressSequentially('Duyen', { delay: 100 })
    // await page.pause();
    const checkbox = page.getByRole('checkbox', { name: 'Tôi đồng ý', checked: true });

    console.log(await checkbox.count());
    await expect(checkbox).toBeVisible();
});


// Yêu cầu:

// Chọn tất cả nút Add to Cart trong trang
//button[text()='Add to Cart']
// Chọn product-card có data-category='electronics'
//div[@data-category='electronics'
// Từ nút Add to Cart, đi lên cha là product-card
//button[normalize-space(.)='Add to Cart']/ancestor::div[@data-category="electronics"]
// Chọn product-card có data-price='49' VÀ data-category='clothing'
//div[@data-price='49' and @data-category='clothing']
// Chọn product-card chứa text iPhone (sử dụng contains(.,...))
//div[@class="product-card"]/h4[contains(normalize-space(.), 'iPhone')]
//div[@class="product-card"]/h4[contains(., 'iPhone')]