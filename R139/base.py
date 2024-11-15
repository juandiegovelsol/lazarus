import getpass

# Basic user storage
users = {}

# User registration
def register(username, password):
    if username in users:
        return "Username already exists."
    users[username] = password
    return "Registration successful."

# User login
def login(username, password):
    if username not in users:
        return "User not found."
    if users[username] != password:
        return "Incorrect password."
    return "Login successful."

# Password recovery
def recover_password(username):
    if username not in users:
        return "User not found."
    new_password = getpass.getpass("Enter a new password: ")
    users[username] = new_password
    return "Password updated successfully."

# Testing the functions
print(register("user1", "pass123"))
print(login("user1", "wrongpass"))
print(login("user1", "pass123"))
print(recover_password("user1"))