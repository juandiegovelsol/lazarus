const inputText = document.getElementById("input-text");
const anonymizedText = document.getElementById("anonymized-text");
const form = document.getElementById("anonymization-form");
const reverseAnonymizationButton = document.getElementById(
  "reverse-anonymization"
);
const downloadResultButton = document.getElementById("download-result");

let anonymizedData = "";
let originalData = "";

const nameMap = new Map();
const emailMap = new Map();
const phoneMap = new Map();

// Regex for emails, where the username is anonymized, and the domain becomes 'domain.com'
const emailRegex = /\b([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+)\.([A-Za-z]{2,})\b/g;
const phoneRegex = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
const nameRegex = /\b[A-Z][a-z]+(?: [A-Z][a-z]+)?\b/g; // Capitalized names regex

// Function to anonymize emails (only the username before @ is anonymized)
function anonymizeEmails(text) {
  return text.replace(emailRegex, (match, username, domain, tld) => {
    // Anonymize the username part
    if (!emailMap.has(username)) {
      emailMap.set(
        username,
        `email${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`
      );
    }
    return `${emailMap.get(username)}@domain.com`; // Replace domain with 'domain.com'
  });
}

// Function to anonymize names (only names outside emails)
function anonymizeNames(text) {
  return text.replace(nameRegex, (match) => {
    // Skip if the name is part of an email (by checking the surrounding context for @)
    if (emailRegex.test(match)) {
      return match; // Return the email part untouched
    }
    // Otherwise, anonymize the name
    if (!nameMap.has(match)) {
      nameMap.set(
        match,
        `Name${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`
      );
    }
    return nameMap.get(match);
  });
}

// Function to anonymize phone numbers
function anonymizePhoneNumbers(text) {
  return text.replace(phoneRegex, (match) => {
    if (!phoneMap.has(match)) {
      const lastFour = match.slice(-4);
      phoneMap.set(match, `XXX-XXX-${lastFour}`);
    }
    return phoneMap.get(match);
  });
}

// Function to reverse anonymization
function reverseAnonymization(text) {
  // Reverse names
  text = text.replace(/Name\d{3}/g, (match) => {
    for (const [key, value] of nameMap) {
      if (value === match) {
        return key;
      }
    }
    return match;
  });

  // Reverse emails
  text = text.replace(/email\d{3}@domain\.com/g, (match) => {
    const [usernamePart] = match.split("@");
    for (const [key, value] of emailMap) {
      if (value === usernamePart) {
        return `${key}@gmail.com`; // Assuming we're reversing to gmail.com (expandable)
      }
    }
    return match;
  });

  // Reverse phone numbers
  text = text.replace(/XXX-XXX-\d{4}/g, (match) => {
    for (const [key, value] of phoneMap) {
      if (value === match) {
        return key;
      }
    }
    return match;
  });

  return text;
}

// Function to download result as text file
function downloadResult(text) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "anonymized_data.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// Event listener for input text change (Live Preview)
inputText.addEventListener("input", (e) => {
  originalData = e.target.value;

  // Step 1: Anonymize emails first (avoid touching names inside email)
  anonymizedData = anonymizeEmails(originalData);

  // Step 2: Then anonymize names (outside emails) and phone numbers
  anonymizedData = anonymizeNames(anonymizedData);
  anonymizedData = anonymizePhoneNumbers(anonymizedData);

  anonymizedText.value = anonymizedData; // Live preview
});

// Event listener for form submission (Anonymize Button)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  originalData = inputText.value;

  if (originalData) {
    // Step 1: Anonymize emails first (avoid touching names inside email)
    anonymizedData = anonymizeEmails(originalData);

    // Step 2: Then anonymize names (outside emails) and phone numbers
    anonymizedData = anonymizeNames(anonymizedData);
    anonymizedData = anonymizePhoneNumbers(anonymizedData);

    anonymizedText.value = anonymizedData;
    reverseAnonymizationButton.style.display = "inline-block";
    downloadResultButton.style.display = "inline-block";
  } else {
    alert("The input must not be empty");
  }
});

// Event listener for reverse anonymization button click
reverseAnonymizationButton.addEventListener("click", () => {
  if (anonymizedText.value) {
    anonymizedText.value = reverseAnonymization(anonymizedData);
  } else {
    alert("There is no data to de-anonymize");
  }
});

// Event listener for download result button click
downloadResultButton.addEventListener("click", () => {
  if (anonymizedData) {
    downloadResult(anonymizedData);
  } else {
    alert("There is no data to download");
  }
});
