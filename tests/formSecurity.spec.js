import { test, expect } from '../fixtures/baseFixtures.js';

test.describe('Form Security Test Scenarios', () => {
  
  // FORM_SEC_001: XSS Attempt in Name Field
  test('SEC_001 - XSS attempt in name field with script tag', async ({ page, logger }) => {
    logger.info('Test: SEC_001 - XSS attempt in name field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const maliciousData = {
      fullName: "<script>alert('XSS')</script>",
      email: 'test@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Test St',
      city: 'Test City',
      state: 'TC',
      country: 'United States',
      zipCode: '12345',
      notes: 'XSS test'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Set up to track if alert is called
    let alertTriggered = false;
    page.on('dialog', async (dialog) => {
      alertTriggered = true;
      await dialog.dismiss();
    });

    await formPageObj.fillForm(
      maliciousData.fullName,
      maliciousData.email,
      maliciousData.phone,
      maliciousData.address,
      maliciousData.city,
      maliciousData.state,
      maliciousData.country,
      maliciousData.zipCode,
      maliciousData.notes
    );
    await formPageObj.submitForm();

    // Verify XSS was not executed
    expect(alertTriggered).toBeFalsy();

    logger.info('XSS attempt in name field prevented');
  });

  // FORM_SEC_002: SQL Injection in Email Field
  test('SEC_002 - SQL injection attempt in email field', async ({ page, logger }) => {
    logger.info('Test: SEC_002 - SQL injection in email');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const injectionData = {
      fullName: 'John Doe',
      email: "test'; DROP TABLE users; --@example.com",
      phone: '+1 (555) 123-4567',
      address: '123 Test St',
      city: 'Test City',
      state: 'TC',
      country: 'United States',
      zipCode: '12345',
      notes: 'SQL injection test'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      injectionData.fullName,
      injectionData.email,
      injectionData.phone,
      injectionData.address,
      injectionData.city,
      injectionData.state,
      injectionData.country,
      injectionData.zipCode,
      injectionData.notes
    );
    
    // Email validation should catch this bad email format
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    logger.info('SQL injection attempt in email field blocked by validation');
  });

  // FORM_SEC_003: SQL Injection in Name Field
  test('SEC_003 - SQL injection attempt in name field', async ({ page, logger }) => {
    logger.info('Test: SEC_003 - SQL injection in name');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const injectionData = {
      fullName: '" OR "1"="1',
      email: 'test@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Test St',
      city: 'Test City',
      state: 'TC',
      country: 'United States',
      zipCode: '12345',
      notes: 'SQL test'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      injectionData.fullName,
      injectionData.email,
      injectionData.phone,
      injectionData.address,
      injectionData.city,
      injectionData.state,
      injectionData.country,
      injectionData.zipCode,
      injectionData.notes
    );
    await formPageObj.submitForm();

    // Should safely handle injection attempt
    const isSuccess = await formPageObj.isSuccessMessageVisible();
    expect(isSuccess).toBeTruthy();

    logger.info('SQL injection in name field safely handled');
  });

  // FORM_SEC_004: XSS in Email Field
  test('SEC_004 - XSS attempt in email field with HTML event handler', async ({ page, logger }) => {
    logger.info('Test: SEC_004 - XSS attempt in email field');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const xssData = {
      fullName: 'John Doe',
      email: "test<img src=x onerror=alert('XSS')>@example.com",
      phone: '+1 (555) 123-4567',
      address: '123 Test St',
      city: 'Test City',
      state: 'TC',
      country: 'United States',
      zipCode: '12345',
      notes: 'XSS email test'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    let alertTriggered = false;
    page.on('dialog', async (dialog) => {
      alertTriggered = true;
      await dialog.dismiss();
    });

    await formPageObj.fillForm(
      xssData.fullName,
      xssData.email,
      xssData.phone,
      xssData.address,
      xssData.city,
      xssData.state,
      xssData.country,
      xssData.zipCode,
      xssData.notes
    );
    
    // Email format should be invalid due to bad characters
    const isFormValid = await page.locator('form').evaluate(form => form.checkValidity());
    expect(isFormValid).toBeFalsy();

    // Verify XSS was not executed
    expect(alertTriggered).toBeFalsy();

    logger.info('XSS attempt in email field prevented by validation');
  });

  // FORM_SEC_005: Input Sanitization Check
  test('SEC_005 - Input sanitization verification', async ({ page, logger }) => {
    logger.info('Test: SEC_005 - Input sanitization');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: '<b>John</b> Doe',
      email: 'john+test@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Test St',
      city: 'Test City',
      state: 'TC',
      country: 'United States',
      zipCode: '12345',
      notes: 'Sanitization <script>test</script>'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    let alertTriggered = false;
    page.on('dialog', async (dialog) => {
      alertTriggered = true;
      await dialog.dismiss();
    });

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
    await formPageObj.submitForm();

    // Verify that special characters are properly handled
    const isSuccess = await formPageObj.isSuccessMessageVisible();
    expect(isSuccess).toBeTruthy();
    expect(alertTriggered).toBeFalsy();

    logger.info('Input sanitization verified');
  });
});
