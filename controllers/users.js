// controllers/users.js
const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Erro ao buscar usuários" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Usuário não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de usuário inválido" });
      }
      const status = err.statusCode || 500;
      const message = err.statusCode ? err.message : "Erro interno do servidor";
      res.status(status).send({ message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Dados inválidos para criação de usuário" });
      }
      res.status(500).send({ message: "Erro ao criar usuário" });
    });
};
