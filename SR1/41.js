function describePerson(person) {
  return (
    "Name: " +
    person.name +
    ", Age: " +
    person.age +
    ", Hobbies: " +
    person.hobbies.join(", ")
  );
}
const person = {
  name: "juan",
  age: 28,
  hobbies: [],
};

console.log(describePerson(person));
