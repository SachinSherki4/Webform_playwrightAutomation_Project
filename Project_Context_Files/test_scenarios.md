# Test Scenarios for Web Form Automation

## Project: User Information Form
**Version**: 1.0.0
**Last Updated**: 2024
**Status**: Production Ready

---

## 1. POSITIVE TEST SCENARIOS

### 1.1 Valid Form Submission
- **ID**: FORM_POS_001
- **Description**: Submit form with valid data
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form page
  2. Enter valid name
  3. Enter valid email
  4. Enter valid phone
  5. Click submit
- **Expected Result**: Success message displayed, form data saved
- **Data**: John Doe, john@example.com, +1(555)123-4567

### 1.2 Valid Submit with Special Characters in Name
- **ID**: FORM_POS_002
- **Description**: Submit form with name containing apostrophe
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter name with apostrophe (O'Brien)
  3. Enter valid email
  4. Enter valid phone
  5. Submit form
- **Expected Result**: Form accepted, success message shown
- **Data**: O'Brien, obrien@example.com, +1(555)456-7890

### 1.3 Valid Submit with Plus Sign in Email
- **ID**: FORM_POS_003
- **Description**: Submit form with email containing plus sign
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter email with plus tag (user+tag@example.com)
  4. Enter valid phone
  5. Submit
- **Expected Result**: Form accepted, email validation passes
- **Data**: Jane Doe, jane+test@example.com, +1(555)789-0123

### 1.4 Form Reset
- **ID**: FORM_POS_004
- **Description**: Clear form using reset button
- **Priority**: LOW
- **Steps**:
  1. Navigate to form
  2. Fill all fields
  3. Click reset button
- **Expected Result**: All fields cleared
- **Data**: Any valid data

---

## 2. NEGATIVE TEST SCENARIOS

### 2.1 Empty Name Field
- **ID**: FORM_NEG_001
- **Description**: Submit form without name
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Leave name empty
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Error message for name field
- **Validation**: Name required error shown

### 2.2 Empty Email Field
- **ID**: FORM_NEG_002
- **Description**: Submit form without email
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Leave email empty
  4. Enter valid phone
  5. Submit
- **Expected Result**: Error message for email field
- **Validation**: Email required error shown

### 2.3 Empty Phone Field
- **ID**: FORM_NEG_003
- **Description**: Submit form without phone
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter valid email
  4. Leave phone empty
  5. Submit
- **Expected Result**: Error message for phone field
- **Validation**: Phone required error shown

### 2.4 All Fields Empty
- **ID**: FORM_NEG_004
- **Description**: Submit completely empty form
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Click submit without filling any field
- **Expected Result**: Error messages for all fields
- **Validation**: Multiple error messages displayed

### 2.5 Invalid Email Format (No @)
- **ID**: FORM_NEG_005
- **Description**: Submit form with invalid email (missing @)
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter email without @ (invalidemail)
  4. Enter valid phone
  5. Submit
- **Expected Result**: Email validation error
- **Validation**: Invalid email format message shown

### 2.6 Invalid Email Format (No Domain)
- **ID**: FORM_NEG_006
- **Description**: Submit form with email missing domain
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter email test@
  4. Enter valid phone
  5. Submit
- **Expected Result**: Email validation error
- **Validation**: Invalid email format message shown

### 2.7 Invalid Phone Format
- **ID**: FORM_NEG_007
- **Description**: Submit form with invalid phone (too short)
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter valid email
  4. Enter phone "123"
  5. Submit
- **Expected Result**: Phone validation error
- **Validation**: Invalid phone format message shown

### 2.8 Invalid Phone Format (Non-numeric)
- **ID**: FORM_NEG_008
- **Description**: Submit form with non-numeric phone
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter valid email
  4. Enter phone "abc"
  5. Submit
- **Expected Result**: Phone validation error
- **Validation**: Invalid phone format message shown

### 2.9 Numeric Name
- **ID**: FORM_NEG_009
- **Description**: Submit form with numbers as name
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter name "123456"
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Name validation error
- **Validation**: Invalid name format message shown

---

## 3. EDGE CASE SCENARIOS

### 3.1 Minimum Length Name
- **ID**: FORM_EDGE_001
- **Description**: Submit form with single character name
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter name "A"
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Form accepted (if min length = 1)
- **Expected Result**: Error if min length > 1

### 3.2 Maximum Length Name
- **ID**: FORM_EDGE_002
- **Description**: Submit form with very long name (255 chars)
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter name of 255 characters
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Form accepted or error if exceeds max

### 3.3 Name with Spaces
- **ID**: FORM_EDGE_003
- **Description**: Submit form with multiple spaces in name
- **Priority**: LOW
- **Steps**:
  1. Navigate to form
  2. Enter name with extra spaces "John    Doe"
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Form accepted or trimmed

### 3.4 International Characters in Name
- **ID**: FORM_EDGE_004
- **Description**: Submit form with accented characters
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter name "José"
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Behavior depends on application

---

## 4. SECURITY TEST SCENARIOS

### 4.1 XSS Attempt in Name Field
- **ID**: FORM_SEC_001
- **Description**: Submit form with script tag in name
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter name: <script>alert('XSS')</script>
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Script not executed, either accepted or error
- **Validation**: No JavaScript alert appears

### 4.2 SQL Injection Attempt in Email
- **ID**: FORM_SEC_002
- **Description**: Submit form with SQL injection in email
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter email: test'; DROP TABLE users; --
  4. Enter valid phone
  5. Submit
- **Expected Result**: Injection prevented, form rejected or sanitized
- **Validation**: Database not affected

### 4.3 SQL Injection in Name Field
- **ID**: FORM_SEC_003
- **Description**: Submit form with SQL injection in name
- **Priority**: HIGH
- **Steps**:
  1. Navigate to form
  2. Enter name: " OR "1"="1
  3. Enter valid email
  4. Enter valid phone
  5. Submit
- **Expected Result**: Injection prevented
- **Validation**: No unauthorized data access

### 4.4 XSS in Email Field
- **ID**: FORM_SEC_004
- **Description**: Submit form with HTML tags in email
- **Priority**: MEDIUM
- **Steps**:
  1. Navigate to form
  2. Enter valid name
  3. Enter email: test<img src=x onerror=alert('XSS')>@example.com
  4. Enter valid phone
  5. Submit
- **Expected Result**: XSS prevented, form validation fails
- **Validation**: No script execution

---

## 5. BOUNDARY TEST SCENARIOS

### 5.1 Name at Maximum Length Boundary
- **ID**: FORM_BOUND_001
- **Description**: Test name field at exact max length
- **Priority**: MEDIUM
- **Steps**:
  1. Enter 255 character name
  2. Submit
- **Expected Result**: Accepted at boundary

### 5.2 Name Exceeds Maximum Length
- **ID**: FORM_BOUND_002
- **Description**: Test name field exceeding max length (256 chars)
- **Priority**: MEDIUM
- **Steps**:
  1. Enter 256 character name
  2. Submit
- **Expected Result**: Rejected, error shown

### 5.3 Email Maximum Length
- **ID**: FORM_BOUND_003
- **Description**: Test email at maximum valid length
- **Priority**: MEDIUM
- **Steps**:
  1. Enter email at 254 characters (max valid)
  2. Submit
- **Expected Result**: Accepted

### 5.4 Phone Minimum Length
- **ID**: FORM_BOUND_004
- **Description**: Test minimum valid phone length
- **Priority**: MEDIUM
- **Steps**:
  1. Enter minimum valid phone format
  2. Submit
- **Expected Result**: Accepted if valid format

---

## 6. DATA CONSISTENCY TEST SCENARIOS

### 6.1 Duplicate Submission
- **ID**: FORM_DATA_001
- **Description**: Submit the same data twice
- **Priority**: MEDIUM
- **Steps**:
  1. Submit valid form
  2. Verify success
  3. Submit same data again
- **Expected Result**: Second submission handled correctly (duplicate check or allow)
- **Validation**: Behavior matches requirement

### 6.2 API Response Validation
- **ID**: FORM_DATA_002
- **Description**: Verify API returns correct status code
- **Priority**: HIGH
- **Steps**:
  1. Submit form with valid data
  2. Capture API response
- **Expected Result**: API returns 200 or 201
- **Validation**: Response headers and body correct

### 6.3 Form State After Success
- **ID**: FORM_DATA_003
- **Description**: Verify form state after successful submission
- **Priority**: MEDIUM
- **Steps**:
  1. Submit form
  2. Check form fields
  3. Check if form auto-clears or stays filled
- **Expected Result**: Behavior matches requirement

---

## 7. UX TEST SCENARIOS

### 7.1 Form Submission Order Independence
- **ID**: FORM_UX_001
- **Description**: Fill form in different field order
- **Priority**: LOW
- **Steps**:
  1. Fill email first, then name, then phone
  2. Submit
- **Expected Result**: Form accepted in any order

### 7.2 Rapid Submission Clicks
- **ID**: FORM_UX_002
- **Description**: Click submit button multiple times rapidly
- **Priority**: MEDIUM
- **Steps**:
  1. Fill form
  2. Rapid-click submit button
- **Expected Result**: Form submitted once, duplicate prevented

### 7.3 Browser Back After Submission
- **ID**: FORM_UX_003
- **Description**: Click browser back after form submission
- **Priority**: LOW
- **Steps**:
  1. Submit form
  2. Click browser back button
- **Expected Result**: Form or previous page displayed

### 7.4 Form Autofill Support
- **ID**: FORM_UX_004
- **Description**: Verify browser autofill works
- **Priority**: LOW
- **Steps**:
  1. Check if fields accept autofill
- **Expected Result**: Browser autofill works correctly

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Positive Scenarios | 4 |
| Negative Scenarios | 9 |
| Edge Cases | 4 |
| Security Cases | 4 |
| Boundary Cases | 4 |
| Data Consistency | 3 |
| UX Cases | 4 |
| **TOTAL** | **32** |

---

## Notes

- All scenarios follow the principle of "Think like a senior QA"
- Real-world user behavior is simulated
- Security-first approach for validation checks
- Comprehensive coverage of positive, negative, and edge cases
- Test data is environment-agnostic and can be adjusted per environment
