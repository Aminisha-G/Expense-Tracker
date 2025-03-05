// JavaScript code for handling expenses
const expenseForm = document.getElementById('expense-form');
const expenseList = document.querySelector('.expense-list');
const expenseChart = document.getElementById('expenseChart');
let expenses = [];

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const expenseName = document.querySelector('input[placeholder="Expense Name"]').value;
    const expenseAmount = document.querySelector('input[placeholder="Amount"]').value;
    const expenseDate = document.querySelector('input[type="date"]').value;

    // Create a new expense item
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `<p>${expenseName} - ${expenseAmount} on ${expenseDate}</p>`;
    
    // Add the new expense item to the list
    expenseList.appendChild(expenseItem);
    
    // Add expense to the expenses array
    expenses.push({ name: expenseName, amount: expenseAmount, date: expenseDate });

    // Clear the form
    expenseForm.reset();
});

// Function to render the chart
function renderChart() {
    const ctx = expenseChart.getContext('2d');
    const labels = expenses.map(exp => exp.name);
    const data = expenses.map(exp => exp.amount);
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: 'rgba(0, 121, 107, 0.5)',
                borderColor: 'rgba(0, 121, 107, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event listener for the Charts link
document.querySelector('a[href="#charts"]').addEventListener('click', function() {
    renderChart();
});
