import { test as base } from '@playwright/test';
import { FormPage } from '../pages/FormPage.js';
import { generateValidFormData, generateMinimalFormData, getInvalidEmails, getInvalidPhones } from '../utils/testDataGenerator.js';
import logger from '../utils/logger.js';
import AllureReporter from '../utils/AllureReporter.js';
import os from 'os';

const consoleLogs = [];

// Create custom fixtures
export const test = base.extend({
  // FormPage fixture
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },

  // Valid complete test data fixture
  validFormData: async ({}, use) => {
    const data = generateValidFormData();
    logger.info(`Generated valid form data: ${JSON.stringify(data)}`);
    await use(data);
  },

  // Minimal valid test data fixture
  minimalFormData: async ({}, use) => {
    const data = generateMinimalFormData();
    logger.info(`Generated minimal form data: ${JSON.stringify(data)}`);
    await use(data);
  },

  // Invalid emails fixture
  invalidEmails: async ({}, use) => {
    const emails = getInvalidEmails();
    await use(emails);
  },

  // Invalid phones fixture
  invalidPhones: async ({}, use) => {
    const phones = getInvalidPhones();
    await use(phones);
  },

  // Logger fixture
  logger: async ({}, use) => {
    await use(logger);
  },

  // Allure reporter fixture
  allure: async ({ page, browserName }, use) => {
    // Clear console logs array
    consoleLogs.length = 0;

    // Capture console messages
    page.on('console', (msg) => {
      consoleLogs.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        args: msg.args(),
      });
    });

    // Setup environment info
    AllureReporter.attachEnvironmentInfo(browserName, os.platform());

    await use(AllureReporter);

    // Cleanup: attach captured logs after test
    AllureReporter.attachLogs(consoleLogs);
  },
});

export { expect } from '@playwright/test';
