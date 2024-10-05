const { calculateCost, convertToDm } = require("./calculator");

describe("calculateCost function", () => {
  it("should return the correct total cost for a given dimension box", () => {
    const length = 10;
    const width = 5;
    const height = 2;
    const units = "dm";

    const result = calculateCost(length, width, height, units);
    expect(result.volume).toBe("100.00");
    expect(result.pricePerDm3).toBe("1.50");
    expect(result.totalCost).toBe("150.00");
  });

  it("should return the correct total cost for a given dimension box with different units", () => {
    const length = 1;
    const width = 1;
    const height = 1;
    const units = "m";

    const result = calculateCost(length, width, height, units);
    expect(result.volume).toBe("1000.00");
    expect(result.pricePerDm3).toBe("1.50");
    expect(result.totalCost).toBe("1500.00");
  });
});

describe("convertToDm function", () => {
  it("should convert meters to decimeters correctly", () => {
    const value = 1;
    const unit = "m";
    const result = convertToDm(value, unit);
    expect(result).toBe(10);
  });

  it("should convert centimeters to decimeters correctly", () => {
    const value = 10;
    const unit = "cm";
    const result = convertToDm(value, unit);
    expect(result).toBe(1);
  });

  it("should convert feet to decimeters correctly", () => {
    const value = 1;
    const unit = "ft";
    const result = convertToDm(value, unit);
    expect(result).toBeCloseTo(3.048);
  });

  it("should convert inches to decimeters correctly", () => {
    const value = 1;
    const unit = "in";
    const result = convertToDm(value, unit);
    expect(result).toBeCloseTo(0.254);
  });
});
