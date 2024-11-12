// Select the user list element and the fetch users button
const userList = document.getElementById("user-list");
const fetchUsersButton = document.getElementById("fetch-users");

// Initialize an empty array to store users
let users = [];

// Function to log messages to the console
const logMessage = (message) => console.log(message);

// Function to fetch users from the randomuser.me API
const fetchUsers = async () => {
  try {
    // Use the Fetch API to make a GET request to the API
    const response = await fetch("https://randomuser.me/api/?results=20");
    const data = await response.json();
    processUsers(data.results);
  } catch (error) {
    logMessage(`Failed to fetch users: ${error}`);
  }
};

// Function to process the users data
const processUsers = (data) => {
  // Use the map method to create a new array of user objects
  users = data.map((user) => createUser(user));
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

// Function to filter users by age
const filterUsers = (users) => {
  // Use the filter method to create a new array of users aged between 20 and 45
  const filtered = users.filter((user) => user.age >= 20 && user.age <= 45);
  // Log the filtered users to the console
  filtered.forEach((user) =>
    logMessage(`Filtered User: ${JSON.stringify(user)}`)
  );
  return filtered;
};

// Function to display the users
const displayUsers = (users) => {
  // Check if there are any users to display
  if (users.length === 0) {
    userList.innerHTML = "<p>No users found matching the criteria.</p>";
  } else {
    // Use the forEach method to create a new div for each user and append it to the user list
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `
        <strong>Name:</strong> ${user.name}<br>
        <strong>Age:</strong> ${user.age}<br>
        <strong>City:</strong> ${user.city}<br>
        <strong>Email:</strong> ${user.email}<br>
        <strong>Phone:</strong> ${user.phone}<br><br>
      `;
      userList.appendChild(userDiv);
    });
  }
};

// Add an event listener to the fetch users button
fetchUsersButton.addEventListener("click", fetchUsers);
