const readline = require("readline");

// Create an interface for reading input from the standard input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to calculate the result of the expression
function calculate(expression) {
  // Regular expression to match the format "a operator b" with or without spaces, allowing negative numbers
  const regex = /^\s*(-?\d*\.?\d+)\s*([+\-*/x])\s*(-?\d*\.?\d+)\s*$/;
  const match = expression.match(regex);

  // Check if the input matches the expected format
  if (!match) {
    return 'Invalid expression. Please use the format "a operator b".';
  }

  // Parse the first number (a), the operator, and the second number (b) from the matched groups
  const a = parseFloat(match[1]);
  const operator = match[2];
  const b = parseFloat(match[3]);

  // Validate that both parsed values are numbers
  if (isNaN(a) || isNaN(b)) {
    return "Invalid numbers. Please ensure both a and b are valid numbers.";
  }

  // Perform the arithmetic operation based on the operator
  switch (operator) {
    case "+":
      return a + b; // Addition
    case "-":
      return a - b; // Subtraction
    case "*":
    case "x": // Allow 'x' for multiplication
      return a * b; // Multiplication
    case "/":
      // Handle division by zero
      if (b === 0) {
        return "Error: Division by zero is not allowed.";
      }
      return a / b; // Division
    default:
      return "Invalid operator. Please use +, -, *, or /.";
  }
}

// Function to prompt the user for input and process it
function promptUser() {
  rl.question("Enter your expression (a operator b): ", (input) => {
    const result = calculate(input); // Calculate the result of the input
    console.log(`Result: ${result}`); // Output the result
    promptUser(); // Ask for another input
  });
}

// Start the calculator program
console.log("Simple Calculator");
console.log("Supported operators: +, -, *, /");
promptUser(); // Initiate user input prompt
