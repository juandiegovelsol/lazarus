import { calculateCost, convertToDm } from "./shipmentCalculator";

describe("convertToDm function", () => {
  it("converts meters to decimeters", () => {
    expect(convertToDm(1, "m")).toBe(10);
  });

  it("converts centimeters to decimeters", () => {
    expect(convertToDm(10, "cm")).toBe(1);
  });

  it("converts decimeters to decimeters", () => {
    expect(convertToDm(1, "dm")).toBe(1);
  });

  it("converts feet to decimeters", () => {
    expect(convertToDm(1, "ft")).toBeCloseTo(3.048);
  });

  it("converts inches to decimeters", () => {
    expect(convertToDm(1, "in")).toBeCloseTo(0.254);
  });
});

describe("calculateCost function", () => {
  it("calculates the total cost for a given dimension", () => {
    const result = calculateCost(1, 2, 3, "dm");
    expect(result.volume).toBe("6.00");
    expect(result.pricePerDm3).toBe("1.50");
    expect(result.totalCost).toBe("9.00");
  });

  it("calculates the total cost for a different unit", () => {
    const result = calculateCost(1, 2, 3, "m");
    expect(result.volume).toBe("6000.00");
    expect(result.pricePerDm3).toBe("1.50");
    expect(result.totalCost).toBe("9000.00");
  });
});
