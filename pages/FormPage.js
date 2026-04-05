import BasePage from './BasePage.js';
import logger from '../utils/logger.js';

/**
 * FormPage - Page Object for User Information Form
 * Handles all interactions with the comprehensive form
 */
export class FormPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Form field selectors (using ID selectors for reliability)
    this.fullNameInput = '#fullName';
    this.emailInput = '#email';
    this.phoneInput = '#phone';
    this.addressInput = '#address';
    this.cityInput = '#city';
    this.stateInput = '#state';
    this.countryInput = '#country';
    this.zipCodeInput = '#zipCode';
    this.notesInput = '#notes';
    
    // Button selectors
    this.submitButton = '#submitBtn';
    this.viewSubmissionsButton = '#viewBtn';
    
    // Message selectors
    this.successMessage = '.alert-success';
    this.errorMessage = '.alert-error';
    this.formContainer = 'form';
  }

  /**
   * Navigate to the form page
   */
  async navigateToForm(baseURL = 'http://localhost:3000/') {
    logger.info('Navigating to form page');
    await this.goto(baseURL);
    await this.waitForFormToLoad();
  }

  /**
   * Wait for form to load
   */
  async waitForFormToLoad() {
    logger.info('Waiting for form to load');
    await this.waitForElement(this.fullNameInput);
  }

  /**
   * Fill full name field
   */
  async enterFullName(name) {
    logger.info(`Entering full name: ${name}`);
    await this.fillInput(this.fullNameInput, name);
  }

  /**
   * Fill email field
   */
  async enterEmail(email) {
    logger.info(`Entering email: ${email}`);
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Fill phone field
   */
  async enterPhone(phone) {
    logger.info(`Entering phone: ${phone}`);
    await this.fillInput(this.phoneInput, phone);
  }

  /**
   * Fill address field
   */
  async enterAddress(address) {
    logger.info(`Entering address: ${address}`);
    await this.fillInput(this.addressInput, address);
  }

  /**
   * Fill city field
   */
  async enterCity(city) {
    logger.info(`Entering city: ${city}`);
    await this.fillInput(this.cityInput, city);
  }

  /**
   * Fill state field
   */
  async enterState(state) {
    logger.info(`Entering state: ${state}`);
    await this.fillInput(this.stateInput, state);
  }

  /**
   * Fill country field
   */
  async enterCountry(country) {
    logger.info(`Entering country: ${country}`);
    await this.fillInput(this.countryInput, country);
  }

  /**
   * Fill zip code field
   */
  async enterZipCode(zipCode) {
    logger.info(`Entering zip code: ${zipCode}`);
    await this.fillInput(this.zipCodeInput, zipCode);
  }

  /**
   * Fill notes field
   */
  async enterNotes(notes) {
    logger.info(`Entering notes: ${notes}`);
    await this.fillInput(this.notesInput, notes);
  }

  /**
   * Fill complete form with all required and optional fields
   */
  async fillForm(fullName, email, phone, address, city, state, country, zipCode, notes = '') {
    logger.info('Filling complete form with all fields');
    await this.enterFullName(fullName);
    await this.enterEmail(email);
    await this.enterPhone(phone);
    await this.enterAddress(address);
    await this.enterCity(city);
    await this.enterState(state);
    await this.enterCountry(country);
    await this.enterZipCode(zipCode);
    if (notes) {
      await this.enterNotes(notes);
    }
  }

  /**
   * Submit form
   */
  async submitForm() {
    logger.info('Submitting form');
    await this.click(this.submitButton);
    // Wait for response to arrive
    await this.page.waitForTimeout(2000);
  }

  /**
   * View all submissions
   */
  async viewAllSubmissions() {
    logger.info('Viewing all submissions');
    await this.click(this.viewSubmissionsButton);
  }

  /**
   * Get success message
   */
  async getSuccessMessage() {
    logger.info('Getting success message');
    try {
      await this.waitForElement(this.successMessage, 5000);
      return await this.getText(this.successMessage);
    } catch (error) {
      logger.warn('Success message not found');
      return null;
    }
  }

  /**
   * Get error message
   */
  async getErrorMessage() {
    logger.info('Getting error message');
    try {
      await this.waitForElement(this.errorMessage, 5000);
      return await this.getText(this.errorMessage);
    } catch (error) {
      logger.warn('Error message not found');
      return null;
    }
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible() {
    logger.info('Checking if success message is visible');
    return await this.isElementVisible(this.successMessage);
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible() {
    logger.info('Checking if error message is visible');
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Get all form field values
   */
  async getFormValues() {
    logger.info('Getting form field values');
    const fullName = await this.page.inputValue(this.fullNameInput).catch(() => '');
    const email = await this.page.inputValue(this.emailInput).catch(() => '');
    const phone = await this.page.inputValue(this.phoneInput).catch(() => '');
    const address = await this.page.inputValue(this.addressInput).catch(() => '');
    const city = await this.page.inputValue(this.cityInput).catch(() => '');
    const state = await this.page.inputValue(this.stateInput).catch(() => '');
    const country = await this.page.inputValue(this.countryInput).catch(() => '');
    const zipCode = await this.page.inputValue(this.zipCodeInput).catch(() => '');
    const notes = await this.page.inputValue(this.notesInput).catch(() => '');
    
    return { fullName, email, phone, address, city, state, country, zipCode, notes };
  }

  /**
   * Submit form and wait for success
   */
  async submitFormAndWaitForSuccess(timeout = 15000) {
    logger.info('Submitting form and waiting for success message');
    await this.submitForm();
    await this.waitForElement(this.successMessage, timeout);
  }

  /**
   * Check if submit button is enabled
   */
  async isSubmitButtonEnabled() {
    logger.info('Checking if submit button is enabled');
    const isDisabled = await this.page.$eval(this.submitButton, (btn) => btn.disabled).catch(() => false);
    return !isDisabled;
  }

  /**
   * Clear all input fields
   */
  async clearAllInputs() {
    logger.info('Clearing all input fields');
    const inputs = await this.page.$$('input[type="text"], input[type="email"], input[type="tel"], textarea');
    
    for (const input of inputs) {
      await input.fill('');
    }
  }

  /**
   * Wait for form submission response
   */
  async waitForFormResponse(timeout = 15000) {
    logger.info('Waiting for form response');
    try {
      // Wait for either success or error message
      await Promise.race([
        this.waitForElement(this.successMessage, timeout),
        this.waitForElement(this.errorMessage, timeout),
      ]);
    } catch (error) {
      logger.warn('No success or error message appeared');
    }
  }

  /**
   * Reset form by clearing all fields
   */
  async resetForm() {
    logger.info('Resetting form');
    await this.clearAllInputs();
  }
}

export default FormPage;
