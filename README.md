# Web Form Automation - Playwright Framework

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Playwright](https://img.shields.io/badge/playwright-1.40%2B-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A comprehensive, production-ready Playwright automation framework for testing web forms using JavaScript. This framework is designed for scalability, maintainability, and enterprise-level reporting.

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Scenarios](#-test-scenarios)
- [Page Objects](#-page-objects)
- [Utilities](#-utilities)
- [Reports](#-reports)
- [CI/CD Integration](#-cicd-integration)
- [Docker Support](#-docker-support)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Capabilities
- ✅ **Page Object Model (POM)** - Clean separation of test logic and page interactions
- ✅ **Comprehensive Test Coverage** - 30+ test scenarios covering all aspects
- ✅ **Multiple Browsers** - Chromium, Firefox, WebKit testing
- ✅ **Parallel Execution** - Run 4 tests in parallel by default
- ✅ **Retry Mechanism** - Automatic retry for flaky tests
- ✅ **Screenshots & Videos** - Captured on failure for debugging
- ✅ **Detailed Logging** - Winston-based logging to console and files

### Test Scenarios
- **Positive Tests**: Valid form submissions
- **Negative Tests**: Validation error handling (9 scenarios)
- **Security Tests**: XSS and SQL injection prevention (4 scenarios)
- **Edge Cases**: Boundary and special character handling (7 scenarios)
- **Data Consistency**: Duplicate submission, API validation (5 scenarios)
- **UX Tests**: User experience and interaction flows (8 scenarios)

### Reporting
- 📊 **HTML Reports** - Beautiful, interactive test reports
- 📝 **JSON Reports** - Machine-readable results for CI/CD
- 📋 **JUnit Reports** - Jenkins-compatible XML reports
- 📉 **CSV Export** - Spreadsheet-compatible results
- 🎯 **Test Analytics** - Pass rates, failure analysis, execution time

### CI/CD Ready
- ✅ GitHub Actions workflow included
- ✅ Jenkins pipeline with full configuration
- ✅ Docker containerization
- ✅ Docker Compose for local execution
- ✅ Environment-based configuration

---

## 📦 Prerequisites

- **Node.js** v18.0 or higher
- **npm** v9.0 or higher
- **Modern Browser** (Chrome, Firefox, or Safari)
- **Windows/Mac/Linux** - Any OS supported by Playwright

### Verify Installation

```bash
node --version
npm --version
```

---

## 📁 Project Structure

```
webform-automation-playwright/
├── tests/                          # Test files
│   ├── formPositive.spec.js        # Positive test scenarios
│   ├── formNegative.spec.js        # Negative test scenarios
│   ├── formSecurity.spec.js        # Security tests (XSS, SQL injection)
│   ├── formEdgeCases.spec.js       # Edge case tests
│   ├── formBoundary.spec.js        # Boundary value tests
│   ├── formDataConsistency.spec.js # Data consistency tests
│   └── formUX.spec.js              # UX and interaction tests
│
├── pages/                          # Page Object Models
│   ├── BasePage.js                 # Base page class with common methods
│   └── FormPage.js                 # Form page object
│
├── utils/                          # Utility functions
│   ├── logger.js                   # Winston logger configuration
│   ├── testDataGenerator.js        # Test data generation
│   ├── validators.js               # Input validation functions
│   ├── executionUtils.js           # Test execution helpers
│   └── reportingUtils.js           # Report generation utilities
│
├── fixtures/                       # Playwright fixtures
│   └── baseFixtures.js             # Reusable test fixtures
│
├── config/                         # Configuration files
│   └── environment.config.js       # Environment-specific settings
│
├── testdata/                       # Test data
│   └── formTestData.json           # JSON test data
│
├── reports/                        # Generated reports (git-ignored)
│   ├── html/                       # HTML reports
│   ├── json/                       # JSON reports
│   ├── csv/                        # CSV exports
│   ├── junit/                      # JUnit XML reports
│   └── artifacts/                  # Screenshots and videos
│
├── logs/                           # Application logs (git-ignored)
│   ├── combined.log                # Combined logs
│   └── error.log                   # Error logs only
│
├── playwright.config.js            # Playwright configuration
├── package.json                    # NPM dependencies and scripts
├── .env.example                    # Environment configuration template
├── .gitignore                      # Git ignore rules
├── Dockerfile                      # Docker configuration
├── docker-compose.yml              # Docker Compose setup
├── Jenkinsfile                     # Jenkins pipeline
├── .github/workflows/              # GitHub Actions workflows
│   └── playwright.yml              # GitHub Actions workflow
└── README.md                       # This file
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd webform-automation-playwright
```

### 2. Install Dependencies

```bash
npm install
```

Or use the setup script:

```bash
npm run setup
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Environment Selection
ENVIRONMENT=local

# Base URLs
BASE_URL=http://localhost:3000/
API_URL=http://localhost:3001/api

# Browser Configuration
BROWSER=chromium
HEADLESS=true

# Test Execution
WORKERS=4
RETRIES=0
TIMEOUT=30000
LOG_LEVEL=info

# Screenshots and Videos
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=true

# CI/CD
CI=false
PUBLISH_REPORT=true
```

### Playwright Configuration

Edit `playwright.config.js` to customize:

- **Base URL**: Change `baseURL` for different environments
- **Browsers**: Modify `projects` section
- **Timeout**: Adjust test timeouts
- **Retry**: Set retry count for flaky tests
- **Reporters**: Configure report formats

---

## ▶️ Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test formPositive.spec.js
```

### Run with Head Mode

```bash
npm run test:headed
```

### Run in Debug Mode

```bash
npm run test:debug
```

### Run with UI Mode

```bash
npm run test:ui
```

### Run on Specific Browser

```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run in Parallel

```bash
npm run test:parallel
```

### Run in Serial (One at a time)

```bash
npm run test:serial
```

### View Reports

```bash
npm run test:report
```

---

## 🧪 Test Scenarios

### Positive Scenarios (4 tests)
- **POS_001**: Valid form submission
- **POS_002**: Special characters in name (apostrophe)
- **POS_003**: Plus sign in email
- **POS_004**: Form reset functionality

### Negative Scenarios (9 tests)
- **NEG_001-004**: Empty field validation (name, email, phone, all)
- **NEG_005-006**: Invalid email formats
- **NEG_007-008**: Invalid phone formats
- **NEG_009**: Numeric name validation

### Security Scenarios (4 tests)
- **SEC_001**: XSS in name field
- **SEC_002**: SQL injection in email
- **SEC_003**: SQL injection in name
- **SEC_004**: XSS with event handlers

### Edge Cases (7 tests)
- **EDGE_001**: Single character name
- **EDGE_002**: Maximum length name (255 chars)
- **EDGE_003**: Exceeding max length (256 chars)
- **EDGE_004**: Multiple spaces in name
- **EDGE_005**: Email with subdomain
- **EDGE_006**: Different phone formats
- **EDGE_007**: Leading/trailing whitespace

### Boundary Tests (7 tests)
- **BOUND_001-007**: Boundary value testing for all fields

### Data Consistency (5 tests)
- **DATA_001**: Duplicate submission handling
- **DATA_002**: API response status validation
- **DATA_003**: Form state after submission
- **DATA_004**: Response message content
- **DATA_005**: Data persistence

### UX Tests (8 tests)
- **UX_001**: Field filling order independence
- **UX_002**: Rapid submit button clicks
- **UX_003**: Browser back button behavior
- **UX_004**: Submit button state
- **UX_005**: Tab navigation
- **UX_006**: Validation on blur
- **UX_007**: Loading state
- **UX_008**: Character count display

---

## 📄 Page Objects

### BasePage

Base class providing common functionality:

```javascript
class BasePage {
  goto(url)                    // Navigate to URL
  getTitle()                   // Get page title
  getCurrentURL()              // Get current URL
  fillInput(selector, value)   // Fill input field
  click(selector)              // Click element
  getText(selector)            // Get text content
  isElementVisible(selector)   // Check visibility
  waitForElement(selector)     // Wait for element
  takeScreenshot(fileName)     // Take screenshot
  clearAllInputs()             // Clear all inputs
}
```

### FormPage

Extends BasePage with form-specific methods:

```javascript
class FormPage extends BasePage {
  navigateToForm(baseURL)          // Navigate to form
  fillForm(name, email, phone)     // Fill all fields
  submitForm()                     // Submit form
  resetForm()                      // Reset form
  getSuccessMessage()              // Get success message
  getErrorMessage()                // Get error message
  isSuccessMessageVisible()        // Check success visibility
  isErrorMessageVisible()          // Check error visibility
  getFormValues()                  // Get current form values
  isSubmitButtonEnabled()          // Check if submit enabled
}
```

---

## 🛠️ Utilities

### Logger (`utils/logger.js`)

Winston-based logging with console and file output:

```javascript
import logger from '../utils/logger.js';

logger.info('Test started');
logger.warn('This is a warning');
logger.error('This is an error');
```

Logs are saved in `logs/`:
- `combined.log` - All logs
- `error.log` - Errors only

### Test Data Generator (`utils/testDataGenerator.js`)

Generate realistic test data:

```javascript
import { generateValidFormData } from '../utils/testDataGenerator.js';

const data = generateValidFormData();
// Returns: { name, email, phone }
```

### Validators (`utils/validators.js`)

Input validation functions:

```javascript
import { isValidEmail, isValidPhone, validateFormData } from '../utils/validators.js';

isValidEmail('test@example.com')        // true
isValidPhone('+1 (555) 123-4567')       // true
validateFormData({ name, email, phone }) // { isValid, errors }
```

### Execution Utils (`utils/executionUtils.js`)

Test execution helpers:

```javascript
import { retryAsync, fillAndSubmitForm, verifyFormResponse } from '../utils/executionUtils.js';

await retryAsync(() => formPageObj.submitForm(), 3);
const response = await verifyFormResponse(formPageObj);
```

---

## 📊 Reports

### HTML Report

Beautiful, interactive report generated in `reports/html/index.html`:

```bash
npm run test:report
```

Features:
- Test summary with pass/fail rates
- Individual test results with status
- Execution time tracking
- Visual charts and progress bars

### JSON Report

Machine-readable results in `reports/json/results.json`:

```json
{
  "total": 32,
  "passed": 28,
  "failed": 2,
  "skipped": 2,
  "passPercentage": "87.5%",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### JUnit Report

Jenkins-compatible XML in `reports/junit/results.xml`

### Screenshots and Videos

Captured in `reports/artifacts/`:
- Screenshots on failure
- Videos on failure
- Traces for debugging

---

## 🔄 CI/CD Integration

### GitHub Actions

Automatic tests on push/PR to main/develop:

```bash
git push origin feature-branch
# Tests run automatically
```

View results in GitHub Actions tab.

### Jenkins Pipeline

Run with Jenkins:

```groovy
node {
  stage('Checkout') { ... }
  stage('Setup') { ... }
  stage('Test') { ... }
  stage('Report') { ... }
}
```

Configure in Jenkins:
1. Create new job
2. Select "Pipeline"
3. Link to this repository
4. Set script path to `Jenkinsfile`

### Jenkins Parameters

- **ENVIRONMENT**: local, dev, staging, production
- **BROWSER**: chromium, firefox, webkit
- **HEADED**: Run in headed mode

---

## 🐳 Docker Support

### Build Docker Image

```bash
docker build -t webform-automation .
```

### Run Tests in Docker

```bash
docker run webform-automation
```

### Using Docker Compose

```bash
docker-compose up
```

Includes:
- Playwright tests container
- Test results volume mounting
- Optional web app service

### Docker Compose Services

```yaml
services:
  playwright-tests:  # Test execution
  web-app:          # Optional web app
```

---

## ✅ Best Practices

### 1. Use Page Object Model

```javascript
// ✅ Good
const form = new FormPage(page);
await form.fillForm(name, email, phone);

// ❌ Bad
await page.fill('input[name="name"]', name);
await page.fill('input[name="email"]', email);
```

### 2. Use Explicit Waits

```javascript
// ✅ Good
await formPageObj.waitForFormToLoad();

// ❌ Bad
await page.waitForTimeout(5000);
```

### 3. Add Meaningful Logs

```javascript
logger.info(`Submitting form with email: ${email}`);
```

### 4. Use Fixtures for Reusable Data

```javascript
test('My test', async ({ validFormData }) => {
  // Use fixture data
});
```

### 5. Validate with Assertions

```javascript
expect(isSuccess).toBeTruthy();
expect(successMessage).toContain('Success');
```

### 6. Handle Errors Gracefully

```javascript
try {
  await formPageObj.submitForm();
} catch (error) {
  logger.error(`Submission failed: ${error.message}`);
  throw error;
}
```

---

## 🔧 Troubleshooting

### Issue: Tests timeout

**Solution**: Increase timeout in `playwright.config.js`

```javascript
timeout: 60 * 1000, // 60 seconds
```

### Issue: Element not found

**Solution**: Check selectors and wait for elements

```javascript
await formPageObj.waitForFormToLoad();
```

### Issue: Tests fail intermittently

**Solution**: Add retry mechanism

```javascript
retries: 2, // In playwright.config.js
```

### Issue: Port 3000 already in use

**Solution**: Change port in `.env`

```
BASE_URL=http://localhost:3001/
```

### Issue: Playwright browsers not installed

**Solution**: Install browsers

```bash
npx playwright install --with-deps
```

### Issue: Permission denied for logs

**Solution**: Check directory permissions

```bash
chmod -R 755 logs/
```

---

## 🤝 Contributing

### Code Style

- Use ES6+ syntax
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns

### Adding New Tests

1. Create new test file in `tests/`
2. Follow naming convention: `form*.spec.js`
3. Use existing fixtures and page objects
4. Add meaningful test descriptions
5. Run tests locally before pushing

### Submitting Changes

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Create pull request

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)
- [Testing Best Practices](https://developer.chrome.com/docs/devtools/testing/)
- [JavaScript Testing Guide](https://jestjs.io/docs/getting-started)

---

## 📞 Support

For issues or questions:

1. Check existing GitHub issues
2. Review troubleshooting section
3. Check Playwright documentation
4. Create new GitHub issue with details

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Team

- **QA Automation Team** - Framework development

---

## 🎯 Roadmap

- [ ] Add visual regression testing
- [ ] Add performance testing
- [ ] Add accessibility testing
- [ ] Add API testing
- [ ] Add mobile testing
- [ ] Add test data management UI
- [ ] Add advanced reporting dashboard

---

**Last Updated**: April 2024  
**Playwright Version**: 1.40+  
**Node.js Version**: 18.0+  

Made with ❤️ for quality assurance
