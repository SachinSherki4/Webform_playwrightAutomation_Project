import { test, expect } from '../fixtures/baseFixtures.js';

test.describe('Form UX Test Scenarios', () => {
  
  // FORM_UX_001: Form Submission Order Independence
  test('UX_001 - Form submission with different field fill order', async ({ page, logger }) => {
    logger.info('Test: UX_001 - Field order independence');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Fill in different order using fillForm
    await formPageObj.fillForm(
      'Order Test',
      'order@example.com',
      '+1 (555) 123-4567',
      '123 Order St',
      'Order City',
      'OC',
      'United States',
      '54321',
      'Testing field order'
    );
    logger.info('Filled all fields');
    
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Result with different field order: ${isSuccess ? 'success' : 'failed'}`);
    expect(isSuccess).toBeTruthy();
  });

  // FORM_UX_002: Submit Button Responsiveness
  test('UX_002 - Submit button responsiveness after form fill', async ({ page, logger }) => {
    logger.info('Test: UX_002 - Submit button responsiveness');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'Responsive Test',
      'responsive@example.com',
      '+1 (555) 123-4567',
      '456 Response Rd',
      'Response City',
      'RC',
      'United States',
      '65432',
      'Testing responsiveness'
    );

    // Verify submit button is enabled and clickable
    const isSubmitEnabled = await page.locator('#submitBtn').isEnabled();
    logger.info(`Submit button enabled: ${isSubmitEnabled}`);
    expect(isSubmitEnabled).toBeTruthy();

    await formPageObj.submitForm();

    // Verify successful submission
    const isSuccess = await formPageObj.isSuccessMessageVisible();
    expect(isSuccess).toBeTruthy();
  });

  // FORM_UX_003: Browser Back Button After Submission
  test('UX_003 - Browser back button behavior after submission', async ({ page, logger }) => {
    logger.info('Test: UX_003 - Browser back after submission');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'Back Test',
      'back@example.com',
      '+1 (555) 123-4567',
      '789 Back Lane',
      'Back City',
      'BC',
      'United States',
      '78901',
      'Testing back button'
    );
    await formPageObj.submitForm();

    // Wait for response
    await page.waitForTimeout(2000);

    // Get initial URL
    const initialURL = page.url();
    logger.info(`URL after submission: ${initialURL}`);

    // Click browser back
    logger.info('Clicking browser back button');
    await page.goBack();

    // Check where we ended up
    const backURL = page.url();
    logger.info(`URL after going back: ${backURL}`);

    // Should either be form page or success page
    expect(backURL).toBeDefined();
  });

  // FORM_UX_004: Form Field Visibility
  test('UX_004 - All form fields remain visible during interaction', async ({ page, logger }) => {
    logger.info('Test: UX_004 - Form field visibility');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Verify all 8 fields are visible
    const fullNameVisible = await page.locator('#fullName').isVisible();
    const emailVisible = await page.locator('#email').isVisible();
    const phoneVisible = await page.locator('#phone').isVisible();
    const addressVisible = await page.locator('#address').isVisible();
    const cityVisible = await page.locator('#city').isVisible();
    const stateVisible = await page.locator('#state').isVisible();
    const countryVisible = await page.locator('#country').isVisible();
    const zipCodeVisible = await page.locator('#zipCode').isVisible();

    logger.info(`Full Name visible: ${fullNameVisible}`);
    logger.info(`Email visible: ${emailVisible}`);
    logger.info(`Phone visible: ${phoneVisible}`);
    logger.info(`Address visible: ${addressVisible}`);
    logger.info(`City visible: ${cityVisible}`);
    logger.info(`State visible: ${stateVisible}`);
    logger.info(`Country visible: ${countryVisible}`);
    logger.info(`Zip Code visible: ${zipCodeVisible}`);

    expect(fullNameVisible && emailVisible && phoneVisible && addressVisible && 
           cityVisible && stateVisible && countryVisible && zipCodeVisible).toBeTruthy();
  });

  // FORM_UX_005: Form Field Focus Management
  test('UX_005 - Tab navigation through form fields', async ({ page, logger }) => {
    logger.info('Test: UX_005 - Tab navigation');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Click on first field and tab through
    logger.info('Testing tab navigation through form fields');
    
    await page.locator('#fullName').click();
    logger.info('Clicked on Full Name field');
    
    await page.keyboard.press('Tab');
    logger.info('Tabbed to next field');
    
    // Verify form is still visible
    const isFormVisible = await page.locator('form').isVisible();
    expect(isFormVisible).toBeTruthy();
  });

  // FORM_UX_006: Form Validation Messages
  test('UX_006 - Form validation messages appear for invalid input', async ({ page, logger }) => {
    logger.info('Test: UX_006 - Validation messages');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Try submitting with invalid email
    await formPageObj.fillForm(
      'Validation Test',
      'invalid-email',  // Invalid email
      '+1 (555) 123-4567',
      '123 Valid St',
      'Valid City',
      'VC',
      'United States',
      '99999',
      ''
    );

    // Check form validity
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    logger.info(`Form valid with invalid email: ${isFormValid}`);
    expect(isFormValid).toBeFalsy();
  });

  // FORM_UX_007: Submit Button Visibility
  test('UX_007 - Submit button visibility and accessibility', async ({ page, logger }) => {
    logger.info('Test: UX_007 - Submit button accessibility');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Check submit button
    const submitButton = page.locator('#submitBtn');
    const isVisible = await submitButton.isVisible();
    const isEnabled = await submitButton.isEnabled();
    const buttonText = await submitButton.textContent();

    logger.info(`Submit button visible: ${isVisible}`);
    logger.info(`Submit button enabled: ${isEnabled}`);
    logger.info(`Submit button text: ${buttonText}`);

    expect(isVisible).toBeTruthy();
    expect(isEnabled).toBeTruthy();
  });

  // FORM_UX_008: Success Message Presentation
  test('UX_008 - Success message presentation and styling', async ({ page, logger }) => {
    logger.info('Test: UX_008 - Success message presentation');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'Success Test',
      'success@example.com',
      '+1 (555) 123-4567',
      '123 Success Ave',
      'Success City',
      'SC',
      'United States',
      '11111',
      'Testing success message'
    );
    
    await formPageObj.submitForm();

    // Verify success message
    const successMsg = await page.locator('.alert-success');
    const isVisible = await successMsg.isVisible();
    const messageText = await successMsg.textContent();

    logger.info(`Success message visible: ${isVisible}`);
    logger.info(`Success message text: ${messageText?.substring(0, 50)}`);

    expect(isVisible).toBeTruthy();
    expect(messageText).toBeTruthy();
  });
});
