function saveTotal(total) {
    // Save the total to history only if it's greater than zero
    if (total > 0.00) {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        const lastEntry = history[history.length - 1];

        // Only save if the total has changed
        if (!lastEntry || lastEntry.total !== total.toFixed(2)) {
            history.push({ total: total.toFixed(2), timestamp: new Date().toLocaleString() });
            localStorage.setItem('history', JSON.stringify(history));
        }
    }
}

function calculateDenominationValue(field, value) {
    switch (field) {
        case 'hundred':
            return value * 100;
        case 'fifty':
            return value * 50;
        case 'twenty':
            return value * 20;
        case 'five':
            return value * 5;
        case 'one':
            return value * 1;
        case 'quarter':
            return value * 0.25;
        case 'dime':
            return value * 0.10;
        case 'nickel':
            return value * 0.05;
        case 'penny':
            return value * 0.01;
        default:
            return 0;
    }
}

function calculateTotal() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    let total = 0.00;

    fields.forEach(field => {
        const value = parseFloat(document.getElementById(field).value) || 0;
        total += calculateDenominationValue(field, value);
    });

    document.getElementById('totalAmount').textContent = total.toFixed(2);
    saveTotal(total); // Save the total when the button is pressed
}

function loadValues() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value !== null) {
            document.getElementById(field).value = value;
        } else {
            document.getElementById(field).value = 0; // Default to 0 if no value is found
        }
    });
    calculateTotal(); // Recalculate the total when the page loads
}

function saveValues() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];

    fields.forEach(field => {
        const value = parseFloat(document.getElementById(field).value) || 0;
        localStorage.setItem(field, value);
    });
}

function clearFields() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    let hasNonZeroValue = false;

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.value = 0;
        if (parseFloat(input.value) > 0) {
            hasNonZeroValue = true;
        }
    });

    // Clear values from localStorage
    fields.forEach(field => {
        localStorage.removeItem(field);
    });

    // Set total to 0.00 and clear history if necessary
    document.getElementById('totalAmount').textContent = '0.00';
}

window.onload = function() {
    loadValues(); // Load saved values when the page loads
};

// Call this function whenever the "Calculate Total" button is pressed
document.querySelector('button[onclick="calculateTotal()"]').addEventListener('click', () => {
    saveValues(); // Save the current values to localStorage
});
