/**
 * Reporting utilities
 */

import fs from 'fs';
import path from 'path';
import logger from './logger.js';

/**
 * Generate test summary report
 */
export const generateTestSummary = (testResults) => {
  logger.info('Generating test summary');
  
  const summary = {
    timestamp: new Date().toISOString(),
    total: testResults.length,
    passed: testResults.filter(t => t.status === 'passed').length,
    failed: testResults.filter(t => t.status === 'failed').length,
    skipped: testResults.filter(t => t.status === 'skipped').length,
    passPercentage: ((testResults.filter(t => t.status === 'passed').length / testResults.length) * 100).toFixed(2),
    failureDetails: testResults.filter(t => t.status === 'failed').map(t => ({
      name: t.name,
      error: t.error,
      duration: t.duration,
    })),
  };
  
  logger.info(`Test Summary: ${JSON.stringify(summary, null, 2)}`);
  return summary;
};

/**
 * Save report to JSON file
 */
export const saveJSONReport = (reportData, fileName = 'test-report.json') => {
  logger.info(`Saving JSON report: ${fileName}`);
  
  const reportPath = path.join('./reports/json', fileName);
  
  // Ensure directory exists
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  logger.info(`Report saved to ${reportPath}`);
  
  return reportPath;
};

/**
 * Save report to CSV file
 */
export const saveCSVReport = (testResults, fileName = 'test-report.csv') => {
  logger.info(`Saving CSV report: ${fileName}`);
  
  const csvPath = path.join('./reports/csv', fileName);
  
  // Ensure directory exists
  if (!fs.existsSync(path.dirname(csvPath))) {
    fs.mkdirSync(path.dirname(csvPath), { recursive: true });
  }
  
  // CSV Header
  const header = ['Test ID', 'Test Name', 'Status', 'Duration (ms)', 'Error'].join(',');
  
  // CSV Rows
  const rows = testResults.map(t => [
    t.id || 'N/A',
    `"${t.name}"`,
    t.status,
    t.duration || 0,
    `"${(t.error || '').replace(/"/g, '""')}"`,
  ].join(','));
  
  const csvContent = [header, ...rows].join('\n');
  
  fs.writeFileSync(csvPath, csvContent);
  logger.info(`CSV report saved to ${csvPath}`);
  
  return csvPath;
};

/**
 * Create HTML report
 */
export const createHTMLReport = (testResults, summary) => {
  logger.info('Creating HTML report');
  
  const timestamp = new Date().toLocaleString();
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Execution Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header p { font-size: 14px; opacity: 0.9; }
        .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 30px;
            background: #f8f9fa;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .stat-value { font-size: 32px; font-weight: bold; color: #667eea; }
        .stat-label { font-size: 12px; color: #666; margin-top: 5px; text-transform: uppercase; }
        .stat-card.passed { border-left-color: #28a745; }
        .stat-card.passed .stat-value { color: #28a745; }
        .stat-card.failed { border-left-color: #dc3545; }
        .stat-card.failed .stat-value { color: #dc3545; }
        .stat-card.skipped { border-left-color: #ffc107; }
        .stat-card.skipped .stat-value { color: #ffc107; }
        .results {
            padding: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        thead {
            background: #f8f9fa;
            border-bottom: 2px solid #ddd;
        }
        th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #333;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        tr:hover { background: #f8f9fa; }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        .status-passed { background: #d4edda; color: #155724; }
        .status-failed { background: #f8d7da; color: #721c24; }
        .status-skipped { background: #fff3cd; color: #856404; }
        .footer {
            padding: 20px 30px;
            background: #f8f9fa;
            text-align: right;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #ddd;
        }
        .chart-container { margin: 20px 0; }
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
        }
        .progress-fill { height: 100%; background: #667eea; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Web Form Automation - Test Execution Report</h1>
            <p>Generated on ${timestamp}</p>
        </div>
        
        <div class="summary">
            <div class="stat-card">
                <div class="stat-value">${summary.total}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card passed">
                <div class="stat-value">${summary.passed}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-card failed">
                <div class="stat-value">${summary.failed}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat-card skipped">
                <div class="stat-value">${summary.skipped}</div>
                <div class="stat-label">Skipped</div>
            </div>
        </div>
        
        <div class="results">
            <h2>Pass Rate: ${summary.passPercentage}%</h2>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${summary.passPercentage}%"></div>
            </div>
            
            <h3 style="margin-top: 30px;">Test Results</h3>
            <table>
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Status</th>
                        <th>Duration (ms)</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    ${testResults.map(t => `
                    <tr>
                        <td>${t.name}</td>
                        <td><span class="status-badge status-${t.status}">${t.status.toUpperCase()}</span></td>
                        <td>${t.duration || 0}</td>
                        <td>${t.error || '-'}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="footer">
            <p>Playwright Automation Framework | Web Form Testing Suite</p>
        </div>
    </div>
</body>
</html>
  `;
  
  const reportPath = path.join('./reports/html', 'index.html');
  
  // Ensure directory exists
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }
  
  fs.writeFileSync(reportPath, htmlContent);
  logger.info(`HTML report saved to ${reportPath}`);
  
  return reportPath;
};

/**
 * Generate failure summary
 */
export const generateFailureSummary = (testResults) => {
  logger.info('Generating failure summary');
  
  const failures = testResults.filter(t => t.status === 'failed');
  
  const summary = {
    totalFailures: failures.length,
    failedTests: failures.map(f => ({
      name: f.name,
      error: f.error,
      stack: f.stack,
      duration: f.duration,
    })),
    failurePercentage: ((failures.length / testResults.length) * 100).toFixed(2),
  };
  
  return summary;
};

export const reportingUtils = {
  generateTestSummary,
  saveJSONReport,
  saveCSVReport,
  createHTMLReport,
  generateFailureSummary,
};

export default reportingUtils;
