// Define constants
const API_URL = "https://randomuser.me/api/?results=20";
const USER_LIST_ID = "user-list";
const FETCH_USERS_BUTTON_ID = "fetch-users";

// Define the users array
let users = [];

// Function to log messages
const logMessage = (message) => console.log(message);

// Function to fetch users
const fetchUsers = async () => {
  try {
    // Use fetch API instead of XMLHttpRequest
    const response = await fetch(API_URL);

    // Check if response status is ok (HTTP status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    processUsers(data.results);
  } catch (error) {
    logMessage(`Failed to fetch users: ${error}`);
  }
};

// Function to process users
const processUsers = (data) => {
  // Use map to create a new array of user objects
  const userObjects = data.map(createUser);
  users = [...users, ...userObjects];
  const filteredUsers = filterUsers(users);
  displayUsers(filteredUsers);
};

// Function to create a user object
const createUser = (userData) => ({
  name: `${userData.name.first} ${userData.name.last}`,
  age: userData.dob.age,
  city: userData.location.city,
  email: userData.email,
  phone: userData.phone,
});

// Function to filter users
const filterUsers = (users) => {
  // Use filter to create a new array of users within the age range
  const filteredUsers = users.filter(
    (user) => user.age >= 20 && user.age <= 45
  );
  // Use forEach to log the filtered users
  filteredUsers.forEach((user) =>
    logMessage(`Filtered User: ${JSON.stringify(user)}`)
  );
  return filteredUsers;
};

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
