function saveValues() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    let total = 0.00;

    fields.forEach(field => {
        const value = parseFloat(document.getElementById(field).value) || 0;
        localStorage.setItem(field, value);
        total += calculateDenominationValue(field, value);
    });

    if (total > 0.00) {
        // Save the total to history only if it's greater than zero
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push({ total: total.toFixed(2), timestamp: new Date().toLocaleString() });
        localStorage.setItem('history', JSON.stringify(history));
    }
}

function calculateDenominationValue(field, value) {
    switch(field) {
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

function loadValues() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value !== null) {
            document.getElementById(field).value = value;
        }
    });
    calculateTotal(); // Recalculate the total when the page loads
}

function calculateTotal() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    let total = 0.00;

    fields.forEach(field => {
        const value = parseFloat(document.getElementById(field).value) || 0;
        total += calculateDenominationValue(field, value);
    });

    document.getElementById('totalAmount').textContent = total.toFixed(2);
    saveValues(); // Save the values whenever the total is calculated
}

function clearFields() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    fields.forEach(field => {
        document.getElementById(field).value = 0;
    });
    calculateTotal(); // Recalculate the total after clearing fields
}

window.onload = function() {
    loadValues(); // Load saved values when the page loads
};
