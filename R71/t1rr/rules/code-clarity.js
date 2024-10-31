const esprima = require("esprima");

const analyze = (code, preferences) => {
  const issues = [];

  // Parse the code and get AST
  const ast = esprima.parseScript(code, { loc: true });
  const functions = ast.body.filter(
    (node) => node.type === "FunctionDeclaration"
  );

  functions.forEach((func) => {
    const complexity = calculateComplexity(func);
    const nestingDepth = calculateNestingDepth(func);
    const functionLength = calculateFunctionLength(func);

    // Check for complexity threshold
    if (complexity > preferences.threshold) {
      issues.push({
        type: "violated",
        rule: "code-clarity",
        category: "Code Clarity",
        message: `Function '${func.id.name}' has a complexity of ${complexity}, exceeding the threshold of ${preferences.threshold}.`,
        line: func.loc.start.line,
        column: func.loc.start.column,
      });
    } else {
      issues.push({
        type: "compliant",
        rule: "code-clarity",
        category: "Code Clarity",
      });
    }

    // Check for excessive nesting
    if (nestingDepth > preferences.maxNestingDepth) {
      issues.push({
        type: "warning",
        rule: "code-clarity",
        category: "Code Clarity",
        message: `Function '${func.id.name}' has a nesting depth of ${nestingDepth}, exceeding the allowed maximum of ${preferences.maxNestingDepth}.`,
        line: func.loc.start.line,
        column: func.loc.start.column,
      });
    }

    // Check for excessive function length
    if (functionLength > preferences.maxFunctionLength) {
      issues.push({
        type: "warning",
        rule: "code-clarity",
        category: "Code Clarity",
        message: `Function '${func.id.name}' has a length of ${functionLength} lines, exceeding the allowed maximum of ${preferences.maxFunctionLength} lines.`,
        line: func.loc.start.line,
        column: func.loc.start.column,
      });
    }
  });

  return issues;
};

// Calculate cyclomatic complexity based on control structures, logical operators, and conditional expressions
const calculateComplexity = (func) => {
  let complexity = 1; // Start with 1 for the function entry point

  // Traverse through function body statements to calculate complexity
  func.body.body.forEach((node) => {
    if (node.type === "IfStatement" || node.type === "ConditionalExpression") {
      complexity += 1;
    } else if (node.type === "ForStatement" || node.type === "WhileStatement") {
      complexity += 2;
    } else if (node.type === "SwitchStatement") {
      complexity += 3;
    } else if (node.type === "LogicalExpression") {
      complexity += 1;
    }
  });

  return complexity;
};

// Calculate nesting depth by checking nested block levels in the function
const calculateNestingDepth = (func) => {
  let maxDepth = 0;
  let currentDepth = 0;

  // Helper to traverse nodes recursively
  const traverse = (node) => {
    if (node.type === "BlockStatement") {
      currentDepth += 1;
      maxDepth = Math.max(maxDepth, currentDepth);
      node.body.forEach(traverse);
      currentDepth -= 1;
    } else if (node.body && Array.isArray(node.body)) {
      node.body.forEach(traverse);
    }
  };

  traverse(func.body);
  return maxDepth;
};

// Calculate the length of the function in lines
const calculateFunctionLength = (func) => {
  return func.loc.end.line - func.loc.start.line + 1;
};

module.exports = { analyze };
