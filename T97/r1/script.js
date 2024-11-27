// List of all teams
let teams = [];

// List of matches to be played
let matches = [];

// Data for team standings
let standingsData = {};

// Index to track the current match
let currentMatchIndex = 0;

// Initialize teams and matches
function setupTeams() {
  const teamCount = parseInt(document.getElementById("team-count").value);
  if (teamCount < 6 || teamCount > 20) {
    alert("Please enter an even number between 6 and 20 teams.");
    return;
  }

  if (teamCount % 2 !== 0) {
    alert("Please enter an even teams number");
    return;
  }

  const container = document.getElementById("team-names-container");
  container.innerHTML = "";
  for (let i = 0; i < teamCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Team ${i + 1} Name`;
    container.appendChild(input);
  }

  document.getElementById("teams-input").style.display = "block";
}

// Start the tournament
function startTournament() {
  const inputs = document.querySelectorAll("#team-names-container input");
  teams = Array.from(inputs)
    .map((input) => input.value.trim())
    .filter((name) => name);

  // Validates all teams are named
  if (teams.length < inputs.length) {
    alert("All the teams must be named.");
    return;
  }

  // Validates the teams are not repeated
  const uniqueTeams = new Set([...teams]);
  if (uniqueTeams.size !== teams.length) {
    alert("Each team must have a unique name");
    return;
  }
  generateMatchSchedule();
  initializeStandings();
  displaySections();
  showMatchTable();
}

// Generate the schedule of matches
function generateMatchSchedule() {
  matches = [];
  const totalTeams = teams.length;
  const rounds = totalTeams - 1;
  const halfTeams = Math.floor(totalTeams / 2);

  // Generates the matches
  for (let round = 0; round < rounds; round++) {
    const roundMatches = [];
    for (let i = 0; i < halfTeams; i++) {
      const homeTeam = teams[i];
      const awayTeam = teams[totalTeams - 1 - i];

      roundMatches.push({
        homeTeam,
        awayTeam,
        homeGoals: null,
        awayGoals: null,
      });
    }

    // Rotates the teams except for the first team
    const last = teams.pop();
    teams.splice(1, 0, last);

    matches.push(...roundMatches);
  }

  // Rearranges the matches to avoid consecutive teams
  rearrangeMatchesToAvoidConsecutiveTeams();
}

function rearrangeMatchesToAvoidConsecutiveTeams() {
  const adjustedMatches = [];
  const teamLastMatchTurn = {};

  matches.forEach((match) => {
    const { homeTeam, awayTeam } = match;

    // Finds the next place where teams do not play consecutively
    let indexToInsert = adjustedMatches.length;
    for (let i = 0; i < adjustedMatches.length; i++) {
      const lastMatch = adjustedMatches[i];
      if (
        lastMatch.homeTeam !== homeTeam &&
        lastMatch.awayTeam !== homeTeam &&
        lastMatch.homeTeam !== awayTeam &&
        lastMatch.awayTeam !== awayTeam
      ) {
        indexToInsert = i + 1;
      }
    }

    // Inserts the match in the calculated index
    adjustedMatches.splice(indexToInsert, 0, match);

    // Updates the last played match position for both teams
    teamLastMatchTurn[homeTeam] = indexToInsert;
    teamLastMatchTurn[awayTeam] = indexToInsert;
  });

  matches = adjustedMatches;
}

// Initialize standings with default values
function initializeStandings() {
  standingsData = {};
  teams.forEach((team) => {
    standingsData[team] = { points: 0, played: 0, won: 0, drawn: 0, lost: 0 };
  });
  updateStandingsDisplay();
}

// Update standings after a match result
function updateStandings(match) {
  const { homeTeam, awayTeam, homeGoals, awayGoals } = match;

  standingsData[homeTeam].played++;
  standingsData[awayTeam].played++;

  if (homeGoals > awayGoals) {
    standingsData[homeTeam].points += 3;
    standingsData[homeTeam].won++;
    standingsData[awayTeam].lost++;
  } else if (homeGoals < awayGoals) {
    standingsData[awayTeam].points += 3;
    standingsData[awayTeam].won++;
    standingsData[homeTeam].lost++;
  } else {
    standingsData[homeTeam].points++;
    standingsData[awayTeam].points++;
    standingsData[homeTeam].drawn++;
    standingsData[awayTeam].drawn++;
  }

  updateStandingsDisplay();
}

// Display the updated standings
function updateStandingsDisplay() {
  const tbody = document.getElementById("standings-body");
  tbody.innerHTML = "";

  const sortedTeams = Object.keys(standingsData).sort(
    (a, b) => standingsData[b].points - standingsData[a].points
  );
  sortedTeams.forEach((team) => {
    const row = document.createElement("tr");
    const { points, played, won, drawn, lost } = standingsData[team];
    row.innerHTML = `<td>${team}</td><td>${points}</td><td>${played}</td><td>${won}</td><td>${drawn}</td><td>${lost}</td>`;
    tbody.appendChild(row);
  });
}

// Display the tournament and standings sections
function displaySections() {
  document.getElementById("team-setup").style.display = "none";
  document.getElementById("teams-input").style.display = "none";
  document.getElementById("tournament-section").style.display = "block";
  document.getElementById("standings-section").style.display = "block";
}

// Display the matches table
function showMatchTable() {
  const tbody = document.getElementById("matches-body");
  matches.forEach((match) => {
    const row = document.createElement("tr");
    row.classList.add("match");
    row.innerHTML = `<td>${match.homeTeam}</td><td>${match.awayTeam}</td><td>Pending</td>`;
    tbody.appendChild(row);
  });
}

// Updates the matches table when a new result is created
function updateMatchTable(match, index) {
  const rows = document.getElementsByClassName("match");
  rows[
    index
  ].innerHTML = `<td>${match.homeTeam}</td><td>${match.awayTeam}</td><td>${match.homeGoals} - ${match.awayGoals}</td>`;
}

// Handle match results
function playNextMatch() {
  if (currentMatchIndex >= matches.length) {
    alert("Tournament is complete!");
    return;
  }

  const match = matches[currentMatchIndex];
  document.getElementById(
    "match-teams"
  ).textContent = `${match.homeTeam} vs ${match.awayTeam}`;
  document.getElementById("result-modal").style.display = "block";
}

// Save the result of the current match
function saveMatchResult() {
  const homeGoals = parseInt(document.getElementById("home-goals").value);
  const awayGoals = parseInt(document.getElementById("away-goals").value);

  if (isNaN(homeGoals) || isNaN(awayGoals) || homeGoals < 0 || awayGoals < 0) {
    alert("Please enter valid scores for both teams.");
    return;
  }

  matches[currentMatchIndex].homeGoals = homeGoals;
  matches[currentMatchIndex].awayGoals = awayGoals;

  updateStandings(matches[currentMatchIndex]);
  updateMatchTable(matches[currentMatchIndex], currentMatchIndex);
  currentMatchIndex++;
  closeModal();
}

// Close the result modal
function closeModal() {
  document.getElementById("result-modal").style.display = "none";
}
