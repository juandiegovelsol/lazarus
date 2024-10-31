// Define sentiment dictionaries with intensity weights
const positiveWords = {
  good: 1,
  happy: 1.5,
  excellent: 2,
  fantastic: 2.5,
  love: 3,
};

const negativeWords = {
  bad: -1,
  sad: -1.5,
  terrible: -2,
  awful: -2.5,
  hate: -3,
};

// Define negation words
const negationWords = ["not", "no", "never"];

// Function to calculate sentiment score
function calculateSentiment(text, threshold = 0.5) {
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  let progress = 0;

  // Initialize negation flag
  let isNegated = false;

  console.log("Analyzing sentiment...");

  // Iterate over each word
  words.forEach((word, index) => {
    // Update progress
    progress = Math.floor(((index + 1) / words.length) * 100);
    process.stdout.write(`\rProgress: ${progress}%`);

    // Check if word is a negation word
    if (negationWords.includes(word)) {
      isNegated = true;
    }
    // Check if word is in positive or negative dictionary
    else if (positiveWords[word] || negativeWords[word]) {
      // Apply negation if applicable
      const weight = isNegated ? -1 : 1;
      score += (positiveWords[word] || negativeWords[word]) * weight;
      isNegated = false; // Reset negation flag
    }
  });

  console.log("\n");

  // Determine sentiment based on threshold
  return score > threshold
    ? "Positive"
    : score < -threshold
    ? "Negative"
    : "Neutral";
}

// Example usage
const textInput =
  "The day was good but not fantastic, yet not terrible either.";
console.log("Sentiment:", calculateSentiment(textInput));
