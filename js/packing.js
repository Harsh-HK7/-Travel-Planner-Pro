// Initialize packing list data directly
const packingList = {
    essentials: [
        { name: 'Passport', checked: false },
        { name: 'Travel Insurance', checked: false },
        { name: 'Wallet', checked: false }
    ],
    clothes: [
        { name: 'T-shirts', checked: false },
        { name: 'Pants', checked: false },
        { name: 'Underwear', checked: false }
    ],
    electronics: [
        { name: 'Phone Charger', checked: false },
        { name: 'Power Bank', checked: false },
        { name: 'Camera', checked: false }
    ],
    toiletries: [
        { name: 'Toothbrush', checked: false },
        { name: 'Toothpaste', checked: false },
        { name: 'Shampoo', checked: false }
    ]
};

// DOM Elements
const packingListElement = document.getElementById('packingList');
const categoryFilter = document.getElementById('categoryFilter');

// Render packing list
function renderPackingList(category = 'all') {
    packingListElement.innerHTML = '';
    
    Object.entries(packingList).forEach(([categoryName, items]) => {
        if (category === 'all' || category === categoryName) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-section';
            categoryDiv.innerHTML = `
                <h3>${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h3>
                <div class="items-list"></div>
            `;
            
            const itemsList = categoryDiv.querySelector('.items-list');
            
            items.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `
                    <input type="checkbox" id="${categoryName}-${index}" 
                           ${item.checked ? 'checked' : ''}>
                    <label for="${categoryName}-${index}">${item.name}</label>
                    <button onclick="deleteItem('${categoryName}', ${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                const checkbox = itemDiv.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', () => toggleItem(categoryName, index));
                
                itemsList.appendChild(itemDiv);
            });
            
            const addItemDiv = document.createElement('div');
            addItemDiv.className = 'add-item';
            addItemDiv.innerHTML = `
                <input type="text" placeholder="Add new item">
                <button onclick="addItem('${categoryName}')">
                    <i class="fas fa-plus"></i>
                </button>
            `;
            
            categoryDiv.appendChild(addItemDiv);
            packingListElement.appendChild(categoryDiv);
        }
    });
}

// Add new category
function addCategory() {
    const categoryName = prompt('Enter category name:');
    if (categoryName && !packingList[categoryName.toLowerCase()]) {
        packingList[categoryName.toLowerCase()] = [];
        updateCategoryFilter();
        renderPackingList();
    }
}

// Update category filter options
function updateCategoryFilter() {
    categoryFilter.innerHTML = '<option value="all">All Items</option>';
    Object.keys(packingList).forEach(category => {
        categoryFilter.innerHTML += `
            <option value="${category}">${
                category.charAt(0).toUpperCase() + category.slice(1)
            }</option>
        `;
    });
}

// Add new item to category
function addItem(category) {
    const input = event.target.parentElement.querySelector('input[type="text"]');
    const itemName = input.value.trim();
    
    if (itemName) {
        packingList[category].push({
            name: itemName,
            checked: false
        });
        input.value = '';
        renderPackingList(categoryFilter.value);
    }
}

// Toggle item checked status
function toggleItem(category, index) {
    packingList[category][index].checked = !packingList[category][index].checked;
}

// Delete item
function deleteItem(category, index) {
    if (confirm('Are you sure you want to delete this item?')) {
        packingList[category].splice(index, 1);
        renderPackingList(categoryFilter.value);
    }
}

// Event Listeners
categoryFilter.addEventListener('change', (e) => renderPackingList(e.target.value));

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .category-section {
        margin-bottom: 2rem;
    }
    
    .items-list {
        display: grid;
        gap: 0.5rem;
    }
    
    .item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem;
        background: #f5f5f5;
        border-radius: var(--border-radius);
    }
    
    .add-item {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }
    
    .add-item input {
        flex: 1;
    }
`;

document.head.appendChild(style);

// Initial render
updateCategoryFilter();
renderPackingList(); 