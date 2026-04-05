Goal:
Explore the given URL like a real user.

Input:
- URL

Tasks:
1. Open website using Playwright
2. Traverse all pages
3. Identify:
   - Forms
   - Inputs
   - Buttons
   - Links
   - Dropdowns
   - Modals
4. Capture:
   - Page structure
   - Navigation flow
   - API calls (if possible)
5. Detect:
   - Dynamic elements
   - Hidden elements
   - Disabled elements

Output Format (JSON):
{
  "pages": [],
  "elements": {},
  "flows": [],
  "api_calls": []
}

Rules:
- Do not skip any clickable element
- Simulate real user navigation
- Capture screenshots