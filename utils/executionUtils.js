/**
 * Test execution utilities
 */

import logger from './logger.js';

/**
 * Wait for element to be visible with logging
 */
export const waitForElementVisible = async (page, selector, timeout = 10000) => {
  logger.info(`Waiting for element to be visible: ${selector}`);
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout });
    logger.info(`Element visible: ${selector}`);
    return true;
  } catch (error) {
    logger.error(`Element not visible: ${selector}`);
    throw error;
  }
};

/**
 * Wait for network to be idle
 */
export const waitForNetworkIdle = async (page, timeout = 30000) => {
  logger.info('Waiting for network to be idle');
  try {
    await page.waitForLoadState('networkidle', { timeout });
    logger.info('Network idle');
  } catch (error) {
    logger.warn('Network idle timeout');
  }
};

/**
 * Take screenshot with timestamp
 */
export const takeTimestampedScreenshot = async (page, testName) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${testName}_${timestamp}`;
  
  logger.info(`Taking screenshot: ${fileName}`);
  await page.screenshot({ path: `./reports/artifacts/${fileName}.png` });
  return fileName;
};

/**
 * Retry logic for flaky tests
 */
export const retryAsync = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      logger.info(`Attempt ${i + 1} of ${retries}`);
      return await fn();
    } catch (error) {
      if (i === retries - 1) {
        logger.error(`Failed after ${retries} attempts: ${error.message}`);
        throw error;
      }
      logger.warn(`Attempt ${i + 1} failed, retrying in ${delay}ms: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Fill form and submit
 */
export const fillAndSubmitForm = async (formPageObj, name, email, phone) => {
  logger.info('Filling and submitting form');
  
  try {
    await formPageObj.fillForm(name, email, phone);
    logger.info('Form filled');
    
    await formPageObj.submitForm();
    logger.info('Form submitted');
    
    return true;
  } catch (error) {
    logger.error(`Error filling form: ${error.message}`);
    throw error;
  }
};

/**
 * Verify form response
 */
export const verifyFormResponse = async (formPageObj) => {
  logger.info('Verifying form response');
  
  try {
    const isSuccess = await formPageObj.isSuccessMessageVisible();
    const isError = await formPageObj.isErrorMessageVisible();
    
    const result = {
      isSuccess,
      isError,
      message: isSuccess ? await formPageObj.getSuccessMessage() : 
               isError ? await formPageObj.getErrorMessage() : null,
    };
    
    logger.info(`Form response: ${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    logger.error(`Error verifying response: ${error.message}`);
    throw error;
  }
};

/**
 * Get all console messages
 */
export const getConsoleMessages = async (page) => {
  const messages = [];
  
  page.on('console', (msg) => {
    messages.push({
      type: msg.type(),
      text: msg.text(),
      args: msg.args().length,
    });
  });
  
  return messages;
};

/**
 * Get network requests
 */
export const recordNetworkRequests = async (page) => {
  const requests = [];
  
  page.on('request', (request) => {
    requests.push({
      method: request.method(),
      url: request.url(),
      postData: request.postData(),
    });
  });
  
  return requests;
};

export const executionUtils = {
  waitForElementVisible,
  waitForNetworkIdle,
  takeTimestampedScreenshot,
  retryAsync,
  fillAndSubmitForm,
  verifyFormResponse,
  getConsoleMessages,
  recordNetworkRequests,
};

export default executionUtils;
