import bookingForm, { Booking } from "./booking.js";
export default async function createDetailPage() {
  const data = await getData();
  let houseId = new URLSearchParams(location.search).get("id");
  const houseContent = document.querySelector("#houseContent");

  let house = data.find((item) => item.id == houseId);
  const card = new Card(house);
  houseContent.innerHTML += card.render();

  const bookingFormContainer = document.querySelector("#bookingFormContainer");
  bookingFormContainer.innerHTML = bookingForm();

  const booking = new Booking();

  const form = document.querySelectorAll("#bookingForm>input");
  console.log(form);
  for (const element of form) {
    element.addEventListener("change", () => {
      booking.updateValue();
    });
  }

  const bookBtn = document.querySelector("#bookingForm");
  bookBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      document.querySelector("#checkIn").value &&
      document.querySelector("#days").value > 0
    ) {
      let breakfast = "";

      if (document.querySelector("#breakfast").checked) {
        breakfast = "Frukost";
      }
      let ghostround = "";

      if (document.querySelector("#ghostround").checked) {
        ghostround = "Spökvandring";
      }
      let seans = "";

      if (document.querySelector("#seans").checked) {
        seans = "Seans";
      }

      document.querySelector("#confirmation").innerHTML =
        `Bokat ${card.data.name} i ${document.querySelector("#days").value} dagar.`;

      if (ghostround || breakfast || seans) {
        document.querySelector("#confirmation").innerHTML +=
          `</br>Tillägg: </br> <p>${breakfast}</p> <p>${ghostround}</p> <p>${seans}</p>`;
      }

      if (document.querySelector("#code").value == "GHOST20") {
        document.querySelector("#confirmation").innerHTML +=
          `<p>Rabbat på 20%</p>`;
      }

      for (const element of form) {
        element.value = "";
      }

      document.querySelector("#bookBtn").value="Boka";
      
    }
  });

  const weatherContainer = document.querySelector("#weatherContainer");
  weatherContainer.innerHTML += await card.weatherRender();
}

class Card {
  constructor(data) {
    this.data = data;
  }

  async weatherRender() {
    let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${this.data.coordinates.lat}&longitude=${this.data.coordinates.lng}&hourly=temperature_2m&current=weather_code,temperature_2m,rain,snowfall,showers&timezone=auto`;
    const data = await getWeather(weatherUrl);
    let weatherContent;
    if (data == false) {
      return (weatherContent = `<p>Kunde inte hämta väder</p>`);
    } else {
      return (weatherContent = `<p><b>Grader: </b>${data.current.temperature_2m}${data.current_units.temperature_2m}</p>
  
      <p><b>Regn: </b>:${data.current.rain}${data.current_units.rain}</p>
      
      <p><b>Snö: </b>:${data.current.snowfall}${data.current_units.snowfall}</p>
      `);
    }
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

    let ghostTypesRender = "";
    for (let i = 0; i < this.data.ghostTypes.length; i++) {
      ghostTypesRender += this.data.ghostTypes[i];
      if (this.data.ghostTypes[i + 1]) {
        ghostTypesRender += ", ";
      }
    }

    return `<div class="detailedContainer">
          <div><img src="img/${this.data.image}" alt="" /></div>
          <div class="detailInfo">
            <a class="btn" href="./index.html">Tillbaka</a>
            <h1>${this.data.name}</h1>
            <div class="locationContainer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                />
              </svg>
              <p class="location">${this.data.location}</p>
            </div>
            <div id='weatherContainer'>
            </div>
            <hr />
            <div class="price-scareLevel">
              <div class="priceContainer">
                <h3 class="price">${this.data.pricePerNight} kr</h3>
                <p>per natt</p>
              </div>
              <p class="scareLevel ${scareLevelClass}">${scareLevel}</p>
            </div>
            <p class="desc">${this.data.description}</p>
            <p class="desc"><b>Spöktyper</b>: ${ghostTypesRender}</p>
            <div class="tags">${wifi}</div>
            <hr />
              <div id='bookingFormContainer'></div>
          </div>
          <div>
          </div>
        </div>`;
  }
}

async function getData() {
  const response = await fetch("./houses.json");
  const data = await response.json();
  return data;
}

async function getWeather(weaterUrl) {
  try {
    const response = await fetch(weaterUrl);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
}
