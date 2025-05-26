// controllers/cards.js
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Erro ao buscar cartões" }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Dados inválidos para criação de cartão" });
      }
      res.status(500).send({ message: "Erro ao criar cartão" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Cartão não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ message: "Cartão deletado com sucesso", card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do cartão inválido" });
      }
      const status = err.statusCode || 500;
      const message = err.statusCode ? err.message : "Erro interno do servidor";
      res.status(status).send({ message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Cartão não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do cartão inválido" });
      }
      const status = err.statusCode || 500;
      const message = err.statusCode ? err.message : "Erro ao curtir o cartão";
      res.status(status).send({ message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Cartão não encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID do cartão inválido" });
      }
      const status = err.statusCode || 500;
      const message = err.statusCode
        ? err.message
        : "Erro ao descurtir o cartão";
      res.status(status).send({ message });
    });
};
