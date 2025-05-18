// Fake exchange rates data (based on USD)
const exchangeRates = {
    USD: 1.00,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.25,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.45,
    INR: 74.50,
    NZD: 1.42,
    SGD: 1.35,
    THB: 33.25
};

// Currency symbols and names
const currencyInfo = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    JPY: { symbol: '¥', name: 'Japanese Yen' },
    AUD: { symbol: 'A$', name: 'Australian Dollar' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar' },
    CHF: { symbol: 'Fr', name: 'Swiss Franc' },
    CNY: { symbol: '¥', name: 'Chinese Yuan' },
    INR: { symbol: '₹', name: 'Indian Rupee' },
    NZD: { symbol: 'NZ$', name: 'New Zealand Dollar' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar' },
    THB: { symbol: '฿', name: 'Thai Baht' }
};

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const conversionResult = document.getElementById('conversionResult');

// Initialize currency select options
function initializeCurrencySelects() {
    const currencies = Object.keys(exchangeRates);
    
    currencies.forEach(currency => {
        const option = `
            <option value="${currency}">
                ${currency} - ${currencyInfo[currency].name}
            </option>
        `;
        fromCurrency.innerHTML += option;
        toCurrency.innerHTML += option;
    });
    
    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// Convert currency
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (isNaN(amount)) {
        conversionResult.innerHTML = 'Please enter a valid amount';
        return;
    }
    
    // Convert to USD first (if not already USD)
    const usdAmount = from === 'USD' ? amount : amount / exchangeRates[from];
    
    // Convert from USD to target currency
    const convertedAmount = to === 'USD' ? usdAmount : usdAmount * exchangeRates[to];
    
    // Format the result
    const formattedResult = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: to,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(convertedAmount);
    
    // Display the result with animation
    conversionResult.innerHTML = `
        <div class="conversion-text">
            ${amount} ${from} = <span class="highlight">${formattedResult}</span>
        </div>
        <div class="conversion-rate">
            1 ${from} = ${(exchangeRates[to] / exchangeRates[from]).toFixed(4)} ${to}
        </div>
    `;
}

// Add random fluctuation to exchange rates
function updateExchangeRates() {
    Object.keys(exchangeRates).forEach(currency => {
        if (currency !== 'USD') {
            const fluctuation = 1 + (Math.random() - 0.5) * 0.02; // ±1% change
            exchangeRates[currency] *= fluctuation;
        }
    });
    
    // Update conversion if values are entered
    if (amountInput.value) {
        convertCurrency();
    }
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .conversion-text {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }
    
    .highlight {
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .conversion-rate {
        color: #666;
        font-size: 0.9rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    #conversionResult {
        animation: fadeIn 0.3s ease-out;
    }
`;

document.head.appendChild(style);

// Event Listeners
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Initialize
initializeCurrencySelects();

// Update rates every 30 seconds
setInterval(updateExchangeRates, 30000); 