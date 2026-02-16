import { navTabs } from "../../JavaScript/assignments.js";
navTabs(document.querySelector("nav"), 1);

let totalCounter = 0;
let counter = localStorage.getItem("totalCounterLocalStorage");
if (counter) {
  totalCounter = Number(counter.replace("Total: ", "").replace(" kr", "")) || 0;
}

let resetCartBtn = document.getElementById("reset-cart");
resetCartBtn.addEventListener("click", resetCart);

let shoppingCartContent = document.getElementById("shopping-cart-content");

let cart = localStorage.getItem("cart");
if (cart) {
  shoppingCartContent.innerHTML = cart;
} else {
  shoppingCartContent.innerHTML = "";
}

itemRender();
shoppingCartTotal();

function inventoryFunction() {
  let inventory = [
    {
      id: "1",
      name: "Telefon",
      description: "En enkel och pålitlig telefon för vardagligt bruk.",
      price: "9000",
      Image: 1,
      category: "telefon",
    },
    {
      id: "2",
      name: "Laptop",
      description: "En bärbar dator som passar arbete, skola och surf.",
      price: "6000",
      Image: 2,
      category: "Dator",
    },
    {
      id: "3",
      name: "Hörlurar",
      description: "Bekväma hörlurar med bra ljud för musik och spel.",
      price: "200",
      Image: 3,
      category: "Ljud",
    },
    {
      id: "4",
      name: "Kontroll",
      description: "En handkontroll som passar perfekt för gaming.",
      price: "200",
      Image: 4,
      category: "Kontroll",
    },
    {
      id: "5",
      name: "Tangentbord",
      description: "Ett stabilt tangentbord för både spel och arbete.",
      price: "200",
      Image: 5,
      category: "Tangentbord",
    },
    {
      id: "6",
      name: "Gamingmus",
      description: "En snabb mus med bra precision.",
      price: "150",
      Image: 6,
      category: "Mus",
    },
    {
      id: "7",
      name: "Skärm",
      description: "En tydlig skärm som passar gaming och film.",
      price: "1200",
      Image: 7,
      category: "Skärm",
    },
    {
      id: "8",
      name: "Mikrofon",
      description: "En mikrofon med klart ljud för snack och streaming.",
      price: "300",
      Image: 8,
      category: "Ljud",
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
    prodImg.src = "../../images/" + invArray[i].Image + ".jpg";
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
  localStorage.setItem("totalCounterLocalStorage", counterUpdate.textContent);
}

function resetCart() {
  let item = document.getElementsByClassName("shopping-cart-item");
  while (item.length > 0) {
    item[0].remove();
  }
  localStorage.removeItem("cart");
  localStorage.removeItem("totalCounterLocalStorage");
  totalCounter = 0;
  updateShoppingCart();
}

function addToCart(name, price) {
  let itemShoppingcart = document.getElementsByClassName("shopping-cart-item");

  for (const element of itemShoppingcart) {
    let h3Elements = element.getElementsByTagName("h3");
    let itemName = h3Elements[0].textContent;
    let itemPrice = h3Elements[1].textContent;
    if (name == itemName) {
      let multiplier = element.querySelector("h4");

      let priceElement = h3Elements[1];
      let count;

      if (!multiplier) {
        multiplier = document.createElement("h4");
        count = 2;
        element.appendChild(multiplier);
      } else {
        let current = Number(multiplier.textContent.replace("x", ""));
        count = current + 1;
      }

      multiplier.textContent = count + "x";
      priceElement.textContent = Number(price) * count + " kr";
      totalCounter += Number(price);
      updateShoppingCart();
      localStorage.setItem("cart", shoppingCartContent.innerHTML);
      return;
    }
  }

  let item = document.createElement("div");
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
  localStorage.setItem("cart", shoppingCartContent.innerHTML);
}
