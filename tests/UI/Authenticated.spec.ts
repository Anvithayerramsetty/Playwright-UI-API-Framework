import { test, expect } from '@playwright/test';

test('Verify user is already authenticated using storage state', async ({ page }) => {

  await page.goto('https://www.playwrightautomation.com/');

   const loggedInUser = page.getByText('student', { exact: true });

  await expect(loggedInUser).toBeVisible();
});