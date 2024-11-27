let teams = [];

let matches = [];

let standingsData = {};

let currentMatchIndex = 0;

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

function startTournament() {
  const inputs = document.querySelectorAll("#team-names-container input");
  teams = Array.from(inputs)
    .map((input) => input.value.trim())
    .filter((name) => name);

  if (teams.length < inputs.length) {
    alert("All the teams must be named.");
    return;
  }

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

function generateMatchSchedule() {
  matches = [];
  const totalTeams = teams.length;
  const rounds = totalTeams - 1;
  const halfTeams = Math.floor(totalTeams / 2);

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

    const last = teams.pop();
    teams.splice(1, 0, last);

    matches.push(...roundMatches);
  }

  rearrangeMatchesToAvoidConsecutiveTeams();
}

function rearrangeMatchesToAvoidConsecutiveTeams() {
  const adjustedMatches = [];
  const teamLastMatchTurn = {};

  matches.forEach((match) => {
    const { homeTeam, awayTeam } = match;
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
    adjustedMatches.splice(indexToInsert, 0, match);
    teamLastMatchTurn[homeTeam] = indexToInsert;
    teamLastMatchTurn[awayTeam] = indexToInsert;
  });

  matches = adjustedMatches;
}

function initializeStandings() {
  standingsData = {};
  teams.forEach((team) => {
    standingsData[team] = { points: 0, played: 0, won: 0, drawn: 0, lost: 0 };
  });
  updateStandingsDisplay();
}

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

function displaySections() {
  document.getElementById("team-setup").style.display = "none";
  document.getElementById("teams-input").style.display = "none";
  document.getElementById("tournament-section").style.display = "block";
  document.getElementById("standings-section").style.display = "block";
}

function showMatchTable() {
  const tbody = document.getElementById("matches-body");
  matches.forEach((match, index) => {
    const row = document.createElement("tr");
    row.className = "match-row"; // Add a class to the row
    row.innerHTML = `<td>${match.homeTeam}</td><td>${match.awayTeam}</td><td class="match-result">Pending</td>`; // Add a class to the result cell
    tbody.appendChild(row);
  });
}

function updateMatchTable(match, index) {
  const rows = document.querySelectorAll("#matches-body tr"); // Get all table rows
  const resultCell = rows[index].querySelector(".match-result"); // Get the result cell of the current match
  resultCell.textContent = `${match.homeGoals} - ${match.awayGoals}`; // Update the result cell
}

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

  // Reset the input fields
  document.getElementById("home-goals").value = "";
  document.getElementById("away-goals").value = "";

  closeModal();
}

function closeModal() {
  document.getElementById("result-modal").style.display = "none";
}
