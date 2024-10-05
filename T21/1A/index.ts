interface User {
  email: string;
  password: string;
}

const users: User[] = [
  { email: "john.doe@example.com", password: "password123" },
  { email: "jane.doe@example.com", password: "password456" },
];

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const errorMessage = document.getElementById(
  "error-message"
) as HTMLParagraphElement;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginForm.elements["email"].value;
  const password = loginForm.elements["password"].value;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    alert("Login successful!!!");
    loginForm.reset();
  } else {
    errorMessage.textContent = "Invalid email or password";
  }
});
