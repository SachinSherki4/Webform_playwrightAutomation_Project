import { test, expect } from '../fixtures/baseFixtures.js';

test.describe('Form Negative Scenarios - Validation Errors', () => {
  
  // FORM_NEG_001: Empty Full Name Field
  test('NEG_001 - Submit form without full name', async ({ page, logger }) => {
    logger.info('Test: NEG_001 - Empty full name field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Leave fullName empty, fill other required fields
    await formPageObj.fillForm(
      '',  // fullName - EMPTY
      'test@example.com',
      '+1 (555) 123-4567',
      '789 Test Street',
      'Test City',
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for empty full name field');
  });

  // FORM_NEG_002: Empty Email Field
  test('NEG_002 - Submit form without email', async ({ page, logger }) => {
    logger.info('Test: NEG_002 - Empty email field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Leave email empty, fill other required fields
    await formPageObj.fillForm(
      'John Doe',
      '',  // email - EMPTY
      '+1 (555) 123-4567',
      '789 Test Street',
      'Test City',
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for empty email field');
  });

  // FORM_NEG_003: Empty Phone Field
  test('NEG_003 - Submit form without phone', async ({ page, logger }) => {
    logger.info('Test: NEG_003 - Empty phone field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Leave phone empty, fill other required fields
    await formPageObj.fillForm(
      'John Doe',
      'john@example.com',
      '',  // phone - EMPTY
      '789 Test Street',
      'Test City',
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for empty phone field');
  });

  // FORM_NEG_004: All Fields Empty
  test('NEG_004 - Submit completely empty form', async ({ page, logger }) => {
    logger.info('Test: NEG_004 - All fields empty');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Submit without filling any field
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for all empty fields');
  });

  // FORM_NEG_005: Invalid Email (No @)
  test('NEG_005 - Submit form with invalid email (missing @)', async ({ page, logger }) => {
    logger.info('Test: NEG_005 - Invalid email format (no @)');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'John Doe',
      'invalidemail',  // Invalid email - no @
      '+1 (555) 123-4567',
      '789 Test Street',
      'Test City',
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser email validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for invalid email format');
  });

  // FORM_NEG_006: Invalid Email (Missing Domain)
  test('NEG_006 - Submit form with email missing domain', async ({ page, logger }) => {
    logger.info('Test: NEG_006 - Invalid email format (missing domain)');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'John Doe',
      'test@',  // Invalid email - missing domain
      '+1 (555) 123-4567',
      '789 Test Street',
      'Test City',
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser email validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for email with missing domain');
  });

  // FORM_NEG_007: Empty Address Field  
  test('NEG_007 - Submit form without address', async ({ page, logger }) => {
    logger.info('Test: NEG_007 - Empty address field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'John Doe',
      'john@example.com',
      '+1 (555) 123-4567',
      '',  // address - EMPTY
      'Test City',
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for empty address field');
  });

  // FORM_NEG_008: Empty City Field
  test('NEG_008 - Submit form without city', async ({ page, logger }) => {
    logger.info('Test: NEG_008 - Empty city field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'John Doe',
      'john@example.com',
      '+1 (555) 123-4567',
      '789 Test Street',
      '',  // city - EMPTY
      'TC',
      'United States',
      '12345',
      ''
    );
    
    // Try to submit - should be blocked by browser validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for empty city field');
  });

  // FORM_NEG_009: Empty Zip Code Field
  test('NEG_009 - Submit form without zip code', async ({ page, logger }) => {
    logger.info('Test: NEG_009 - Empty zip code field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'John Doe',
      'john@example.com',
      '+1 (555) 123-4567',
      '789 Test Street',
      'Test City',
      'TC',
      'United States',
      '',  // zipCode - EMPTY
      ''
    );
    
    // Try to submit - should be blocked by browser validation
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('Form validation blocked for empty zip code field');
  });
});
