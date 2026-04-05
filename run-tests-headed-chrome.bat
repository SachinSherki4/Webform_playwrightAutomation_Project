@echo off
REM Headed Chrome - For Management Demos and QA Reviews
REM Shows browser with UI while tests run
setlocal enabledelayedexpansion

echo.
echo ========================================
echo Playwright Tests - Headed Chrome Mode
echo ========================================
echo.
echo Browser: Chrome (Visible UI)
echo Mode: Headed (NO --headless flag)
echo Workers: 1 (Sequential execution)
echo Build: Chrome for Testing
echo.
echo Starting browser... (watch your screen)
echo.

set HEADED=1
npx playwright test tests/formPositive.spec.js --project=chromium --headed --workers=1

pause
