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

    // Show Explore button after title animation
    brandName.addEventListener("animationend", () => {
        exploreButton.style.display = "block";
    });

    // Function to show section with animation
    const showSection = (section) => {
        document.querySelectorAll('section').forEach(sec => sec.style.display = 'none'); // Hide all sections
        section.style.display = 'block'; // Show the target section
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.content');
        if (title) {
            title.classList.remove('animate-title'); // Reset animation
            void title.offsetWidth; // Trigger reflow to restart animation
            title.classList.add('animate-title'); // Animate title
        }
        if (content) {
            content.classList.remove('animate-content'); // Reset animation
            void content.offsetWidth; // Trigger reflow to restart animation
            content.classList.add('animate-content'); // Animate content
        }
    };

    // Click event to navigate to features section
    exploreButton.addEventListener("click", () => {
        showSection(featuresSection);
    });

    // Click events for individual feature boxes to navigate to respective sections
    designBox.addEventListener("click", () => showSection(designSection));
    soundBox.addEventListener("click", () => showSection(soundSection));
    modelsBox.addEventListener("click", () => showSection(modelsSection));

    // Back to features
    backToFeaturesButtons.forEach(button => {
        button.addEventListener("click", () => {
            showSection(featuresSection);
        });
    });

    // Back to home
    backToHomeButton.addEventListener("click", () => {
        showSection(document.getElementById("intro"));
    });

    // Play video on hover in sound section
    const soundVideos = document.querySelectorAll('#sound-videos video');
    soundVideos.forEach(video => {
        video.addEventListener('mouseover', () => {
            video.play();
        });
        video.addEventListener('mouseout', () => {
            video.pause();
        });
    });
});