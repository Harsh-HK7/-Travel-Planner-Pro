// Initialize itinerary data
const itineraryDays = [];

// DOM Elements
const itineraryBoard = document.getElementById('itineraryBoard');

// Initialize Sortable.js for drag-and-drop
let sortables = [];

// Render itinerary board
function renderItinerary() {
    itineraryBoard.innerHTML = '';
    
    itineraryDays.forEach((day, dayIndex) => {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        dayColumn.innerHTML = `
            <div class="day-header">
                <h4>Day ${dayIndex + 1}</h4>
                <button onclick="removeDay(${dayIndex})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="activities-list" data-day="${dayIndex}">
                ${day.activities.map((activity, actIndex) => `
                    <div class="activity-card" draggable="true" data-id="${activity.id}">
                        <div class="activity-time">${activity.time}</div>
                        <div class="activity-content">
                            <div class="activity-title">${activity.title}</div>
                            <div class="activity-location">${activity.location}</div>
                            <div class="activity-notes">${activity.notes}</div>
                        </div>
                        <div class="activity-actions">
                            <button onclick="editActivity(${dayIndex}, ${actIndex})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="removeActivity(${dayIndex}, ${actIndex})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="add-activity">
                <button onclick="addActivity(${dayIndex})">
                    <i class="fas fa-plus"></i> Add Activity
                </button>
            </div>
        `;
        
        itineraryBoard.appendChild(dayColumn);
    });
    
    // Initialize drag-and-drop
    initializeDragAndDrop();
}

// Add new day
function addDay() {
    itineraryDays.push({
        activities: []
    });
    renderItinerary();
}

// Remove day
function removeDay(dayIndex) {
    if (confirm('Are you sure you want to remove this day?')) {
        itineraryDays.splice(dayIndex, 1);
        renderItinerary();
    }
}

// Add activity to day
function addActivity(dayIndex) {
    const time = prompt('Enter activity time (e.g., 09:00):');
    if (!time) return;
    
    const title = prompt('Enter activity title:');
    if (!title) return;
    
    const location = prompt('Enter location:');
    const notes = prompt('Enter any notes:');
    
    const activity = {
        id: Date.now(),
        time,
        title,
        location: location || '',
        notes: notes || ''
    };
    
    itineraryDays[dayIndex].activities.push(activity);
    sortActivitiesByTime(dayIndex);
    renderItinerary();
}

// Edit activity
function editActivity(dayIndex, activityIndex) {
    const activity = itineraryDays[dayIndex].activities[activityIndex];
    
    const time = prompt('Enter activity time:', activity.time);
    if (!time) return;
    
    const title = prompt('Enter activity title:', activity.title);
    if (!title) return;
    
    const location = prompt('Enter location:', activity.location);
    const notes = prompt('Enter any notes:', activity.notes);
    
    activity.time = time;
    activity.title = title;
    activity.location = location || '';
    activity.notes = notes || '';
    
    sortActivitiesByTime(dayIndex);
    renderItinerary();
}

// Remove activity
function removeActivity(dayIndex, activityIndex) {
    if (confirm('Are you sure you want to remove this activity?')) {
        itineraryDays[dayIndex].activities.splice(activityIndex, 1);
        renderItinerary();
    }
}

// Sort activities by time
function sortActivitiesByTime(dayIndex) {
    itineraryDays[dayIndex].activities.sort((a, b) => {
        const timeA = a.time.replace(':', '');
        const timeB = b.time.replace(':', '');
        return timeA - timeB;
    });
}

// Initialize drag-and-drop functionality
function initializeDragAndDrop() {
    const activityLists = document.querySelectorAll('.activities-list');
    
    activityLists.forEach(list => {
        let dragged = null;
        
        list.addEventListener('dragstart', (e) => {
            dragged = e.target;
            e.target.classList.add('dragging');
        });
        
        list.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
        
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(list, e.clientY);
            const currentElement = document.querySelector('.dragging');
            
            if (afterElement) {
                list.insertBefore(currentElement, afterElement);
            } else {
                list.appendChild(currentElement);
            }
        });
        
        list.addEventListener('drop', (e) => {
            e.preventDefault();
            const fromDayIndex = parseInt(dragged.parentElement.dataset.day);
            const toDayIndex = parseInt(list.dataset.day);
            const fromActivityId = parseInt(dragged.dataset.id);
            
            if (fromDayIndex !== toDayIndex) {
                // Move activity between days
                const activityIndex = itineraryDays[fromDayIndex].activities
                    .findIndex(act => act.id === fromActivityId);
                
                const activity = itineraryDays[fromDayIndex].activities[activityIndex];
                itineraryDays[fromDayIndex].activities.splice(activityIndex, 1);
                itineraryDays[toDayIndex].activities.push(activity);
                
                sortActivitiesByTime(toDayIndex);
                renderItinerary();
            }
        });
    });
}

// Helper function for drag-and-drop
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.activity-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Add destination to itinerary (called from destinations.js)
function addDestinationToItinerary(destName) {
    const dayIndex = prompt('Enter day number to add destination:') - 1;
    if (dayIndex < 0 || dayIndex >= itineraryDays.length) {
        alert('Invalid day number');
        return;
    }
    
    const time = prompt('Enter time for the destination visit:');
    if (!time) return;
    
    const activity = {
        id: Date.now(),
        time,
        title: `Visit ${destName}`,
        location: destName,
        notes: ''
    };
    
    itineraryDays[dayIndex].activities.push(activity);
    sortActivitiesByTime(dayIndex);
    renderItinerary();
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .itinerary-board {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
        overflow-x: auto;
    }
    
    .day-column {
        background: white;
        border-radius: var(--border-radius);
        padding: 1rem;
        min-height: 400px;
        display: flex;
        flex-direction: column;
    }
    
    .day-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--primary-color);
    }
    
    .activities-list {
        flex: 1;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .activity-card {
        background: #f5f5f5;
        border-radius: var(--border-radius);
        padding: 1rem;
        cursor: move;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .activity-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--box-shadow);
    }
    
    .activity-card.dragging {
        opacity: 0.5;
    }
    
    .activity-time {
        color: var(--primary-color);
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .activity-title {
        font-weight: bold;
        margin-bottom: 0.25rem;
    }
    
    .activity-location {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }
    
    .activity-notes {
        font-size: 0.9rem;
        color: #888;
    }
    
    .activity-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .add-activity {
        margin-top: 1rem;
        text-align: center;
    }
`;

document.head.appendChild(style);

// Initialize
renderItinerary(); 