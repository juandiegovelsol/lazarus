// Function to print a report of an election
function printResults(a, b) {
  // Initialize variables for formatting the bar graph
  let winnerPercentage, voteLength, bar;

  // Determine the winner and format the bar accordingly
  if (a.votes > b.votes) {
    // Calculate the winning percentage for Person A
    winnerPercentage = a.votes / (a.votes + b.votes);

    // Set the length of the vote count string to ensure alignment
    voteLength = a.votes.toString().length;

    // Construct the bar for Person A as the winner
    bar =
      a.votes +
      " (" +
      "(".repeat(Math.min(39, Math.round(40 * winnerPercentage))) + // Repeat characters based on winning percentage
      " ".repeat(39 - Math.min(39, Math.round(40 * winnerPercentage))) + // Add spaces for balance
      ") " +
      " ".repeat(voteLength - b.votes.toString().length) + // Add spaces if Person B’s vote count is shorter
      b.votes;
  } else if (a.votes < b.votes) {
    // Calculate the winning percentage for Person B
    winnerPercentage = b.votes / (a.votes + b.votes);

    // Set the length of the vote count string to ensure alignment
    voteLength = b.votes.toString().length;

    // Construct the bar for Person B as the winner
    bar =
      " ".repeat(voteLength - a.votes.toString().length) + // Add spaces if Person A’s vote count is shorter
      a.votes +
      " (" +
      " ".repeat(39 - Math.min(39, Math.round(40 * winnerPercentage))) + // Add spaces for balance
      ")".repeat(Math.min(39, Math.round(40 * winnerPercentage))) + // Repeat characters based on winning percentage
      ") " +
      b.votes;
  } else {
    // Handle the case of a tie between Person A and Person B
    voteLength = a.votes.toString().length;

    // Construct the bar for a tie, with a central dividing line
    bar =
      a.votes + " (" + " ".repeat(19) + "|" + " ".repeat(19) + ") " + b.votes;
  }

  // Print the election report to the console
  console.log(a.name);

  // Top of the bar chart
  console.log(
    " ".repeat(voteLength + 1) + // Add spacing to align with vote counts
      "/---/---/---/---/---|---\\---\\---\\---\\---\\"
  );

  // Print the formatted bar graph line
  console.log(bar);

  // Bottom of the bar chart
  console.log(
    " ".repeat(voteLength + 1) +
      "\\---\\---\\---\\---\\---|---/---/---/---/---/"
  );

  // Print Person B's name aligned with their vote count
  console.log(" ".repeat(bar.length - b.name.length) + b.name);
}

// Example usage with test cases
const personA1 = {
  name: "Person A",
  votes: 213,
};
const personB1 = {
  name: "Person B",
  votes: 96,
};
const personA2 = {
  name: "Person A",
  votes: 6,
};
const personB2 = {
  name: "Person B",
  votes: 789,
};
const personA3 = {
  name: "Person A",
  votes: 99,
};
const personB3 = {
  name: "Person B",
  votes: 99,
};

// Print results for each test case
printResults(personA1, personB1);
printResults(personA2, personB2);
printResults(personA3, personB3);
