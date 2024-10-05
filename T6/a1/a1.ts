const primeFactorization = (input: number | number[]): string | string[] => {
  const getPrimeFactors = (num: number): string => {
    if (!Number.isInteger(num) || num < 2) {
      return `Error: Input must be an integer greater than or equal to 2.`;
    }

    let factors: number[] = [];
    let divisor = 2;

    while (num !== 1) {
      while (num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      }
      divisor++;
    }

    return `Prime factors: ${factors.join(", ")}`;
  };

  if (Array.isArray(input)) {
    return input.map((num) => getPrimeFactors(num));
  } else if (typeof input === "number") {
    return getPrimeFactors(input);
  } else {
    return "Error: Input must be a number or an array of numbers.";
  }
};

// Example usage:
console.log(primeFactorization(100)); // Prime factors: 2, 2, 5, 5
console.log(primeFactorization([100, 200, 300]));
// ['Prime factors: 2, 2, 5, 5', 'Prime factors: 2, 2, 2, 5, 5', 'Prime factors: 2, 2, 3, 5, 5']
