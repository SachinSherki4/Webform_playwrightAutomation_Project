/**
 * Allure Reporter Utility
 * Provides helper functions for Allure reporting in Playwright tests
 */

import { expect } from '@playwright/test';
import * as allure from 'allure-playwright';
import fs from 'fs';
import path from 'path';

export class AllureReporter {
  /**
   * Add a step to the Allure report
   * @param {string} stepName - Name of the step
   * @param {Function} stepAction - Async function to execute
   */
  static async addStep(stepName, stepAction) {
    return allure.step(stepName, stepAction);
  }

  /**
   * Attach screenshot to Allure report
   * @param {Page} page - Playwright page object
   * @param {string} attachmentName - Name of the attachment
   */
  static async attachScreenshot(page, attachmentName = 'Screenshot') {
    try {
      const screenshotBuffer = await page.screenshot();
      allure.attachment(attachmentName, screenshotBuffer, {
        contentType: 'image/png',
      });
    } catch (error) {
      console.error('Failed to attach screenshot:', error);
    }
  }

  /**
   * Attach console logs to Allure report
   * @param {Array} consoleLogs - Array of console messages
   * @param {string} attachmentName - Name of the attachment
   */
  static attachLogs(consoleLogs, attachmentName = 'Console Logs') {
    if (!consoleLogs || consoleLogs.length === 0) {
      return;
    }

    const logsText = consoleLogs
      .map(
        (log, index) =>
          `[${index + 1}] [${log.type.toUpperCase()}] ${log.text}\n`
      )
      .join('');

    allure.attachment(attachmentName, logsText, {
      contentType: 'text/plain',
    });
  }

  /**
   * Attach environment information
   * @param {string} browser - Browser name
   * @param {string} os - Operating system
   */
  static attachEnvironmentInfo(browser, os) {
    const envInfo = `
Browser: ${browser}
OS: ${os}
Execution Time: ${new Date().toISOString()}
Node Version: ${process.version}
    `.trim();

    allure.attachment('Environment Info', envInfo, {
      contentType: 'text/plain',
    });
  }

  /**
   * Set test severity level
   * @param {string} severity - One of: 'blocker', 'critical', 'normal', 'minor', 'trivial'
   */
  static setSeverity(severity) {
    allure.severity(severity);
  }

  /**
   * Add test tag/label
   * @param {string} tag - Tag name
   */
  static addTag(tag) {
    allure.tag(tag);
  }

  /**
   * Add test description
   * @param {string} description - Test description
   */
  static setDescription(description) {
    allure.description(description);
  }

  /**
   * Add test story (feature/module)
   * @param {string} story - Story/feature name
   */
  static setStory(story) {
    allure.story(story);
  }

  /**
   * Add test suite/parent feature
   * @param {string} feature - Feature name
   */
  static setFeature(feature) {
    allure.feature(feature);
  }

  /**
   * Attach HTML report/comparison
   * @param {string} htmlContent - HTML content
   * @param {string} attachmentName - Name of attachment
   */
  static attachHTML(htmlContent, attachmentName = 'HTML Report') {
    allure.attachment(attachmentName, htmlContent, {
      contentType: 'text/html',
    });
  }

  /**
   * Attach JSON data
   * @param {Object} jsonData - Data to attach
   * @param {string} attachmentName - Name of attachment
   */
  static attachJSON(jsonData, attachmentName = 'JSON Data') {
    const jsonString = JSON.stringify(jsonData, null, 2);
    allure.attachment(attachmentName, jsonString, {
      contentType: 'application/json',
    });
  }

  /**
   * Add link to external resource
   * @param {string} url - URL to link
   * @param {string} name - Link name
   * @param {string} type - Link type ('issue', 'tms', 'custom')
   */
  static addLink(url, name, type = 'custom') {
    allure.link(url, name, type);
  }

  /**
   * Add parameter to test
   * @param {string} name - Parameter name
   * @param {string} value - Parameter value
   */
  static addParameter(name, value) {
    allure.parameter(name, value);
  }

  /**
   * Create a detailed step-by-step test with logging
   */
  static async executeStep(stepName, stepFunction, context = {}) {
    return allure.step(stepName, async () => {
      try {
        return await stepFunction();
      } catch (error) {
        allure.attachment('Error Details', JSON.stringify({
          message: error.message,
          stack: error.stack,
          ...context,
        }, null, 2), {
          contentType: 'application/json',
        });
        throw error;
      }
    });
  }

  /**
   * Attach test data
   * @param {Object} testData - Test data object
   * @param {string} attachmentName - Name of attachment
   */
  static attachTestData(testData, attachmentName = 'Test Data') {
    allure.attachment(attachmentName, JSON.stringify(testData, null, 2), {
      contentType: 'application/json',
    });
  }

  /**
   * Attach browser network logs
   * @param {Array} requests - Network requests
   * @param {string} attachmentName - Name of attachment
   */
  static attachNetworkLogs(requests, attachmentName = 'Network Logs') {
    if (!requests || requests.length === 0) {
      return;
    }

    const networkLogs = requests
      .map((req, index) => {
        return `
[${index + 1}] ${req.method()} ${req.url()}
Status: ${req.response()?.status() || 'pending'}
Headers: ${JSON.stringify(req.headers(), null, 2)}
        `.trim();
      })
      .join('\n\n');

    allure.attachment(attachmentName, networkLogs, {
      contentType: 'text/plain',
    });
  }

  /**
   * Mark test as flaky (retry scenario)
   * @param {bool} isFlaky - Whether test is flaky
   */
  static markFlaky(isFlaky = true) {
    if (isFlaky) {
      allure.tag('flaky');
    }
  }

  /**
   * Add custom issue/defect link
   * @param {string} issueId - Issue ID/number
   */
  static linkIssue(issueId) {
    allure.issue(issueId);
  }

  /**
   * Add test to test management system
   * @param {string} testCaseId - Test case ID in TMS
   */
  static linkTestCase(testCaseId) {
    allure.tms(testCaseId);
  }
}

export default AllureReporter;
