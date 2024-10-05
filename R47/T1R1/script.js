const space = {
  a: [0, 1, 12],
  b: [14, 12, 19],
  c: [0, 1, 12],
  d: [14, 12, 19],
  e: [10, 5, 3],
  f: [7, 2, 8],
  g: [1, 1, 1],
  h: [4, 4, 4],
  i: [6, 7, 8],
};

function calculateDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) +
      Math.pow(point1[1] - point2[1], 2) +
      Math.pow(point1[2] - point2[2], 2)
  );
}

function findClosestAndFurthestPoints(inputPoint) {
  // Check if inputPoint exists in space
  let inputPointKey = null;
  for (let key in space) {
    if (
      space[key][0] === inputPoint[0] &&
      space[key][1] === inputPoint[1] &&
      space[key][2] === inputPoint[2]
    ) {
      inputPointKey = key;
      break;
    }
  }

  let closestPoint = null;
  let furthestPoint = null;
  let minDistance = Infinity;
  let maxDistance = -Infinity;

  for (let key in space) {
    if (key === inputPointKey) {
      continue;
    }

    const point = space[key];
    const distance = calculateDistance(inputPoint, point);

    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = key;
    }

    if (distance > maxDistance) {
      maxDistance = distance;
      furthestPoint = key;
    }
  }

  return {
    closest: closestPoint,
    furthest: furthestPoint,
  };
}

function getInputPoint() {
  const point = prompt("Enter the coordinates of the point (x, y, z): ");
  const coordinates = point.split(",").map(Number);
  if (coordinates.length !== 3) {
    throw new Error("Invalid input. Please enter exactly 3 coordinates.");
  }
  return coordinates;
}

const userInputPoint = getInputPoint();

const result = findClosestAndFurthestPoints(userInputPoint);
console.log(
  `Closest point to [${userInputPoint}] is ${
    result.closest
  } with coordinates [${space[result.closest]}]`
);
console.log(
  `Furthest point from [${userInputPoint}] is ${
    result.furthest
  } with coordinates [${space[result.furthest]}]`
);
