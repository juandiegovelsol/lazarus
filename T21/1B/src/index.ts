interface User {
  email: string;
  password: string;
}

const users: User[] = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
];

const loginForm = document.getElementById("login-form") as HTMLFormElement;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  const email = emailInput.value;
  const password = passwordInput.value;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    alert("Login successful!");
  } else {
    alert("Invalid email or password!");
  }
});
