const fs = require("fs");
const esprima = require("esprima");
const estraverse = require("estraverse");

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
  return /^[A-Z]+_[A-Z]+_*$/.test(str);
}

// Function to check the rules
function checkRules(code, rules) {
  const ast = esprima.parseScript(code);

  estraverse.traverse(ast, {
    enter: function (node) {
      if (node.type === "FunctionDeclaration") {
        if (
          rules.functionDeclaration === "camelCase" &&
          !isCamelCase(node.id.name)
        ) {
          console.log(
            `Function ${node.id.name} does not follow the rule ${rules.functionDeclaration}`
          );
        } else if (
          rules.functionDeclaration === "PascalCase" &&
          !isPascalCase(node.id.name)
        ) {
          console.log(
            `Function ${node.id.name} does not follow the rule ${rules.functionDeclaration}`
          );
        }
      } else if (
        node.type === "VariableDeclarator" &&
        node.init.type === "Literal"
      ) {
        if (
          rules.constant === "SCREAMING_SNAKE_CASE" &&
          !isScreamingSnakeCase(node.id.name)
        ) {
          console.log(
            `Constant ${node.id.name} does not follow the rule ${rules.constant}`
          );
        }
      }
    },
  });

  // Check React components
  const reactComponents = code.match(/function\s+([A-Za-z0-9_]+)\s*\(/g);
  if (reactComponents) {
    reactComponents.forEach((component) => {
      const componentName = component.match(
        /function\s+([A-Za-z0-9_]+)\s*\(/
      )[1];
      if (
        rules.reactComponent === "PascalCase" &&
        !isPascalCase(componentName)
      ) {
        console.log(
          `React component ${componentName} does not follow the rule ${rules.reactComponent}`
        );
      }
    });
  }
}

// Load the configuration JSON file
const configFile = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(configFile);

// Load the React component file
const codeFile = fs.readFileSync("testComponent.js", "utf8");

// Check the rules
checkRules(codeFile, config.rules);
