const boxes = document.querySelectorAll(".hidden");

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

window.addEventListener("scroll", function () {
  boxes.forEach((box) => {
    if (isInViewport(box)) {
      box.classList.add("show");
    }
  });
  // Parallax effect
  const scrollPosition = window.scrollY;
  const parallaxBackground = document.querySelector(".parallax-background");
  parallaxBackground.style.transform = `translateZ(-1px) scale(2) translateY(-${
    scrollPosition / 2
  }px)`;
});

window.addEventListener("load", function () {
  boxes.forEach((box) => {
    if (isInViewport(box)) {
      box.classList.add("show");
    }
  });
});
