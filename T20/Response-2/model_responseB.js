let startButton, resetButton;
let learningRate = 0.001;
let training = false;
let currentEpoch = 0;
let dataPoints = [];
let epochs = 10000;
let w1, w2, bias;
let mse;

// --- p5.js 'Setup' ---
function setup() {
  createCanvas(500, 500);
  w1 = random();
  w2 = random();
  bias = random();
  
  dataPoints = generateXORData(100);

  plotData(dataPoints);
  drawBoundaryBox();

  startButton = createButton('Start');
  startButton.position(200, height + 20);
  startButton.mousePressed(startTraining);

  resetButton = createButton('Reset');
  resetButton.position(280, height + 20);
  resetButton.mousePressed(resetTraining);
}


// --- p5.js 'Loop' ---
function draw() {
  background(255);

  plotData(dataPoints);
  drawBoundaryBox();

  if (training && currentEpoch < epochs) {
    trainNetwork(dataPoints, learningRate);
    currentEpoch++;
  }

  updateDecisionBoundary();
  displayEpochAndMSE();
}

// --- Functions ---
function startTraining() {
    console.log("Start button pressed");
    training = true;
}

function resetTraining() {
    console.log("Reset button pressed");
    training = false;
    currentEpoch = 0;
    w1 = random(-1, 1);
    w2 = random(-1, 1);
    bias = random(-1, 1);
}

function generateXORData(numPointsPerRegion) {
    const points = [];
    const numPointsPerSide = Math.sqrt(numPointsPerRegion);
    const step = 1 / numPointsPerSide;

    for (let i = 0; i < numPointsPerSide; i++) {
        for (let j = 0; j < numPointsPerSide; j++) {
            const x = i * step;
            const y = j * step;
            points.push({ x: x, y: y, label: x < 0.5 && y < 0.5 || x > 0.5 && y > 0.5 ? 0 : 1 });
        }
    }

    return points;
}

function plotData(data) {
    stroke("black");

    data.forEach(d => {
        let px = map(d.x, 0, 1, 40, width - 40);
        let py = map(d.y, 0, 1, height - 40, 40);
        fill(d.label === 1 ? "white" : "black");
        ellipse(px, py, 8, 8);
        stroke(0);
    });
}

function predict(x, y) {
  let linearOutput = w1 * x + w2 * y + bias;
  sigmoidOutput = 1 / (1 + Math.exp(-linearOutput));

  return sigmoidOutput;
}

function computeMSE(data) {
  let totalError = 0;
  data.forEach(d => {
    let prediction = predict(d.x, d.y);
    let error = (prediction - d.label) ** 2;
    totalError += error;
  });
  return totalError / data.length;
}

function trainNetwork(data, lr) {
  data.forEach(d => {
    let prediction = predict(d.x, d.y);
    let error = prediction - d.label;

    w1 -= lr * error * d.x;
    w2 -= lr * error * d.y;
    bias -= lr * error;
  });

  mse = computeMSE(data);
}

function updateDecisionBoundary() {
    stroke("orange");
    strokeWeight(2);
    noFill();

    // Midpoint at (0.5, 0.5), weights are used to calculate slope
    let midpointX = 0.5;
    let midpointY = 0.5;
    let slope = -(w1 / w2);

    let x1 = 0;
    let y1 = midpointY + slope * (x1 - midpointX);
    let x2 = 1;
    let y2 = midpointY + slope * (x2 - midpointX);

    y1 = constrain(y1, 0, 1);
    y2 = constrain(y2, 0, 1);

    let px1 = map(x1, 0, 1, 0, width);
    let py1 = map(y1, 0, 1, height, 0);
    let px2 = map(x2, 0, 1, 0, width);
    let py2 = map(y2, 0, 1, height, 0);

    line(px1, py1, px2, py2);
}

function drawBoundaryBox() {
  stroke(0);
  strokeWeight(3);
  noFill();

  let x1 = map(0, 0, 1, 0, width);
  let y1 = map(0, 0, 1, height, 0);
  let x2 = map(1, 0, 1, 0, width);
  let y2 = map(1, 0, 1, height, 0);

  rect(x1, y2, x2 - x1, y1 - y2);
}

function displayEpochAndMSE() {
  fill(255, 255, 255, 200);
  stroke(0);
  strokeWeight(1);
  rect(width - 120, 100, 110, 50, 10);

  fill(0);
  textSize(16);
  textAlign(LEFT);
  stroke("orange");
  text(`Epoch: ${currentEpoch}`, width - 110, 120);
  text(`MSE: ${mse ? mse.toFixed(4) : "N/A"}`, width - 110, 140);

}
