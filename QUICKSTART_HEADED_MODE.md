# 🚀 Quick Start - Running Tests with Visible Browser

## Windows Users - Easiest Way

### 1. Double-Click to Run Tests (No Commands Needed!)
```
📁 run-tests-headed-chrome.bat
```
Just double-click this file in your project folder. Chrome browser will launch and run tests visibly!

---

## Run Tests from Command Line

### 💻 PowerShell (Recommended for Windows)

**All Positive Tests with Chrome (Visible UI):**
```powershell
$env:HEADED=1; npx playwright test tests/formPositive.spec.js --headed --workers=1 --project=chromium
```

**Specific Test Only (e.g., POS_001):**
```powershell
$env:HEADED=1; npx playwright test tests/formPositive.spec.js -g "POS_001" --headed --workers=1 --project=chromium
```

**All Tests (All Files, All Tests):**
```powershell
$env:HEADED=1; npx playwright test --headed --workers=1 --project=chromium
```

**All Tests (All Browsers - Chrome, Firefox, Safari):**
```powershell
$env:HEADED=1; npx playwright test --headed --workers=1
```

---

### Command Line (cmd.exe)

**Chrome Only:**
```cmd
set HEADED=1
npx playwright test tests/formPositive.spec.js --headed --workers=1 --project=chromium
```

**Specific Test:**
```cmd
set HEADED=1
npx playwright test tests/formPositive.spec.js -g "POS_001" --headed --workers=1
```

---

## 📊 Real-World Scenarios

### ✅ Scenario 1: Manager Wants to See Tests Running
**Command:**
```powershell
$env:HEADED=1; npx playwright test tests/formPositive.spec.js --headed --workers=1 --project=chromium
```
**What they see:**
- Chrome browser launches  ✓
- Form fields fill automatically  ✓
- Data enters in real-time  ✓
- Submit button clicks  ✓
- Success message shows  ✓
- All 4 positive tests run sequentially

**Duration:** ~10 seconds per test = ~40-60 seconds total

---

### ✅ Scenario 2: Debug Specific Failing Test
**Command:**
```powershell
$env:HEADED=1; npx playwright test tests/formPositive.spec.js -g "POS_001" --headed --workers=1
```
**What you see:**
- Only ONE test runs
- Chrome browser shows form
- You can see exactly what fails
- Debug mode enabled

**Duration:** ~10 seconds

---

### ✅ Scenario 3: Run All Form Tests (All Categories)
**Command:**
```powershell
$env:HEADED=1; npx playwright test --headed --workers=1 --project=chromium
```
**What runs:**
- All formPositive.spec.js tests
- All formNegative.spec.js tests
- All formSecurity.spec.js tests
- All formEdgeCases.spec.js tests
- All formBoundary.spec.js tests
- All formDataConsistency.spec.js tests
- All formUX.spec.js tests

**Total:** 44+ tests, ONE at a time with visible UI

---

## 🎯 Test Categories & How to Run Them

### Positive Tests (Valid Submissions)
```powershell
$env:HEADED=1; npx playwright test tests/formPositive.spec.js --headed --workers=1
# 4 tests showing successful form submissions
```

### Negative Tests (Validation Errors)
```powershell
$env:HEADED=1; npx playwright test tests/formNegative.spec.js --headed --workers=1
# 9 tests showing proper error handling
```

### Security Tests (XSS, SQL Injection)
```powershell
$env:HEADED=1; npx playwright test tests/formSecurity.spec.js --headed --workers=1
# 5 tests showing security measures
```

### Edge Case Tests
```powershell
$env:HEADED=1; npx playwright test tests/formEdgeCases.spec.js --headed --workers=1
# 7 tests for unusual inputs
```

### Boundary Tests (Min/Max Values)
```powershell
$env:HEADED=1; npx playwright test tests/formBoundary.spec.js --headed --workers=1
# 7 tests for field length limits
```

### Data Consistency Tests
```powershell
$env:HEADED=1; npx playwright test tests/formDataConsistency.spec.js --headed --workers=1
# 5 tests for API response validation
```

### UX Tests (User Experience)
```powershell
$env:HEADED=1; npx playwright test tests/formUX.spec.js --headed --workers=1
# 8 tests for UI/UX behavior
```

---

## 🏃 Fast Execution (Headless - No UI)

If you don't need to see the browser:

```powershell
npm run test
# 4 workers in parallel - fastest execution
# All tests complete in ~2-3 minutes
```

---

## 🔍 Debug Mode (Interactive Stepping)

Step through code line by line:

```powershell
npm run test:debug
# Opens Playwright Inspector
# Step through test execution
# Inspect elements in real-time
```

---

## 💡 Understanding the Commands

```
$env:HEADED=1              # Enable headed mode
npx playwright test        # Run Playwright tests
tests/formPositive.spec.js # Run specific file
-g "POS_001"               # Filter by test name (grep)
--headed                   # Show browser UI
--workers=1                # Run tests one at a time (not parallel)
--project=chromium         # Use Chrome browser
```

---

## 📋 Common Commands Quick Reference

| Need | Command |
|------|---------|
| **See tests with browser UI** | `$env:HEADED=1; npx playwright test tests/formPositive.spec.js --headed --workers=1` |
| **Run specific test** | `$env:HEADED=1; npx playwright test -g "POS_001" --headed --workers=1` |
| **All tests, visible** | `$env:HEADED=1; npx playwright test --headed --workers=1` |
| **Fast (no UI)** | `npm run test` |
| **Firefox instead of Chrome** | `--project=firefox` |
| **Safari (WebKit)** | `--project=webkit` |
| **View test report** | `npm run test:report` |

---

## 🛠️ Setup Requirements

Make sure form server is running:
```powershell
# Terminal 1 - Keep this open
npm run dev
# Server runs on http://localhost:3000
```

Then in another terminal:
```powershell
# Terminal 2 - Run tests
$env:HEADED=1; npx playwright test --headed --workers=1
```

---

## ✨ What You Should See

When headed mode works correctly:

1. **Chrome browser launches** (you see it appear)
2. **Form page loads** (http://localhost:3000/ in address bar)
3. **Fields fill automatically** (you see typing in real-time)
4. **Submit button clicks** (you see button press)
5. **Success message appears** (green alert shows)
6. **Next test repeats** (browser stays open, form resets)
7. **Report opens** (HTML report of results)

---

## 🐛 Troubleshooting

### "Browser didn't launch"
**Solution:** Make sure form server is running: `npm run dev`

### "Tests run too fast to see"
**Solution:** Increase timeout in command:
```powershell
$env:HEADED=1; npx playwright test --headed --workers=1 --timeout=10000
```

### "Want to pause and inspect?"
**Solution:** Use debug mode:
```powershell
npm run test:debug
```

### "Want interactive replay?"
**Solution:** Use UI mode:
```powershell
npm run test:ui
```

---

## 📝 Example Run

```
PowerShell:
PS D:\Software_testing_projects\Webform_Playwright_Automation_Project> $env:HEADED=1; npx playwright test tests/formPositive.spec.js --headed --workers=1 --project=chromium

Running 4 tests using 1 worker

  ✓ [chromium] › Form Positive Scenarios › POS_001 - Submit form with valid data (6.2s)
  ✓ [chromium] › Form Positive Scenarios › POS_002 - Special characters in name (5.8s)
  ✓ [chromium] › Form Positive Scenarios › POS_003 - Email with plus sign (5.5s)
  ✓ [chromium] › Form Positive Scenarios › POS_004 - Form reset (4.9s)

  4 passed (28.1s)

To open last HTML report run:

  npx playwright show-report
```

---

## 🎓 Best Practices

1. **For Demos:** Use headed mode (`--headed --workers=1`)
2. **For CI/CD:** Use headless mode (no `--headed`)
3. **For Debugging:** Use `--debug` flag
4. **For Development:** Use `--ui` flag
5. **For Speed:** Use parallel workers (`--workers=4`)

---

Last Updated: April 5, 2026
Playwright Version: 1.40+
