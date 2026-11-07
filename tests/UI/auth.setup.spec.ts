import { test } from '@playwright/test';
import { LoginPage } from '../..//Pages/LoginPage';

if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
  throw new Error('Login credentials are not configured');
}

test('Authenticate user', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    process.env.USER_EMAIL!,
    process.env.USER_PASSWORD!
  );

  await loginPage.verifySuccessfulLogin();

  await page.context().storageState({
    path: '.auth/user.json'
  });
});