
import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/API', fullyParallel: false, workers: 1,
  forbidOnly: true, retries: 0, timeout: 30_000,
  reporter: [['list'], ['html', { outputFolder: 'api-report', open: 'never' }]],
  use: {
    baseURL: process.env.API_BASE_URL ?? 'https://www.playwrightautomation.com',
    extraHTTPHeaders: { Accept: 'application/json' },
    storageState: { cookies: [], origins: [] },
    trace: 'off',
  },
  projects: [{ name: 'api' }],
});
