// Get the thumbnails and main image elements
const thumbnails = document.querySelectorAll(".thumbnails img");
const mainImage = document.querySelector(".main-image img");

// Add event listeners to the thumbnails
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    // Update the main image src
    mainImage.src = thumbnail.src;

    // Remove the active class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));

    // Add the active class to the clicked thumbnail
    thumbnail.classList.add("active");
  });
});
