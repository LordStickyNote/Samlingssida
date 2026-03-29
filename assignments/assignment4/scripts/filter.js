export default function filter(data) {
  let scareLevelRange = document.querySelector("#scareLevelRange").value;

  let dataFiltered = data.filter(
    (house) =>
      house.scareLevel >= scareLevelRange &&
      (!document.querySelector("#hasWifiCheckbox").checked ||
        house.hasWifi === true) &&
      (house.pricePerNight <= document.querySelector("#maxPriceText").value ||
        document.querySelector("#maxPriceText").value == 0) &&
      (house.ghostTypes.includes(document.querySelector("#ghostTypeSelector").value) || document.querySelector("#ghostTypeSelector").value == "alla"),
  );

  return dataFiltered;
}
