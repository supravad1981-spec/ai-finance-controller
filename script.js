let income = Number(localStorage.getItem("income")) || 0;
let expenses = Number(localStorage.getItem("expenses")) || 0;

let userTransactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];


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
}


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
}


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


function updateDashboard() {
    const balance = income - expenses;

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expenses").textContent = `₹${expenses}`;
    document.getElementById("balance").textContent = `₹${balance}`;
}


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
                <span>₹${transaction.amount}</span>
                <small>${transaction.date}</small>
            </div>
        `)
        .join("");
}


function updateSpendingAnalysis() {
    const analysis = document.getElementById("spendingAnalysis");

    if (!analysis) {
        return;
    }

    if (userTransactions.length === 0) {
        analysis.innerHTML = "<p>Add some transactions to see your spending analysis.</p>";
        return;
    }

    const incomeTransactions = userTransactions.filter(
        transaction => transaction.type === "Income"
    );

    const expenseTransactions = userTransactions.filter(
        transaction => transaction.type === "Expense"
    );

    const totalIncome = incomeTransactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );

    const totalExpenses = expenseTransactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );

    const balance = totalIncome - totalExpenses;

    let message = "";

    if (totalExpenses === 0) {
        message = "You have no recorded expenses yet. Start adding expenses to understand your spending.";
    } else if (totalExpenses > totalIncome) {
        message = "Your expenses are higher than your income. Consider reducing unnecessary spending.";
    } else if (totalExpenses >= totalIncome * 0.5) {
        message = "More than half of your income is being spent. Keep an eye on your expenses.";
    } else {
        message = "Your spending is currently under control. Keep maintaining a healthy balance.";
    }

    analysis.innerHTML = `
        <p><strong>Total Income:</strong> ₹${totalIncome}</p>
        <p><strong>Total Expenses:</strong> ₹${totalExpenses}</p>
        <p><strong>Balance:</strong> ₹${balance}</p>
        <p><strong>Insight:</strong> ${message}</p>
    `;
}

updateDashboard();
displayTransactions();
updateSpendingAnalysis();
