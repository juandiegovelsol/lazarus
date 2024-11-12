function describePerson(person) {
  const descriptionParts = [
    "Name: ",
    person.name,
    ", Age: ",
    person.age,
    ", Hobbies: ",
    person.hobbies.join(", "),
  ];
  return descriptionParts.join("");
}

const person = {
  name: "juan",
  age: 28,
};

console.log(describePerson(person));
