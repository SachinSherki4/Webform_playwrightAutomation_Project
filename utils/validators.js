/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone validation (US format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Name validation
 */
export const isValidName = (name) => {
  if (!name || name.trim().length === 0) return false;
  if (name.length < 2 || name.length > 255) return false;
  // Allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name);
};

/**
 * Check for empty fields
 */
export const hasEmptyFields = (data) => {
  return Object.values(data).some(value => {
    if (typeof value === 'string') {
      return value.trim() === '';
    }
    return value === null || value === undefined;
  });
};

/**
 * Check for SQL injection patterns
 */
export const hasSQLInjectionPattern = (input) => {
  const sqlPatterns = [
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /'[\s]*OR[\s]*/i,
    /;[\s]*DROP/i,
    /--[\s]*$/,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

/**
 * Check for XSS patterns
 */
export const hasXSSPattern = (input) => {
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
};

/**
 * Sanitize input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, '') // Remove quotes
    .trim();
};

/**
 * Validate multiple fields at once
 */
export const validateFormData = (data) => {
  const errors = {};
  
  if (!data.name || !isValidName(data.name)) {
    errors.name = 'Invalid name format';
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone = 'Invalid phone format';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validators = {
  isValidEmail,
  isValidPhone,
  isValidName,
  hasEmptyFields,
  hasSQLInjectionPattern,
  hasXSSPattern,
  sanitizeInput,
  validateFormData,
};

export default validators;
