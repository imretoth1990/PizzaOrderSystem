export const createPizzaListElements = (pizzaName, pizzaPrice, pizzaId) => {
  const pizzaUnorderedList = document.getElementById("pizza-ul");

  const pizzaListElementHTML = `<li class="listElement">
    <div class="listContentContainer">
      <button class="close-button" type="button">x</button>
      <div class="pizzaName" id="${pizzaName}" value="${pizzaId}" data-pizza-price="${pizzaPrice}">${pizzaName}</div>
      <button class="decrease" value="Decrease Value" type="button">-</button>
      <input type="number" class="number" value="1" min="1"></input>
      <button class="increase" value="Increase Value" type="button">+</button>
    </div>
  </li>`;

  pizzaUnorderedList.insertAdjacentHTML("afterbegin", pizzaListElementHTML);
};
