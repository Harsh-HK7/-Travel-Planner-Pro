// Sample gallery images
const galleryImages = [
    {
        url: 'https://source.unsplash.com/800x600/?travel,landmarks',
        title: 'Famous Landmarks',
        description: 'Iconic places around the world'
    },
    {
        url: 'https://source.unsplash.com/800x600/?travel,food',
        title: 'Local Cuisine',
        description: 'Delicious dishes from different cultures'
    },
    {
        url: 'https://source.unsplash.com/800x600/?travel,nature',
        title: 'Natural Wonders',
        description: 'Beautiful landscapes and scenery'
    },
    {
        url: 'https://source.unsplash.com/800x600/?travel,culture',
        title: 'Cultural Experiences',
        description: 'Local traditions and customs'
    },
    {
        url: 'https://source.unsplash.com/800x600/?travel,architecture',
        title: 'Architecture',
        description: 'Stunning buildings and structures'
    },
    {
        url: 'https://source.unsplash.com/800x600/?travel,people',
        title: 'People',
        description: 'Faces from around the world'
    }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

// Initialize gallery
function initializeGallery() {
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'gallery-card';
        imageCard.innerHTML = `
            <div class="gallery-image">
                <img src="${image.url}" alt="${image.title}"
                     loading="lazy">
                <div class="image-overlay">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            </div>
        `;
        
        imageCard.addEventListener('click', () => openModal(image));
        galleryGrid.appendChild(imageCard);
    });
}

// Open modal
function openModal(image) {
    modalImage.src = image.url;
    modalImage.alt = image.title;
    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalHandler() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
    .gallery-card {
        position: relative;
        cursor: pointer;
        overflow: hidden;
    }
    
    .gallery-image {
        position: relative;
        overflow: hidden;
    }
    
    .gallery-image img {
        transition: transform 0.3s ease;
    }
    
    .gallery-card:hover img {
        transform: scale(1.1);
    }
    
    .image-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 1rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    
    .gallery-card:hover .image-overlay {
        transform: translateY(0);
    }
    
    .image-overlay h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
    }
    
    .image-overlay p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.8;
    }
    
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        cursor: pointer;
    }
    
    .modal img {
        max-width: 90%;
        max-height: 90vh;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: var(--border-radius);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 1001;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        transition: background-color 0.3s;
    }
    
    .close-modal:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`;

document.head.appendChild(style);

// Event Listeners
closeModal.addEventListener('click', closeModalHandler);
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModalHandler();
    }
});

// Handle keyboard events
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.style.display === 'block') {
        closeModalHandler();
    }
});

// Initialize
initializeGallery();

// Add drag-to-scroll functionality
let isScrolling = false;
let startX;
let scrollLeft;

galleryGrid.addEventListener('mousedown', (e) => {
    isScrolling = true;
    startX = e.pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
});

galleryGrid.addEventListener('mouseleave', () => {
    isScrolling = false;
});

galleryGrid.addEventListener('mouseup', () => {
    isScrolling = false;
});

galleryGrid.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 2;
    galleryGrid.scrollLeft = scrollLeft - walk;
}); 