const imageContainer = document.querySelector('.image-container');
const paginationContainer = document.querySelector('.pagination');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let images = [];
let currentIndex = 0;

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
    imageContainer.querySelector('img').src = images[currentIndex];
}

// Handle previous and next button clicks
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

// Initialize carousel display
imageContainer.innerHTML = `<img src="${images[0]}" alt="" class="carousel-image">`;