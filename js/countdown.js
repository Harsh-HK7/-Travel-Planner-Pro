// DOM Elements
const tripStart = document.getElementById('tripStart');
const tripEnd = document.getElementById('tripEnd');
const countdownDisplay = document.getElementById('countdownDisplay');
const dailyPlannerContainer = document.getElementById('dailyPlannerContainer');

// Initialize trip dates with defaults
const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

tripStart.value = today.toISOString().split('T')[0];
tripEnd.value = nextWeek.toISOString().split('T')[0];

// Daily plans data structure
const dailyPlans = {};

// Update countdown
function updateCountdown() {
    const now = new Date();
    const startDate = new Date(tripStart.value);
    const endDate = new Date(tripEnd.value);
    
    // Calculate time differences
    const timeToStart = startDate - now;
    const tripDuration = endDate - startDate;
    
    // Create countdown display
    if (timeToStart > 0) {
        const days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        countdownDisplay.innerHTML = `
            <div class="countdown-numbers">
                <div class="countdown-item">
                    <span class="number">${days}</span>
                    <span class="label">days</span>
                </div>
                <div class="countdown-item">
                    <span class="number">${hours}</span>
                    <span class="label">hours</span>
                </div>
            </div>
            <div class="trip-duration">
                Trip duration: ${Math.ceil(tripDuration / (1000 * 60 * 60 * 24))} days
            </div>
        `;
    } else if (now >= startDate && now <= endDate) {
        countdownDisplay.innerHTML = '<div class="trip-active">Trip in progress! 🌟</div>';
    } else {
        countdownDisplay.innerHTML = '<div class="trip-ended">Trip has ended</div>';
    }
}

// Render daily planner
function renderDailyPlanner() {
    const startDate = new Date(tripStart.value);
    const endDate = new Date(tripEnd.value);
    dailyPlannerContainer.innerHTML = '';
    
    // Create a day card for each day of the trip
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];
        const dayPlans = dailyPlans[dateString] || { notes: '', activities: [] };
        
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header">
                <h4>${formatDate(date)}</h4>
            </div>
            <div class="day-content">
                <textarea
                    placeholder="Add notes for this day..."
                    data-date="${dateString}"
                    class="day-notes"
                >${dayPlans.notes}</textarea>
                <div class="activities" data-date="${dateString}">
                    ${dayPlans.activities.map(activity => `
                        <div class="activity">
                            <span>${activity}</span>
                            <button onclick="removeActivity('${dateString}', '${activity}')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="add-activity">
                    <input type="text" placeholder="Add activity">
                    <button onclick="addActivity('${dateString}')">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        dailyPlannerContainer.appendChild(dayCard);
        
        // Add event listener for notes
        const textarea = dayCard.querySelector('.day-notes');
        textarea.addEventListener('change', () => {
            updateDayPlans(dateString, 'notes', textarea.value);
        });
    }
}

// Format date for display
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add activity to a day
function addActivity(dateString) {
    const dayCard = document.querySelector(`[data-date="${dateString}"]`).parentElement;
    const input = dayCard.querySelector('input[type="text"]');
    const activity = input.value.trim();
    
    if (activity) {
        if (!dailyPlans[dateString]) {
            dailyPlans[dateString] = { notes: '', activities: [] };
        }
        
        dailyPlans[dateString].activities.push(activity);
        renderDailyPlanner();
        input.value = '';
    }
}

// Remove activity from a day
function removeActivity(dateString, activity) {
    if (dailyPlans[dateString]) {
        dailyPlans[dateString].activities = dailyPlans[dateString].activities
            .filter(a => a !== activity);
        renderDailyPlanner();
    }
}

// Update day plans
function updateDayPlans(dateString, field, value) {
    if (!dailyPlans[dateString]) {
        dailyPlans[dateString] = { notes: '', activities: [] };
    }
    dailyPlans[dateString][field] = value;
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .countdown-numbers {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 1rem;
    }
    
    .countdown-item {
        text-align: center;
    }
    
    .countdown-item .number {
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--primary-color);
        display: block;
    }
    
    .countdown-item .label {
        color: #666;
        font-size: 0.9rem;
    }
    
    .trip-duration {
        text-align: center;
        color: #666;
    }
    
    .trip-active {
        text-align: center;
        color: var(--primary-color);
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .day-card {
        background: white;
        border-radius: var(--border-radius);
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: var(--box-shadow);
    }
    
    .day-header {
        margin-bottom: 1rem;
    }
    
    .day-notes {
        width: 100%;
        min-height: 100px;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: var(--border-radius);
        resize: vertical;
    }
    
    .activities {
        margin-bottom: 1rem;
    }
    
    .activity {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #f5f5f5;
        border-radius: var(--border-radius);
        margin-bottom: 0.5rem;
    }
    
    .add-activity {
        display: flex;
        gap: 0.5rem;
    }
    
    .add-activity input {
        flex: 1;
    }
`;

document.head.appendChild(style);

// Event Listeners
tripStart.addEventListener('change', () => {
    updateCountdown();
    renderDailyPlanner();
});

tripEnd.addEventListener('change', () => {
    updateCountdown();
    renderDailyPlanner();
});

// Initialize
updateCountdown();
renderDailyPlanner();

// Update countdown every minute
setInterval(updateCountdown, 60000); 