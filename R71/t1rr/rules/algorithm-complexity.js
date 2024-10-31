const esprima = require("esprima");

const analyze = (code, preferences) => {
  const issues = [];

  const ast = esprima.parseScript(code, { loc: true });
  const functions = ast.body.filter(
    (node) => node.type === "FunctionDeclaration"
  );

  functions.forEach((func) => {
    const complexity = calculateComplexity(func, issues, preferences);
    if (complexity > preferences.threshold) {
      issues.push({
        type: "violated",
        rule: "algorithm-complexity",
        category: "Performance",
        message: `Function '${func.id.name}' has a complexity of ${complexity}, exceeding the threshold of ${preferences.threshold}.`,
        line: func.loc.start.line,
        column: func.loc.start.column,
        suggestion: "Consider refactoring to reduce complexity.",
      });
    } else {
      issues.push({
        type: "compliant",
        rule: "algorithm-complexity",
        category: "Performance",
      });
    }
  });

  return issues;
};

const calculateComplexity = (func, issues, preferences) => {
  let complexity = 0;
  let previousWasLoop = false;

  // Helper function to calculate nesting depth, detect recursive calls, and handle data structure iteration
  const traverseNode = (node, currentDepth = 0) => {
    if (node.type === "ForStatement" || node.type === "WhileStatement") {
      complexity += 1;

      // Detect consecutive loops
      if (previousWasLoop) {
        issues.push({
          type: "warning",
          rule: "algorithm-complexity",
          category: "Performance",
          message: `Consecutive loops detected, which may benefit from optimization.`,
          line: node.loc.start.line,
          column: node.loc.start.column,
          suggestion: "Consider merging consecutive loops if possible.",
        });
      }
      previousWasLoop = true;

      // Check for nesting depth
      const newDepth = currentDepth + 1;
      if (newDepth > preferences.maxNestingDepth) {
        issues.push({
          type: "warning",
          rule: "algorithm-complexity",
          category: "Performance",
          message: `Loop nesting depth of ${newDepth} exceeds the maximum allowed depth of ${preferences.maxNestingDepth}.`,
          line: node.loc.start.line,
          column: node.loc.start.column,
          suggestion: "Consider refactoring to reduce nesting depth.",
        });
      }

      // Detect inefficient data structure iteration (for arrays and objects)
      if (node.init && node.init.declarations) {
        node.init.declarations.forEach((declaration) => {
          if (declaration.init && declaration.init.type === "ArrayExpression") {
            issues.push({
              type: "warning",
              rule: "algorithm-complexity",
              category: "Performance",
              message: `Inefficient iteration over an array detected in loop.`,
              line: node.loc.start.line,
              column: node.loc.start.column,
              suggestion:
                "Consider optimizing iteration over large data structures.",
            });
          }
        });
      }

      // Traverse nested nodes within the loop body
      if (node.body && node.body.body) {
        node.body.body.forEach((innerNode) =>
          traverseNode(innerNode, newDepth)
        );
      }
    } else if (
      node.type === "CallExpression" &&
      node.callee.type === "Identifier" &&
      node.callee.name === func.id.name
    ) {
      // Detect recursive call
      complexity += 1;
      issues.push({
        type: "warning",
        rule: "algorithm-complexity",
        category: "Performance",
        message: `Recursive call detected in function '${func.id.name}', which may increase time complexity.`,
        line: node.loc.start.line,
        column: node.loc.start.column,
        suggestion: "Consider refactoring to remove or limit recursion.",
      });
    } else if (node.body && Array.isArray(node.body)) {
      previousWasLoop = false; // Reset consecutive loop check
      node.body.forEach((innerNode) => traverseNode(innerNode, currentDepth));
    }
  };

  // Start complexity calculation with the function body
  func.body.body.forEach((node) => traverseNode(node));

  return complexity;
};

module.exports = { analyze };
