import { CRMDashboardPage } from './pom/CRMDardboardPage';
import { CRMLoginPage } from './pom/CRMLoginPage';
import { test, expect } from '@playwright/test';

test('CRM Login page login thành công', async ({ page }) => {
  const loginPage = new CRMLoginPage(page);
  const dashboardPage= new CRMDashboardPage(page)
  await loginPage.goto();
  await loginPage.expectOnPage();

  await loginPage.login('admin@example.com', '123456');

  // Assert URL
  await dashboardPage.expectOnPage();
});
