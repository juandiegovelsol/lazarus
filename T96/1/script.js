const inputText = document.getElementById("input-text");
const anonymizedText = document.getElementById("anonymized-text");
const form = document.getElementById("anonymization-form");
const reverseAnonymizationButton = document.getElementById(
  "reverse-anonymization"
);
const downloadResultButton = document.getElementById("download-result");
let anonymizedData = "";
let originalData = "";
let counter = 0;
const nameMap = new Map();

// Function to anonymize names
function anonymizeNames(text) {
  return text.replace(/\b[A-Za-z]+ [A-Za-z]+|\b[A-Za-z]+\b/g, (match) => {
    if (!nameMap.has(match)) {
      nameMap.set(match, `Name${String(counter + 1).padStart(3, "0")}`);
      counter++;
    }
    return nameMap.get(match);
  });
}

// Function to anonymize emails
function anonymizeEmails(text) {
  return text.replace(
    /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
    (match) => {
      const emailParts = match.split("@");
      return `email${String(counter + 1).padStart(3, "0")}@${emailParts[1]}`;
    }
  );
}

// Function to anonymize phone numbers
function anonymizePhoneNumbers(text) {
  return text.replace(/\b\d{3}-\d{3}-\d{4}\b/g, (match) => {
    const phoneParts = match.split("-");
    return `XXX-XXX-${phoneParts[2]}`;
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
  });

  // Reverse emails
  text = text.replace(/email\d{3}@/g, (match) => {
    // Since we didn't store the original email, we can't reverse it
    return match;
  });

  // Reverse phone numbers
  text = text.replace(/XXX-XXX-/g, (match) => {
    // Since we didn't store the original phone number, we can't reverse it
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

// Event listener for input text change
inputText.addEventListener("input", (e) => {
  originalData = e.target.value;
  anonymizedData = anonymizeNames(originalData);
  anonymizedData = anonymizeEmails(anonymizedData);
  anonymizedData = anonymizePhoneNumbers(anonymizedData);
  anonymizedText.value = anonymizedData;
});

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Event listener for reverse anonymization button click
reverseAnonymizationButton.addEventListener("click", () => {
  anonymizedText.value = reverseAnonymization(anonymizedData);
});

// Event listener for download result button click
downloadResultButton.addEventListener("click", () => {
  downloadResult(anonymizedData);
});
