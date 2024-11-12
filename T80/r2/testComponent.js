// This function should be in pascal case as it returns JSX
function MyComponent() {
  return <div>Hello World</div>;
}

// This function should be in camel case as it does not return JSX
function myFunction() {
  console.log("Hello World");
}

// This arrow function should be in pascal case as it returns JSX
const MyArrowComponent = () => {
  return <div>Hello World</div>;
};

// This arrow function should be in camel case as it does not return JSX
const myArrowFunction = () => {
  console.log("Hello World");
};

// This constant should be in screaming snake case
const MY_CONSTANT = "Hello World";

// This constant does not follow the rules as it is in camel case
const myConstantThatDoesNotFollowTheRules = "Hello World";

export {
  MyComponent,
  myFunction,
  MyArrowComponent,
  myArrowFunction,
  MY_CONSTANT,
  myConstantThatDoesNotFollowTheRules,
};
