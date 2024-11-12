// Function to print a report of an election
function printResults(a, b) {
  // Determine the winner and calculate vote percentages
  let winner, loser, winnerVotes, loserVotes, winnerPercentage;
  if (a.votes > b.votes) {
    winner = a;
    loser = b;
  } else if (a.votes < b.votes) {
    winner = b;
    loser = a;
  } else {
    winner = a;
    loser = b;
  }
  winnerVotes = winner.votes;
  loserVotes = loser.votes;
  if (winnerVotes + loserVotes > 0) {
    winnerPercentage = winnerVotes / (winnerVotes + loserVotes);
  } else {
    winnerPercentage = 0.5; // default to a tie if no votes
  }

  // Calculate the number of characters needed to represent the winning number of votes
  let voteLength = winnerVotes.toString().length;

  // Create the ruler for the bar graph
  let ruler =
    " ".repeat(voteLength + 1) +
    "/---/---/---/---/---|---\\---\\---\\---\\---\\";

  // Create the bar for the graph
  let bar = "";
  if (winnerVotes === loserVotes) {
    bar =
      " ".repeat(voteLength - loserVotes.toString().length) +
      loserVotes +
      " (" +
      " ".repeat(19) +
      "|" +
      " ".repeat(19) +
      ") " +
      winnerVotes;
  } else if (winner === a) {
    bar =
      winnerVotes +
      " (" +
      ")".repeat(Math.min(39, Math.round(40 * winnerPercentage))) +
      " ".repeat(39 - Math.min(39, Math.round(40 * winnerPercentage))) +
      ") " +
      " ".repeat(voteLength - loserVotes.toString().length) +
      loserVotes;
  } else {
    bar =
      " ".repeat(voteLength - loserVotes.toString().length) +
      loserVotes +
      " (" +
      " ".repeat(39 - Math.min(39, Math.round(40 * winnerPercentage))) +
      "(".repeat(Math.min(39, Math.round(40 * winnerPercentage))) +
      ") " +
      winnerVotes;
  }

  // Create the mirrored ruler for the bar graph
  let mirroredRuler =
    " ".repeat(voteLength + 1) +
    "\\---\\---\\---\\---\\---|---/---/---/---/---/";

  // Print report
  console.log(winner === a ? winner.name : loser.name);
  console.log(ruler);
  console.log(bar);
  console.log(mirroredRuler);
  console.log(
    " ".repeat(bar.length - (winner === a ? loser.name : winner.name).length) +
      (winner === a ? loser.name : winner.name)
  );
}

// Example usage
const personA = {
  name: "Person A",
  votes: 35,
};
const personB = {
  name: "Person B",
  votes: 5,
};
printResults(personA, personB);
