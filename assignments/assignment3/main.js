import { bracketMatch } from "./match.js";
import { navTabs } from "../../JavaScript/assignments.js";
navTabs(document.querySelector("nav"), 2);

async function getData(params) {
  const response = await fetch("data.json");
  let data = await response.json();
  console.log(data);
  return(data)
}

let data = await getData();


let currentParticipators = [];

let nextMatchBtn = document.getElementById("nextMatch");

nextMatchBtn.addEventListener("click", () => compete(currentParticipators));

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
  data = await getData();
  matchmake();
  nextMatchBtn.disabled = false;
}

function matchmake() {
  currentParticipators = [];
  console.log(data, "NY DATA");
  for (let i = 0; i < data.length; i++) {
    let matchArray = [];
    let name1 = data[i].name;
    let phrase1 = data[i].catchphrase;
    if (phrase1 == null) {
      phrase1 = "??";
    }
    let skill1 = data[i].skillLevel;
    if (skill1 == false) {
      skill1 = "??";
    }
    matchArray.push(data[i]);
    i++;
    let name2 = data[i].name;
    let phrase2 = data[i].catchphrase;
    if (phrase2 == null) {
      phrase2 = "??";
    }
    let skill2 = data[i].skillLevel;
        if (skill2 == false) {
      skill2 = "??";
    }
    matchArray.push(data[i]);

    currentParticipators.push(matchArray);
    console.log(currentParticipators);

    const match = new bracketMatch(
      name1,
      phrase1,
      skill1,
      name2,
      phrase2,
      skill2,
    );
    const matchElement = match.render();
    row[currentRow].appendChild(matchElement);
  }
}

function compete(currentParticipators) {
  console.log("button work", currentParticipators);
  let newData = [];
  for (let i = 0; i < currentParticipators.length; i++) {
    let skill1 = currentParticipators[i][0].skillLevel || 4;
    let skill2 = currentParticipators[i][1].skillLevel || 4;
    const chance = skill1 / (skill1 + skill2);

    console.log("skill 1: ", skill1);
    console.log("skill 2: ", skill2);
    console.log("chance: ", chance);

    if (chance > Math.random()) {
      currentParticipators[i][0].winner = true;
      console.log(
        currentParticipators[i][0],
        currentParticipators[i][0].name,
        "1st won",
      );
    } else {
      currentParticipators[i][1].winner = true;
      console.log(
        currentParticipators[i][1],
        currentParticipators[i][1].name,
        "2nd won",
      );
    }
    console.log(
      currentParticipators[i].length,
      currentParticipators[i],
      currentParticipators,
    );
    for (let j = 0; j < currentParticipators[i].length; j++) {
      if (!currentParticipators[i][j].winner) {
        let matches = row[currentRow].querySelectorAll(".bracketMatch");
        console.log(matches, "matches gotten by class");

        let participants = matches[i].querySelectorAll(".participant");
        console.log(
          participants,
          "participants gotten by class in match class",
        );

        participants[j].classList.add("participantLost");
        console.log(participants[j], "participant that lost gotten by class");
      } else {
        currentParticipators[i][j].winner = false;
        newData.push(currentParticipators[i][j]);
      }
    }
    data = newData;
  }
  currentRow++;
  if (currentRow === 3) {
    nextMatchBtn.disabled=true;
    }
  matchmake();
}
