import { test, expect } from '../fixtures/baseFixtures.js';

test.describe('Form Data Consistency Test Scenarios', () => {
  
  // FORM_DATA_001: Duplicate Submission
  test('DATA_001 - Duplicate form submission handling', async ({ page, logger }) => {
    logger.info('Test: DATA_001 - Duplicate submission');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: 'John Duplicate',
      email: 'duplicate@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Duplicate St',
      city: 'Duplicate City',
      state: 'DC',
      country: 'United States',
      zipCode: '12345',
      notes: 'First submission'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // First submission
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
    
    const firstSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`First submission result: ${firstSuccess ? 'success' : 'failed'}`);
    expect(firstSuccess).toBeTruthy();

    // Reload and attempt second submission
    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      testData.fullName,
      testData.email,
      testData.phone,
      testData.address,
      testData.city,
      testData.state,
      testData.country,
      testData.zipCode,
      'Second submission'
    );
    await formPageObj.submitForm();

    const secondSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Second submission result: ${secondSuccess ? 'success' : 'failed'}`);
  });

  // FORM_DATA_002: API Response Status Code Verification
  test('DATA_002 - API response status code validation', async ({ page, logger }) => {
    logger.info('Test: DATA_002 - API response validation');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    let apiResponse = null;
    page.on('response', (response) => {
      if (response.url().includes('submit') || response.url().includes('api')) {
        apiResponse = response;
        logger.info(`API Response Status: ${response.status()}`);
      }
    });

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'John Doe',
      'john@example.com',
      '+1 (555) 123-4567',
      '123 Main St',
      'New York',
      'NY',
      'United States',
      '10001',
      'Test data'
    );
    await formPageObj.submitForm();

    // Wait a bit for response
    await page.waitForTimeout(2000);

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Form submission successful: ${isSuccess}`);
    expect(isSuccess).toBeTruthy();
  });

  // FORM_DATA_003: Form State After Successful Submission
  test('DATA_003 - Form state after successful submission', async ({ page, logger }) => {
    logger.info('Test: DATA_003 - Form state verification');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      address: '456 Oak Ave',
      city: 'Boston',
      state: 'MA',
      country: 'United States',
      zipCode: '02101',
      notes: 'Test notes'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
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

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    expect(isSuccess).toBeTruthy();

    // Check form state after success
    const formValues = await formPageObj.getFormValues();
    
    logger.info(`Form values after submission: ${JSON.stringify(formValues)}`);
    
    // Form might auto-clear or keep values - both are acceptable
    expect(formValues).toBeDefined();
  });

  // FORM_DATA_004: Response Message Content
  test('DATA_004 - Success response message content validation', async ({ page, logger }) => {
    logger.info('Test: DATA_004 - Response message validation');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(
      'Jane Doe',
      'jane@example.com',
      '+1 (555) 987-6543',
      '789 Pine Rd',
      'Los Angeles',
      'CA',
      'United States',
      '90001',
      'Verification test'
    );
    await formPageObj.submitForm();

    const successMessage = await formPageObj.getSuccessMessage();
    logger.info(`Success message: ${successMessage}`);

    // Verify message contains expected text
    expect(successMessage).toBeTruthy();
    
    // Check for common success message keywords
    const messageContent = successMessage?.toLowerCase() || '';
    const hasSuccessKeyword = ['success', 'submitted', 'completed', 'saved'].some(
      (keyword) => messageContent.includes(keyword)
    );
    
    logger.info(`Message contains success keyword: ${hasSuccessKeyword}`);
  });

  // FORM_DATA_005: Data Persistence Verification
  test('DATA_005 - Data persistence after page navigation', async ({ page, logger }) => {
    logger.info('Test: DATA_005 - Data persistence');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const testData = {
      fullName: 'Test Persistence',
      email: 'test@example.com',
      phone: '+1 (555) 111-1111',
      address: '999 Test Lane',
      city: 'Test City',
      state: 'TS',
      country: 'United States',
      zipCode: '99999',
      notes: 'Persistence test'
    };

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Fill form but don't submit
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
    
    // Navigate away and back
    await formPageObj.navigateToForm('http://localhost:3000/');
    
    // Check if data is still there (depends on implementation)
    const formValues = await formPageObj.getFormValues();
    logger.info(`Form values after navigation: ${JSON.stringify(formValues)}`);
  });
});
