const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersPath = path.join(__dirname, "..", "data", "user.json");

// Rota para listar todos os usuários
router.get("/", (req, res) => {
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ message: "Erro ao carregar usuários" });
    return res.send(JSON.parse(data));
  });
});

// Rota para buscar usuário por ID
router.get("/:id", (req, res) => {
  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err)
      return res.status(500).send({ message: "Erro ao carregar usuários" });

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (user) {
      return res.send(user);
    } else {
      return res.status(404).send({ message: "ID do usuário não encontrado" });
    }
  });
});

module.exports = router;
