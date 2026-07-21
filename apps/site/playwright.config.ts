import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'on-first-retry', screenshot: 'only-on-failure' },
  projects: [
    {
      name: 'chromium-1440',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } },
    },
    {
      name: 'chromium-390',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'firefox-1280',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'webkit-360',
      use: { ...devices['iPhone 12 Mini'], viewport: { width: 360, height: 780 } },
    },
    {
      name: 'webkit-768',
      use: { ...devices['iPad (gen 7)'], viewport: { width: 768, height: 1024 } },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000/de',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
