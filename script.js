let income = Number(localStorage.getItem("income")) || 0;
let expenses = Number(localStorage.getItem("expenses")) || 0;

function addIncome(amount) {
    income += amount;

    localStorage.setItem("income", income);

    updateDashboard();
}

function addExpense(amount) {
    expenses += amount;

    localStorage.setItem("expenses", expenses);

    updateDashboard();
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

updateDashboard();
