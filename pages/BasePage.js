import logger from '../utils/logger.js';

/**
 * BasePage - Base class for all page objects
 * Provides common functionality for all pages
 */
export class BasePage {
  constructor(page) {
    this.page = page;
    this.logger = logger;
  }

  /**
   * Navigate to a URL
   */
  async goto(url) {
    this.logger.info(`Navigating to ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Get page title
   */
  async getTitle() {
    const title = await this.page.title();
    this.logger.info(`Page title: ${title}`);
    return title;
  }

  /**
   * Get page URL
   */
  async getCurrentURL() {
    const url = this.page.url();
    this.logger.info(`Current URL: ${url}`);
    return url;
  }

  /**
   * Fill input field
   */
  async fillInput(selector, value) {
    this.logger.info(`Filling input "${selector}" with value: ${value}`);
    await this.page.fill(selector, value);
  }

  /**
   * Click element
   */
  async click(selector) {
    this.logger.info(`Clicking element: ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Get text content
   */
  async getText(selector) {
    const text = await this.page.textContent(selector);
    this.logger.info(`Text content from "${selector}": ${text}`);
    return text;
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector) {
    const visible = await this.page.isVisible(selector);
    this.logger.info(`Element "${selector}" visible: ${visible}`);
    return visible;
  }

  /**
   * Wait for element
   */
  async waitForElement(selector, timeout = 10000) {
    this.logger.info(`Waiting for element: ${selector}`);
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element exists
   */
  async elementExists(selector) {
    const element = await this.page.$(selector);
    return element !== null;
  }

  /**
   * Get all text from page
   */
  async getPageText() {
    return await this.page.textContent('body');
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName) {
    this.logger.info(`Taking screenshot: ${fileName}`);
    await this.page.screenshot({ path: `./reports/artifacts/${fileName}.png` });
  }

  /**
   * Reload page
   */
  async reload() {
    this.logger.info('Reloading page');
    await this.page.reload();
  }

  /**
   * Clear all input fields (for cleanup)
   */
  async clearAllInputs() {
    this.logger.info('Clearing all input fields');
    const inputs = await this.page.$$('input[type="text"], input[type="email"], input[type="tel"]');
    
    for (const input of inputs) {
      await input.fill('');
    }
  }
}

export default BasePage;
