function MyComponent() {
  return <div>Hello World</div>;
}

function myFunction() {
  console.log("Hello World");
}

function MY_FUNCTION_THAT_DOES_NOT_FOLLOW_THE_RULES() {
  console.log("Hello World");
}

const MY_CONSTANT = "Hello World";

const myConstantThatDoesNotFollowTheRules = "Hello World";

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
