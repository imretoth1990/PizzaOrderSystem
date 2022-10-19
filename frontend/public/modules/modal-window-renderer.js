export function fetchAndSpreadAllergensAndIngredients(event) {
  fetch("http://127.0.0.1:9002/api/allergens")
    .then((res) => res.json())
    .then((data) => populateModalWindow(data.allergens, event, false))
    .catch((err) => console.error(err));

  fetch("http://127.0.0.1:9002/api/ingredients")
    .then((res) => res.json())
    .then((data) => populateModalWindow(data.ingredients, event, true))
    .catch((err) => console.error(err));

  function populateModalWindow(arrayOfObjects, event, isIngredients) {
    const listElementID = isIngredients ? "#ingredients" : "#allergens";
    const containerElementID = isIngredients ? "#ingredient-ids" : "#allergen-ids";

    const unorderedList = document.querySelector(`${listElementID}`).lastElementChild;
    const IDs = event.target.parentElement.querySelector(`${containerElementID}`).textContent;
    const arrayOfIDs = IDs.split(",").map(Number);

    const matchingNames = [];

    arrayOfObjects.forEach((obj) => {
      if (arrayOfIDs.includes(obj.id)) matchingNames.push(obj.name);
    });

    matchingNames.sort().reverse();

    matchingNames.forEach((name) => {
      const listItem = `<li>&#x2022; ${name}</li>`;
      unorderedList.insertAdjacentHTML("afterbegin", listItem);
    });
  }
}
