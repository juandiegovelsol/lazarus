const teams = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
  "Team G",
  "Team H",
];

const matches = [];
const standings = teams.map((team) => ({
  name: team,
  played: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  points: 0,
}));

for (let i = 0; i < teams.length; i++) {
  for (let j = i + 1; j < teams.length; j++) {
    matches.push({
      team1: teams[i],
      team2: teams[j],
      score1: null,
      score2: null,
    });
  }
}

function updateStandings() {
  standings.forEach((team) => {
    team.played = 0;
    team.wins = 0;
    team.draws = 0;
    team.losses = 0;
    team.points = 0;
  });

  matches.forEach((match) => {
    if (match.score1 === null || match.score2 === null) return;
    const team1 = standings.find((t) => t.name === match.team1);
    const team2 = standings.find((t) => t.name === match.team2);
    team1.played++;
    team2.played++;

    if (match.score1 > match.score2) {
      team1.wins++;
      team1.points += 3;
      team2.losses++;
    } else if (match.score1 < match.score2) {
      team2.wins++;
      team2.points += 3;
      team1.losses++;
    } else {
      team1.draws++;
      team2.draws++;
      team1.points++;
      team2.points++;
    }
  });

  standings.sort((a, b) => b.points - a.points);
  renderStandings();
}

function renderMatches() {
  const matchesContainer = document.getElementById("matches");
  matchesContainer.innerHTML = "";

  matches.forEach((match, index) => {
    const matchElement = document.createElement("div");
    matchElement.className = "match";
    matchElement.innerHTML = `
      <span>${match.team1}</span>
      <input type="number" min="0" id="score1-${index}" placeholder="0" value="${
      match.score1 !== null ? match.score1 : ""
    }">
      <span>vs</span>
      <input type="number" min="0" id="score2-${index}" placeholder="0" value="${
      match.score2 !== null ? match.score2 : ""
    }">
      <span>${match.team2}</span>
      <button onclick="saveScore(${index})">Save</button>
    `;
    matchesContainer.appendChild(matchElement);
  });
}

function renderStandings() {
  const standingsBody = document.getElementById("standings");
  standingsBody.innerHTML = "";

  standings.forEach((team) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${team.name}</td>
      <td>${team.played}</td>
      <td>${team.wins}</td>
      <td>${team.draws}</td>
      <td>${team.losses}</td>
      <td>${team.points}</td>
    `;
    standingsBody.appendChild(row);
  });
}

function saveScore(matchIndex) {
  const score1 = document.getElementById(`score1-${matchIndex}`).value;
  const score2 = document.getElementById(`score2-${matchIndex}`).value;

  if (score1 === "" || score2 === "") return;

  matches[matchIndex].score1 = parseInt(score1);
  matches[matchIndex].score2 = parseInt(score2);

  updateStandings();
}

renderMatches();
updateStandings();
