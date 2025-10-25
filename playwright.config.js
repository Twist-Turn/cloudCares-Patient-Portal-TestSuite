const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'patient-portal',
      testMatch: '**/patient-portal.spec.js',
      use: { 
        browserName: 'chromium'
      },
    },
    {
      name: 'queue-registration',
      testMatch: '**/patient-registration.spec.js',
      use: { 
        browserName: 'chromium'
      },
    }
  ],
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }]
  ]
});