class UserProfile {
  constructor(userId) {
    this.userId = userId;
    this.preferences = this.loadPreferences();
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
  }

  generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
  }

  loadPreferences() {
    const userProfiles = JSON.parse(
      localStorage.getItem("userProfiles") || "{}"
    );
    return (
      userProfiles[this.userId] || {
        theme: "light",
        language: "en",
        notifications: true,
      }
    );
  }

  savePreferences() {
    const userProfiles = JSON.parse(
      localStorage.getItem("userProfiles") || "{}"
    );
    userProfiles[this.userId] = this.preferences;
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
    this.broadcastUpdate();
  }

  updatePreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
    this.applyPreferences();
  }

  broadcastUpdate() {
    window.dispatchEvent(
      new CustomEvent("userProfileUpdate", {
        detail: { userId: this.userId, preferences: this.preferences },
      })
    );
  }

  setupEventListeners() {
    window.addEventListener("storage", this.handleStorageEvent.bind(this));
    window.addEventListener(
      "userProfileUpdate",
      this.handleProfileUpdate.bind(this)
    );
  }

  handleStorageEvent(event) {
    if (event.key === "userProfiles") {
      const userProfiles = JSON.parse(event.newValue || "{}");
      if (userProfiles[this.userId]) {
        this.preferences = userProfiles[this.userId];
        this.applyPreferences();
      }
    }
  }

  handleProfileUpdate(event) {
    if (event.detail.userId === this.userId) {
      this.preferences = event.detail.preferences;
      this.applyPreferences();
    }
  }

  applyPreferences() {
    document.body.className = this.preferences.theme;
    document.documentElement.lang = this.preferences.language;
    // Apply other preferences as needed
    this.notifyListeners();
  }

  addListener(callback) {
    if (!this.listeners) this.listeners = [];
    this.listeners.push(callback);
  }

  notifyListeners() {
    if (this.listeners) {
      this.listeners.forEach((callback) => callback(this.preferences));
    }
  }
}

const userProfileManager = {
  profiles: {},
  getProfile(userId) {
    if (!this.profiles[userId]) {
      this.profiles[userId] = new UserProfile(userId);
    }
    return this.profiles[userId];
  },
};
