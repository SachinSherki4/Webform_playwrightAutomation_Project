import { faker } from '@faker-js/faker';

/**
 * Generate valid test data for complete form
 */
export const generateValidFormData = () => {
  return {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number('(###) ###-####'),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    country: 'United States',
    zipCode: faker.location.zipCode('#####'),
    notes: faker.lorem.sentence(),
  };
};

/**
 * Generate minimal valid form data (required fields only)
 */
export const generateMinimalFormData = () => {
  return {
    fullName: faker.person.firstName(),
    email: faker.internet.email(),
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    zipCode: '10001',
  };
};

/**
 * Generate invalid email addresses
 */
export const getInvalidEmails = () => {
  return [
    'invalidemail',
    'test@',
    '@example.com',
    'test@example',
    'test test@example.com',
    'test..email@example.com',
    'test@.example.com',
    '',
  ];
};

/**
 * Generate invalid phone numbers
 */
export const getInvalidPhones = () => {
  return [
    '123',
    'abc',
    '!@#$%',
    '123-456',
    '(123) 456',
    '+1234567890000',
    '',
  ];
};

/**
 * Generate invalid names
 */
export const getInvalidNames = () => {
  return [
    '',
    '123456',
    '!@#$%^&*()',
    'a'.repeat(500),
  ];
};

/**
 * Generate special characters inputs
 */
export const getSpecialCharacterInputs = () => {
  return [
    '!@#$%^&*()',
    '<script>alert("XSS")</script>',
    '"; DROP TABLE users; --',
    '${alert("XSS")}',
    `' OR '1'='1`,
  ];
};

/**
 * Generate boundary test data
 */
export const getBoundaryTestData = () => {
  return {
    maxLengthName: 'a'.repeat(255),
    maxLengthEmail: 'a'.repeat(60) + '@example.com',
    minLengthName: 'A',
    minLengthEmail: 'a@b.co',
    specialName: "O'Brien",
    specialEmail: "test+tag@example.com",
  };
};

/**
 * Generate duplicate submission data
 */
export const generateDuplicateSubmissionData = () => {
  return {
    fullName: 'John Duplicate',
    email: 'duplicate@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    zipCode: '10001',
  };
};

export const testDataGenerator = {
  validFormData: generateValidFormData,
  minimalFormData: generateMinimalFormData,
  invalidEmails: getInvalidEmails,
  invalidPhones: getInvalidPhones,
  invalidNames: getInvalidNames,
  specialCharacters: getSpecialCharacterInputs,
  boundaryData: getBoundaryTestData,
  duplicateData: generateDuplicateSubmissionData,
};

export default testDataGenerator;
