document.querySelector(".toggle-bg").addEventListener("click", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("alt-bg");
});

// Add event listener to the get started button
document.querySelector(".btn").addEventListener("click", function () {
  alert("Get started button clicked!");
});
