// get the carousel container and pagination elements
const carouselContainer = document.querySelector(".carousel-container");
const pagination = document.querySelector(".pagination");
const carousel = document.querySelector(".carousel");

// set the image folder path and image file names
const imageFolder = "assets/";
const imageFiles = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
];

// create an array to store the image elements
const images = [];

// create the image elements and add them to the carousel
imageFiles.forEach((imageFile, index) => {
  const image = document.createElement("img");
  image.src = `${imageFolder}${imageFile}`;
  image.style.left = `${index * 100}%`;
  carousel.appendChild(image);
  images.push(image);
});

// create the pagination bars
imageFiles.forEach((_, index) => {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  if (index === 0) {
    bar.classList.add("active");
  }
  pagination.appendChild(bar);
});

// get the pagination bars
const paginationBars = document.querySelectorAll(".pagination .bar");

// set the initial active image index
let activeIndex = 0;

// function to update the active image and pagination bar
function updateActiveImage() {
  images.forEach((image, index) => {
    image.style.transform = `translateX(-${activeIndex * 100}%)`;
  });
  paginationBars.forEach((bar, index) => {
    bar.classList.toggle("active", index === activeIndex);
  });
}

// add event listeners to the pagination bars
paginationBars.forEach((bar, index) => {
  bar.addEventListener("click", () => {
    activeIndex = index;
    updateActiveImage();
  });
});

// add event listeners for keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    updateActiveImage();
  } else if (event.key === "ArrowRight") {
    activeIndex = (activeIndex + 1) % images.length;
    updateActiveImage();
  }
});

// add event listeners for swipe gestures
let touchStartX;
carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});
carousel.addEventListener("touchmove", (event) => {
  const touchMoveX = event.touches[0].clientX;
  if (touchMoveX - touchStartX > 50) {
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    updateActiveImage();
  } else if (touchMoveX - touchStartX < -50) {
    activeIndex = (activeIndex + 1) % images.length;
    updateActiveImage();
  }
});
