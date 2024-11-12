// Define constants
const API_URL = "https://randomuser.me/api/?results=20";
const USER_LIST_ID = "user-list";
const FETCH_USERS_BUTTON_ID = "fetch-users";
const REQUIRED_USERS = 20;

// Define the users array
let users = [];

// Function to log messages
const logMessage = (message) => console.log(message);

// Function to fetch users
const fetchUsers = async () => {
  let newUsers = [];
  while (newUsers.length < REQUIRED_USERS) {
    try {
      // Use fetch API to get a new set of users
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Filter users by age range and add them to the newUsers array
      const filteredUsers = data.results
        .map(createUser)
        .filter((user) => user.age >= 20 && user.age <= 45);
      // Add only new and unique users to the newUsers array
      newUsers = [...newUsers, ...filteredUsers.filter(isNewUser)];
      // Remove duplicates from the newUsers array
      newUsers = [...new Set(newUsers)];
      // If we have more than REQUIRED_USERS, slice the array to the required length
      if (newUsers.length > REQUIRED_USERS) {
        newUsers = newUsers.slice(0, REQUIRED_USERS);
      }
    } catch (error) {
      logMessage(`Failed to fetch users: ${error}`);
    }
  }
  // Add the new users to the users array
  users = [...users, ...newUsers];
  displayUsers(users);
};

// Function to check if a user is new
const isNewUser = (user) =>
  !users.find((existingUser) => existingUser.email === user.email);

// Function to create a user object
const createUser = (userData) => ({
  name: `${userData.name.first} ${userData.name.last}`,
  age: userData.dob.age,
  city: userData.location.city,
  email: userData.email,
  phone: userData.phone,
});

// Function to display users
const displayUsers = (users) => {
  const userList = document.getElementById(USER_LIST_ID);
  userList.innerHTML =
    users.length === 0
      ? "<p>No users found matching the criteria.</p>"
      : users
          .map(
            (user) => `
          <div>
            <strong>Name:</strong> ${user.name}<br>
            <strong>Age:</strong> ${user.age}<br>
            <strong>City:</strong> ${user.city}<br>
            <strong>Email:</strong> ${user.email}<br>
            <strong>Phone:</strong> ${user.phone}<br><br>
          </div>
        `
          )
          .join("");
};

// Add event listener to fetch users button
document
  .getElementById(FETCH_USERS_BUTTON_ID)
  .addEventListener("click", fetchUsers);
