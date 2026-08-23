let income = 0;
let expenses = 0;

function addIncome(amount) {
    income += amount;
    updateDashboard();
}

function addExpense(amount) {
    expenses += amount;
    updateDashboard();
}

function updateDashboard() {
    const balance = income - expenses;

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expenses").textContent = `₹${expenses}`;
    document.getElementById("balance").textContent = `₹${balance}`;
}
