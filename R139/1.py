import bcrypt
import getpass
import re

# Basic user storage
users = {}

def validate_username(username):
    """Validate username to ensure it meets specific requirements."""
    pattern = r"^[a-zA-Z0-9_]{3,16}$"  # Allow alphanumeric characters and underscores (3-16 characters)
    if re.match(pattern, username):
        return True
    return False

def validate_password(password):
    """Validate password to ensure it meets specific requirements."""
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    # Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    if re.match(pattern, password):
        return True
    return False

# User registration
def register(username, password):
    if username in users:
        return "Username already exists. Please choose a different username."
    if not validate_username(username):
        return "Invalid username. Please use alphanumeric characters and underscores (3-16 characters)."
    if not validate_password(password):
        return "Invalid password. Please ensure it meets the following requirements: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users[username] = hashed_password
    return "Registration successful."

# User login
def login(username, password):
    if username not in users:
        return "User not found. Please register or try again."
    if not bcrypt.checkpw(password.encode("utf-8"), users[username]):
        return "Incorrect password. Please try again."
    return "Login successful."

# Password recovery
def recover_password(username):
    if username not in users:
        return "User not found. Please register or try again."
    new_password = getpass.getpass("Enter a new password: ")
    if not validate_password(new_password):
        return "Invalid password. Please ensure it meets the following requirements: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    hashed_new_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
    users[username] = hashed_new_password
    return "Password updated successfully."

# Testing the functions
print(register("user1", "Pass123!@#"))
print(login("user1", "wrongpass"))
print(login("user1", "Pass123!@#"))
print(recover_password("user1"))