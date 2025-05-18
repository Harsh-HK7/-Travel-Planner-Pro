// Sticker types and their emojis
const stickerTypes = {
    'activity': ['🏃', '🏊', '🚴', '🏄', '⛷️', '🎣', '🎨', '🎭', '🎪', '🎢'],
    'food': ['🍕', '🍜', '🍣', '🍱', '🥘', '🍷', '🍺', '☕', '🍰', '🍦'],
    'transport': ['✈️', '🚂', '🚌', '🚗', '🚢', '🚁', '🚲', '🛵', '🚡', '🚊'],
    'weather': ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌈', '❄️', '🌊', '🌪️', '🌡️'],
    'landmark': ['🗽', '🗼', '🗿', '⛩️', '🏰', '🏛️', '⛪', '🕌', '🕍', '🏝️'],
    'mood': ['😊', '🤩', '😎', '🥳', '😌', '🤔', '😴', '🥱', '😅', '🤗']
};

// Initialize moodboard data
const moodboardStickers = [];

// DOM Elements
const moodboardCanvas = document.getElementById('moodboardCanvas');
const stickerTime = document.getElementById('stickerTime');

// Initialize canvas
function initializeCanvas() {
    moodboardCanvas.innerHTML = '';
    
    // Add time markers
    const timeMarkers = document.createElement('div');
    timeMarkers.className = 'time-markers';
    
    for (let hour = 0; hour < 24; hour++) {
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.textContent = `${hour.toString().padStart(2, '0')}:00`;
        timeMarkers.appendChild(marker);
    }
    
    moodboardCanvas.appendChild(timeMarkers);
    
    // Add sticker container
    const stickerContainer = document.createElement('div');
    stickerContainer.className = 'sticker-container';
    moodboardCanvas.appendChild(stickerContainer);
    
    // Render existing stickers
    renderStickers();
}

// Render stickers
function renderStickers() {
    const container = moodboardCanvas.querySelector('.sticker-container');
    container.innerHTML = '';
    
    moodboardStickers.forEach((sticker, index) => {
        const stickerElement = createStickerElement(sticker, index);
        container.appendChild(stickerElement);
    });
}

// Create sticker element
function createStickerElement(sticker, index) {
    const element = document.createElement('div');
    element.className = 'sticker';
    element.style.left = `${sticker.x}%`;
    element.style.top = `${sticker.y}%`;
    element.style.transform = `rotate(${sticker.rotation}deg)`;
    
    element.innerHTML = `
        <div class="sticker-content">
            <span class="sticker-emoji">${sticker.emoji}</span>
            <span class="sticker-time">${sticker.time}</span>
            ${sticker.note ? `<span class="sticker-note">${sticker.note}</span>` : ''}
        </div>
        <button class="remove-sticker" onclick="removeSticker(${index})">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Make sticker draggable
    makeDraggable(element);
    
    return element;
}

// Add sticker
function addSticker() {
    const time = stickerTime.value || '12:00';
    
    // Create sticker selection modal
    const modal = document.createElement('div');
    modal.className = 'sticker-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Select Sticker Type</h3>
            <div class="sticker-categories">
                ${Object.entries(stickerTypes).map(([category, emojis]) => `
                    <div class="category">
                        <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                        <div class="emoji-grid">
                            ${emojis.map(emoji => `
                                <button class="emoji-button" onclick="selectSticker('${emoji}', '${time}')">
                                    ${emoji}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Select sticker
function selectSticker(emoji, time) {
    const note = prompt('Add a note (optional):');
    
    const sticker = {
        emoji,
        time,
        note,
        x: Math.random() * 80 + 10, // Random position between 10% and 90%
        y: Math.random() * 80 + 10,
        rotation: Math.random() * 20 - 10 // Random rotation between -10 and 10 degrees
    };
    
    moodboardStickers.push(sticker);
    renderStickers();
    
    // Close modal
    document.querySelector('.sticker-modal').remove();
}

// Remove sticker
function removeSticker(index) {
    if (confirm('Remove this sticker?')) {
        moodboardStickers.splice(index, 1);
        renderStickers();
    }
}

// Make element draggable
function makeDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    element.addEventListener('mousedown', dragStart);
    element.addEventListener('mousemove', drag);
    element.addEventListener('mouseup', dragEnd);
    element.addEventListener('mouseleave', dragEnd);
    
    function dragStart(e) {
        if (e.target.closest('.remove-sticker')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === element) {
            isDragging = true;
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            const rect = moodboardCanvas.getBoundingClientRect();
            const x = (currentX / rect.width) * 100;
            const y = (currentY / rect.height) * 100;
            
            element.style.left = `${x}%`;
            element.style.top = `${y}%`;
            
            // Update sticker position in data
            const index = Array.from(element.parentElement.children).indexOf(element);
            moodboardStickers[index].x = x;
            moodboardStickers[index].y = y;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .moodboard-canvas {
        position: relative;
        min-height: 600px;
        background: #fff;
        border: 2px dashed #ddd;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .time-markers {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 30px;
        background: #f5f5f5;
        display: flex;
        padding: 0 1rem;
        overflow-x: auto;
    }
    
    .time-marker {
        flex: 0 0 auto;
        padding: 0.5rem;
        color: #666;
        font-size: 0.8rem;
    }
    
    .sticker-container {
        position: relative;
        min-height: 570px;
        margin-top: 30px;
    }
    
    .sticker {
        position: absolute;
        cursor: move;
        padding: 1rem;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        transition: transform 0.2s;
        user-select: none;
    }
    
    .sticker:hover {
        transform: scale(1.05) rotate(var(--rotation)) !important;
    }
    
    .sticker-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    
    .sticker-emoji {
        font-size: 2rem;
    }
    
    .sticker-time {
        font-size: 0.8rem;
        color: #666;
    }
    
    .sticker-note {
        font-size: 0.9rem;
        text-align: center;
        max-width: 150px;
        word-wrap: break-word;
    }
    
    .remove-sticker {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        opacity: 0;
        transition: opacity 0.2s;
    }
    
    .sticker:hover .remove-sticker {
        opacity: 1;
    }
    
    .sticker-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: var(--border-radius);
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }
    
    .sticker-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    
    .category h4 {
        margin-bottom: 1rem;
        color: var(--primary-color);
    }
    
    .emoji-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
    }
    
    .emoji-button {
        font-size: 1.5rem;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: var(--border-radius);
        background: white;
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .emoji-button:hover {
        transform: scale(1.1);
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
`;

document.head.appendChild(style);

// Initialize
initializeCanvas(); 