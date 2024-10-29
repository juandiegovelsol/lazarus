const imageContainer = document.querySelector('.image-container');
const paginationContainer = document.querySelector('.pagination');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
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

    // Fade transition
    // currentImage.classList.add('fade-out');
    // setTimeout(() => {
    //     currentImage.src = images[currentIndex];
    //     currentImage.classList.remove('fade-out');
    //     currentImage.classList.add('fade-in');
    // }, 500);

    // Slide transition
    if (currentImage) {
        if (currentIndex > images.indexOf(currentImage.src)) {
            currentImage.classList.add('slide-out-left');
            setTimeout(() => {
                currentImage.src = images[currentIndex];
                currentImage.classList.remove('slide-out-left');
                currentImage.classList.add('slide-in-left');
            }, 500);
        } else {
            currentImage.classList.add('slide-out-right');
            setTimeout(() => {
                currentImage.src = images[currentIndex];
                currentImage.classList.remove('slide-out-right');
                currentImage.classList.add('slide-in-right');
            }, 500);
        }
    } else {
        currentImage = document.createElement('img');
        currentImage.src = images[currentIndex];
        currentImage.classList.add('carousel-image');
        imageContainer.appendChild(currentImage);
    }
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
updateCarousel();