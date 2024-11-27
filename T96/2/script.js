const inputText = document.getElementById("input-text");
const anonymizeBtn = document.getElementById("anonymize-btn");
const reverseBtn = document.getElementById("reverse-btn");
const downloadBtn = document.getElementById("download-btn");
const anonymizedText = document.getElementById("anonymized-text");

let anonymizedData = "";
let originalData = "";

// Function to anonymize data
function anonymizeData(data) {
  // Names
  data = data.replace(/\b[A-Z][a-z]* [A-Z][a-z]*\b/g, (match) => {
    return `Name${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;
  });

  // Emails
  data = data.replace(
    /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
    (match) => {
      return `email${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}@domain.com`;
    }
  );

  // Phone numbers
  data = data.replace(/\b\d{3}-\d{3}-\d{4}\b/g, (match) => {
    return `XXX-XXX-${match.split("-")[2]}`;
  });

  return data;
}

// Function to reverse anonymization
function reverseAnonymization(data) {
  // Names
  data = data.replace(/Name\d{3}/g, (match) => {
    return originalData.match(/\b[A-Z][a-z]* [A-Z][a-z]*\b/g)[0];
  });

  // Emails
  data = data.replace(/email\d{3}@domain\.com/g, (match) => {
    return originalData.match(
      /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g
    )[0];
  });

  // Phone numbers
  data = data.replace(/XXX-XXX-\d{4}/g, (match) => {
    return originalData.match(/\b\d{3}-\d{3}-\d{4}\b/g)[0];
  });

  return data;
}

// Live preview
inputText.addEventListener("input", () => {
  originalData = inputText.value;
  anonymizedData = anonymizeData(originalData);
  anonymizedText.value = anonymizedData;
});

// Anonymize button click
anonymizeBtn.addEventListener("click", () => {
  anonymizedData = anonymizeData(inputText.value);
  anonymizedText.value = anonymizedData;
  reverseBtn.style.display = "inline-block";
  downloadBtn.style.display = "inline-block";
});

// Reverse button click
reverseBtn.addEventListener("click", () => {
  anonymizedData = reverseAnonymization(anonymizedData);
  anonymizedText.value = anonymizedData;
  reverseBtn.style.display = "none";
});

// Download button click
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([anonymizedData], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "anonymized_data.txt";
  link.click();
});
