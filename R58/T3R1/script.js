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

document.querySelector('.toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const darkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
        document.querySelector('.header').classList.add('dark-mode');
        document.querySelector('.nav-links').classList.add('dark-mode');
        document.querySelector('.login-button').classList.add('dark-mode');
        document.querySelector('.toggle-nav').classList.add('dark-mode');
        document.querySelector('.login-modal-content').classList.add('dark-mode');
        document.querySelector('.close-modal').classList.add('dark-mode');
        document.querySelector('.login-modal-button').classList.add('dark-mode');
        document.querySelector('.cancel-modal-button').classList.add('dark-mode');
        document.querySelector('.main-content').classList.add('dark-mode');
        document.querySelector('.intro').classList.add('dark-mode');
        document.querySelector('.features').classList.add('dark-mode');
        document.querySelectorAll('.feature').forEach(function(feature) {
            feature.classList.add('dark-mode');
        });
        document.querySelector('.testimonials').classList.add('dark-mode');
        document.querySelectorAll('.testimonial').forEach(function(testimonial) {
            testimonial.classList.add('dark-mode');
        });
        document.querySelector('.prev-testimonial').classList.add('dark-mode');
        document.querySelector('.next-testimonial').classList.add('dark-mode');
        document.querySelector('.footer').classList.add('dark-mode');
        document.querySelectorAll('.social-links a').forEach(function(link) {
            link.classList.add('dark-mode');
        });
    } else {
        document.querySelector('.header').classList.remove('dark-mode');
        document.querySelector('.nav-links').classList.remove('dark-mode');
        document.querySelector('.login-button').classList.remove('dark-mode');
        document.querySelector('.toggle-nav').classList.remove('dark-mode');
        document.querySelector('.login-modal-content').classList.remove('dark-mode');
        document.querySelector('.close-modal').classList.remove('dark-mode');
        document.querySelector('.login-modal-button').classList.remove('dark-mode');
        document.querySelector('.cancel-modal-button').classList.remove('dark-mode');
        document.querySelector('.main-content').classList.remove('dark-mode');
        document.querySelector('.intro').classList.remove('dark-mode');
        document.querySelector('.features').classList.remove('dark-mode');
        document.querySelectorAll('.feature').forEach(function(feature) {
            feature.classList.remove('dark-mode');
        });
        document.querySelector('.testimonials').classList.remove('dark-mode');
        document.querySelectorAll('.testimonial').forEach(function(testimonial) {
            testimonial.classList.remove('dark-mode');
        });
        document.querySelector('.prev-testimonial').classList.remove('dark-mode');
        document.querySelector('.next-testimonial').classList.remove('dark-mode');
        document.querySelector('.footer').classList.remove('dark-mode');
        document.querySelectorAll('.social-links a').forEach(function(link) {
            link.classList.remove('dark-mode');
        });
    }
});

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const darkMode = document.body.classList.contains('dark-mode');
    if (darkMode) {
        document.querySelector('.header').classList.add('dark-mode');
        document.querySelector('.nav-links').classList.add('dark-mode');
        document.querySelector('.login-button').classList.add('dark-mode');
        document.querySelector('.toggle-nav').classList.add('dark-mode');
        document.querySelector('.login-modal-content').classList.add('dark-mode');
        document.querySelector('.close-modal').classList.add('dark-mode');
        document.querySelector('.login-modal-button').classList.add('dark-mode');
        document.querySelector('.cancel-modal-button').classList.add('dark-mode');
        document.querySelector('.main-content').classList.add('dark-mode');
        document.querySelector('.intro').classList.add('dark-mode');
        document.querySelector('.features').classList.add('dark-mode');
        document.querySelectorAll('.feature').forEach(function(feature) {
            feature.classList.add('dark-mode');
        });
        document.querySelector('.testimonials').classList.add('dark-mode');
        document.querySelectorAll('.testimonial').forEach(function(testimonial) {
            testimonial.classList.add('dark-mode');
        });
        document.querySelector('.prev-testimonial').classList.add('dark-mode');
        document.querySelector('.next-testimonial').classList.add('dark-mode');
        document.querySelector('.footer').classList.add('dark-mode');
        document.querySelectorAll('.social-links a').forEach(function(link) {
            link.classList.add('dark-mode');
        });
    }
}

document.querySelector('.login-modal-button').addEventListener('click', function() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const rememberMe = document.querySelector('#remember-me').checked;
    if (rememberMe) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
    }
});

if (sessionStorage.getItem('username') && sessionStorage.getItem('password')) {
    document.querySelector('#username').value = sessionStorage.getItem('username');
    document.querySelector('#password').value = sessionStorage.getItem('password');
}

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