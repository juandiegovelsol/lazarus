function toggleMenu() {
  const navList = document.getElementById("nav-list");
  navList.style.display = navList.style.display === "flex" ? "none" : "flex";
}

function scrollToFeatures() {
  const featuresSection = document.getElementById("features");
  featuresSection.scrollIntoView({ behavior: "smooth" });
}
