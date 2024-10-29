const imageContainer = document.querySelector('.image-container');
const paginationContainer = document.querySelector('.pagination');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let images = [];
let currentIndex = 0;
let currentImage;

// Load images from assets folder
for (let i = 1; i <= 3; i++) {
    images.push(`assets/image${i}.jpg`);
}

// Create pagination bars
images.forEach((image, index) => {
    const paginationBar = document.createElement('div');
    paginationBar.classList.add('pagination-bar');
    if (index === 0) {
        paginationBar.classList.add('active');
    }
    paginationBar.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
    paginationContainer.appendChild(paginationBar);
});

// Update carousel display
function updateCarousel() {
    const paginationBars = document.querySelectorAll('.pagination-bar');
    paginationBars.forEach((bar, index) => {
        if (index === currentIndex) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
    if (currentImage) {
        currentImage.classList.add('fade-out');
        setTimeout(() => {
            currentImage.remove();
            currentImage = null;
        }, 500);
    }
    setTimeout(() => {
        currentImage = document.createElement('img');
        currentImage.src = images[currentIndex];
        currentImage.classList.add('carousel-image', 'fade-in');
        imageContainer.appendChild(currentImage);
    }, 500);
}

// Handle previous and next arrow clicks
prevArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

// Initialize carousel display
currentImage = document.createElement('img');
currentImage.src = images[0];
currentImage.classList.add('carousel-image', 'fade-in');
imageContainer.appendChild(currentImage);