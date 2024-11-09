const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

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
  return /^[A-Z][0-9A-Z]*(?:_[A-Z0-9]+)*$/.test(str);
}

// Function to check the rules
function checkRules(code, rules) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let violations = 0;

  traverse(ast, {
    FunctionDeclaration(path) {
      const functionName = path.node.id.name;

      // Check if the function returns JSX (React component)
      const returnsJSX = path
        .get("body")
        .get("body")
        .some((statement) => {
          if (statement.isReturnStatement()) {
            const argument = statement.get("argument");
            return argument.isJSXElement() || argument.isJSXFragment();
          }
          return false;
        });

      if (returnsJSX) {
        // This is a React component
        if (
          rules.reactComponent === "PascalCase" &&
          !isPascalCase(functionName)
        ) {
          console.log(
            `React component ${functionName} does not follow the rule ${rules.reactComponent}`
          );
          violations++;
        }
      } else {
        // This is a regular function
        if (
          rules.functionDeclaration === "camelCase" &&
          !isCamelCase(functionName)
        ) {
          console.log(
            `Function ${functionName} does not follow the rule ${rules.functionDeclaration}`
          );
          violations++;
        }
      }
    },

    VariableDeclarator(path) {
      // Check only const declarations
      if (path.parent.kind === "const") {
        const constantName = path.node.id.name;
        if (
          rules.constant === "SCREAMING_SNAKE_CASE" &&
          !isScreamingSnakeCase(constantName)
        ) {
          console.log(
            `Constant ${constantName} does not follow the rule ${rules.constant}`
          );
          violations++;
        }
      }
    },
  });

  // If no violations were found, print success message
  if (violations === 0) {
    console.log("All rules are being followed");
  }
}

// Load the configuration JSON file
const configFile = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(configFile);

// Load the React component file
const codeFile = fs.readFileSync("testComponent.js", "utf8");

// Check the rules
checkRules(codeFile, config.rules);
