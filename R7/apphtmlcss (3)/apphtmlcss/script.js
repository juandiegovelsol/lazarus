const hamburgerIcon = document.getElementById("hamburger-icon");
const sidebar = document.getElementById("sidebar");

hamburgerIcon.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});
