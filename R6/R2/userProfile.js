class UserProfile {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.preferences = this.loadPreferences();
    this.listeners = [];

    // Initialize localStorage
    if (!localStorage.getItem("userProfiles")) {
      localStorage.setItem("userProfiles", "{}");
    }

    // Synchronize preferences across tabs
    window.addEventListener("storage", (event) => {
      if (event.key === "userProfiles") {
        const updatedProfiles = JSON.parse(event.newValue);
        const updatedPreferences = updatedProfiles[this.sessionId];
        if (updatedPreferences) {
          this.preferences = updatedPreferences;
          this.notifyListeners();
        }
      }
    });
  }

  // Generate a random, unique session ID
  static generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Load user preferences from localStorage
  loadPreferences() {
    const userProfiles = JSON.parse(localStorage.getItem("userProfiles"));
    return (
      userProfiles[this.sessionId] || {
        theme: "light",
        language: "en",
        notifications: true,
      }
    );
  }

  // Save user preferences to localStorage
  savePreferences() {
    const userProfiles = JSON.parse(localStorage.getItem("userProfiles"));
    userProfiles[this.sessionId] = this.preferences;
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
  }

  // Update a user preference
  updatePreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
    this.notifyListeners();
  }

  // Add a listener for preference changes
  addListener(listener) {
    this.listeners.push(listener);
  }

  // Notify listeners of preference changes
  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.preferences));
  }
}

// Example usage:
const sessionId = UserProfile.generateSessionId();
const userProfile = new UserProfile(sessionId);

// Update preferences
userProfile.updatePreference("theme", "dark");
userProfile.updatePreference("language", "es");
userProfile.updatePreference("notifications", false);

// Add a listener for preference changes
userProfile.addListener((preferences) => {
  console.log("Preferences updated:", preferences);
});
