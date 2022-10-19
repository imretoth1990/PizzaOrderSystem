import { fetchAndRenderPizzas } from "./modules/pizza-renderer.js";
import { fetchAndSpreadAllergensAndIngredients } from "./modules/modal-window-renderer.js";

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
    // console.log(ul.hasChildNodes());
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

  if (elementClass.contains("far")) {
    elementClass.remove("far");
    elementClass.add("fa");
  } else {
    elementClass.remove("fa");
    elementClass.add("far");
  }
});

// Modal section

// fetch("http://127.0.0.1:9002/pizza/list")
//   .then((res) => res.json())
//   .then((data) => getDataForModalWindow(data.pizzas))
//   .catch((err) => console.error(err));

const card = document.getElementsByClassName("in-box");
const closeButton = document.getElementById("close-button");
const okButton = document.getElementById("ok-button");

const createModalWindow = function (event) {
  const modalWindow = document.getElementsByClassName("bg-modal");
  const list = event.target.classList;
  // const imgID = event.target.id;
  // const actualObject = object.find((x) => x.id === imgID);
  if (list[0].includes("img-target")) {
    modalWindow[0].style.display = "flex";
    // console.log(object);
  }
};

okButton.addEventListener("click", function () {
  const modalWindow = document.getElementsByClassName("bg-modal");
  modalWindow[0].style.display = "none";
});

document.addEventListener("click", createModalWindow);

// Menu button

// document.getElementById("menu-btn").addEventListener("click", () => {
//   window.parent.location.href = "#menu";
// });

document.getElementById("buy").addEventListener("click", () => {
  alert("Redirecting to payment site...");
});
