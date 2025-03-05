// Get elements
const balanceEl = document.getElementById('balance');
const expenseList = document.getElementById('expense-list');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const currencyEl = document.getElementById('currency');
const weeklyExpensesEl = document.getElementById('weekly-expenses');
const monthlyExpensesEl = document.getElementById('monthly-expenses');

let balance = 0; // Total balance
const expenses = []; // Array to hold all expenses

// Function to add expense
function addExpense() {
    const description = descriptionEl.value;
    const amount = parseFloat(amountEl.value);
    const currency = currencyEl.value;

    if (description.trim() === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Update balance
    balance -= amount;
    balanceEl.textContent = `${currency} ${balance.toFixed(2)}`;

    // Create list item
    const li = document.createElement('li');
    li.innerHTML = `${description} - ${currency} ${amount.toFixed(2)} <span onclick="deleteExpense(this, ${amount})">❌</span>`;

    // Append to list
    expenseList.appendChild(li);

    // Add expense to the array
    expenses.push({ description, amount, currency, date: new Date() });

    // Update weekly and monthly expenses
    updateExpenseSummary();

    // Clear input fields
    descriptionEl.value = "";
    amountEl.value = "";
}

// Function to delete expense
function deleteExpense(element, amount) {
    balance += amount;
    balanceEl.textContent = `${currencyEl.value} ${balance.toFixed(2)}`;
    
    element.parentElement.remove();
    updateExpenseSummary();
}

function updateExpenseSummary() {
    // Clear previous summaries
    weeklyExpensesEl.innerHTML = '';
    monthlyExpensesEl.innerHTML = '';

    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let weeklyTotal = 0;
    let monthlyTotal = 0;

    expenses.forEach(expense => {
        if (expense.date >= startOfWeek) {
            weeklyTotal += expense.amount;
            const li = document.createElement('li');
            li.textContent = `${expense.description} - ${expense.currency} ${expense.amount.toFixed(2)}`;
            weeklyExpensesEl.appendChild(li);
        }
        if (expense.date >= startOfMonth) {
            monthlyTotal += expense.amount;
            const li = document.createElement('li');
            li.textContent = `${expense.description} - ${expense.currency} ${expense.amount.toFixed(2)}`;
            monthlyExpensesEl.appendChild(li);
        }
    });

    // Display totals
    const weeklyTotalEl = document.createElement('li');
    weeklyTotalEl.textContent = `Total: ${currencyEl.value} ${weeklyTotal.toFixed(2)}`;
    weeklyExpensesEl.appendChild(weeklyTotalEl);

    const monthlyTotalEl = document.createElement('li');
    monthlyTotalEl.textContent = `Total: ${currencyEl.value} ${monthlyTotal.toFixed(2)}`;
    monthlyExpensesEl.appendChild(monthlyTotalEl);

    // Display insights
    const insightsEl = document.createElement('div');
    insightsEl.innerHTML = `<h3>Insights</h3><p>Weekly Spending: ${currencyEl.value} ${weeklyTotal.toFixed(2)}</p><p>Monthly Spending: ${currencyEl.value} ${monthlyTotal.toFixed(2)}</p>`;
    document.body.appendChild(insightsEl);

}

// Function to get the week number
function getWeekNumber(d) {
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
}
