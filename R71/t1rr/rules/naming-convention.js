const esprima = require("esprima");

const analyze = (code, preferences) => {
  const issues = [];
  const ast = esprima.parseScript(code, { loc: true });

  ast.body.forEach((node) => {
    let name = null;
    let type = null;

    // Handle variable declarations with multiple declarators
    if (node.type === "VariableDeclaration") {
      node.declarations.forEach((declarator) => {
        name = declarator.id ? declarator.id.name : null;
        type = "VariableDeclaration";
        processDeclaration(name, type, declarator.loc, issues, preferences);
      });
    } else if (
      node.type === "FunctionDeclaration" ||
      node.type === "ClassDeclaration"
    ) {
      name = node.id ? node.id.name : null;
      type = node.type;
      processDeclaration(name, type, node.loc, issues, preferences, node);
    }
  });

  return issues;
};

// Processes each declaration and applies the naming convention checks
const processDeclaration = (
  name,
  type,
  loc,
  issues,
  preferences,
  node = null
) => {
  if (!name) return;

  // Check for naming convention
  const convention = getConvention(type, preferences.conventions);
  if (convention && !checkConvention(name, convention)) {
    issues.push({
      type: "violated",
      rule: "naming-convention",
      category: "Code Style",
      message: `Declaration '${name}' does not follow the ${convention} convention. Expected format: ${convention}.`,
      line: loc.start.line,
      column: loc.start.column,
    });
  }

  // Check for forbidden abbreviations
  const forbiddenAbbreviations = preferences.forbiddenAbbreviations || [];
  if (hasAbbreviation(name, forbiddenAbbreviations)) {
    issues.push({
      type: "warning",
      rule: "naming-convention",
      category: "Code Style",
      message: `Variable name '${name}' contains forbidden abbreviations.`,
      line: loc.start.line,
      column: loc.start.column,
    });
  }

  // Enforce suffix conventions for asynchronous functions (e.g., Async for async functions)
  if (
    type === "FunctionDeclaration" &&
    preferences.requireAsyncSuffix &&
    isAsyncFunction(node) &&
    !name.endsWith("Async")
  ) {
    issues.push({
      type: "warning",
      rule: "naming-convention",
      category: "Code Style",
      message: `Asynchronous function '${name}' should end with 'Async'.`,
      line: loc.start.line,
      column: loc.start.column,
    });
  }

  // Require prefixes for private members
  if (
    preferences.privatePrefix &&
    !isPrivate(name, preferences.privatePrefix)
  ) {
    issues.push({
      type: "warning",
      rule: "naming-convention",
      category: "Code Style",
      message: `Private member '${name}' should start with '${preferences.privatePrefix}'.`,
      line: loc.start.line,
      column: loc.start.column,
    });
  }
};

// Determines the naming convention based on type
const getConvention = (type, conventions) => {
  switch (type) {
    case "VariableDeclaration":
      return conventions.variables;
    case "FunctionDeclaration":
      return conventions.functions;
    case "ClassDeclaration":
      return conventions.classes;
    default:
      return null;
  }
};

// Validates the name against the specified naming convention
const checkConvention = (name, convention) => {
  switch (convention) {
    case "camelCase":
      return /^[a-z][a-zA-Z0-9]*$/.test(name);
    case "PascalCase":
      return /^[A-Z][a-zA-Z0-9]*$/.test(name);
    case "UPPER_CASE":
      return /^[A-Z_][A-Z_0-9]*$/.test(name);
    default:
      return false;
  }
};

// Checks if the name contains forbidden abbreviations
const hasAbbreviation = (name, forbiddenAbbreviations) => {
  return forbiddenAbbreviations.some((abbr) => name.includes(abbr));
};

// Checks if a function is asynchronous
const isAsyncFunction = (node) => {
  return (
    node &&
    (node.async ||
      (node.body &&
        node.body.body.some((subNode) => subNode.type === "AwaitExpression")))
  );
};

// Checks if a variable or member name has the private prefix
const isPrivate = (name, prefix) => {
  return name.startsWith(prefix);
};

module.exports = { analyze };
