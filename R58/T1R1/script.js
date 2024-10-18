document.querySelector('.toggle-bg').addEventListener('click', function() {
    const header = document.querySelector('.header');
    const currentColor = header.style.backgroundColor;
    const newColor = currentColor === 'rgb(0, 123, 255)' ? 'rgb(255, 69, 0)' : 'rgb(0, 123, 255)';
    header.style.backgroundColor = newColor;
    const toggleButton = document.querySelector('.toggle-bg');
    toggleButton.style.color = newColor === 'rgb(0, 123, 255)' ? '#007BFF' : '#FF4500';
});