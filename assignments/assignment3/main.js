import bracketMatch from "./match.js";
import { navTabs } from "../../JavaScript/assignments.js";
navTabs(document.querySelector("nav"), 2);

async function getData(params) {
  const response = await fetch("data.json");
  let data = await response.json();
  return data;
}

const data = await getData();

let currentMatches = [];
let currentPlayers = data;

let nextMatchBtn = document.getElementById("nextMatch");

nextMatchBtn.addEventListener("click", compete);

let resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", () => reset());

let row = document.querySelectorAll(".bracketRows");
let currentRow = 0;

matchmake();

async function reset() {
  currentRow = 0;
  let matchesRow = document.querySelectorAll(".bracketRows");
  for (let i = 0; i < matchesRow.length; i++) {
    matchesRow[i].innerHTML = "";
  }
  currentPlayers = data;

  matchmake();
  nextMatchBtn.disabled = false;
}

function matchmake() {
  currentMatches = [];
  for (let i = 0; i < currentPlayers.length; i++) {
    let player1 = currentPlayers[i];
    let player2 = currentPlayers[++i];

    const match = new bracketMatch(player1, player2);

    currentMatches.push(match);
    row[currentRow].innerHTML += match.render();
  }
}

function compete() {
  currentPlayers = [];

  for (let i = 0; i < currentMatches.length; i++) {
    const match = currentMatches[i];
    match.run();

    let winner;
    if (match.winner === 0) {
      winner = match.player1;
    } else {
      winner = match.player2;
    }

    currentPlayers.push(winner);

    const matchElements = row[currentRow].querySelectorAll(".bracketMatch");
    matchElements[i].outerHTML = match.render();
  }
  currentRow++;
  if (currentRow === 3) nextMatchBtn.disabled = true;
  else matchmake();
}
