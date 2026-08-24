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
    localStorage.setItem("transactions", ...)
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

    if (transactions.length === 0) {
        history.innerHTML = "<p>No transactions added yet.</p>";
        return;
    }

    history.innerHTML = transactions
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


updateDashboard();
displayTransactions();
