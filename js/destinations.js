// Destinations data directly in JavaScript
const destinations = [
    {
        name: 'Paris',
        region: 'europe',
        emoji: '🇫🇷',
        description: 'City of Love and Lights',
        image: 'images/destinations/paris.jpg'
    },
    {
        name: 'Tokyo',
        region: 'asia',
        emoji: '🇯🇵',
        description: 'Modern meets Traditional',
        image: 'images/destinations/tokyo.jpg'
    },
    {
        name: 'New York',
        region: 'americas',
        emoji: '🇺🇸',
        description: 'The City That Never Sleeps',
        image: 'images/destinations/newyork.jpg'
    },
    {
        name: 'Cape Town',
        region: 'africa',
        emoji: '🇿🇦',
        description: 'Where Mountains Meet the Ocean',
        image: 'images/destinations/capetown.jpg'
    },
    {
        name: 'Sydney',
        region: 'oceania',
        emoji: '🇦🇺',
        description: 'Harbor City Paradise',
        image: 'images/destinations/sydney.jpg'
    },
    {
        name: 'Rome',
        region: 'europe',
        emoji: '🇮🇹',
        description: 'Eternal City of History',
        image: 'images/destinations/rome.jpg'
    },
    {
        name: 'Bangkok',
        region: 'asia',
        emoji: '🇹🇭',
        description: 'City of Angels',
        image: 'images/destinations/bangkok.jpg'
    },
    {
        name: 'Rio de Janeiro',
        region: 'americas',
        emoji: '🇧🇷',
        description: 'Marvelous City',
        image: 'images/destinations/rio.jpg'
    }
];

// DOM Elements
const destinationList = document.getElementById('destinationList');
const regionFilter = document.getElementById('regionFilter');

// Render destinations
function renderDestinations(region = 'all') {
    destinationList.innerHTML = '';
    
    const filteredDestinations = destinations.filter(dest => 
        region === 'all' || dest.region === region
    );
    
    filteredDestinations.forEach(dest => {
        const destCard = document.createElement('div');
        destCard.className = 'destination-card';
        destCard.innerHTML = `
            <div class="destination-image">
                <img src="${dest.image}" alt="${dest.name}">
            </div>
            <div class="destination-info">
                <h3>${dest.name} ${dest.emoji}</h3>
                <p>${dest.description}</p>
                <button onclick="addToItinerary('${dest.name}')">
                    Add to Itinerary
                </button>
            </div>
        `;
        destinationList.appendChild(destCard);
    });
}

// Add destination to itinerary
function addToItinerary(destName) {
    if (typeof addDestinationToItinerary === 'function') {
        addDestinationToItinerary(destName);
    } else {
        alert('Itinerary feature will be available soon!');
    }
}

// Event Listeners
regionFilter.addEventListener('change', (e) => renderDestinations(e.target.value));

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .destination-card {
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        transition: transform 0.3s;
    }
    
    .destination-card:hover {
        transform: translateY(-5px);
    }
    
    .destination-image {
        height: 200px;
        overflow: hidden;
    }
    
    .destination-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .destination-info {
        padding: 1rem;
    }
    
    .destination-info h3 {
        margin: 0 0 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .destination-info p {
        margin: 0 0 1rem;
        color: #666;
    }
`;

document.head.appendChild(style);

// Initial render
renderDestinations(); 