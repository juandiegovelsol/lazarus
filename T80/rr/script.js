const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function isCamelCase(str) {
  return /^[a-z]+([A-Z][a-z]+)*$/.test(str);
}

function isPascalCase(str) {
  return /^[A-Z][a-z]+([A-Z][a-z]+)*$/.test(str);
}

function isScreamingSnakeCase(str) {
  return /^[A-Z][0-9A-Z]*(?:_[A-Z0-9]+)*$/.test(str);
}

function checkRules(code, rules) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let violations = 0;

  traverse(ast, {
    FunctionDeclaration(path) {
      const functionName = path.node.id.name;

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

  if (violations === 0) {
    console.log("All rules are being followed");
  }
}

const configFile = fs.readFileSync("config.json", "utf8");
const config = JSON.parse(configFile);

const codeFile = fs.readFileSync("testComponent.js", "utf8");

checkRules(codeFile, config.rules);
