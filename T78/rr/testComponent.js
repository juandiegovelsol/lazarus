// Test React component with PascalCase
function MyComponent() {
  return <div>Hello World</div>;
}

// Test function with camelCase
function myFunction() {
  console.log("Hello World");
}

// Test function that does not follow the rules
function MY_FUNCTION_THAT_DOES_NOT_FOLLOW_THE_RULES() {
  console.log("Hello World");
}

// Test constant with SCREAMING_SNAKE_CASE
const MY_CONSTANT = "Hello World";

// Test constant that does not follow the rules
const myConstantThatDoesNotFollowTheRules = "Hello World";

// Test React component that does not follow the rules
function myComponentThatDoesNotFollowTheRules() {
  return <div>Hello World</div>;
}

export {
  MyComponent,
  myFunction,
  MY_FUNCTION_THAT_DOES_NOT_FOLLOW_THE_RULES,
  MY_CONSTANT,
  myConstantThatDoesNotFollowTheRules,
  myComponentThatDoesNotFollowTheRules,
};
