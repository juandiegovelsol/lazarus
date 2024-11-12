// Import necessary modules
// If using a module system, you can import three.js like this:
// import * as THREE from 'three';

// Set up the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer({
  antialias: true,
});

// Set up the renderer and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("clock").appendChild(renderer.domElement);

// Create a group to hold the clock
let clockGroup = new THREE.Group();
scene.add(clockGroup);

// Create the clock
let clock = new THREE.Group();
clockGroup.add(clock);

// Create the clock's background
let backgroundGeometry = new THREE.PlaneGeometry(10, 5);
let backgroundMaterial = new THREE.MeshBasicMaterial({
  color: 0x333333,
});
let background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
clock.add(background);

// Create the clock's numbers
let numbers = [];
let numberGeometry = new THREE.PlaneGeometry(1, 2);
let numberMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
for (let i = 0; i < 10; i++) {
  let number = new THREE.Mesh(numberGeometry, numberMaterial);
  number.position.x = i * 1.1 - 4.5;
  numbers.push(number);
  clock.add(number);
}

// Create the clock's separators
let separatorGeometry = new THREE.PlaneGeometry(0.1, 2);
let separatorMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
let separator1 = new THREE.Mesh(separatorGeometry, separatorMaterial);
separator1.position.x = -1.5;
clock.add(separator1);
let separator2 = new THREE.Mesh(separatorGeometry, separatorMaterial);
separator2.position.x = 1.5;
clock.add(separator2);

// Position the camera and clock
camera.position.z = 10;
clock.position.z = -5;

// Function to update the clock
function updateClock() {
  let date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  for (let i = 0; i < numbers.length; i++) {
    if (i < 2) {
      numbers[i].scale.y = hours[i] === "1" ? 1 : 0;
    } else if (i < 4) {
      numbers[i].scale.y = minutes[i - 2] === "1" ? 1 : 0;
    } else if (i < 6) {
      numbers[i].scale.y = seconds[i - 4] === "1" ? 1 : 0;
    } else {
      numbers[i].scale.y = 0;
    }
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updateClock();
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Handle window resizes
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
