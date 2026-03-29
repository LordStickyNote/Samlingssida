const d = new Date();
let currentDate = d.toISOString().slice(0, 10);

export class Booking {
  constructor(currentDate) {
    this.currentDate = currentDate;
  }

  updateValue() {
const housePrice = Number(document.querySelector('.price').textContent.replace('kr', ''));


    let totalPrice = housePrice;
    console.log("updateValue körs");
    let days = document.querySelector("#days").value;

    let total = housePrice * days;
    if (document.querySelector("#breakfast").checked) total += 100 * days;
    if (document.querySelector("#ghostround").checked) total += 300 * days;
    if (document.querySelector("#seans").checked) total += 500 * days;
    if (document.querySelector("#code").value=="GHOST20") total = total * 0.8;

    console.log(housePrice);

    document.querySelector("#totalPrice").innerHTML =
      "Total: " + total + "kr";
  }

  render() {
    return `<form id="bookingForm">
            <label for="checkIn">Incheckningsdatum</label>
            <input type="date" name="checkIn" id="checkIn" min="${this.currentDate}" />
            <label for="checkIn">Antal dagar</label>
            <input type="number" name="" id="days" min="1">
            
            <label for="breakfast">Frukost</label>
            <input type="checkbox" name="breakfast" id="breakfast">
            <label for="ghostround">Spökvandring</label>
            <input type="checkbox" name="ghostround" id="ghostround">
            <label for="seans">Seans</label>
            <input type="checkbox" name="seans" id="seans">
            <label for="code">Kampanjkod</label>
            <input type="text" name="code" id="code" placeholder="Skriv in kampanjkod">
            
            <h1 id='totalPrice'>Total: -</h1>
            <div id="confirmation"></div>
            
            <input type="submit" value="Boka" class="btn" id="bookBtn"></input>
            </form>`;
  }
}

export default function bookingForm() {
  const d = new Date();
  const currentDate = d.toISOString().slice(0, 10);
  const booking = new Booking(currentDate);
  return booking.render();
}
