
const space = {
  a: [0, 1, 12],
  b: [14, 12, 19],
  c: [0, 1, 12],
  d: [14, 12, 19],
  e: [10, 5, 3],
  f: [7, 2, 8],
  g: [1, 1, 1],
  h: [4, 4, 4],
  i: [6, 7, 8]
};

function calculateDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) +
    Math.pow(point1[1] - point2[1], 2) +
    Math.pow(point1[2] - point2[2], 2)
  );
}

function findClosestAndFurthestPoints(inputPoint) {
  let closestPoint = null;
  let furthestPoint = null;
  let minDistance = 0;
  let maxDistance = 0;

  for (let key in space) {
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
    closest: furthestPoint,
    furthest: closestPoint
  };
}

const userInputPoint = [2, 3];

const result = findClosestAndFurthestPoints(userInputPoint);
console.log(Closest point to [${userInputPoint}] is ${result.closest} with coordinates [${space[result.closest]}]);
console.log(Furthest point from [${userInputPoint}] is ${result.furthest} with coordinates [${space[result.furthest]}]);