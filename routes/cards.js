const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const cardsPath = path.join(__dirname, "..", "data", "cards.json");

// Rota para listar todos os cards
router.get("/", (req, res) => {
  fs.readFile(cardsPath, "utf8", (err, data) => {
    if (err) return res.status(500).send({ message: "Erro ao carregar cards" });
    return res.send(JSON.parse(data));
  });
});

module.exports = router;
