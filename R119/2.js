// Function to print a report of an election
function printResults(a, b) {
  // Calculate total votes
  const totalVotes = a.votes + b.votes;

  // Determine winner
  let winner, loser;
  if (a.votes > b.votes) {
    winner = a;
    loser = b;
  } else if (a.votes < b.votes) {
    winner = b;
    loser = a;
  } else {
    // In case of a tie, use a as winner for formatting purposes
    winner = a;
    loser = b;
  }

  // Calculate winning vote percentage
  const winningPercentage = winner.votes / totalVotes;

  // Calculate number of parentheses for bar graph
  const barLength = Math.floor(40 * winningPercentage);
  const maxBarLength = 39;
  const bar = Array(Math.min(barLength, maxBarLength)).fill(")").join("");

  // Create ruler for bar graph
  const ruler = "/---/---/---/---/---|---\\---\\---\\---\\---\\";
  const whitespace = " ".repeat(winner.votes.toString().length + 1);
  const formattedRuler = `${whitespace}${ruler}`;

  // Create bar graph line
  let barGraphLine;
  if (winner === a) {
    // Winner is person A
    barGraphLine = `${winner.votes
      .toString()
      .padStart(winner.votes.toString().length)} (${bar.padEnd(
      maxBarLength,
      " "
    )}) ${loser.votes.toString().padStart(winner.votes.toString().length)}`;
  } else if (winner === b) {
    // Winner is person B
    barGraphLine = `${loser.votes
      .toString()
      .padStart(winner.votes.toString().length)} (${"".padStart(
      maxBarLength - barLength,
      " "
    )}${bar}) ${winner.votes
      .toString()
      .padStart(winner.votes.toString().length)}`;
  } else {
    // Tie
    barGraphLine = `${winner.votes
      .toString()
      .padStart(winner.votes.toString().length)} (${"".padStart(
      19,
      " "
    )}|${"".padStart(19, " ")}) ${loser.votes
      .toString()
      .padStart(winner.votes.toString().length)}`;
  }

  // Create mirrored ruler for bar graph
  const mirroredRuler = `${whitespace}\\---\\---\\---\\---\\---|---/---/---/---/---/`;

  // Print report
  console.log(a.name);
  console.log(formattedRuler);
  console.log(barGraphLine);
  console.log(mirroredRuler);
  console.log(`${"".padStart(barGraphLine.length - b.name.length)}${b.name}`);
}

// Example usage
const personA = {
  name: "Person A",
  votes: 5,
};
const personB = {
  name: "Person B",
  votes: 35,
};
printResults(personA, personB);
