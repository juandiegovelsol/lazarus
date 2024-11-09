const fs = require("fs");
const console = require("console");

// Function to check if a string is in camelCase
function isCamelCase(str) {
  return /^[a-z]+([A-Z][a-z]+)*$/.test(str);
}

// Function to check if a string is in PascalCase
function isPascalCase(str) {
  return /^[A-Z][a-z]+([A-Z][a-z]+)*$/.test(str);
}

// Function to check if a string is in SCREAMING_SNAKE_CASE
function isScreamingSnakeCase(str) {
  return /^[A-Z]+(_[A-Z]+)*$/.test(str);
}

// Function to check the rules
function checkRules(config, fileContent) {
  const rules = config.rules;
  const functionRegex = /function\s+([a-zA-Z_$][\w$]*)/g;
  const constantRegex = /const\s+([a-zA-Z_$][\w$]*)/g;

  let match;

  // Check functions
  while ((match = functionRegex.exec(fileContent)) !== null) {
    const functionName = match[1];
    if (rules.functionName === "camelCase" && !isCamelCase(functionName)) {
      console.log(
        `Function ${functionName} does not follow the camelCase rule.`
      );
    }
  }

  // Check constants
  while ((match = constantRegex.exec(fileContent)) !== null) {
    const constantName = match[1];
    if (
      rules.constantName === "SCREAMING_SNAKE_CASE" &&
      !isScreamingSnakeCase(constantName)
    ) {
      console.log(
        `Constant ${constantName} does not follow the SCREAMING_SNAKE_CASE rule.`
      );
    }
  }

  // Check React components
  const componentRegex = /function\s+([A-Z][a-zA-Z_$][\w$]*)/g;
  while ((match = componentRegex.exec(fileContent)) !== null) {
    const componentName = match[1];
    if (rules.componentName === "PascalCase" && !isPascalCase(componentName)) {
      console.log(
        `Component ${componentName} does not follow the PascalCase rule.`
      );
    }
  }

  // Log a success message if no issues were found
  if (!console.log.called) {
    console.log("All rules are being followed.");
  }
}

// Read the configuration file
fs.readFile("config.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const config = JSON.parse(data);

  // Read the React component file
  fs.readFile("testComponent.js", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    checkRules(config, data);
  });
});
