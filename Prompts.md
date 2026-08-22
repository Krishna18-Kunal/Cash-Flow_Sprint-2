## Project Understanding

Create a salary and expense tracker called Cash-Flow.

The application should allow users to enter their salary, add expenses and calculate their remaining balance in real time.

---

## Phase 1

Build a responsive frontend using HTML, CSS and vanilla JavaScript.

Requirements:

- Salary input
- Expense name input
- Expense amount input
- Dynamic expense list
- Remaining balance calculation
- Input validation
- DOM manipulation

Formula:

Remaining Balance = Total Salary - Total Expenses

---

## Phase 2

Add browser localStorage.

The application should:

- Save salary
- Save expense array
- Load data on page refresh
- Delete expenses
- Update localStorage after deletion

Also integrate Chart.js and display:

Remaining Balance vs Total Expenses

---

## Phase 3

Add the following features:

1. PDF report generation using jsPDF.
2. Currency conversion using a public currency API.
3. Currency selector.
4. Warning when remaining balance is below 10% of salary.

---

## Validation Prompt

Implement frontend validation that prevents users from submitting:

- Empty values
- Negative numbers
- Zero values where inappropriate

Display an error message without reloading the page.

---

## localStorage Prompt

Implement localStorage persistence for salary and expenses.

Load the saved state when the application starts.

Update localStorage whenever salary or expenses change.

---

## Chart Prompt

Integrate Chart.js and create a responsive pie chart showing:

- Remaining Balance
- Total Expenses

Update the chart whenever the application state changes.

---

## PDF Prompt

Use jsPDF to create a downloadable financial report.

The report should contain:

- Date
- Total salary
- Total expenses
- Remaining balance
- Complete expense list
- Low-balance warning if applicable

---

## Currency Prompt

Add currency conversion functionality.

The application's internal financial data should remain stored in INR.

When the user changes currency, display converted values without modifying the stored INR values.

---

## Threshold Prompt

Implement a threshold warning.

If remaining balance is less than 10% of total salary:

- Display a warning banner.
- Change the balance display to a danger state.

---

## Responsive Design Prompt

Create a responsive UI that works on:

- Desktop
- Tablet
- Mobile

Use CSS Grid and Flexbox.

---
---

