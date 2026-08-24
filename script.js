let userTransactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];


/* =========================
   CALCULATE TOTALS
========================= */

function getTotals() {

    const totalIncome = userTransactions
        .filter(transaction => transaction.type === "Income")
        .reduce(
            (sum, transaction) => sum + Number(transaction.amount),
            0
        );

    const totalExpenses = userTransactions
        .filter(transaction => transaction.type === "Expense")
        .reduce(
            (sum, transaction) => sum + Number(transaction.amount),
            0
        );

    return {
        income: totalIncome,
        expenses: totalExpenses,
        balance: totalIncome - totalExpenses
    };
}


/* =========================
   ADD INCOME
========================= */

function addIncome(amount) {

    userTransactions.push({
        type: "Income",
        amount: amount,
        date: new Date().toLocaleString()
    });

    saveTransactions();
    refreshDashboard();
}


/* =========================
   ADD EXPENSE
========================= */

function addExpense(amount) {

    userTransactions.push({
        type: "Expense",
        amount: amount,
        date: new Date().toLocaleString()
    });

    saveTransactions();
    refreshDashboard();
}


/* =========================
   SAVE TRANSACTIONS
========================= */

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(userTransactions)
    );
}


/* =========================
   HANDLE INCOME BUTTON
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
   HANDLE EXPENSE BUTTON
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

    const totals = getTotals();

    document.getElementById("income").textContent =
        `₹${totals.income}`;

    document.getElementById("expenses").textContent =
        `₹${totals.expenses}`;

    document.getElementById("balance").textContent =
        `₹${totals.balance}`;
}


/* =========================
   TRANSACTION HISTORY
========================= */

function displayTransactions() {

    const history =
        document.getElementById("transactionHistory");

    if (!history) {
        return;
    }

    if (userTransactions.length === 0) {

        history.innerHTML =
            "<p>No transactions added yet.</p>";

        return;
    }

    history.innerHTML = userTransactions
        .slice()
        .reverse()
        .map(transaction => `
            <div class="transaction-item">
                <strong>${transaction.type}</strong>
                <span>₹${transaction.amount}</span>
                <small>${transaction.date}</small>
            </div>
        `)
        .join("");
}


/* =========================
   SPENDING ANALYSIS
========================= */

function updateSpendingAnalysis() {

    const analysis =
        document.getElementById("spendingAnalysis");

    if (!analysis) {
        return;
    }

    if (userTransactions.length === 0) {

        analysis.innerHTML =
            "<p>Add some transactions to see your spending analysis.</p>";

        return;
    }

    const totals = getTotals();

    let message = "";

    if (totals.expenses === 0) {

        message =
            "You have no recorded expenses yet. Start adding expenses to understand your spending.";

    } else if (totals.expenses > totals.income) {

        message =
            "Your expenses are higher than your income. Consider reducing unnecessary spending.";

    } else if (totals.expenses >= totals.income * 0.5) {

        message =
            "More than half of your income is being spent. Keep an eye on your expenses.";

    } else {

        message =
            "Your spending is currently under control. Keep maintaining a healthy balance.";
    }

    analysis.innerHTML = `
        <p><strong>Total Income:</strong> ₹${totals.income}</p>
        <p><strong>Total Expenses:</strong> ₹${totals.expenses}</p>
        <p><strong>Balance:</strong> ₹${totals.balance}</p>
        <p><strong>Insight:</strong> ${message}</p>
    `;
}


/* =========================
   AI INSIGHTS
========================= */

function updateAIInsights() {

    const aiInsights =
        document.getElementById("aiInsights");

    if (!aiInsights) {
        return;
    }

    if (userTransactions.length === 0) {

        aiInsights.innerHTML =
            "<p>Add some transactions to get personalized financial insights.</p>";

        return;
    }

    const totals = getTotals();

    const spendingPercentage =
        totals.income > 0
            ? ((totals.expenses / totals.income) * 100).toFixed(1)
            : 0;

    let insight = "";

    if (totals.income === 0) {

        insight =
            "Add some income to get better financial insights.";

    } else if (totals.expenses > totals.income) {

        insight =
            "Your expenses are higher than your income. Try reducing unnecessary spending.";

    } else if (totals.expenses >= totals.income * 0.5) {

        insight =
            "More than 50% of your income is being spent. Consider keeping some money aside as savings.";

    } else {

        insight =
            "Your spending is under control. Keep maintaining a healthy balance and continue saving.";
    }

    aiInsights.innerHTML = `
        <p><strong>Income:</strong> ₹${totals.income}</p>
        <p><strong>Expenses:</strong> ₹${totals.expenses}</p>
        <p><strong>Balance:</strong> ₹${totals.balance}</p>
        <p><strong>Spending Percentage:</strong> ${spendingPercentage}%</p>
        <p><strong>AI Suggestion:</strong> ${insight}</p>
    `;
}


/* =========================
   REFRESH EVERYTHING
========================= */

function refreshDashboard() {

    updateDashboard();
    displayTransactions();
    updateSpendingAnalysis();
    updateAIInsights();
}


/* =========================
   INITIAL LOAD
========================= */

refreshDashboard();