import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config();

export default defineConfig({
 testDir: './tests/UI',
   

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,
  //process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.spec\.ts/,
    },

    {
      name: 'chromium',
      testIgnore: /auth\.setup\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
    },

    {
      name: 'firefox',
      testIgnore: /auth\.setup\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
      },
    },

    {
      name: 'webkit',
      testIgnore: /auth\.setup\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        storageState: '.auth/user.json',
      },
    },
  ],
});