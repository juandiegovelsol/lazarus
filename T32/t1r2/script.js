// Select the parallax background element
const parallaxBackground = document.querySelector(".parallax-background");

// Select the elements that should be shown when they come into view
const boxes = document.querySelectorAll(".hidden");

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Function to handle the parallax effect
function handleParallax() {
  const scrollPosition = window.scrollY;
  parallaxBackground.style.transform = `translateZ(-1px) scale(2) translateY(${
    scrollPosition * 0.5
  }px)`;
}

// Function to handle the show effect
function handleShow() {
  boxes.forEach((box) => {
    if (isInViewport(box)) {
      box.classList.add("show");
    }
  });
}

// Add event listeners for scroll and load events
window.addEventListener("scroll", function () {
  handleParallax();
  handleShow();
});

window.addEventListener("load", function () {
  handleShow();
});
