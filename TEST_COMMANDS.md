# Production Test Execution Guide

## Quick Start (Headed Mode - for Management/Demos)

### ✅ Run All Tests with Visible Browser (Chrome)
```bash
npm run test:headed-chrome
```
**What it does:** Launches Chrome browser in headed mode, runs all 44+ tests ONE AT A TIME with visible UI execution. Perfect for management demos!

### 🎬 Demo Mode (Single Browser with UI)
```bash
npm run test:headed-all
```
**What it does:** Runs all tests in **headless mode disabled** - you see the browser, see form interactions, visible assertions.

---

## 🔧 Flexible Test Execution (Real-World Scenarios)

### 1️⃣ Run Specific Test File with Visible Browser
```bash
# Only Positive Tests
HEADED=1 npm run test:serial -- tests/formPositive.spec.js --headed

# Only Negative Tests
HEADED=1 npm run test:serial -- tests/formNegative.spec.js --headed

# Only Security Tests
HEADED=1 npm run test:serial -- tests/formSecurity.spec.js --headed
```

### 2️⃣ Run Specific Test by Name (Grep Filter)
```bash
# Run only POS_001 test
HEADED=1 npm run test:serial -- -g "POS_001" --headed

# Run all security tests
HEADED=1 npm run test:serial -- -g "SEC" --headed

# Run all negative validation tests
HEADED=1 npm run test:serial -- -g "NEG" --headed

# Run all edge case tests
HEADED=1 npm run test:serial -- -g "EDGE" --headed

# Run all boundary tests
HEADED=1 npm run test:serial -- -g "BOUND" --headed

# Run all UX tests
HEADED=1 npm run test:serial -- -g "UX" --headed
```

### 3️⃣ Run with Specific Browser
```bash
# Chrome only (Headed)
npm run test:headed-chrome

# Firefox only (Headed)
npm run test:headed-firefox

# Safari (WebKit) only (Headed)
npm run test:headed-webkit

# Chrome only (Headless - fast)
npm run test:chrome

# Firefox only (Headless - fast)
npm run test:firefox

# All browsers parallel (Headless - fastest)
npm run test
```

---

## 📊 Management/Stakeholder Commands

### Show All Tests Running (Visual Execution)
```bash
npm run test:headed-chrome
# Management can see:
# ✓ Form is being filled
# ✓ Data is being entered
# ✓ Submit button is clicked
# ✓ Success message appears
```

### Quick Sanity Check (5 min execution)
```bash
HEADED=1 npm run test:serial -- -g "POS" --headed
# Runs all positive scenarios with visible UI
```

### Regression Testing (CI-like but visible)
```bash
HEADED=1 npm run test:serial -- tests/formPositive.spec.js --headed
# Perfect for QA handoff demos
```

---

## ⚡ CI/CD Pipeline Commands (Automated, Headless)

### All Tests Headless (Fast - for Pipelines)
```bash
npm run test:headless
# 4 workers in parallel, no UI, ~2-3 minutes
```

### Serial Execution (Reliable - for CI)
```bash
npm run test:serial
# 1 worker, no UI, most stable for pipelines
```

### Debug Mode (When Tests Fail)
```bash
npm run test:debug
# Opens Playwright Inspector
# Step through code line by line
# Inspect elements, network, console
```

### Interactive UI Mode (Development)
```bash
npm run test:ui
# Opens Playwright Test UI
# Run/rerun tests
# See results in real-time
# Replay failures
```

---

## 🎯 Real-World Test Scenarios

### Scenario 1: QA Reviews Test with Manager
```bash
# Manager wants to see tests running
npm run test:headed-chrome

# They see:
# - Browser launching ✓
# - Form fields filling
# - Data being entered
# - Form being submitted
# - Success messages appearing
```

### Scenario 2: Debugging a Failing Test
```bash
# Run only the failing test with debug
HEADED=1 npm run test:serial -- -g "POS_001" --headed

# Or use interactive UI
npm run test:ui
# Click on test, see what failed
```

### Scenario 3: Post-Deployment Sanity Check
```bash
# Run critical positive tests after deployment
HEADED=1 npm run test:serial -- -g "POS" --headed

# Quick check: ~2 minutes, visible execution
```

### Scenario 4: CI/CD Pipeline Execution
```bash
# GitHub Actions / Jenkins / GitLab CI
npm run test:serial

# Runs headless, logs results, generates report
# No visual UI needed since it's automated
```

### Scenario 5: Performance Testing (Parallel)
```bash
# Run all tests as fast as possible
npm run test:headless

# Uses 4 workers, headless, ~2-3 minutes
# Results in: reports/html/index.html
```

---

## 📈 Test Reports & Diagnostics

### View Test Report (After Execution)
```bash
npm run test:report
# Opens HTML report with:
# - Pass/Fail status
# - Screenshots of failures
# - Video recordings
# - Detailed execution times
```

---

## 🎓 Command Documentation

| Command | Mode | Execution | Use Case |
|---------|------|-----------|----------|
| `npm run test` | Headless | 4 parallel | Fast automation, CI/CD |
| `npm run test:headless` | Headless | 4 parallel | Production pipelines |
| `npm run test:serial` | Headless | 1 serial | Reliable automation |
| `npm run test:headed-chrome` | **Headed** 👀 | 1 serial | **Management demos** |
| `npm run test:headed-firefox` | **Headed** 👀 | 1 serial | **Cross-browser demos** |
| `npm run test:headed-all` | **Headed** 👀 | 1 serial | **Full test suite demo** |
| `npm run test:serial-headed` | **Headed** 👀 | 1 serial | **Debugging** |
| `npm run test:debug` | Debug | 1 serial | Step-through debugging |
| `npm run test:ui` | Interactive | 1 serial | Development, replay |
| `npm run test:report` | Report | N/A | View execution results |

---

## 🚀 Recommended Workflows

### Development (You're Writing Tests)
```bash
npm run test:ui
# Rerun tests as you modify them
```

### QA Testing (Pre-Release)
```bash
# Run locally with UI to verify
npm run test:headed-chrome

# Then verify in CI
npm run test:serial
```

### Management Presentation
```bash
npm run test:headed-chrome
# Show it running live
# Takes ~20 minutes for all 44+ tests
```

### CI/CD Pipeline (Automated)
```bash
npm run test:serial
# Fast, reliable, headless
# Run on every commit
```

### Debugging Failures
```bash
# Specific test with UI
npm run test:debug

# Or interactive mode
npm run test:ui
```

---

## ⚙️ Advanced: Custom Commands

### Run Single Test File (Custom)
```bash
HEADED=1 npx playwright test tests/formPositive.spec.js --headed --workers=1
```

### Run Tests Matching Multiple Patterns
```bash
HEADED=1 npx playwright test --headed -g "POS_001|NEG_001|SEC_001" --workers=1
```

### Run with Different Timeout
```bash
npx playwright test --timeout=60000
```

### Run Tests in Specific Project
```bash
npx playwright test --project=chromium --headed --workers=1
```

### Generate Report in Different Format
```bash
npx playwright test --reporter=json
npx playwright test --reporter=html
npx playwright test --reporter=junit
```

---

## 📝 Summary for Teams

**For Demos/Management:** Use `npm run test:headed-chrome`
**For Development:** Use `npm run test:ui`
**For Quick Checks:** Use specific file commands with `--headed`
**For CI/CD:** Use `npm run test:serial` or `npm run test:headless`
**For Debugging:** Use `npm run test:debug`

---

## 🔌 Environment Setup

Make sure form server is running:
```bash
npm run dev
# Starts server on http://localhost:3000
# Keep this terminal open while running tests
```

Then in another terminal:
```bash
npm run test:headed-chrome
# Tests will automatically connect to http://localhost:3000
```

---

Generated: April 5, 2026
Framework: Playwright 1.40+ | JavaScript | POM Architecture
