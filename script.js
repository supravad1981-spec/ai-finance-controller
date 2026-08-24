let income = Number(localStorage.getItem("income")) || 0;
let expenses = Number(localStorage.getItem("expenses")) || 0;

let userTransactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];


/* =========================
   ADD INCOME
========================= */

function addIncome(amount) {
    income += amount;

    localStorage.setItem("income", income);

    userTransactions.push({
        type: "Income",
        amount: amount,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(userTransactions)
    );

    updateDashboard();
    displayTransactions();
    updateSpendingAnalysis();
    updateAIInsights();
}


/* =========================
   ADD EXPENSE
========================= */

function addExpense(amount) {
    expenses += amount;

    localStorage.setItem("expenses", expenses);

    userTransactions.push({
        type: "Expense",
        amount: amount,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(userTransactions)
    );

    updateDashboard();
    displayTransactions();
    updateSpendingAnalysis();
    updateAIInsights();
}


/* =========================
   HANDLE INCOME
========================= */

function handleIncome() {
    const input = document.getElementById("amountInput");
    const amount = Number(input.value);

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    addIncome(amount);

    input.value = "";
}


/* =========================
   HANDLE EXPENSE
========================= */

function handleExpense() {
    const input = document.getElementById("amountInput");
    const amount = Number(input.value);

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    addExpense(amount);

    input.value = "";
}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {
    const balance = income - expenses;

    const incomeElement = document.getElementById("income");
    const expensesElement = document.getElementById("expenses");
    const balanceElement = document.getElementById("balance");

    if (incomeElement) {
        incomeElement.textContent = `₹${income}`;
    }

    if (expensesElement) {
        expensesElement.textContent = `₹${expenses}`;
    }

    if (balanceElement) {
        balanceElement.textContent = `₹${balance}`;
    }
}


/* =========================
   TRANSACTION HISTORY
========================= */

function displayTransactions() {
    const history = document.getElementById("transactionHistory");

    if (!history) {
        return;
    }

    if (userTransactions.length === 0) {
        history.innerHTML = "<p>No transactions added yet.</p>";
        return;
    }

    history.innerHTML = userTransactions
        .slice()
        .reverse()
        .map(transaction => `
            <div class="transaction-item">
                <strong>${transaction.type}</strong>
                <span> ₹${Number(transaction.amount)}</span>
                <small> ${transaction.date}</small>
            </div>
        `)
        .join("");
}


/* =========================
   SPENDING ANALYSIS
========================= */

function updateSpendingAnalysis() {
    const analysis = document.getElementById("spendingAnalysis");

    if (!analysis) {
        return;
    }

    if (income === 0 && expenses === 0) {
        analysis.innerHTML =
            "<p>Add some transactions to see your spending analysis.</p>";
        return;
    }

    const balance = income - expenses;

    let message = "";

    if (expenses === 0) {
        message =
            "You have no recorded expenses yet. Start adding expenses to understand your spending.";
    } else if (expenses > income) {
        message =
            "Your expenses are higher than your income. Consider reducing unnecessary spending.";
    } else if (expenses >= income * 0.5) {
        message =
            "More than half of your income is being spent. Keep an eye on your expenses.";
    } else {
        message =
            "Your spending is currently under control. Keep maintaining a healthy balance.";
    }

    analysis.innerHTML = `
        <p><strong>Total Income:</strong> ₹${income}</p>
        <p><strong>Total Expenses:</strong> ₹${expenses}</p>
        <p><strong>Balance:</strong> ₹${balance}</p>
        <p><strong>Insight:</strong> ${message}</p>
    `;
}


/* =========================
   AI INSIGHTS
========================= */

function updateAIInsights() {
    const aiInsights = document.getElementById("aiInsights");

    if (!aiInsights) {
        return;
    }

    if (income === 0 && expenses === 0) {
        aiInsights.innerHTML =
            "<p>Add some transactions to get personalized financial insights.</p>";
        return;
    }

    const balance = income - expenses;

    const spendingPercentage =
        income > 0
            ? ((expenses / income) * 100).toFixed(1)
            : 0;

    let insight = "";

    if (income === 0) {
        insight =
            "Add some income to get better financial insights.";
    } else if (expenses > income) {
        insight =
            "Your expenses are higher than your income. Try reducing unnecessary spending.";
    } else if (expenses >= income * 0.5) {
        insight =
            "More than 50% of your income is being spent. Consider keeping some money aside as savings.";
    } else {
        insight =
            "Your spending is under control. Keep maintaining a healthy balance and continue saving.";
    }

    aiInsights.innerHTML = `
        <p><strong>Income:</strong> ₹${income}</p>
        <p><strong>Expenses:</strong> ₹${expenses}</p>
        <p><strong>Balance:</strong> ₹${balance}</p>
        <p><strong>Spending Percentage:</strong> ${spendingPercentage}%</p>
        <p><strong>AI Suggestion:</strong> ${insight}</p>
    `;
}


/* =========================
   INITIAL LOAD
========================= */

updateDashboard();
displayTransactions();
updateSpendingAnalysis();
updateAIInsights();
