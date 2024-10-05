let startButton1, resetButton1, predictButton1;
let startButton2, resetButton2, predictButton2;
let learningRate = 0.001;
let training1 = false;
let training2 = false;
let showPredictions1 = false;
let showPredictions2 = false;
let currentEpoch1 = 0;
let currentEpoch2 = 0;
let dataPoints = [];
let epochs = 10000;
let w11, w12, bias1;
let w21, w22, w23, w24, bias21, bias22;
let mse1, mse2;

// --- p5.js 'Setup' ---
function setup() {
  createCanvas(500, 1000);
  w11 = random();
  w12 = random();
  bias1 = random();
  
  w21 = random();
  w22 = random();
  w23 = random();
  w24 = random();
  bias21 = random();
  bias22 = random();
  
  dataPoints = generateXORData(100);

  plotData1(dataPoints);
  drawBoundaryBox1();
  plotData2(dataPoints);
  drawBoundaryBox2();

  startButton1 = createButton('Start');
  startButton1.position(200, 520);
  startButton1.mousePressed(startTraining1);

  resetButton1 = createButton('Reset');
  resetButton1.position(280, 520);
  resetButton1.mousePressed(resetTraining1);

  predictButton1 = createButton('Show Predictions');
  predictButton1.position(360, 520);
  predictButton1.mousePressed(togglePredictions1);

  startButton2 = createButton('Start');
  startButton2.position(200, 1020);
  startButton2.mousePressed(startTraining2);

  resetButton2 = createButton('Reset');
  resetButton2.position(280, 1020);
  resetButton2.mousePressed(resetTraining2);

  predictButton2 = createButton('Show Predictions');
  predictButton2.position(360, 1020);
  predictButton2.mousePressed(togglePredictions2);

  createElement('h2', 'Perceptron Layout:').position(550, 20);
  createElement('p', 'Input 1: x').position(550, 60);
  createElement('p', 'Input 2: y').position(550, 90);
  createElement('p', 'Weight 1: ').position(550, 120);
  createElement('p', 'Weight 2: ').position(550, 150);
  createElement('p', 'Bias: ').position(550, 180);
  createElement('p', 'Output:').position(550, 210);
}

// --- p5.js 'Loop' ---
function draw() {
  background(255);

  if (showPredictions1) {
    plotPredictions1(dataPoints);
  } else {
    plotData1(dataPoints);
  }

  drawBoundaryBox1();

  if (training1 && currentEpoch1 < epochs) {
    trainNetwork1(dataPoints, learningRate);
    currentEpoch1++;
  }

  updateDecisionBoundary1();
  displayEpochAndMSE1();
  updatePerceptronLayout();

  if (showPredictions2) {
    plotPredictions2(dataPoints);
  } else {
    plotData2(dataPoints);
  }

  drawBoundaryBox2();

  if (training2 && currentEpoch2 < epochs) {
    trainNetwork2(dataPoints, learningRate);
    currentEpoch2++;
  }

  updateDecisionBoundary2();
  displayEpochAndMSE2();
}

// --- Functions ---
function startTraining1() {
    console.log("Start button pressed");
    training1 = true;
}

function resetTraining1() {
    console.log("Reset button pressed");
    training1 = false;
    currentEpoch1 = 0;
    w11 = random(-1, 1);
    w12 = random(-1, 1);
    bias1 = random(-1, 1);
}

function togglePredictions1() {
  showPredictions1 = !showPredictions1;
  if (showPredictions1) {
    predictButton1.html('Hide Predictions');
  } else {
    predictButton1.html('Show Predictions');
  }
}

function startTraining2() {
    console.log("Start button pressed");
    training2 = true;
}

function resetTraining2() {
    console.log("Reset button pressed");
    training2 = false;
    currentEpoch2 = 0;
    w21 = random(-1, 1);
    w22 = random(-1, 1);
    w23 = random(-1, 1);
    w24 = random(-1, 1);
    bias21 = random(-1, 1);
    bias22 = random(-1, 1);
}

function togglePredictions2() {
  showPredictions2 = !showPredictions2;
  if (showPredictions2) {
    predictButton2.html('Hide Predictions');
  } else {
    predictButton2.html('Show Predictions');
  }
}

function generateXORData(numPointsPerRegion) {
    const points = [];
    const numPointsPerSide = Math.sqrt(numPointsPerRegion);
    const step = 1 / numPointsPerSide;

    for (let i = 0; i < numPointsPerSide; i++) {
        for (let j = 0; j < numPointsPerSide; j++) {
            x = i * step * 0.5;
            y = j * step * 0.5;
            points.push({ x: x, y: y, label: 0 });
        }
    }

    for (let i = 0; i < numPointsPerSide; i++) {
        for (let j = 0; j < numPointsPerSide; j++) {
            x = i * step * 0.5;
            y = (j * step * 0.5) + 0.5;
            points.push({ x: x, y: y, label: 1 });
        }
    }

    for (let i = 0; i < numPointsPerSide; i++) {
        for (let j = 0; j < numPointsPerSide; j++) {
            x = (i * step * 0.5) + 0.5;
            y = j * step * 0.5;
            points.push({ x: x, y: y, label: 1 });
        }
    }

    for (let i = 0; i < numPointsPerSide; i++) {
        for (let j = 0; j < numPointsPerSide; j++) {
            const x = (i * step * 0.5) + 0.5;
            const y = (j * step * 0.5) + 0.5;
            points.push({ x: x, y: y, label: 0 });
        }
    }

    return points;
}

function plotData1(data) {
    stroke("black");

    data.forEach(d => {
        let px = map(d.x + 0.025, 0, 1, 0, width);
        let py = map(d.y + 0.025, 0, 1, height/2, 0);
        fill(d.label === 1 ? "white" : "black");
        ellipse(px, py, 8, 8);
        stroke(0);
    });
}

function plotPredictions1(data) {
    stroke("black");

    data.forEach(d => {
        let px = map(d.x + 0.025, 0, 1, 0, width);
        let py = map(d.y + 0.025, 0, 1, height/2, 0);
        let prediction = predict1(d.x, d.y);
        fill(prediction > 0.5 ? "white" : "black");
        ellipse(px, py, 8, 8);
        stroke(0);
    });
}

function predict1(x, y) {
  let linearOutput = w11 * x + w12 * y + bias1;
  sigmoidOutput = 1 / (1 + Math.exp(-linearOutput));

  return sigmoidOutput;
}

function computeMSE1(data) {
  let totalError = 0;
  data.forEach(d => {
    let prediction = predict1(d.x, d.y);
    let error = (prediction - d.label) ** 2;
    totalError += error;
  });
  return totalError / data.length;
}

function trainNetwork1(data, lr) {
  data.forEach(d => {
    let prediction = predict1(d.x, d.y);
    let error = prediction - d.label;

    w11 -= lr * error * d.x;
    w12 -= lr * error * d.y;
    bias1 -= lr * error;
  });

  mse1 = computeMSE1(data);
}

function updateDecisionBoundary1() {
    stroke("orange");
    strokeWeight(2);
    noFill();

    // Midpoint at (0.5, 0.5), weights are used to calculate slope
    let midpointX = 0.5;
    let midpointY = 0.5;
    let slope = -(w11 / w12);

    let x1 = 0;
    let y1 = midpointY + slope * (x1 - midpointX);
    let x2 = 1;
    let y2 = midpointY + slope * (x2 - midpointX);

    y1 = constrain(y1, 0, 1);
    y2 = constrain(y2, 0, 1);

    let px1 = map(x1, 0, 1, 0, width);
    let py1 = map(y1, 0, 1, height/2, 0);
    let px2 = map(x2, 0, 1, 0, width);
    let py2 = map(y2, 0, 1, height/2, 0);

    line(px1, py1, px2, py2);
}

function drawBoundaryBox1() {
  stroke(0);
  strokeWeight(3);
  noFill();

  let x1 = map(0, 0, 1, 0, width);
  let y1 = map(0, 0, 1, height/2, 0);
  let x2 = map(1, 0, 1, 0, width);
  let y2 = map(1, 0, 1, height/2, 0);

  rect(x1, y2, x2 - x1, y1 - y2);
}

function displayEpochAndMSE1() {
  fill(255, 255, 255, 200);
  stroke(0);
  strokeWeight(1);
  rect(width - 120, 100, 110, 50, 10);

  fill(0);
  textSize(16);
  textAlign(LEFT);
  stroke("orange")
  text(`Epoch: ${currentEpoch1}`, width - 110, 120);
  text(`MSE: ${mse1 ? mse1.toFixed(4) : "N/A"}`, width - 110, 140);
}

function updatePerceptronLayout() {
  selectAll('p')[2].html(`Weight 1: ${w11.toFixed(4)}`);
  selectAll('p')[3].html(`Weight 2: ${w12.toFixed(4)}`);
  selectAll('p')[4].html(`Bias: ${bias1.toFixed(4)}`);
}

function plotData2(data) {
    stroke("black");

    data.forEach(d => {
        let px = map(d.x + 0.025, 0, 1, 0, width);
        let py = map(d.y + 0.025, 0, 1, height, height/2);
        fill(d.label === 1 ? "white" : "black");
        ellipse(px, py, 8, 8);
        stroke(0);
    });
}

function plotPredictions2(data) {
    stroke("black");

    data.forEach(d => {
        let px = map(d.x + 0.025, 0, 1, 0, width);
        let py = map(d.y + 0.025, 0, 1, height, height/2);
        let prediction = predict2(d.x, d.y);
        fill(prediction > 0.5 ? "white" : "black");
        ellipse(px, py, 8, 8);
        stroke(0);
    });
}

function predict2(x, y) {
  let hidden1 = sigmoid(w21 * x + w22 * y + bias21);
  let hidden2 = sigmoid(w23 * x + w24 * y + bias22);
  let output = sigmoid(hidden1 + hidden2);
  return output;
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function computeMSE2(data) {
  let totalError = 0;
  data.forEach(d => {
    let prediction = predict2(d.x, d.y);
    let error = (prediction - d.label) ** 2;
    totalError += error;
  });
  return totalError / data.length;
}

function trainNetwork2(data, lr) {
  data.forEach(d => {
    let prediction = predict2(d.x, d.y);
    let error = prediction - d.label;

    let hidden1 = sigmoid(w21 * d.x + w22 * d.y + bias21);
    let hidden2 = sigmoid(w23 * d.x + w24 * d.y + bias22);

    w21 -= lr * error * hidden1 * (1 - hidden1) * d.x;
    w22 -= lr * error * hidden1 * (1 - hidden1) * d.y;
    bias21 -= lr * error * hidden1 * (1 - hidden1);

    w23 -= lr * error * hidden2 * (1 - hidden2) * d.x;
    w24 -= lr * error * hidden2 * (1 - hidden2) * d.y;
    bias22 -= lr * error * hidden2 * (1 - hidden2);
  });

  mse2 = computeMSE2(data);
}

function updateDecisionBoundary2() {
  // No need to draw a decision boundary for the 2-layer network
}

function drawBoundaryBox2() {
  stroke(0);
  strokeWeight(3);
  noFill();

  let x1 = map(0, 0, 1, 0, width);
  let y1 = map(0, 0, 1, height, height/2);
  let x2 = map(1, 0, 1, 0, width);
  let y2 = map(1, 0, 1, height, height/2);

  rect(x1, y2, x2 - x1, y1 - y2);
}

function displayEpochAndMSE2() {
  fill(255, 255, 255, 200);
  stroke(0);
  strokeWeight(1);
  rect(width - 120, 600, 110, 50, 10);

  fill(0);
  textSize(16);
  textAlign(LEFT);
  stroke("orange")
  text(`Epoch: ${currentEpoch2}`, width - 110, 620);
  text(`MSE: ${mse2 ? mse2.toFixed(4) : "N/A"}`, width - 110, 640);
}