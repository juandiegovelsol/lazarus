document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const brandName = document.getElementById("brand-name");
  const exploreButton = document.getElementById("explore-button");
  const featuresSection = document.getElementById("features");
  const designBox = document.getElementById("design-box");
  const soundBox = document.getElementById("sound-box");
  const modelsBox = document.getElementById("models-box");
  const designSection = document.getElementById("design-section");
  const soundSection = document.getElementById("sound-section");
  const modelsSection = document.getElementById("models-section");
  const backToFeaturesButtons = document.querySelectorAll("#back-to-features");
  const backToHomeButton = document.getElementById("back-to-home");
  const soundVideos = document.querySelectorAll("#sound-section video");

  // Show Explore button after title animation
  brandName.addEventListener("animationend", () => {
    exploreButton.style.display = "block";
  });

  // Function to show section with title animation
  const showSection = (section) => {
    document
      .querySelectorAll("section")
      .forEach((sec) => (sec.style.display = "none")); // Hide all sections
    section.style.display = "block"; // Show the target section
    const title = section.querySelector(".section-title");
    const content = section.querySelector(".content");
    const button = section.querySelector("button");

    title.classList.remove("animate-title");
    content.style.display = "none";
    button.style.display = "none";

    setTimeout(() => {
      title.classList.add("animate-title");
    }, 100);

    title.addEventListener(
      "transitionend",
      () => {
        content.style.display = "block";
        button.style.display = "block";
      },
      { once: true }
    );
  };

  // Explore button to show Features section
  exploreButton.addEventListener("click", () => {
    showSection(featuresSection);
  });

  // Feature boxes click events
  designBox.addEventListener("click", () => {
    showSection(designSection);
  });

  soundBox.addEventListener("click", () => {
    showSection(soundSection);
  });

  modelsBox.addEventListener("click", () => {
    showSection(modelsSection);
  });

  // Back to Features
  backToFeaturesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(featuresSection);
    });
  });

  // Back to Home
  backToHomeButton.addEventListener("click", () => {
    showSection(document.getElementById("intro"));
  });

  // Update the JavaScript code for video hover effect

  soundVideos.forEach((video) => {
    video.addEventListener("mouseover", () => {
      video.play();
    });
    video.addEventListener("mouseout", () => {
      video.pause();
      video.currentTime = 0;
      video.load(); // Reload the video to show the initial image
    });
  });
});
