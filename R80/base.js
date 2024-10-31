const positiveWords = ["good", "happy", "excellent", "fantastic", "love"];
const negativeWords = ["bad", "sad", "terrible", "awful", "hate"];

function calculateSentiment(text) {
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;

  words.forEach((word) => {
    if (positiveWords.includes(word)) score += 1;
    else if (negativeWords.includes(word)) score -= 1;
  });

  return score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
}

const textInput =
  "The day was good but not fantastic, yet not terrible either.";
console.log("Sentiment:", calculateSentiment(textInput));
