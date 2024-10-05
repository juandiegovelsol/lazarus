class UserProfile {
  /**
   * Constructor for UserProfile.
   */
  constructor() {
    this.preferences = {};
    this.sessionId = this.generateSessionId();
    this.loadPreferences();
  }

  /**
   * Generates a random, unique ID for each user session.
   * @returns {string} A random, unique ID.
   */
  generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Loads user preferences from localStorage.
   */
  loadPreferences() {
    const storedPreferences = localStorage.getItem(
      `userPreferences-${this.sessionId}`
    );
    if (storedPreferences) {
      this.preferences = JSON.parse(storedPreferences);
    } else {
      this.preferences = {
        theme: "light",
        language: "en",
        notifications: true,
      };
    }
  }

  /**
   * Saves user preferences to localStorage.
   */
  savePreferences() {
    localStorage.setItem(
      `userPreferences-${this.sessionId}`,
      JSON.stringify(this.preferences)
    );
  }

  /**
   * Updates a user preference.
   * @param {string} preference - The preference to update (e.g., 'theme', 'language', etc.).
   * @param {*} value - The new value for the preference.
   */
  updatePreference(preference, value) {
    this.preferences[preference] = value;
    this.savePreferences();
    this.synchronizePreferences();
  }

  /**
   * Synchronizes user preferences across multiple open tabs.
   */
  synchronizePreferences() {
    // Use the Storage API to propagate changes to other tabs.
    localStorage.setItem(
      `userPreferencesUpdated-${this.sessionId}`,
      Date.now()
    );
  }

  /**
   * Listens for preference updates in other tabs.
   */
  listenForUpdates() {
    setInterval(() => {
      const updatedTimestamp = localStorage.getItem(
        `userPreferencesUpdated-${this.sessionId}`
      );
      if (updatedTimestamp && updatedTimestamp !== this.lastUpdatedTimestamp) {
        this.lastUpdatedTimestamp = updatedTimestamp;
        this.loadPreferences();
        this.applyPreferences();
      }
    }, 1000); // Check for updates every 1 second.
  }

  /**
   * Applies user preferences to the page.
   */
  applyPreferences() {
    document.body.classList.toggle(
      "dark-theme",
      this.preferences.theme === "dark"
    );
    document.documentElement.lang = this.preferences.language;
    console.log(
      `Notifications: ${
        this.preferences.notifications ? "Enabled" : "Disabled"
      }`
    );
  }
}

// Create a new UserProfile instance.
const userProfile = new UserProfile();

// Listen for preference updates in other tabs.
userProfile.listenForUpdates();

// Apply user preferences to the page.
userProfile.applyPreferences();

// Example usage: Update the theme preference.
userProfile.updatePreference("theme", "dark");
