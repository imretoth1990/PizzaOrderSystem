const express = require("express");
const fileReader = require("./helper_tools/file-reader");
const fileWriter = require("./helper_tools/file-writer");
const path = require("path");
const pizzasRoute = "./pizza_infos/pizzas.json";
const allergensRoute = "./pizza_infos/allergens.json";
const ingredientsRoute = "./pizza_infos/ingredients.json";
const port = 9002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect(301, "/api/pizza");
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/api/allergens", async (req, res) => {
  const fileData = await fileReader(allergensRoute);
  res.json(JSON.parse(fileData));
});

app.get("/api/ingredients", async (req, res) => {
  const fileData = await fileReader(ingredientsRoute);
  res.json(JSON.parse(fileData));
});

app.get("/api/pizza", async (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/pizza/list", async (req, res) => {
  const fileData = await fileReader(pizzasRoute);
  res.json(JSON.parse(fileData));
});

app.post("/api/order", async (req, res) => {});

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
