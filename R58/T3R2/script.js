document.querySelector('.toggle-bg').addEventListener('click', function() {
    const header = document.querySelector('.header');
    const currentColor = header.style.backgroundColor;
    const newColor = currentColor === 'rgb(0, 123, 255)' ? 'rgb(255, 69, 0)' : 'rgb(0, 123, 255)';
    header.style.backgroundColor = newColor;
    const toggleButton = document.querySelector('.toggle-bg');
    toggleButton.style.color = newColor === 'rgb(0, 123, 255)' ? '#007BFF' : '#FF4500';
});

document.querySelector('.login-button').addEventListener('click', function() {
    document.querySelector('.login-modal').style.display = 'flex';
});

document.querySelector('.close-modal').addEventListener('click', function() {
    document.querySelector('.login-modal').style.display = 'none';
});

document.querySelector('.cancel-modal-button').addEventListener('click', function() {
    document.querySelector('.login-modal').style.display = 'none';
});

document.querySelector('.toggle-nav').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

testimonials[currentTestimonial].classList.add('active');

setInterval(function() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}, 5000);

document.querySelector('.prev-testimonial').addEventListener('click', function() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
});

document.querySelector('.next-testimonial').addEventListener('click', function() {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
});

document.querySelector('.dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const themePreference = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('themePreference', themePreference);
    updateTheme();
});

function updateTheme() {
    const themePreference = localStorage.getItem('themePreference');
    if (themePreference === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
}

updateTheme();

document.querySelector('.login-modal-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    if (rememberMe) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
    }
});