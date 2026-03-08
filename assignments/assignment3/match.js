export class bracketMatch {
  constructor(player1, phrase1, skill1, player2, phrase2, skill2) {
    this.player1 = player1;
    this.phrase1 = phrase1;
    this.skill1 = skill1;
    this.player2 = player2;
    this.phrase2 = phrase2;
    this.skill2 = skill2;
  }

  //radera ovanför

  // export class BracketMatch {

  // #player1;
  // #phrase1;
  // #skill1;

  // #player2;
  // #phrase2;
  // #skill2;

  // #winner = null;
  // #element = null;

  // constructor(player1, phrase1, skill1, player2, phrase2, skill2) {
  //   this.#player1 = player1;
  //   this.#phrase1 = phrase1;
  //   this.#skill1 = skill1;

  //   this.#player2 = player2;
  //   this.#phrase2 = phrase2;
  //   this.#skill2 = skill2;
  // }

  render() {
    const match = document.createElement("div");
    match.className = "bracketMatch";

    const participant1 = document.createElement("div");
    const participant1Name = document.createElement("h3");
    const participant1Phrase = document.createElement("p");
    const participant1Skill = document.createElement("p");
    participant1.className = "participant";
    participant1Name.textContent = this.player1;
    participant1Phrase.textContent = this.phrase1;
    participant1Skill.textContent = "Skill: " + this.skill1;

    const vs = document.createElement("b");
    vs.textContent = "VS";

    const participant2 = document.createElement("div");
    const participant2Name = document.createElement("h3");
    const participant2Phrase = document.createElement("p");
    const participant2Skill = document.createElement("p");
    participant2.className = "participant";
    participant2Name.textContent = this.player2;
    participant2Phrase.textContent = this.phrase2;
    participant2Skill.textContent = "Skill: " + this.skill2;

    match.appendChild(participant1);
    participant1.appendChild(participant1Name);
    participant1.appendChild(participant1Skill);
    participant1.appendChild(participant1Phrase);
    match.appendChild(vs);
    match.appendChild(participant2);
    participant2.appendChild(participant2Name);
    participant2.appendChild(participant2Skill);
    participant2.appendChild(participant2Phrase);

    return match;
  }
}
