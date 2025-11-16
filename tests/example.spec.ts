import { test, expect } from '@playwright/test';


test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');


});

// echo "# Playwright" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/DuyenTrann-git/Playwright.git
// git push -u origin main