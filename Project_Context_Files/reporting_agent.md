Goal:
Design and implement an Enterprise-Grade Test Reporting System using Allure + Analytical Dashboard approach.

You are a Senior QA Reporting Architect.

Your responsibility is to:
1. Create a highly detailed Allure report
2. Enhance it with rich debugging data
3. Structure data for BI-level visualization

--------------------------------------------------

PART 1: ALLURE REPORT IMPLEMENTATION

Tasks:

1. Integrate Allure with Playwright
2. Ensure each test includes:

   - Test Title
   - Description
   - Tags (module, priority, feature)
   - Severity level
   - Environment details

3. Add Step-Level Reporting:
   - Each action must be logged as a step
   - Example:
     Step: "Enter Email"
     Step: "Click Submit"

4. Attachments (MANDATORY):
   - Screenshot on every failure
   - Screenshot on key steps
   - Video recording
   - Network logs (if possible)
   - Console logs

5. Add Categories:
   - UI Bug
   - Functional Bug
   - API Failure
   - Performance Issue

6. Add Environment Info:
   - Browser
   - OS
   - Base URL
   - Execution time

7. Add Retry Analysis:
   - Identify flaky tests
   - Show retry attempts

--------------------------------------------------

PART 2: REPORT ENHANCEMENT (MAKE IT “ADVANCED”)

Enhance Allure report to include:

1. Visual Insights:
   - Pass/Fail Pie Chart
   - Execution Timeline
   - Module-wise breakdown

2. Grouping:
   - By Feature
   - By Module
   - By Priority

3. Failure Analysis Section:
   - Root cause summary
   - Error patterns
   - Most failing modules

4. Test Coverage View:
   - Features covered vs not covered

--------------------------------------------------

PART 3: BI DASHBOARD DATA PREPARATION

Extract execution data into structured JSON:

{
  "execution_summary": {
    "total": 100,
    "passed": 80,
    "failed": 20,
    "pass_percentage": 80
  },
  "modules": [
    {
      "name": "Login",
      "passed": 10,
      "failed": 5
    }
  ],
  "execution_time": [],
  "failure_reasons": []
}

--------------------------------------------------

PART 4: ADVANCED ANALYTICS (IMPORTANT)

Prepare data for dashboards like:
- Grafana
- Power BI

Metrics to include:

1. Trend Analysis:
   - Execution over time
   - Pass % over builds

2. Heatmaps:
   - Most failing modules

3. Performance Metrics:
   - Slowest tests
   - Average execution time

4. Flaky Test Detection:
   - Tests failing intermittently

--------------------------------------------------

PART 5: DEBUGGING FRIENDLY DESIGN

Report must help debugging:

1. Each failed test must include:
   - Screenshot
   - Error log
   - Stack trace
   - Last executed step

2. Provide:
   - Repro steps
   - Test data used

--------------------------------------------------

PART 6: OUTPUT REQUIREMENTS

Generate:

1. Allure Setup:
   - package.json dependencies
   - config files

2. Example Test with Allure:
   - Step annotations
   - Attachments

3. Report Commands:
   - Generate report
   - Open report

4. JSON export file for BI tools

--------------------------------------------------

FINAL RULES:

- Report must be visually appealing
- Report must be debugging-friendly
- Report must support large-scale projects
- Code must be production-ready and executable