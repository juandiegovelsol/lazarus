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
});

window.addEventListener("load", function () {
  boxes.forEach((box) => {
    if (isInViewport(box)) {
      box.classList.add("show");
    }
  });
});
