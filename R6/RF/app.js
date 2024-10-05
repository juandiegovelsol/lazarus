document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("preference-form");
  const userIdInput = document.getElementById("user-id");
  const themeSelect = document.getElementById("theme");
  const languageSelect = document.getElementById("language");
  const notificationsCheckbox = document.getElementById("notifications");
  const currentPreferences = document.getElementById("current-preferences");

  let currentProfile = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = userIdInput.value.trim();
    if (userId) {
      currentProfile = userProfileManager.getProfile(userId);
      currentProfile.updatePreference("theme", themeSelect.value);
      currentProfile.updatePreference("language", languageSelect.value);
      currentProfile.updatePreference(
        "notifications",
        notificationsCheckbox.checked
      );
      updatePreferencesDisplay();
    }
  });

  function updatePreferencesDisplay() {
    if (currentProfile) {
      const prefs = currentProfile.preferences;
      currentPreferences.innerHTML = `
        <h3>Current Preferences for User ${currentProfile.userId}</h3>
        <p>Theme: ${prefs.theme}</p>
        <p>Language: ${prefs.language}</p>
        <p>Notifications: ${prefs.notifications ? "Enabled" : "Disabled"}</p>
      `;
      themeSelect.value = prefs.theme;
      languageSelect.value = prefs.language;
      notificationsCheckbox.checked = prefs.notifications;
    }
  }

  function applyTheme(theme) {
    document.body.className = theme;
  }

  if (currentProfile) {
    currentProfile.addListener((prefs) => {
      updatePreferencesDisplay();
      applyTheme(prefs.theme);
    });
  }
});
