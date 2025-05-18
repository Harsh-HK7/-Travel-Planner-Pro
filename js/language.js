// Language data by travel type
const languageData = {
    business: {
        categories: ['Greetings', 'Business Terms', 'Meeting', 'Numbers'],
        phrases: {
            'en': {
                'Greetings': [
                    'Hello/Good morning',
                    'Nice to meet you',
                    'Goodbye',
                    'Thank you'
                ],
                'Business Terms': [
                    'Meeting',
                    'Contract',
                    'Agreement',
                    'Deadline'
                ],
                'Meeting': [
                    'Let\'s schedule a meeting',
                    'I agree',
                    'I disagree',
                    'Could you explain?'
                ],
                'Numbers': [
                    'One, Two, Three',
                    'First, Second, Third',
                    'Hundred, Thousand',
                    'Price, Cost, Budget'
                ]
            }
        }
    },
    leisure: {
        categories: ['Basic Phrases', 'Directions', 'Food & Drink', 'Shopping'],
        phrases: {
            'en': {
                'Basic Phrases': [
                    'Hello/Hi',
                    'Please',
                    'Thank you',
                    'You\'re welcome'
                ],
                'Directions': [
                    'Where is...?',
                    'Left, Right',
                    'Straight ahead',
                    'How far?'
                ],
                'Food & Drink': [
                    'Restaurant',
                    'Menu please',
                    'The bill please',
                    'Delicious'
                ],
                'Shopping': [
                    'How much?',
                    'Too expensive',
                    'Discount?',
                    'I\'ll take it'
                ]
            }
        }
    },
    adventure: {
        categories: ['Emergency', 'Nature', 'Activities', 'Weather'],
        phrases: {
            'en': {
                'Emergency': [
                    'Help!',
                    'Hospital',
                    'Police',
                    'I need a doctor'
                ],
                'Nature': [
                    'Mountain',
                    'Beach',
                    'River',
                    'Forest'
                ],
                'Activities': [
                    'Hiking',
                    'Swimming',
                    'Camping',
                    'Climbing'
                ],
                'Weather': [
                    'Sunny',
                    'Rainy',
                    'Hot',
                    'Cold'
                ]
            }
        }
    },
    foodie: {
        categories: ['Restaurant', 'Food Types', 'Dietary', 'Compliments'],
        phrases: {
            'en': {
                'Restaurant': [
                    'Table for...',
                    'Menu please',
                    'Water please',
                    'The bill please'
                ],
                'Food Types': [
                    'Spicy',
                    'Sweet',
                    'Vegetarian',
                    'Local specialty'
                ],
                'Dietary': [
                    'Allergies',
                    'No meat',
                    'Gluten-free',
                    'Not too spicy'
                ],
                'Compliments': [
                    'Delicious!',
                    'Compliments to the chef',
                    'Very good',
                    'Perfect'
                ]
            }
        }
    }
};

// Supported languages
const supportedLanguages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'zh': 'Chinese',
    'ko': 'Korean',
    'th': 'Thai',
    'vi': 'Vietnamese'
};

// DOM Elements
const travelType = document.getElementById('travelType');
const targetLanguage = document.getElementById('targetLanguage');
const cheatSheetContent = document.getElementById('cheatSheetContent');

// Initialize language select
function initializeLanguageSelect() {
    targetLanguage.innerHTML = '';
    Object.entries(supportedLanguages).forEach(([code, name]) => {
        targetLanguage.innerHTML += `
            <option value="${code}">${name}</option>
        `;
    });
}

// Generate cheat sheet
function generateCheatSheet() {
    const type = travelType.value;
    const language = targetLanguage.value;
    
    const typeData = languageData[type];
    if (!typeData) return;
    
    cheatSheetContent.innerHTML = '';
    
    // Create cheat sheet container
    const container = document.createElement('div');
    container.className = 'cheat-sheet';
    
    // Add travel type header
    container.innerHTML = `
        <div class="cheat-sheet-header">
            <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Travel Phrases</h3>
            <div class="language-badge">${supportedLanguages[language]}</div>
        </div>
    `;
    
    // Add categories and phrases
    typeData.categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'phrase-category';
        categorySection.innerHTML = `
            <h4>${category}</h4>
            <div class="phrases">
                ${typeData.phrases['en'][category].map(phrase => `
                    <div class="phrase-item">
                        <div class="original">${phrase}</div>
                        <div class="translation">
                            ${getTranslation(phrase, language)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(categorySection);
    });
    
    cheatSheetContent.appendChild(container);
}

// Get translation (mock function - in real app, would use translation API)
function getTranslation(phrase, targetLang) {
    // This is a mock translation - in a real app, you'd use a translation API
    return `[${targetLang.toUpperCase()}] ${phrase}`;
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .cheat-sheet {
        background: white;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .cheat-sheet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--primary-color);
    }
    
    .language-badge {
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        font-weight: bold;
    }
    
    .phrase-category {
        margin-bottom: 1.5rem;
    }
    
    .phrase-category h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .phrases {
        display: grid;
        gap: 1rem;
    }
    
    .phrase-item {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: var(--border-radius);
        transition: transform 0.2s;
    }
    
    .phrase-item:hover {
        transform: translateX(5px);
    }
    
    .original {
        color: #666;
        margin-bottom: 0.5rem;
    }
    
    .translation {
        font-weight: bold;
        color: var(--text-color);
    }
    
    @media print {
        .cheat-sheet {
            break-inside: avoid;
        }
        
        .phrase-category {
            break-inside: avoid;
        }
    }
`;

document.head.appendChild(style);

// Event Listeners
travelType.addEventListener('change', generateCheatSheet);
targetLanguage.addEventListener('change', generateCheatSheet);

// Initialize
initializeLanguageSelect();
generateCheatSheet(); 