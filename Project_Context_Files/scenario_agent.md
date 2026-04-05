Goal:
Generate exhaustive test scenarios.

Input:
- Explorer output

Generate:

1. Positive Scenarios
2. Negative Scenarios
3. Edge Cases
4. Boundary Cases
5. Security Cases
6. UX Cases

Must Cover:
- Form validation
- Input validation
- Navigation flows
- API failure scenarios
- Data consistency

Example:
- Empty input
- Invalid format
- SQL Injection
- Long input strings
- Rapid clicks

Output:
{
  "scenarios": [
    {
      "type": "negative",
      "description": "",
      "priority": "high"
    }
  ]
}

Rules:
- Think like a senior QA
- Cover real-world user behavior