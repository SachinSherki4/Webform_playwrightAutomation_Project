import { test, expect } from '../fixtures/baseFixtures.js';
import * as allure from 'allure-playwright';

test.describe('Form Positive Scenarios - Valid Submissions', () => {
  let formPage;

  test.beforeEach(async ({ page }) => {
    formPage = page;
  });

  // FORM_POS_001: Valid Form Submission
  test('POS_001 - Submit form with valid data', async ({ page, validFormData, logger, allure: allureReporter }) => {
    // Set Allure properties
    allure.parameter('Test Name', 'POS_001');
    allure.parameter('Test Type', 'Positive Scenario');
    allure.feature('Form Submission');
    allure.story('Valid Form Submission');
    allure.severity('critical');
    allure.tag('positive');
    allure.tag('form-submission');
    allure.description('Test verifies that form accepts valid data and displays success message');
    allure.link('http://localhost:3000/', 'Form URL');

    logger.info('Test: POS_001 - Submit form with valid data');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    // Step 1: Navigate to form
    await allure.step('Navigate to form page', async () => {
      await formPageObj.navigateToForm('http://localhost:3000/');
      logger.info('Navigated to form page');
      await allureReporter.attachScreenshot(page, 'Form Page Loaded');
    });

    // Step 2: Attach test data
    await allure.step('Attach test data', async () => {
      allureReporter.attachTestData(validFormData, 'Form Input Data');
    });

    // Step 3: Fill form
    await allure.step('Fill form with all required fields', async () => {
      await formPageObj.fillForm(
        validFormData.fullName,
        validFormData.email,
        validFormData.phone,
        validFormData.address,
        validFormData.city,
        validFormData.state,
        validFormData.country,
        validFormData.zipCode,
        validFormData.notes
      );
      logger.info(`Form filled with all 8 fields`);
      await allureReporter.attachScreenshot(page, 'Form After Filling');
    });

    // Step 4: Submit form
    await allure.step('Submit form', async () => {
      await formPageObj.submitForm();
      logger.info('Form submitted');
      await allureReporter.attachScreenshot(page, 'Form Submission');
    });

    // Step 5: Verify success
    await allure.step('Verify success message is displayed', async () => {
      const isSuccess = await formPageObj.isSuccessMessageVisible();
      expect(isSuccess).toBeTruthy();
      await allureReporter.attachScreenshot(page, 'Success Message Visible');

      const successMessage = await formPageObj.getSuccessMessage();
      logger.info(`Success message: ${successMessage}`);
      expect(successMessage).toBeTruthy();
      allure.parameter('Success Message', successMessage);
    });
  });

  // FORM_POS_002: Valid Submit with Special Characters in Name
  test('POS_002 - Submit form with special characters in name (apostrophe)', async ({ page, logger, allure: allureReporter }) => {
    allure.parameter('Test Name', 'POS_002');
    allure.feature('Form Submission');
    allure.story('Special Character Handling');
    allure.severity('high');
    allure.tag('positive');
    allure.tag('special-characters');
    allure.description('Test verifies form accepts names with apostrophes');

    logger.info('Test: POS_002 - Submit form with special characters in name');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: "O'Brien",
      email: 'obrien@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Oak Lane',
      city: 'Boston',
      state: 'MA',
      country: 'United States',
      zipCode: '02101',
      notes: 'Test with special characters'
    };

    await allure.step('Navigate and prepare form', async () => {
      await formPageObj.navigateToForm('http://localhost:3000/');
      allureReporter.attachTestData(testData, 'Test Data');
    });

    await allure.step('Fill form with special characters', async () => {
      await formPageObj.fillForm(
        testData.fullName,
        testData.email,
        testData.phone,
        testData.address,
        testData.city,
        testData.state,
        testData.country,
        testData.zipCode,
        testData.notes
      );
      await allureReporter.attachScreenshot(page, 'Form with Special Characters');
    });

    await allure.step('Submit and verify', async () => {
      await formPageObj.submitForm();
      const isSuccess = await formPageObj.isSuccessMessageVisible();
      expect(isSuccess).toBeTruthy();
      logger.info('Form with special characters accepted');
      await allureReporter.attachScreenshot(page, 'Success');
    });
  });

  // FORM_POS_003: Valid Submit with Plus Sign in Email
  test('POS_003 - Submit form with email containing plus sign', async ({ page, logger, allure: allureReporter }) => {
    allure.parameter('Test Name', 'POS_003');
    allure.feature('Form Submission');
    allure.story('Email Validation');
    allure.severity('high');
    allure.tag('positive');
    allure.tag('email-validation');
    allure.description('Test verifies form accepts email addresses with plus signs (plus addressing)');

    logger.info('Test: POS_003 - Submit form with plus sign in email');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: 'Jane Doe',
      email: 'jane+test@example.com',
      phone: '+1 (555) 789-0123',
      address: '456 Maple Road',
      city: 'Seattle',
      state: 'WA',
      country: 'United States',
      zipCode: '98101',
      notes: 'Email with plus sign'
    };

    await allure.step('Navigate and setup', async () => {
      await formPageObj.navigateToForm('http://localhost:3000/');
      allureReporter.attachTestData(testData, 'Test Data with Plus Email');
    });

    await allure.step('Fill form', async () => {
      await formPageObj.fillForm(
        testData.fullName,
        testData.email,
        testData.phone,
        testData.address,
        testData.city,
        testData.state,
        testData.country,
        testData.zipCode,
        testData.notes
      );
      await allureReporter.attachScreenshot(page, 'Form with Plus Email');
    });

    await allure.step('Submit and verify', async () => {
      await formPageObj.submitForm();
      const isSuccess = await formPageObj.isSuccessMessageVisible();
      expect(isSuccess).toBeTruthy();
      logger.info('Form with plus sign in email accepted');
      await allureReporter.attachScreenshot(page, 'Success');
    });
  });

  // FORM_POS_004: Form Reset
  test('POS_004 - Form reset clears all fields', async ({ page, logger, allure: allureReporter }) => {
    allure.parameter('Test Name', 'POS_004');
    allure.feature('Form Interactions');
    allure.story('Form Reset Functionality');
    allure.severity('normal');
    allure.tag('positive');
    allure.tag('form-reset');
    allure.description('Test verifies reset button clears all form fields');

    logger.info('Test: POS_004 - Form reset');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Test Street',
      city: 'Test City',
      state: 'TC',
      country: 'United States',
      zipCode: '12345',
      notes: 'Test notes'
    };

    await allure.step('Navigate to form', async () => {
      await formPageObj.navigateToForm('http://localhost:3000/');
      await allureReporter.attachScreenshot(page, 'Initial Form');
    });

    await allure.step('Fill all form fields', async () => {
      await formPageObj.fillForm(
        testData.fullName,
        testData.email,
        testData.phone,
        testData.address,
        testData.city,
        testData.state,
        testData.country,
        testData.zipCode,
        testData.notes
      );
      await allureReporter.attachScreenshot(page, 'Form Filled');
    });

    await allure.step('Verify fields contain data before reset', async () => {
      let values = await formPageObj.getFormValues();
      expect(values.fullName).toBe(testData.fullName);
      expect(values.email).toBe(testData.email);
      expect(values.phone).toBe(testData.phone);
      allure.parameter('Full Name Before Reset', values.fullName);
      allure.parameter('Email Before Reset', values.email);
    });

    await allure.step('Click reset button', async () => {
      await formPageObj.resetForm();
      logger.info('Reset button clicked');
      await allureReporter.attachScreenshot(page, 'Form After Reset');
    });

    await allure.step('Verify all fields are cleared', async () => {
      const values = await formPageObj.getFormValues();
      expect(values.fullName).toBe('');
      expect(values.email).toBe('');
      expect(values.phone).toBe('');
      logger.info('All fields cleared after reset');
      allure.parameter('Full Name After Reset', values.fullName);
      allure.parameter('Email After Reset', values.email);
    });
  });
});
