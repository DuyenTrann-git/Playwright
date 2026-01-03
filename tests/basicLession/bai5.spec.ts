import { test, expect } from '@playwright/test';

const DEMO_URL = 'https://demoapp-sable-gamma.vercel.app/';

test('Bài tập UI Movies', async ({ page }) => {
    await page.goto(DEMO_URL);

    await page.getByRole('link', { name: 'Bài 3: Tổng hợp Text Methods' }).click();
    await page.getByRole('tab', { name: 'Expect Assertions' }).click();
    await page.pause();

    // tìm locator của 4 thẻ phim
    const movieCards = await page
        .locator(
            "//span[text()='Danh sách phim']/ancestor::div[@class='ant-card-head']/following-sibling::div//div[contains(@class,'movie-card')]"
        )
        .all();
    await page.pause();

    console.log('Số lượng movies:', movieCards.length);
    expect(movieCards).toHaveLength(4);

    interface IMovieData {
        id: number;
        title: string;
        rating: number;
        year: number;
        genres: string[];
        inList: boolean;
        isLiked: boolean;

    }
    const movieData: IMovieData[] = [];
    for (let i = 0; i < movieCards.length; i++) {
        const card = movieCards[i];
        const dataTitle = await card.getAttribute('data-title');
        const dataYear = await card.getAttribute('data-year');
        const datarating = await card.getAttribute('data-rating');
        const dataGenres = await card.getAttribute('data-genres');
        const titleText = await card
            .locator('.ant-card-meta-title span')
            .nth(0)
            .innerText();
        console.log('titleText:', titleText);
        const ratingText = await card.locator('.ant-card-meta-title span').nth(1).innerText();
        // ❌ Tìm toàn page
page.locator("//div[@class='ant-card-meta-title']//span");

// // ✅ Tìm trong card
// card.locator(".//div[@class='ant-card-meta-title']//span");
console.log('ratingText:', ratingText);
        const yearText = await card.locator('.ant-card-meta-description div div').nth(0).innerText();
        console.log('yearText:', yearText);
        await page.pause();
    }
});


