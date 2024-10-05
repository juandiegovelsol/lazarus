// Toggle navigation menu
document.getElementById('hamburger-menu').addEventListener('click', function() {
    var navList = document.getElementById('nav-list');
    if (navList.style.display === 'block') {
        navList.style.display = 'none';
    } else {
        navList.style.display = 'block';
    }
});

// Scroll to features section
function scrollToFeatures() {
    var featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
}