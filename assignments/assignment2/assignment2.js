import { navTabs } from "../../JavaScript/assignments.js";
navTabs(document.querySelector("nav"), 1);

let totalCounter = 0;
itemRender();
shoppingCartTotal();

let resetCartBtn = document.getElementById("reset-cart");
resetCartBtn.addEventListener("click", resetCart);

function inventoryFunction() {
  let inventory = [
    {
      id: "1",
      name: "Telefon",
      description: "En telefon från ett företag",
      price: "30",
      Image: 1,
      category: "telefon",
    },
    {
      id: "2",
      name: "Laptop",
      description: "En Laptop från ett företag",
      price: "6000",
      Image: 2,
      category: "Dator",
    },
    {
      id: "3",
      name: "Hörlurar",
      description: "Ett par hörlurar från ett företag",
      price: "200",
      Image: 3,
      category: "Ljud",
    },
    {
      id: "4",
      name: "Kontroll",
      description: "Ett par hörlurar från ett företag",
      price: "200",
      Image: 4,
      category: "Kontroll",
    },
    {
      id: "5",
      name: "Tangentbord",
      description: "Ett par hörlurar från ett företag",
      price: "200",
      Image: 5,
      category: "Tangentbord",
    },
    {
      id: "5",
      name: "Tangentbord",
      description: "Ett par hörlurar från ett företag",
      price: "200",
      Image: 5,
      category: "Tangentbord",
    },
    {
      id: "5",
      name: "Tangentbord",
      description: "Ett par hörlurar från ett företag",
      price: "200",
      Image: 5,
      category: "Tangentbord",
    },
    {
      id: "5",
      name: "Tangentbord",
      description: "Ett par hörlurar från ett företag",
      price: "200",
      Image: 5,
      category: "Tangentbord",
    },
  ];
  return inventory;
}

function itemRender() {
  let invArray = inventoryFunction();
  for (let i = 0; i < invArray.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let prodName = document.createElement("h2");
    prodName.textContent = invArray[i].name;
    let prodDesc = document.createElement("p");
    prodDesc.textContent = invArray[i].description;
    let prodPrice = document.createElement("h2");
    prodPrice.textContent = invArray[i].price + " kr";
    let prodImg = document.createElement("img");
    prodImg.src = "/images/" + invArray[i].Image + ".jpg";
    let prodCategory = document.createElement("p");
    prodCategory.classList.add("prodCategory");
    prodCategory.textContent = invArray[i].category;
    let addCart = document.createElement("a");
    addCart.textContent = "Lägg till i kundvagn";
    addCart.addEventListener("click", function () {
      addToCart(invArray[i].name, invArray[i].price);
    });
    addCart.classList.add("btn");

    let cardGridContainer = document.getElementById("card-grid-container");

    cardGridContainer.appendChild(card);
    let namePriceContainer = document.createElement("div");
    namePriceContainer.classList.add("namePriceContainer");
    card.appendChild(prodImg);
    card.appendChild(namePriceContainer);
    namePriceContainer.appendChild(prodName);
    namePriceContainer.appendChild(prodPrice);
    card.appendChild(prodCategory);
    card.appendChild(prodDesc);
    card.appendChild(addCart);
  }
}

function shoppingCartTotal() {
  let total = document.createElement("h2");
  total.id = "totalCounter";
  total.textContent = "Total: " + totalCounter + " kr";
  let shoppingCartTotal = document.getElementById("shopping-cart-total");
  shoppingCartTotal.appendChild(total);
}

function updateShoppingCart() {
  let counterUpdate = document.getElementById("totalCounter");
  counterUpdate.textContent = "Total: " + totalCounter + " kr";
}

function resetCart() {
  let item = document.getElementsByClassName("shopping-cart-item");
  while (item.length > 0) {
    item[0].remove();
  }
  totalCounter = 0;
  updateShoppingCart();
}

function addToCart(name, price) {
  let item = document.createElement("div");
  let shoppingCartContent = document.getElementById("shopping-cart-content");
  shoppingCartContent.appendChild(item);
  item.classList.add("shopping-cart-item");
  let nameElement = document.createElement("h3");
  let priceElement = document.createElement("h3");
  nameElement.textContent = name;
  priceElement.textContent = price + " kr";
  item.appendChild(nameElement);
  item.appendChild(priceElement);

  let priceNmbr = Number(price);
  totalCounter = totalCounter + Number(price);
  updateShoppingCart();
}
