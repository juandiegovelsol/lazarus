// Get the hamburger icon and sidebar elements
const hamburgerIcon = document.getElementById("hamburger-icon");
const sidebar = document.getElementById("sidebar");

// Add an event listener to the hamburger icon
hamburgerIcon.addEventListener("click", () => {
  // Toggle the 'show' class on the sidebar
  sidebar.classList.toggle("show");
});
