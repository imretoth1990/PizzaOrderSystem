import { fetchAndRenderPizzas } from "./modules/pizza-renderer.js";
import { fetchAndSpreadAllergensAndIngredients } from "./modules/modal-window-renderer.js";
// import { orderPizza } from "./modules/pizza-orderer.js";
import { postOrderData } from "./modules/httpRequests.js";
import { createPizzaListElements } from "./modules/generateDOM.js";

fetchAndRenderPizzas();

// Search bar
const searchBtn = document.querySelector("#search");
const searchFrm = document.querySelector(".head .search-bar");

// Cart button and window
const cartBtn = document.querySelector("#cart");
const cartWindow = document.querySelector(".head .cart-window");

// Head navigation bar
const menu = document.querySelector(".head .navbar");
const bars = document.querySelector("#bars");

// Modal window 'ok' button
const okBtn = document.querySelector("#ok-button");

// Increase and decrease value buttons
searchBtn.onclick = () => {
  searchFrm.classList.toggle("active");
  menu.classList.remove("active");
  cartWindow.classList.remove("active");
};

cartBtn.onclick = () => {
  cartWindow.classList.toggle("active");
  menu.classList.remove("active");
  searchFrm.classList.remove("active");
};

bars.onclick = () => {
  menu.classList.toggle("active");
  searchFrm.classList.remove("active");
  cartWindow.classList.remove("avtice");
};

okBtn.onclick = () => {
  let ul = document.getElementById("ingredients").lastElementChild;
  let ulChild = ul.lastElementChild;
  while (ulChild) {
    ul.removeChild(ulChild);
    if (!ul.hasChildNodes()) ul = document.getElementById("allergens").lastElementChild;
    ulChild = ul.lastElementChild;
  }
};

window.onscroll = () => {
  menu.classList.remove("active");
  searchFrm.classList.remove("active");
  cartWindow.classList.remove("active");
};

document.addEventListener("click", (event) => {
  const elementClass = event.target.classList;

  if (elementClass.contains("img-target")) {
    fetchAndSpreadAllergensAndIngredients(event);
  }

  if (!elementClass.contains("fa-heart")) return;

  event.target.className = event.target.className === "far fa-heart" ? "fa fa-heart" : "far fa-heart";
});

const card = document.getElementsByClassName("in-box");
const closeButton = document.getElementById("close-button");
const okButton = document.getElementById("ok-button");

const createModalWindow = function (event) {
  const modalWindow = document.getElementsByClassName("bg-modal");
  const list = event.target.classList;

  if (list[0].includes("img-target")) modalWindow[0].style.display = "flex";
};

okButton.addEventListener("click", function () {
  const modalWindow = document.getElementsByClassName("bg-modal");
  modalWindow[0].style.display = "none";
});

document.addEventListener("click", createModalWindow);

const menuBtn = document.getElementById("menu-btn");

menuBtn.addEventListener("click", function () {
  window.location.href = "#menu";
});

// Menu button
document.getElementById("return").addEventListener("click", () => {
  window.location.href = "#menu";
});

const newDate = new Date();
let orderScheme = {
  pizzas: [],
  date: {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    day: newDate.getDate(),
    hour: newDate.getHours(),
    minute: newDate.getMinutes(),
  },
  customer: {
    name: "",
    email: "",
    address: {
      city: "",
      street: "",
    },
  },
};

const writeOrder = () => {
  const pizzaName = document.querySelectorAll(".pizzaName");
  const inputValue = document.querySelectorAll(".number");

  const name = document.getElementById("customer-name");
  const email = document.getElementById("customer-email");
  const city = document.getElementById("city");
  const street = document.getElementById("street");

  for (let i = 0; i < pizzaName.length; i++) {
    const newPizzas = {
      id: "",
      amount: "",
    };
    newPizzas.id = pizzaName[i].getAttribute("value");
    newPizzas.amount = inputValue[i].value;
    orderScheme.pizzas.push(newPizzas);
  }

  let newCustomer = {
    name: `${name.value}`,
    email: `${email.value}`,
    address: {
      city: `${city.value}`,
      street: `${street.value}`,
    },
  };

  Object.assign(orderScheme.customer, newCustomer);
};

// updateOrderScheme(newName);

document.getElementById("order").addEventListener("click", () => {
  writeOrder();
  postOrderData(orderScheme);
  alert("Congratulation!Your order has been sent successfully");
  console.log(orderScheme);
});

document.addEventListener("click", (event) => {
  const pizzaElement = document.getElementById(`${event.target.dataset.pizzaName}`);

  if (event.target.classList.contains("btn")) {
    let inputValue = +document.querySelector("#sum").value;
    inputValue += +event.target.dataset.pizzaPrice;
    document.querySelector("#sum").value = inputValue;
  }

  // const cartDiv = document.querySelector(".cart-window");

  // if (!cartDiv.classList.contains("active")) {
  //   document.getElementById("cart").click();
  // }

  // const pizzaAmountValue = document.querySelectorAll(".number");

  // if (pizzaAmountValue.value === 0) {
  //   cartDiv.classList.remove("active");
  // }

  if (event.target.classList.contains("btn")) {
    if (document.body.contains(pizzaElement)) {
      pizzaElement.nextElementSibling.nextElementSibling.value++;
    } else {
      createPizzaListElements(event.target.dataset.pizzaName, event.target.dataset.pizzaPrice, event.target.dataset.pizzaId);
      const pizzaUL = document.getElementById("pizza-ul");
      if (pizzaUL.childNodes.length >= 1) {
        cartWindow.classList.toggle("active");
      } // } else if (pizzaUL.childNodes.length < 1) {
      //   cartWindow.classList.remove("active");
      // }
    }
  }

  if (event.target.classList.contains("decrease")) {
    if (event.target.nextElementSibling.value === "0") return;
    const input = event.target.nextElementSibling;
    input.value = +input.value === 0 ? 0 : +input.value - 1;

    let inputValue = +document.querySelector("#sum").value;
    inputValue -= +event.target.previousElementSibling.dataset.pizzaPrice;
    if (inputValue < 0) inputValue = 0;
    document.querySelector("#sum").value = inputValue;
  }

  if (event.target.classList.contains("increase")) {
    event.target.previousElementSibling.value++;

    let inputValue = +document.querySelector("#sum").value;
    inputValue += +event.target.previousElementSibling.previousElementSibling.previousElementSibling.dataset.pizzaPrice;

    document.querySelector("#sum").value = inputValue;
  }

  if (event.target.classList.contains("close-button")) {
    console.log("close");
    const pizzaValue = +event.target.nextElementSibling.dataset.pizzaPrice;
    const pizzaAmount = +event.target.nextElementSibling.nextElementSibling.nextElementSibling.value;

    let sumValue = document.querySelector("#sum").value;
    sumValue -= pizzaValue * pizzaAmount;
    document.querySelector("#sum").value = sumValue;

    while (event.target.nextElementSibling) event.target.nextElementSibling.remove();
    event.target.remove();
  }
});

document.querySelector("#order").addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));

  const list = document.getElementById("pizza-ul");
  let lastChild = list.lastElementChild;

  while (lastChild) {
    list.removeChild(lastChild);
    lastChild = list.lastElementChild;
  }
});
