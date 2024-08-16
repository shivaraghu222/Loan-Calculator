function updateLoanAmountLabel(value) {
    document.getElementById('loanAmountLabel').innerText = `₹ ${parseInt(value).toLocaleString()}`;
}

function updateInterestRateLabel(value) {
    document.getElementById('interestRateLabel').innerText = `${parseFloat(value).toFixed(1)}%`;
}

function updateLoanTenureLabel(value) {
    document.getElementById('loanTenureLabel').innerText = `${value} Yr`;
}

function calculateEMI() {
    let principal = parseFloat(document.getElementById('loanAmount').value);
    let annualInterest = parseFloat(document.getElementById('interestRate').value);
    let tenureYears = parseInt(document.getElementById('loanTenure').value);

    let monthlyInterest = annualInterest / 12 / 100;
    let tenureMonths = tenureYears * 12;

    let emi = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, tenureMonths)) / (Math.pow(1 + monthlyInterest, tenureMonths) - 1);
    let totalPayment = emi * tenureMonths;
    let totalInterest = totalPayment - principal;

    document.getElementById('monthlyEmi').innerText = `₹ ${emi.toFixed(0).toLocaleString()}`;
    document.getElementById('principalAmount').innerText = `₹ ${principal.toLocaleString()}`;
    document.getElementById('totalInterest').innerText = `₹ ${totalInterest.toFixed(0).toLocaleString()}`;
    document.getElementById('totalAmount').innerText = `₹ ${totalPayment.toFixed(0).toLocaleString()}`;

    updateChart(principal, totalInterest);
}

function updateChart(principal, interest) {
    let ctx = document.getElementById('emiChart').getContext('2d');
    let emiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal amount', 'Interest amount'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#76c7c0', '#ff6384'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'top',
            },
        }
    });
}
