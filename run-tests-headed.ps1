# Windows PowerShell Script to Run Tests in Headed Mode
# Usage: .\run-tests-headed.ps1 [options]

param(
    [string]$browser = "chromium",
    [string]$filter = "",
    [string]$file = "",
    [switch]$all = $false,
    [switch]$debug = $false
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Playwright Test Automation - Headed Mode" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Build the command
$cmd = "npx playwright test"

# Add file if specified
if ($file -ne "") {
    $cmd += " $file"
}

# Add filter (grep)
if ($filter -ne "") {
    $cmd += " -g `"$filter`""
}

# Add headed mode options
$cmd += " --headed --workers=1"

# Add project (browser)
if ($browser -ne "all") {
    $cmd += " --project=$browser"
}

# Add debug if requested
if ($debug) {
    $cmd += " --debug"
}

Write-Host "Browser Mode: Headed (UI Visible)" -ForegroundColor Green
Write-Host "Browser: $browser" -ForegroundColor Green
Write-Host "File: $( if ($file -eq "") { "All tests" } else { $file } )" -ForegroundColor Green
Write-Host "Filter: $( if ($filter -eq "") { "None (all tests)" } else { $filter } )" -ForegroundColor Green
Write-Host ""
Write-Host "Running: $cmd" -ForegroundColor Yellow
Write-Host ""

# Set environment variable for headed mode
$env:HEADED = "1"

# Execute the command
Invoke-Expression $cmd
