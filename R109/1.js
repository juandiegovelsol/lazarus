const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculate(expression) {
  // Regular expression to match the input format
  const match = expression.match(/^(-?\d*\.?\d+)([+\-*/])(-?\d*\.?\d+)$/);
  if (!match) {
    return 'Invalid expression. Please use the format "a operator b".';
  }

  const a = parseFloat(match[1]);
  const operator = match[2];
  const b = parseFloat(match[3]);

  if (isNaN(a) || isNaN(b)) {
    return "Invalid numbers. Please ensure both a and b are valid numbers.";
  }

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
    case "x": // Allow 'x' for multiplication, but note this won't work without spaces
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
    const result = calculate(input.trim()); // Remove leading/trailing spaces
    console.log(`Result: ${result}`);
    promptUser(); // Ask for another input
  });
}

console.log("Simple Calculator");
console.log("Supported operators: +, -, *, /");
promptUser();
