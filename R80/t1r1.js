// Define sentiment dictionaries with intensity weights
const positiveWords = {
  good: 1,
  happy: 1.2,
  excellent: 1.5,
  fantastic: 1.8,
  love: 2,
};

const negativeWords = {
  bad: -1,
  sad: -1.2,
  terrible: -1.5,
  awful: -1.8,
  hate: -2,
};

// Define negation words
const negationWords = ["not", "no", "never"];

// Function to calculate sentiment score with negation handling and customizable weighting
function calculateSentiment(text, threshold = 0.5) {
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  let negationActive = false;
  let progress = 0;

  // Process each word and update sentiment score
  words.forEach((word, index) => {
    // Update progress percentage
    progress = Math.round((index / words.length) * 100);
    process.stdout.write(`Analyzing... ${progress}%\r`);

    // Check for negation words
    if (negationWords.includes(word)) {
      negationActive = true;
    } else if (positiveWords[word] || negativeWords[word]) {
      // Apply negation if active
      const weight = negationActive ? -1 : 1;
      score += (positiveWords[word] || 0) * weight;
      score += (negativeWords[word] || 0) * weight;
      negationActive = false; // Reset negation flag
    }
  });

  // Display final progress
  process.stdout.write(`Analyzing... 100%\n`);

  // Classify sentiment based on adjustable threshold
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
