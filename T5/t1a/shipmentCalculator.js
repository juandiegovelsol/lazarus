function convertToDm(value, unit) {
  switch (unit) {
    case "m":
      return value * 10;
    case "cm":
      return value / 10;
    case "dm":
      return value;
    case "ft":
      return (value * 30.48) / 10;
    case "in":
      return (value * 2.54) / 10;
    default:
      return value;
  }
}

function calculateCost(length, width, height, units) {
  length = convertToDm(length, units);
  width = convertToDm(width, units);
  height = convertToDm(height, units);

  const volume = length * width * height;
  const pricePerDm3 = 1.5;
  const totalCost = volume * pricePerDm3;

  return {
    volume: volume.toFixed(2),
    pricePerDm3: pricePerDm3.toFixed(2),
    totalCost: totalCost.toFixed(2),
  };
}

export { calculateCost, convertToDm };
