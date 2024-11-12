const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculate(expression) {
  const parts = expression.split(" ");
  if (parts.length !== 3) {
    return 'Invalid expression. Please use the format "a operator b".';
  }

  const a = parseFloat(parts[0]);
  const operator = parts[1];
  const b = parseFloat(parts[2]);

  if (isNaN(a) || isNaN(b)) {
    return "Invalid numbers. Please ensure both a and b are valid numbers.";
  }

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
    case "x": // Allow 'x' for multiplication
      return a * b;
    case "/":
      if (b === 0) {
        return "Error: Division by zero is not allowed.";
      }
      return a / b;
    default:
      return "Invalid operator. Please use +, -, *, or /.";
  }
}

function promptUser() {
  rl.question("Enter your expression (a operator b): ", (input) => {
    const result = calculate(input);
    console.log(`Result: ${result}`);
    promptUser(); // Ask for another input
  });
}

console.log("Simple Calculator");
console.log("Supported operators: +, -, *, /");
promptUser();
