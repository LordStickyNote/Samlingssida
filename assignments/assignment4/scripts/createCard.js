import filter from "./filter.js";
export default async function createCard() {
  const houses = await getData();

  let formElements = document.querySelectorAll(
    "#ghostTypeSelector, #hasWifiCheckbox, #scareLevelRange, #maxPriceText",
  );

  changeRangeLabel();

  let data = [];

  
      data = filter(houses);
      
      
      const listingGrid = document.querySelector("#listings");
      
      listingGrid.innerHTML = "";
      
      for (let i = 0; i < data.length; i++) {
        const card = new Card(data[i]);
        listingGrid.innerHTML += card.render();
      }
      if (data.length==0) {
        listingGrid.innerHTML="<h1 id='noResults'>Inga sökträffar! Testa ändra sökfiltret.</h1>"
      }

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].addEventListener("change", () => {
      changeRangeLabel();

      data = filter(houses);
      
      
      const listingGrid = document.querySelector("#listings");
      
      listingGrid.innerHTML = "";
      
      for (let i = 0; i < data.length; i++) {
        const card = new Card(data[i]);
        listingGrid.innerHTML += card.render();
      }
      if (data.length==0) {
        listingGrid.innerHTML="<h1 id='noResults'>Inga sökträffar! Testa ändra sökfiltret.</h1>"
      }
    });
  }
}

class Card {
  constructor(data) {
    this.data = data;
  }

  render() {
    let wifi = "";
    let scareLevel = "";
    let scareLevelClass = "";

    switch (this.data.scareLevel) {
      case 1:
        scareLevel = "Mysigt";
        scareLevelClass = "sl1";
        break;
      case 2:
        scareLevel = "Lite läskigt";
        scareLevelClass = "sl2";
        break;
      case 3:
        scareLevel = "Obehagligt";
        scareLevelClass = "sl3";
        break;
      case 4:
        scareLevel = "Skräckinjagande";
        scareLevelClass = "sl4";
        break;
      case 5:
        scareLevel = "Ren terror";
        scareLevelClass = "sl5";
        break;

      default:
        scareLevel = "???";
        break;
    }

    if (this.data.hasWifi) {
      wifi = "<p>WiFi</p>";
    }

    return `<div class='card'>
          <div><img src='img/${this.data.image}' alt='' /></div>
          <div class='cardInfo'>
            <div class='name-location'>
              <h1>${this.data.name}</h1>
              <div class='locationContainer'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
                  <path
                    d='M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z'
                  />
                </svg>
                <p class='location'>${this.data.location}</p>
              </div>
            </div>
            <hr />
            <div class='price-scareLevel'>
              <div class='priceContainer'>
                <h3 class='price'>${this.data.pricePerNight} kr</h3>
                <p>per natt</p>
              </div>
              <p class='scareLevel ${scareLevelClass}'>${scareLevel}</p>
            </div>
            <p class='desc'>
              ${this.data.description}
            </p>
            <div class='tags'>${wifi}</div>
                <a class="btn" href="house.html?id=${this.data.id}">Läs mer</a>
            </div>
        </div>`;
  }
}

async function getData() {
  const response = await fetch("./houses.json");
  const data = await response.json();
  return data;
}

function changeRangeLabel() {
  switch (Number(document.querySelector("#scareLevelRange").value)) {
        case 1:
          document.querySelector("#scareLevelRangeLabel").innerHTML = "Lägsta skräcknivå: Mysigt";
          break;

        case 2:
          document.querySelector("#scareLevelRangeLabel").innerHTML =
            "Lägsta skräcknivå: Lite läskigt";
          break;

        case 3:
          document.querySelector("#scareLevelRangeLabel").innerHTML =
            "Lägsta skräcknivå: Obehagligt";
          break;

        case 4:
          document.querySelector("#scareLevelRangeLabel").innerHTML =
            "Lägsta skräcknivå: Skräckinjagande";
          break;

        case 5:
          document.querySelector("#scareLevelRangeLabel").innerHTML =
            "Lägsta skräcknivå: Ren terror";
          break;

        default:
          break;
      }
}
