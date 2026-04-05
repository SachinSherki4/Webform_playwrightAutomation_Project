import { test, expect } from '../fixtures/baseFixtures.js';

test.describe('Form Edge Case Scenarios', () => {
  
  // FORM_EDGE_001: Minimum Length Name
  test('EDGE_001 - Submit form with single character name', async ({ page, logger }) => {
    logger.info('Test: EDGE_001 - Single character name');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('A', 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Single character name result: ${isSuccess ? 'success' : 'failed'}`);
    expect(isSuccess).toBeTruthy();
  });

  // FORM_EDGE_002: Maximum Length Name
  test('EDGE_002 - Submit form with maximum length name (255 chars)', async ({ page, logger }) => {
    logger.info('Test: EDGE_002 - Maximum length name');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const longName = 'A'.repeat(255);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm(longName, 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    // May accept or reject depending on server-side validation
    logger.info(`Long name (255 chars) submission attempted`);
  });

  // FORM_EDGE_003: Name with Hyphen
  test('EDGE_003 - Submit form with hyphenated name', async ({ page, logger }) => {
    logger.info('Test: EDGE_003 - Hyphenated name');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('Jean-Pierre Dupont', 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    expect(isSuccess).toBeTruthy();
    logger.info('Hyphenated name accepted');
  });

  // FORM_EDGE_004: Name with Multiple Spaces
  test('EDGE_004 - Submit form with multiple spaces in name', async ({ page, logger }) => {
    logger.info('Test: EDGE_004 - Multiple spaces in name');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('John    Doe', 'test@example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Multiple spaces in name result: ${isSuccess ? 'success' : 'failed'}`);
  });

  // FORM_EDGE_005: Email with Subdomain
  test('EDGE_005 - Submit form with email containing subdomain', async ({ page, logger }) => {
    logger.info('Test: EDGE_005 - Email with subdomain');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('John Doe', 'test@mail.subdomain.example.com', '+1 (555) 123-4567', '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Email with subdomain result: ${isSuccess ? 'success' : 'failed'}`);
    expect(isSuccess).toBeTruthy();
  });

  // FORM_EDGE_006: Phone with Various Formats
  test('EDGE_006 - Submit form with different phone formats', async ({ page, logger }) => {
    logger.info('Test: EDGE_006 - Different phone formats');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    const phoneFormats = [
      '555-123-4567',
      '(555) 123-4567',
      '5551234567',
      '+1 555 123 4567',
    ];

    for (const phoneFormat of phoneFormats) {
      await formPageObj.navigateToForm('http://localhost:3000/');
      
      await formPageObj.fillForm('John Doe', 'test@example.com', phoneFormat, '123 Test St', 'Test City', 'TC', 'United States', '12345', '');
      await formPageObj.submitForm();

      const isSuccess = await formPageObj.isSuccessMessageVisible();
      logger.info(`Phone format "${phoneFormat}" result: ${isSuccess ? 'success' : 'failed'}`);
      
      // Clear for next iteration
      await formPageObj.resetForm();
    }
  });

  // FORM_EDGE_007: Leading and Trailing Whitespace
  test('EDGE_007 - Submit form with leading and trailing whitespace', async ({ page, logger }) => {
    logger.info('Test: EDGE_007 - Leading/trailing whitespace');

    const { FormPage } = await import('../pages/FormPage.js');
    const formPageObj = new FormPage(page);

    await formPageObj.navigateToForm('http://localhost:3000/');
    
    await formPageObj.fillForm('  John Doe  ', '  test@example.com  ', '  +1 (555) 123-4567  ', '  123 Test St  ', '  Test City  ', '  TC  ', '  United States  ', '  12345  ', '  notes  ');
    await formPageObj.submitForm();

    const isSuccess = await formPageObj.isSuccessMessageVisible();
    logger.info(`Whitespace trimming result: ${isSuccess ? 'success' : 'failed'}`);
  });
});
