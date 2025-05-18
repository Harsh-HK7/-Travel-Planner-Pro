// Initialize budget data directly
const budgetItems = [];

// DOM Elements
const budgetList = document.getElementById('budgetList');
const budgetTotal = document.getElementById('budgetTotal');
const budgetItemInput = document.getElementById('budgetItem');
const budgetDescriptionInput = document.getElementById('budgetDescription');
const budgetCategorySelect = document.getElementById('budgetCategory');

// Add budget item
function addBudgetItem() {
    const amount = parseFloat(budgetItemInput.value);
    const description = budgetDescriptionInput.value.trim();
    const category = budgetCategorySelect.value;
    
    if (isNaN(amount) || !description) {
        alert('Please enter both amount and description');
        return;
    }
    
    const item = {
        id: Date.now(),
        amount,
        description,
        category,
        date: new Date().toISOString()
    };
    
    budgetItems.push(item);
    renderBudget();
    
    // Clear inputs
    budgetItemInput.value = '';
    budgetDescriptionInput.value = '';
}

// Remove budget item
function removeBudgetItem(id) {
    if (confirm('Are you sure you want to remove this item?')) {
        const index = budgetItems.findIndex(item => item.id === id);
        if (index !== -1) {
            budgetItems.splice(index, 1);
            renderBudget();
        }
    }
}

// Calculate total by category
function calculateTotalsByCategory() {
    return budgetItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = 0;
        }
        acc[item.category] += item.amount;
        return acc;
    }, {});
}

// Render budget list and totals
function renderBudget() {
    // Render items list
    budgetList.innerHTML = '';
    
    const categoryTotals = calculateTotalsByCategory();
    const categories = Object.keys(categoryTotals);
    
    categories.forEach(category => {
        const categoryItems = budgetItems.filter(item => item.category === category);
        
        const categorySection = document.createElement('div');
        categorySection.className = 'budget-category';
        categorySection.innerHTML = `
            <h3>
                ${category.charAt(0).toUpperCase() + category.slice(1)}
                <span class="category-total">
                    ${formatCurrency(categoryTotals[category])}
                </span>
            </h3>
            <div class="category-items"></div>
        `;
        
        const itemsList = categorySection.querySelector('.category-items');
        
        categoryItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'budget-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <span class="item-description">${item.description}</span>
                    <span class="item-amount">${formatCurrency(item.amount)}</span>
                </div>
                <div class="item-date">${formatDate(item.date)}</div>
                <button onclick="removeBudgetItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            itemsList.appendChild(itemElement);
        });
        
        budgetList.appendChild(categorySection);
    });
    
    // Update total
    const total = budgetItems.reduce((sum, item) => sum + item.amount, 0);
    budgetTotal.innerHTML = `
        <div class="total-label">Total Budget:</div>
        <div class="total-amount">${formatCurrency(total)}</div>
    `;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .budget-category {
        background: white;
        border-radius: var(--border-radius);
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .budget-category h3 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .category-total {
        color: var(--primary-color);
        font-size: 0.9rem;
    }
    
    .budget-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: #f5f5f5;
        border-radius: var(--border-radius);
    }
    
    .item-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-right: 1rem;
    }
    
    .item-description {
        margin-right: 1rem;
    }
    
    .item-amount {
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .item-date {
        color: #666;
        font-size: 0.8rem;
        margin-right: 1rem;
    }
    
    .total-label {
        font-size: 1.2rem;
        color: #666;
    }
    
    .total-amount {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .budget-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: white;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-top: 1rem;
    }
`;

document.head.appendChild(style);

// Initialize
renderBudget(); 