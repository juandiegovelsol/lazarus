const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// Function to check if a string is in camel case
function isCamelCase(str) {
  return /^[a-z]+([A-Z][a-z]+)*$/.test(str);
}

// Function to check if a string is in pascal case
function isPascalCase(str) {
  return /^[A-Z][a-z]+([A-Z][a-z]+)*$/.test(str);
}

// Function to check if a string is in screaming snake case
function isScreamingSnakeCase(str) {
  return /^[A-Z][0-9A-Z]*(?:_[A-Z0-9]+)*$/.test(str);
}

// Function to check the rules in the provided code
function checkRules(code, rules) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let violations = 0;

  traverse(ast, {
    // Check function declarations
    FunctionDeclaration(path) {
      const functionName = path.node.id.name;

      // Check if the function returns JSX
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

      // If the function returns JSX, check if it follows the react component rule
      if (returnsJSX) {
        if (
          rules.reactComponent === "PascalCase" &&
          !isPascalCase(functionName) // Check if the function name is in pascal case
        ) {
          console.log(
            `React component ${functionName} does not follow the rule ${rules.reactComponent}`
          );
          violations++;
        }
      } else {
        // If the function does not return JSX, check if it follows the function declaration rule
        if (
          rules.functionDeclaration === "camelCase" &&
          !isCamelCase(functionName) // Check if the function name is in camel case
        ) {
          console.log(
            `Function ${functionName} does not follow the rule ${rules.functionDeclaration}`
          );
          violations++;
        }
      }
    },

    // Check arrow function expressions
    ArrowFunctionExpression(path) {
      if (path.parent.type === "VariableDeclarator") {
        const variableName = path.parent.id.name;

        // Check if the arrow function returns JSX
        const body = path.get("body");
        const returnsJSX =
          body.isJSXElement() ||
          body.isJSXFragment() ||
          (body.isBlockStatement() &&
            body
              .get("body")
              .some(
                (statement) =>
                  statement.isReturnStatement() &&
                  (statement.get("argument").isJSXElement() ||
                    statement.get("argument").isJSXFragment())
              ));

        // Checks for PascalCase y camelCase
        if (returnsJSX) {
          if (
            rules.reactComponent === "PascalCase" &&
            !isPascalCase(variableName)
          ) {
            console.log(
              `React component ${variableName} does not follow the rule ${rules.reactComponent}`
            );
            violations++;
          }
        } else {
          if (
            rules.functionDeclaration === "camelCase" &&
            !isCamelCase(variableName)
          ) {
            console.log(
              `Function ${variableName} does not follow the rule ${rules.functionDeclaration}`
            );
            violations++;
          }
        }
      }
    },

    // Check variable declarators
    VariableDeclarator(path) {
      // Check is the type is const and is not an arrow function
      if (
        path.parent.kind === "const" &&
        path.node.init.type !== "ArrowFunctionExpression"
      ) {
        const constantName = path.node.id.name;

        // Check if the constant name follows the constant rule
        if (
          rules.constant === "SCREAMING_SNAKE_CASE" &&
          !isScreamingSnakeCase(constantName) // Check if the constant name is in screaming snake case
        ) {
          console.log(
            `Constant ${constantName} does not follow the rule ${rules.constant}`
          );
          violations++;
        }
      }
    },
  });

  if (violations === 0) {
    console.log("All rules are being followed");
  }
}

const configFile = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(configFile);

const codeFile = fs.readFileSync("testComponent.js", "utf8");

checkRules(codeFile, config.rules);
