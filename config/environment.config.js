import dotenv from 'dotenv';

dotenv.config();

const getEnvironment = () => {
  const env = process.env.ENVIRONMENT || 'local';
  
  const environments = {
    local: {
      baseURL: 'http://localhost:3000/',
      apiURL: 'http://localhost:3001/api',
      browser: 'chromium',
      headless: true,
      timeout: 30000,
      slowMo: 0,
    },
    dev: {
      baseURL: 'https://dev.example.com',
      apiURL: 'https://dev-api.example.com/api',
      browser: 'chromium',
      headless: true,
      timeout: 30000,
      slowMo: 0,
    },
    staging: {
      baseURL: 'https://staging.example.com',
      apiURL: 'https://staging-api.example.com/api',
      browser: 'chromium',
      headless: true,
      timeout: 30000,
      slowMo: 0,
    },
    production: {
      baseURL: 'https://example.com',
      apiURL: 'https://api.example.com/api',
      browser: 'chromium',
      headless: true,
      timeout: 30000,
      slowMo: 0,
    },
  };
  
  return environments[env] || environments.local;
};

export const config = {
  environment: process.env.ENVIRONMENT || 'local',
  ...getEnvironment(),
  
  // Test execution settings
  parallelWorkers: process.env.WORKERS || 4,
  retries: process.env.RETRIES || 0,
  
  // Screenshots and videos
  screenshotOnFailure: true,
  videoOnFailure: true,
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Wait times
  navigationWaitTime: 5000,
  elementWaitTime: 10000,
  submitWaitTime: 15000,
};

export default config;
