let teams = [];
let matches = [];
let standingsData = {};
let currentMatchIndex = 0;
let teamLastMatchTurn = {};

function setupTeams() {
  const teamCount = document.getElementById("team-count").value;
  if (teamCount < 2 || teamCount > 20) {
    alert("Please enter between 2 and 20 teams");
    return;
  }

  const container = document.getElementById("team-names-container");
  container.innerHTML = "";
  for (let i = 0; i < teamCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Team ${i + 1} Name`;
    input.required = true;
    container.appendChild(input);
  }

  document.getElementById("teams-input").style.display = "block";
}

function startTournament() {
  const teamInputs = document.querySelectorAll("#team-names-container input");
  teams = Array.from(teamInputs)
    .map((input) => input.value.trim())
    .filter((name) => name);

  if (teams.length < 2) {
    alert("You must enter at least 2 teams");
    return;
  }

  generateOrderedMatches();
  initStandings();
  document.getElementById("team-setup").style.display = "none";
  document.getElementById("teams-input").style.display = "none";
  document.getElementById("tournament-section").style.display = "block";
  document.getElementById("standings-section").style.display = "block";

  updateCurrentMatchDisplay();
  renderMatches();
}

function generateOrderedMatches() {
  matches = [];
  teamLastMatchTurn = {};
  teams.forEach((team) => (teamLastMatchTurn[team] = -1));

  for (let round = 0; round < teams.length - 1; round++) {
    let availableTeams = [...teams];
    let roundMatches = [];

    while (availableTeams.length > 1) {
      let bestPair = findBestMatchup(availableTeams);
      if (bestPair) {
        roundMatches.push({
          homeTeam: bestPair[0],
          awayTeam: bestPair[1],
          homeGoals: null,
          awayGoals: null,
        });
        availableTeams = availableTeams.filter(
          (team) => team !== bestPair[0] && team !== bestPair[1]
        );
      }
    }

    matches.push(...roundMatches);
  }
}

function findBestMatchup(availableTeams) {
  for (let i = 0; i < availableTeams.length; i++) {
    for (let j = i + 1; j < availableTeams.length; j++) {
      const homeTeam = availableTeams[i];
      const awayTeam = availableTeams[j];

      if (
        teamLastMatchTurn[homeTeam] === -1 &&
        teamLastMatchTurn[awayTeam] === -1
      ) {
        teamLastMatchTurn[homeTeam] = matches.length;
        teamLastMatchTurn[awayTeam] = matches.length;
        return [homeTeam, awayTeam];
      }
    }
  }
  return null;
}

function playNextMatch() {
  if (currentMatchIndex >= matches.length) {
    alert("Tournament finished!");
    return;
  }

  openMatchResultModal(currentMatchIndex);
}

function updateCurrentMatchDisplay() {
  const currentMatchTeams = document.getElementById("current-match-teams");
  if (currentMatchIndex < matches.length) {
    const match = matches[currentMatchIndex];
    currentMatchTeams.textContent = `${match.homeTeam} vs ${match.awayTeam}`;
  } else {
    currentMatchTeams.textContent = "Tournament Completed";
  }
}

function openMatchResultModal(index) {
  const match = matches[index];
  if (match.homeGoals !== null) {
    alert("This match already has a result");
    return;
  }

  document.getElementById(
    "match-teams"
  ).textContent = `${match.homeTeam} vs ${match.awayTeam}`;
  document.getElementById("result-modal").style.display = "block";
}

function saveMatchResult() {
  const homeGoals = parseInt(document.getElementById("home-goals").value);
  const awayGoals = parseInt(document.getElementById("away-goals").value);

  if (isNaN(homeGoals) || isNaN(awayGoals)) {
    alert("Please enter valid goals for both teams");
    return;
  }

  const match = matches[currentMatchIndex];
  match.homeGoals = homeGoals;
  match.awayGoals = awayGoals;

  updateStandings(match);
  renderMatches();
  renderStandings();
  closeModal();

  currentMatchIndex++;
  updateCurrentMatchDisplay();
}

function renderMatches() {
  const matchesBody = document.getElementById("matches-body");
  matchesBody.innerHTML = "";
  for (let i = 0; i <= currentMatchIndex; i++) {
    const match = matches[i];
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${match.homeTeam}</td>
          <td>${match.awayTeam}</td>
          <td>${
            match.homeGoals !== null
              ? `${match.homeGoals} - ${match.awayGoals}`
              : "Pending"
          }</td>
        `;
    matchesBody.appendChild(row);
  }
}

function initStandings() {
  standingsData = {};
  teams.forEach((team) => {
    standingsData[team] = {
      points: 0,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
    };
  });
  renderStandings();
}

function updateStandings(match) {
  const home = match.homeTeam;
  const away = match.awayTeam;

  standingsData[home].played++;
  standingsData[away].played++;

  if (match.homeGoals > match.awayGoals) {
    standingsData[home].points += 3;
    standingsData[home].won++;
    standingsData[away].lost++;
  } else if (match.homeGoals < match.awayGoals) {
    standingsData[away].points += 3;
    standingsData[away].won++;
    standingsData[home].lost++;
  } else {
    standingsData[home].points += 1;
    standingsData[away].points += 1;
    standingsData[home].drawn++;
    standingsData[away].drawn++;
  }
}

function renderStandings() {
  const standingsBody = document.getElementById("standings-body");
  standingsBody.innerHTML = "";

  const sortedTeams = Object.keys(standingsData).sort(
    (a, b) => standingsData[b].points - standingsData[a].points
  );

  sortedTeams.forEach((team) => {
    const row = document.createElement("tr");
    const data = standingsData[team];
    row.innerHTML = `
          <td>${team}</td>
          <td>${data.points}</td>
          <td>${data.played}</td>
          <td>${data.won}</td>
          <td>${data.drawn}</td>
          <td>${data.lost}</td>
        `;
    standingsBody.appendChild(row);
  });
}

function closeModal() {
  document.getElementById("result-modal").style.display = "none";
  document.getElementById("home-goals").value = "";
  document.getElementById("away-goals").value = "";
}
