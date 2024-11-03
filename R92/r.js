/**
 * Finds the optimal path through a series of locations using a genetic algorithm.
 *
 * @param {Array<Object>} locations - An array of objects with x and y properties representing the locations to visit.
 * @param {Number} [entityCount=100] - The number of entities to use in the genetic algorithm.
 * @param {Number} [cycles=500] - The number of cycles to run the genetic algorithm.
 * @param {Number} [shuffleRate=0.01] - The rate at which to shuffle the path.
 * @returns {Object} An object containing the optimal path as an array of location indices and the length of that path.
 * @throws {Error} Throws an error if locations is not an array of objects with x and y properties,
 * if entityCount, cycles, or shuffleRate are not numbers.
 */
function optimalPathFinder(locations, entityCount = 100, cycles = 500, shuffleRate = 0.01) {
  // Define a function to measure the distance between two points
  function measureDistance(pointA, pointB) {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Define a function to calculate the length of a path
  function pathLength(path) {
    let totalLength = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalLength += measureDistance(locations[path[i]], locations[path[i + 1]]);
    }
    // Add the distance from the last location back to the first location to complete the loop
    totalLength += measureDistance(locations[path[path.length - 1]], locations[path[0]]);
    return totalLength;
  }

  // Define a function to create a random path
  function createPath() {
    const path = Array.from({ length: locations.length }, (_, i) => i);
    // Shuffle the path to create a random order
    for (let i = path.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [path[i], path[j]] = [path[j], path[i]];
    }
    return path;
  }

  // Define a function to initialize the entities
  function initializeEntities() {
    return Array.from({ length: entityCount }, createPath);
  }

  // Define a function to combine two paths to create a new path
  function combinePaths(basePath, partnerPath) {
    const start = Math.floor(Math.random() * basePath.length);
    const end = start + Math.floor(Math.random() * (basePath.length - start));
    const offspring = Array(basePath.length).fill(null);
    // Copy a section of the base path to the offspring
    for (let i = start; i < end; i++) {
      offspring[i] = basePath[i];
    }
    // Fill in the remaining locations from the partner path
    partnerPath.forEach((location) => {
      if (!offspring.includes(location)) {
        const index = offspring.indexOf(null);
        offspring[index] = location;
      }
    });
    return offspring;
  }

  // Define a function to shuffle a path
  function shufflePath(path) {
    for (let i = 0; i < path.length; i++) {
      if (Math.random() < shuffleRate) {
        const j = Math.floor(Math.random() * path.length);
        [path[i], path[j]] = [path[j], path[i]];
      }
    }
  }

  // Define a function to select the best entities
  function selectEntities(population) {
    const trialSize = Math.min(5, population.length);
    const trialGroup = [];
    for (let i = 0; i < trialSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      trialGroup.push(population[randomIndex]);
    }
    // Sort the trial group by path length
    trialGroup.sort((a, b) => pathLength(a) - pathLength(b));
    // Return the two best entities
    return [trialGroup[0], trialGroup[1]];
  }

  // Initialize the population
  let population = initializeEntities();

  // Run the genetic algorithm for the specified number of cycles
  for (let cycle = 0; cycle < cycles; cycle++) {
    const newGeneration = [];
    for (let i = 0; i < entityCount; i++) {
      // Select two parents
      const [parent1, parent2] = selectEntities(population);
      // Combine the parents to create a new path
      let child = combinePaths(parent1, parent2);
      // Shuffle the child path
      shufflePath(child);
      newGeneration.push(child);
    }
    // Replace the old population with the new generation
    population = newGeneration;
    // Sort the population by path length
    population.sort((a, b) => pathLength(a) - pathLength(b));
  }

  // Return the best path and its length
  return {
    path: population[0],
    length: pathLength(population[0])
  };
}