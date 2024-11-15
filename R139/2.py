import bcrypt
import getpass
import re

# Basic user storage
users = {}

# Function to hash a password
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# Function to check a password against a hashed password
def check_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

# User registration
def register(username, password):
    if username in users:
        return "Username already exists."
    
    # Input validation for username and password
    if not re.match("^[a-zA-Z0-9_]+$", username):
        return "Username can only contain letters, numbers, and underscores."
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    
    hashed_password = hash_password(password)
    users[username] = hashed_password
    return "Registration successful."

# User login
def login(username, password):
    if username not in users:
        return "User not found."
    hashed_password = users[username]
    if not check_password(password, hashed_password):
        return "Incorrect password."
    return "Login successful."

# Password recovery
def recover_password(username):
    if username not in users:
        return "User not found."
    new_password = getpass.getpass("Enter a new password: ")
    
    # Input validation for new password
    if len(new_password) < 8:
        return "Password must be at least 8 characters long."
    
    hashed_password = hash_password(new_password)
    users[username] = hashed_password
    return "Password updated successfully."

# Testing the functions
print(register("user1", "pass1234"))
print(login("user1", "wrongpass"))
print(login("user1", "pass1234"))
print(recover_password("user1"))