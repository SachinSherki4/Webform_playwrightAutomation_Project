import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Test directory
  testDir: path.join(__dirname, 'tests'),
  
  // Test patterns
  testMatch: '**/*.spec.js',
  
  // Folder for test artifacts
  outputDir: path.join(__dirname, 'reports', 'artifacts'),
  
  // Allure results folder
  snapshotDir: path.join(__dirname, 'tests', 'snapshots'),
  
  // Global timeout
  timeout: 30 * 1000,
  
  // Expect timeout
  expect: {
    timeout: 5 * 1000,
  },
  
  // Fail on console errors
  use: {
    // Base URL
    baseURL: 'http://localhost:3000/',
    
    // Screenshots on failure AND on every test step
    screenshot: 'on',
    screenshotOnFailure: true,
    
    // Video on every test for review
    video: 'on',
    
    // Traces for debugging
    trace: 'on',
    
    // Action timeout
    actionTimeout: 10 * 1000,
  },
  
  // Projects configuration
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  
  // Web server configuration
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: path.join(__dirname, 'reports', 'html') }],
    ['json', { outputFile: path.join(__dirname, 'reports', 'json', 'results.json') }],
    ['junit', { outputFile: path.join(__dirname, 'reports', 'junit', 'results.xml') }],
    ['allure-playwright', { outputFolder: path.join(__dirname, 'allure-results') }],
    ['list'],
  ],
  
  // Retry configuration
  retries: process.env.CI ? 2 : 0,
  
  // Parallel workers (1 worker for headed mode, 4 for headless)
  workers: process.env.HEADED ? 1 : (process.env.CI ? 1 : 4),
  
  // Fail on console errors
  forbidOnly: !!process.env.CI,
  
  // Continue after test failure
  fullyParallel: true,
});
