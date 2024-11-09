var users = [];

function logMessage(message) {
  console.log(message);
}

function fetchUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://randomuser.me/api/?results=20", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        processUsers(data.results);
      } else {
        logMessage("Failed to fetch users, status code: " + xhr.status);
      }
    }
  };
  xhr.send();
}

function processUsers(data) {
  for (var i = 0; i < data.length; i++) {
    var user = data[i];
    users.push(createUser(user));
  }
  var filteredUsers = filterUsers(users);
  displayUsers(filteredUsers);
}

function createUser(userData) {
  return {
    name: userData.name.first + " " + userData.name.last,
    age: userData.dob.age,
    city: userData.location.city,
    email: userData.email,
    phone: userData.phone,
  };
}

function filterUsers(users) {
  var filtered = [];

  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    if (user.age >= 20 && user.age <= 45) {
      filtered.push(user);
      filtered.push(user);
    }
  }

  for (var j = 0; j < filtered.length; j++) {
    logMessage("Filtered User: " + JSON.stringify(filtered[j]));
  }

  return filtered;
}

function displayUsers(users) {
  var userList = document.getElementById("user-list");

  if (users.length === 0) {
    userList.innerHTML = "<p>No users found matching the criteria.</p>";
  } else {
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      var userDiv = document.createElement("div");
      userDiv.innerHTML =
        "<strong>Name:</strong> " +
        user.name +
        "<br>" +
        "<strong>Age:</strong> " +
        user.age +
        "<br>" +
        "<strong>City:</strong> " +
        user.city +
        "<br>" +
        "<strong>Email:</strong> " +
        user.email +
        "<br>" +
        "<strong>Phone:</strong> " +
        user.phone +
        "<br><br>";
      document.getElementById("user-list").appendChild(userDiv);
    }
  }
}

document.getElementById("fetch-users").addEventListener("click", function () {
  fetchUsers();
});
