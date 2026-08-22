# Cash-Flow_Sprint-2
Build a functional dashboard where a user can input their salary, log expenses, and view real-time state updates.

# Cash-Flow — Salary & Expense Tracker

Cash-Flow is a responsive salary and expense tracking web application.

The project allows users to:

- Enter their total salary
- Add expenses
- Calculate total expenses
- Calculate remaining balance
- Delete expenses
- Persist data using localStorage
- Visualize finances using Chart.js
- Download a PDF report
- Convert currencies using the Frankfurter API
- Receive an alert when the balance drops below 10% of salary

---

## Project Objective

Build a functional dashboard where a user can input salary, log expenses and view real-time financial state updates.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Browser localStorage
- Chart.js
- jsPDF
- Frankfurter Currency API

---

## Features

### Phase 1 — Base MVP

#### Salary

Users can enter their total salary.

#### Expenses

Users can enter:

- Expense Name
- Expense Amount

#### Dynamic Rendering

Expenses are immediately displayed on the page.

#### Balance Calculation

The application calculates:

Total Salary - Total Expenses = Remaining Balance

#### Validation

The application prevents:

- Empty salary
- Empty expense name
- Empty expense amount
- Negative salary
- Negative expenses
- Zero-value salary
- Zero-value expenses

---

# Phase 2 — Data Persistence & Visualization

## localStorage

Salary and expenses are stored in browser localStorage.

Therefore, data remains available after refreshing the browser.

## Delete Operation

Every expense has a delete button.

Deleting an expense:

1. Removes it from the DOM
2. Updates localStorage
3. Recalculates total expenses
4. Recalculates remaining balance
5. Updates the chart

## Chart.js

A dynamic pie chart displays:

- Remaining Balance
- Total Expenses

---

# Phase 3 — Stretch Goals

## PDF Report

The application uses jsPDF to generate:

`cash-flow-report.pdf`

The report contains:

- Salary
- Total expenses
- Remaining balance
- Expense list
- Warning status

## Currency Conversion

The application uses the Frankfurter API.

Supported currencies include:

- INR
- USD
- EUR
- GBP
- JPY

## Threshold Alert

If:

Remaining Balance < 10% of Total Salary

the application displays a critical warning.

---

# How to Run

Simply open:

index.html

in a modern browser.

Internet connection is required for:

- Chart.js CDN
- jsPDF CDN
- Currency API

---

# Folder Structure

cash-flow/

├── index.html
├── style.css
├── script.js
├── README.md
└── Prompts.md

---

# BY
Krishna Kunal
