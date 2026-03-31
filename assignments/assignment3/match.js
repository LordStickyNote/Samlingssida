export default class BracketMatch {
  #player1;
  #player2;

  #winner = null;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
  }

  get player1() {
    return this.#player1;
  }

  get player2() {
    return this.#player2;
  }

  get isPlayed() {
    return this.#winner !== null;
  }

  get winner() {
    return this.#winner;
  }

  run() {
    let skill1 = this.#player1.skillLevel || 4;
    let skill2 = this.#player2.skillLevel || 4;
    const chance = skill1 / (skill1 + skill2);

    if (chance > Math.random()) {
      this.#winner = 0;
    } else {
      this.#winner = 1;
    }
  }

  render() {
    let player1Classes = "";
    let player2Classes = "";

    if (this.#winner === 0) {
      player2Classes = "participantLost";
    }

    if (this.#winner === 1) {
      player1Classes = "participantLost";
    }

    return `<div class="bracketMatch">
      <div class="participant ${player1Classes}">
        <h3>${this.player1.name}</h3>
        <p>${this.player1.catchphrase || "??"}</p>
        <p>Skill: ${this.player1.skillLevel || "??"}</p>
      </div>
      <b>VS</b>
      <div class="participant ${player2Classes}">
        <h3>${this.player2.name}</h3>
        <p>${this.player2.catchphrase || "??"}</p>
        <p>Skill: ${this.player2.skillLevel || "??"}</p>
      </div>
    </div>`;
  }
}
