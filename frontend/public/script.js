import { fetchAndRenderPizzas } from "./modules/pizzaRenderer.js";
fetchAndRenderPizzas();

const searchBtn = document.querySelector("#search");
const searchFrm = document.querySelector(".head .search-bar");
const menu = document.querySelector(".head .navbar");
const bars = document.querySelector("#bars");

searchBtn.onclick = () => {
  searchFrm.classList.toggle("active");
  menu.classList.remove("active");
};

bars.onclick = () => {
  menu.classList.toggle("active");
  searchFrm.classList.remove("active");
};

window.onscroll = () => {
  menu.classList.remove("active");
  searchFrm.classList.remove("active");
};

document.addEventListener("click", (event) => {
  const elementClass = event.target.classList;
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

fetch("http://127.0.0.1:9002/pizza/list")
  .then((res) => res.json())
  .then((data) => getDataForModalWindow(data.pizzas))
  .catch((err) => console.error(err));

const card = document.getElementsByClassName("in-box");
const closeButton = document.getElementById("close-button");

const createModalWindow = function (event) {
  const getDataForModalWindow = (data) => {
    console.log(data);
  };

  const modalWindow = document.getElementsByClassName("bg-modal");
  const list = event.target.classList;
  const imgID = event.target.id;
  // const actualObject = object.find((x) => x.id === imgID);
  if (list[0].includes("img-target")) {
    // modalWindow[0].style.display = "flex";
    console.log(object);
  }
};

closeButton.addEventListener("click", function () {
  const modalWindow = document.getElementsByClassName("bg-modal");
  modalWindow[0].style.display = "none";
});

document.addEventListener("click", createModalWindow);
