/* =========================================
   CASH-FLOW
   Salary & Expense Tracker
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */
localStorage.clear();


const salaryForm = document.getElementById("salaryForm");
const salaryInput = document.getElementById("salary");

const expenseForm = document.getElementById("expenseForm");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const salaryDisplay = document.getElementById("salaryDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseList = document.getElementById("expenseList");
const expenseCount = document.getElementById("expenseCount");

const emptyState = document.getElementById("emptyState");

const errorMessage = document.getElementById("errorMessage");

const warningBox = document.getElementById("warningBox");

const currencySelect = document.getElementById("currencySelect");

const salarySymbol = document.getElementById("salarySymbol");
const expenseSymbol = document.getElementById("expenseSymbol");

const downloadReportButton =
    document.getElementById("downloadReport");


/* =========================================
   APPLICATION STATE
========================================= */

let salary = 0;

let expenses = [];

let currentCurrency = "INR";

let exchangeRate = 1;


/* =========================================
   CURRENCY SYMBOLS
========================================= */

const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥"
};


/* =========================================
   INITIALIZE APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    currencySelect.value = currentCurrency;

    updateCurrencySymbols();

    renderApplication();

});


/* =========================================
   LOCAL STORAGE
========================================= */

function saveData() {

    const data = {
        salary: salary,
        expenses: expenses
    };

    localStorage.setItem(
        "cashFlowData",
        JSON.stringify(data)
    );

}


function loadData() {

    const savedData =
        localStorage.getItem("cashFlowData");

    if (!savedData) {
        return;
    }

    try {

        const data = JSON.parse(savedData);

        salary = Number(data.salary) || 0;

        expenses =
            Array.isArray(data.expenses)
                ? data.expenses
                : [];

    } catch (error) {

        console.error(
            "Unable to load saved data:",
            error
        );

        salary = 0;
        expenses = [];

    }

}


/* =========================================
   SALARY FORM
========================================= */

salaryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const salaryValue = Number(salaryInput.value);

    // Validation
    if (
        salaryInput.value.trim() === "" ||
        !Number.isFinite(salaryValue) ||
        salaryValue <= 0
    ) {
        showError("Please enter a valid salary greater than zero.");
        return;
    }

    // Save salary
    salary = salaryValue;

    // Save to localStorage
    saveData();

    // Update dashboard
    renderApplication();

    // Clear input box
    salaryInput.value = "";

    // Remove error
    clearError();
});

/* =========================================
   EXPENSE FORM
========================================= */

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        expenseNameInput.value.trim();

    const amount =
        Number(expenseAmountInput.value);


    /* Validation */

    if (name === "") {

        showError(
            "Please enter an expense name."
        );

        return;
    }

    if (
        expenseAmountInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        showError(
            "Please enter a valid expense amount greater than zero."
        );

        return;
    }


    /* Create Expense */

    const expense = {

        id: Date.now(),

        name: name,

        amount: amount,

        date: new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )

    };


    /* Add expense */

    expenses.push(expense);

    saveData();

    renderApplication();


    /* Clear inputs */

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    clearError();

});


/* =========================================
   DELETE EXPENSE
========================================= */

function deleteExpense(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this expense?"
        );

    if (!confirmed) {
        return;
    }

    expenses =
        expenses.filter(
            expense => expense.id !== id
        );

    saveData();

    renderApplication();

}


/* =========================================
   CALCULATE TOTAL EXPENSES
========================================= */

function getTotalExpenses() {

    return expenses.reduce(
        (total, expense) => {

            return total + Number(expense.amount);

        },
        0
    );

}


/* =========================================
   CALCULATE BALANCE
========================================= */

function getRemainingBalance() {

    return salary - getTotalExpenses();

}


/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(amount) {

    const convertedAmount =
        amount * exchangeRate;

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: currentCurrency,

            maximumFractionDigits:
                currentCurrency === "JPY"
                    ? 0
                    : 2
        }
    ).format(convertedAmount);

}


/* =========================================
   RENDER APPLICATION
========================================= */

function renderApplication() {

    const totalExpenses =
        getTotalExpenses();

    const balance =
        getRemainingBalance();


    /* Salary */

    salaryDisplay.textContent =
        formatMoney(salary);


    /* Expenses */

    expenseDisplay.textContent =
        formatMoney(totalExpenses);


    /* Balance */

    balanceDisplay.textContent =
        formatMoney(balance);


    /* Expense List */

    renderExpenseList();


    /* Warning */

    checkThreshold();


    /* Chart */

    updateChart();

}


/* =========================================
   RENDER EXPENSE LIST
========================================= */

function renderExpenseList() {

    expenseList.innerHTML = "";


    if (expenses.length === 0) {

        expenseList.appendChild(emptyState);

        expenseCount.textContent =
            "0 expenses";

        return;
    }


    expenseCount.textContent =
        `${expenses.length} ${
            expenses.length === 1
                ? "expense"
                : "expenses"
        }`;


    expenses.forEach(expense => {

        const item =
            document.createElement("div");

        item.className = "expense-item";


        /* Left section */

        const info =
            document.createElement("div");

        info.className = "expense-info";


        const avatar =
            document.createElement("div");

        avatar.className =
            "expense-avatar";

        avatar.textContent =
            expense.name
                .charAt(0)
                .toUpperCase();


        const text =
            document.createElement("div");


        const name =
            document.createElement("div");

        name.className =
            "expense-name";

        name.textContent =
            expense.name;


        const date =
            document.createElement("div");

        date.className =
            "expense-date";

        date.textContent =
            expense.date;


        text.appendChild(name);

        text.appendChild(date);


        info.appendChild(avatar);

        info.appendChild(text);


        /* Right section */

        const right =
            document.createElement("div");

        right.className =
            "expense-right";


        const amount =
            document.createElement("span");

        amount.className =
            "expense-amount";

        amount.textContent =
            `- ${formatMoney(expense.amount)}`;


        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-btn";

        deleteButton.innerHTML =
            "🗑";


        deleteButton.title =
            "Delete expense";


        deleteButton.addEventListener(
            "click",
            () => deleteExpense(expense.id)
        );


        right.appendChild(amount);

        right.appendChild(deleteButton);


        item.appendChild(info);

        item.appendChild(right);


        expenseList.appendChild(item);

    });

}


/* =========================================
   THRESHOLD ALERT
========================================= */

function checkThreshold() {

    if (salary <= 0) {

        warningBox.classList.add("hidden");

        balanceDisplay.classList.remove(
            "balance-danger"
        );

        return;
    }


    const balance =
        getRemainingBalance();


    const threshold =
        salary * 0.10;


    if (balance < threshold) {

        warningBox.classList.remove(
            "hidden"
        );

        balanceDisplay.parentElement
            .classList.add("balance-danger");

    } else {

        warningBox.classList.add(
            "hidden"
        );

        balanceDisplay.parentElement
            .classList.remove(
                "balance-danger"
            );

    }

}


/* =========================================
   ERROR HANDLING
========================================= */

function showError(message) {

    errorMessage.textContent =
        message;

}


function clearError() {

    errorMessage.textContent = "";

}


/* =========================================
   CHART
========================================= */

let expenseChart = null;


function updateChart() {

    const canvas =
        document.getElementById(
            "expenseChart"
        );


    if (!canvas) {
        return;
    }


    const context =
        canvas.getContext("2d");


    const totalExpenses =
        getTotalExpenses();


    const balance =
        Math.max(
            getRemainingBalance(),
            0
        );


    if (expenseChart) {

        expenseChart.destroy();

    }


    expenseChart =
        new Chart(
            context,
            {
                type: "pie",

                data: {

                    labels: [
                        "Remaining Balance",
                        "Total Expenses"
                    ],

                    datasets: [
                        {
                            data: [
                                balance,
                                totalExpenses
                            ]
                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            position: "bottom",

                            labels: {
                                color: "#ffffff"
                            }
                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    function(context) {

                                        const value =
                                            context.raw;

                                        return `${context.label}: ${formatMoney(value)}`;

                                    }

                            }

                        }

                    }

                }

            }
        );

}


/* =========================================
   CURRENCY SYMBOL UPDATE
========================================= */

function updateCurrencySymbols() {

    const symbol =
        currencySymbols[currentCurrency];

    salarySymbol.textContent =
        symbol;

    expenseSymbol.textContent =
        symbol;

}


/* =========================================
   CURRENCY CONVERSION
========================================= */

currencySelect.addEventListener(
    "change",
    async function() {

        currentCurrency =
            this.value;

        updateCurrencySymbols();

        await fetchExchangeRate();

        renderApplication();

    }
);


/* =========================================
   FRANKFURTER API
========================================= */

async function fetchExchangeRate() {

    /*
        Stored values are always maintained
        internally in INR.

        Frankfurter supports major currencies
        but INR may not always be available
        as a direct source.

        Therefore INR conversion is handled
        through an intermediate USD rate.
    */


    if (currentCurrency === "INR") {

        exchangeRate = 1;

        return;
    }


    try {

        /*
            INR -> USD
        */

        const inrResponse =
            await fetch(
                "https://api.frankfurter.app/latest?from=USD&to=INR"
            );


        if (!inrResponse.ok) {
            throw new Error(
                "Currency API failed."
            );
        }


        const inrData =
            await inrResponse.json();


        const usdToInr =
            inrData.rates.INR;


        /*
            USD -> selected currency
        */

        const targetResponse =
            await fetch(
                `https://api.frankfurter.app/latest?from=USD&to=${currentCurrency}`
            );


        if (!targetResponse.ok) {
            throw new Error(
                "Target currency API failed."
            );
        }


        const targetData =
            await targetResponse.json();


        const usdToTarget =
            targetData.rates[currentCurrency];


        /*
            INR -> target currency

            INR value
            / USD-to-INR
            * USD-to-target
        */

        exchangeRate =
            usdToTarget / usdToInr;

    } catch (error) {

        console.error(
            "Currency conversion error:",
            error
        );


        /*
            Keep INR conversion rate if
            API is unavailable.
        */

        exchangeRate = 1;


        alert(
            "Currency conversion could not be updated. Please check your internet connection."
        );

    }

}


/* =========================================
   PDF REPORT
========================================= */

downloadReportButton.addEventListener(
    "click",
    generatePDFReport
);


function generatePDFReport() {

    const {
        jsPDF
    } = window.jspdf;


    const doc =
        new jsPDF();


    const totalExpenses =
        getTotalExpenses();


    const balance =
        getRemainingBalance();


    /* Header */

    doc.setFontSize(22);

    doc.text(
        "Cash-Flow Financial Report",
        20,
        20
    );


    doc.setFontSize(11);

    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        20,
        30
    );


    /* Summary */

    doc.setFontSize(14);

    doc.text(
        "Financial Summary",
        20,
        45
    );


    doc.setFontSize(12);

    doc.text(
        `Total Salary: ${formatMoney(salary)}`,
        20,
        58
    );


    doc.text(
        `Total Expenses: ${formatMoney(totalExpenses)}`,
        20,
        68
    );


    doc.text(
        `Remaining Balance: ${formatMoney(balance)}`,
        20,
        78
    );


    /* Expense List */

    doc.setFontSize(14);

    doc.text(
        "Expense Details",
        20,
        95
    );


    let yPosition = 108;


    if (expenses.length === 0) {

        doc.setFontSize(11);

        doc.text(
            "No expenses recorded.",
            20,
            yPosition
        );

    } else {

        expenses.forEach(
            (expense, index) => {

                if (yPosition > 270) {

                    doc.addPage();

                    yPosition = 20;

                }


                doc.setFontSize(11);

                doc.text(
                    `${index + 1}. ${expense.name}`,
                    20,
                    yPosition
                );


                doc.text(
                    `${formatMoney(expense.amount)}`,
                    150,
                    yPosition
                );


                yPosition += 10;

            }
        );

    }


    /* Warning */

    if (
        salary > 0 &&
        balance < salary * 0.10
    ) {

        doc.setFontSize(11);

        doc.text(
            "WARNING: Remaining balance is below 10% of total salary.",
            20,
            yPosition + 15
        );

    }


    /* Save */

    doc.save(
        "cash-flow-report.pdf"
    );

}