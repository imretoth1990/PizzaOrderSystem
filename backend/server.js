const express = require("express");
const fileReader = require("./fileReader");
const path = require("path");

const dataRoute = "./pizzas.json";
const port = 9002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect(301, "/api/pizza");
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/api/pizza", async (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get("/pizza/list", async (req, res) => {
  const fileData = await fileReader(dataRoute);
  res.json(JSON.parse(fileData));
});

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));
