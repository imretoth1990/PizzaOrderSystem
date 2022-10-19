export function fetchAndRenderPizzas() {
  fetch("http://127.0.0.1:9002/pizza/list")
    .then((res) => res.json())
    .then((data) => renderPizzas(data.pizzas))
    .catch((err) => console.error(err));

  function renderPizzas(pizzasArray) {
    pizzasArray.forEach((pizza) => {
      const menuContent = document.getElementById("menu-content");

      const pizzaContainer = `
      <div class="in-box">
        <img id="${pizza.id}" class="img-target" src="${pizza.img}"/>
          <div class="in-content">
           <div class="heart-container"><i class="far fa-heart"></i></div>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <h2>${pizza.name}</h2>
              <div class="price">€ ${pizza.price}</div>
              <button class="btn">Add to cart <i class="fas fa-plus-circle"></i></button>
            </div>
          </div>
      </div>`;

      menuContent.insertAdjacentHTML("afterbegin", pizzaContainer);
    });
  }
}
