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

function findClosestAndFurthestPoints(inputPoint, inputKey) {
  let closestPoint = null;
  let furthestPoint = null;
  let minDistance = Infinity;
  let maxDistance = -Infinity;

  for (let key in space) {
    if (key === inputKey) continue;

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

function getPointFromUser() {
  const pointName = prompt(
    "Enter the name of the point (e.g., 'a', 'b', etc.):"
  );

  if (pointName in space) {
    return { key: pointName, point: space[pointName] };
  } else {
    const x = parseFloat(prompt("Enter the x-coordinate:"));
    const y = parseFloat(prompt("Enter the y-coordinate:"));
    const z = parseFloat(prompt("Enter the z-coordinate:"));
    return { key: null, point: [x, y, z] };
  }
}

const userInput = getPointFromUser();
const result = findClosestAndFurthestPoints(userInput.point, userInput.key);

console.log(
  `Closest point to [${userInput.point}] is ${
    result.closest
  } with coordinates [${space[result.closest]}]`
);
console.log(
  `Furthest point from [${userInput.point}] is ${
    result.furthest
  } with coordinates [${space[result.furthest]}]`
);
