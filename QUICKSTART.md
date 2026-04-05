# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
npx playwright install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
# The default .env is already configured for http://localhost:3000/
```

### Step 3: Start Your Web App
Make sure your web form is running on `http://localhost:3000/`

### Step 4: Run Tests
```bash
npm test
```

### Step 5: View Report
```bash
npm run test:report
```

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Run in debug mode |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:chrome` | Run on Chrome |
| `npm run test:firefox` | Run on Firefox |
| `npm run test:webkit` | Run on Safari |
| `npm run test:report` | View HTML report |
| `npm run lint` | Check code style |

---

## Run Specific Tests

### Run Only Positive Tests
```bash
npm test -- formPositive.spec.js
```

### Run Only Negative Tests
```bash
npm test -- formNegative.spec.js
```

### Run Security Tests
```bash
npm test -- formSecurity.spec.js
```

### Run Specific Test by Name
```bash
npx playwright test -g "POS_001"
```

---

## Debug a Failing Test

### Option 1: Headed Mode with Pause
```bash
npm run test:headed -- --pause
```

### Option 2: Inspector
```bash
npm run test:debug
```

### Option 3: UI Mode
```bash
npm run test:ui
```

---

## Generate Reports

### HTML Report
```bash
npm run test:report
# Opens: reports/html/index.html
```

### View Report Server
The HTML report is automatically generated in `reports/html/`

---

## Environment Configuration

### Local Development
```env
ENVIRONMENT=local
BASE_URL=http://localhost:3000/
HEADLESS=false
```

### CI/CD Pipeline
```env
ENVIRONMENT=ci
BASE_URL=https://staging.example.com/
HEADLESS=true
CI=true
```

### Docker
```env
ENVIRONMENT=docker
BASE_URL=http://web-app:3000/
HEADLESS=true
```

---

## Viewing Logs

### Real-time Logs
```bash
tail -f logs/combined.log
tail -f logs/error.log
```

### View All Logs
```bash
cat logs/combined.log
```

---

## Docker Commands

### Build Image
```bash
docker build -t webform-automation .
```

### Run Tests in Container
```bash
docker run webform-automation
```

### Use Docker Compose
```bash
docker-compose up
```

### Run Interactive Container
```bash
docker run -it webform-automation bash
```

---

## Troubleshooting

### Tests Can't Find Application
- Verify app is running on `http://localhost:3000/`
- Check `.env` BASE_URL is correct
- Run: `curl http://localhost:3000/`

### Browsers Not Found
```bash
npx playwright install --with-deps
```

### Port Already in Use
```bash
# Change port in .env
BASE_URL=http://localhost:3001/
```

### Permission Issues on Linux/Mac
```bash
chmod +x node_modules/.bin/*
chmod -R 755 logs/
```

---

## Test Summary

| Category | Count | Status |
|----------|-------|--------|
| Positive Tests | 4 | ✅ |
| Negative Tests | 9 | ✅ |
| Security Tests | 4 | ✅ |
| Edge Cases | 7 | ✅ |
| Boundary Tests | 7 | ✅ |
| Data Consistency | 5 | ✅ |
| UX Tests | 8 | ✅ |
| **TOTAL** | **44** | **✅** |

---

## Project Features

✅ Page Object Model  
✅ Comprehensive Test Coverage  
✅ Multi-browser Support  
✅ Parallel Execution  
✅ Beautiful Reports  
✅ CI/CD Ready  
✅ Docker Support  
✅ Detailed Logging  
✅ Error Screenshots/Videos  
✅ Security Testing  

---

## Next Steps

1. **Customize Selectors**: Update selectors in `pages/FormPage.js` to match your form
2. **Add Test Data**: Modify `testdata/formTestData.json` with your test data
3. **Extend Tests**: Add custom tests in `tests/` directory
4. **Integration**: Push to GitHub and watch CI/CD run
5. **Monitoring**: Set up GitHub Actions or Jenkins

---

## Need Help?

1. Check README.md for detailed documentation
2. Review existing test files for examples
3. Check logs in `logs/` directory
4. Run tests in debug mode with `npm run test:debug`
5. View screenshots in `reports/artifacts/`

---

**Happy Testing! 🎉**
