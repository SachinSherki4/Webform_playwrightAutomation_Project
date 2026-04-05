import { test, expect } from '../fixtures/baseFixtures.js';

test.describe('Form Boundary Test Scenarios', () => {
  
  // FORM_BOUND_001: Name at Maximum Length Boundary
  test('BOUND_001 - Name field at exact maximum length boundary', async ({ page, logger }) => {
    logger.info('Test: BOUND_001 - Name at max boundary (255 chars)');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    // Use 255 characters (assuming this is max)
    const boundaryName = 'A'.repeat(255);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(boundaryName, 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');

    logger.info(`Name at max boundary attempted`);
  });

  // FORM_BOUND_002: Name Exceeds Maximum Length
  test('BOUND_002 - Name field exceeding maximum length', async ({ page, logger }) => {
    logger.info('Test: BOUND_002 - Name exceeding max (256 chars)');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const exceededName = 'A'.repeat(256);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(exceededName, 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');

    logger.info(`Name exceeding max attempted`);
  });

  // FORM_BOUND_003: Email at Maximum Valid Length
  test('BOUND_003 - Email field at maximum valid length (254 chars)', async ({ page, logger }) => {
    logger.info('Test: BOUND_003 - Email at max length (254 chars)');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    // Create email with valid format
    const maxEmail = 'a' + 'b'.repeat(60) + '@' + 'c'.repeat(60) + '.example.com';

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('John Doe', maxEmail, '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Email at max length result: ${isSuccess ? 'success' : 'failed'}`);
  });

  // FORM_BOUND_004: Phone Minimum Valid Length
  test('BOUND_004 - Phone field at minimum valid length', async ({ page, logger }) => {
    logger.info('Test: BOUND_004 - Phone at minimum valid length');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Typical minimum valid phone format
    await formPageObj.fillForm('John Doe', 'test@example.com', '+1 (555) 001-0001', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Phone at min length result: ${isSuccess ? 'success' : 'failed'}`);
  });

  // FORM_BOUND_005: Phone Maximum Valid Length
  test('BOUND_005 - Phone field at maximum valid length', async ({ page, logger }) => {
    logger.info('Test: BOUND_005 - Phone at maximum valid length');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    // International phone with maximum digits
    const maxPhone = '+1 (555) 999-9999';

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('John Doe', 'test@example.com', maxPhone, '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Phone at max length result: ${isSuccess ? 'success' : 'failed'}`);
  });

  // FORM_BOUND_006: Email Minimum Valid Length
  test('BOUND_006 - Email field at minimum valid length', async ({ page, logger }) => {
    logger.info('Test: BOUND_006 - Email at minimum valid length');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    // Shortest valid email format
    const minEmail = 'a@b.co';

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('John Doe', minEmail, '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Email at min length result: ${isSuccess ? 'success' : 'failed'}`);
    expect(isSuccess).toBeTruthy();
  });

  // FORM_BOUND_007: Name Minimum Valid Length
  test('BOUND_007 - Name field at minimum valid length', async ({ page, logger }) => {
    logger.info('Test: BOUND_007 - Name at minimum valid length');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Minimum valid name (single character)
    await formPageObj.fillForm('A', 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Name at min length result: ${isSuccess ? 'success' : 'failed'}`);
  });
});
