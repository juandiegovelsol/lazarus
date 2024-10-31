const fs = require("fs");
const rules = require("./rules");

const analyzeCode = (code, preferences) => {
  const issues = [];

  // Loop through each rule in preferences to run analysis
  Object.keys(preferences.rules).forEach((ruleName) => {
    if (preferences.rules[ruleName].enabled) {
      const rule = rules[ruleName];
      const ruleIssues = rule.analyze(code, preferences.rules[ruleName]);
      issues.push(...ruleIssues);
    }
  });

  return issues;
};

const loadCode = (filePath) => {
  return fs.readFileSync(filePath, "utf8");
};

const loadPreferences = (preferencesPath) => {
  return JSON.parse(fs.readFileSync(preferencesPath, "utf8"));
};

const runAnalyzer = (preferencesPath, codePath) => {
  const preferences = loadPreferences(preferencesPath);
  const code = loadCode(codePath);
  const issues = analyzeCode(code, preferences);

  const compliantRules = [];
  const violatedRules = [];

  // Separate issues into compliant and violated rules
  issues.forEach((issue) => {
    if (issue.type === "compliant") {
      compliantRules.push({ rule: issue.rule, category: issue.category });
    } else {
      violatedRules.push({
        rule: issue.rule,
        category: issue.category,
        message: issue.message,
      });
    }
  });

  // Output results
  console.log("Compliant Rules:");
  compliantRules.forEach((rule) =>
    console.log(`  - ${rule.rule} (${rule.category})`)
  );

  console.log("\nViolated Rules:");
  violatedRules.forEach((rule) =>
    console.log(`  - ${rule.rule} (${rule.category}): ${rule.message}`)
  );
};

const main = () => {
  const preferencesPath = process.argv[2];
  const codePath = process.argv[3];

  if (!preferencesPath || !codePath) {
    console.error("Usage: node analyzer.js <preferences.json> <code.js>");
    process.exit(1);
  }

  runAnalyzer(preferencesPath, codePath);
};

main();
