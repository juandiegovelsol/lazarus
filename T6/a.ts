/* const primeFactorization = (input: number | number[]) => {
  const getPrimeFactors = (num: number) => {
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
  } else {
    return getPrimeFactors(input);
  }
};

console.log(primeFactorization(10));

console.log(primeFactorization([10, 15, 21])); */
