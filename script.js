let editingRow = null;
let totalIncome = 0;
let totalExpenses = 0;

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;

    if (editingRow) {
        // Update existing transaction
        const oldAmount = parseFloat(editingRow.cells[1].innerText);
        if (editingRow.cells[3].innerText.toLowerCase() === 'income') {
            totalIncome -= oldAmount;
        } else {
            totalExpenses -= oldAmount;
        }
        
        editingRow.cells[0].innerText = description;
        editingRow.cells[1].innerText = amount;
        editingRow.cells[2].innerText = date;
        editingRow.cells[3].innerText = type.charAt(0).toUpperCase() + type.slice(1);
        
        if (type === 'income') {
            totalIncome += amount;
        } else {
            totalExpenses += amount;
        }

        editingRow = null; // Reset editing row
    } else {
        // Add new transaction
        const tableBody = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).innerText = description;
        newRow.insertCell(1).innerText = amount;
        newRow.insertCell(2).innerText = date;
        newRow.insertCell(3).innerText = type.charAt(0).toUpperCase() + type.slice(1);

        // Update totals
        if (type === 'income') {
            totalIncome += amount;
        } else {
            totalExpenses += amount;
        }

        // Add action buttons
        const actionsCell = newRow.insertCell(4);
        actionsCell.appendChild(createEditButton(newRow));
        actionsCell.appendChild(createDeleteButton(newRow));
    }

    // Clear the form
    document.getElementById('transactionForm').reset();
    updateTotals();
});

function createEditButton(row) {
    const button = document.createElement('button');
    button.innerText = 'Edit';
    button.className = 'edit-btn';
    button.onclick = function() {
        document.getElementById('description').value = row.cells[0].innerText;
        document.getElementById('amount').value = row.cells[1].innerText;
        document.getElementById('date').value = row.cells[2].innerText;
        document.getElementById('type').value = row.cells[3].innerText.toLowerCase();
        editingRow = row; // Set the row to be edited
    };
    return button;
}

function createDeleteButton(row) {
    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.className = 'delete-btn';
    button.onclick = function() {
        const amount = parseFloat(row.cells[1].innerText);
        if (row.cells[3].innerText.toLowerCase() === 'income') {
            totalIncome -= amount;
        } else {
            totalExpenses -= amount;
        }
        row.remove(); // Remove the row from the table
        updateTotals();
    };
    return button;
}

function updateTotals() {
    document.getElementById('totalIncome').innerText = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('balance').innerText = (totalIncome - totalExpenses).toFixed(2);
}