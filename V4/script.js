function saveTotal(total) {
    if (total > 0.00) {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        const lastEntry = history[history.length - 1];

        if (!lastEntry || lastEntry.total !== total.toFixed(2)) {
            history.push({ total: total.toFixed(2), timestamp: new Date().toLocaleString() });
            localStorage.setItem('history', JSON.stringify(history));
        }
    }
}

function calculateDenominationValue(field, value) {
    switch (field) {
        case 'hundred': return value * 100;
        case 'fifty': return value * 50;
        case 'twenty': return value * 20;
        case 'five': return value * 5;
        case 'one': return value * 1;
        case 'quarter': return value * 0.25;
        case 'dime': return value * 0.10;
        case 'nickel': return value * 0.05;
        case 'penny': return value * 0.01;
        default: return 0;
    }
}

function updateAmountDisplay() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    fields.forEach(field => {
        const value = parseFloat(document.getElementById(field).value) || 0;
        const denominationValue = calculateDenominationValue(field, value);
        document.getElementById(`${field}-amount`).textContent = `$${denominationValue.toFixed(2)}`;
    });
}

function calculateTotal() {
    updateAmountDisplay(); // Update the amount display before calculating total

    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    let total = 0.00;

    fields.forEach(field => {
        const value = parseFloat(document.getElementById(field).value) || 0;
        const denominationValue = calculateDenominationValue(field, value);
        total += denominationValue;
    });

    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    saveTotal(total);
}

function loadValues() {
    const fields = ['hundred', 'fifty', 'twenty', 'five', 'one', 'quarter', 'dime', 'nickel', 'penny'];
    fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value !== null) {
            document.getElementById(field).value = value;
        } else {
            document.getElementById(field).value = 0;
        }
    });
    calculateTotal();
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
    fields.forEach(field => {
        document.getElementById(field).value = 0;
        document.getElementById(`${field}-amount`).textContent = '$0.00'; // Clear amount display
    });

    fields.forEach(field => {
        localStorage.removeItem(field);
    });

    document.getElementById('totalAmount').textContent = '$0.00';
}
function toggleInstructions() {
    const instructions = document.querySelector('.instructions');
    const collapseBtn = document.querySelector('.collapse-btn');
    const isVisible = instructions.style.maxHeight !== '0px';

    if (isVisible) {
        instructions.style.maxHeight = '0';
        collapseBtn.textContent = 'Show Instructions';
    } else {
        instructions.style.maxHeight = `${instructions.scrollHeight}px`;
        collapseBtn.textContent = 'Hide Instructions';
    }
}

window.onload = function() {
    loadValues();
};

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateAmountDisplay);
});

document.querySelector('button[onclick="calculateTotal()"]').addEventListener('click', () => {
    saveValues();
    calculateTotal();
});