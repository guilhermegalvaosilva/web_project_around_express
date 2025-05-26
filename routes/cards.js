const express = require("express");
const router = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);

// 👉 Adicionado console.log() para verificar se a rota está sendo chamada
router.put(
  "/:cardId/likes",
  (req, res, next) => {
    console.log("➡️ PUT /cards/:cardId/likes chegou!");
    next();
  },
  likeCard
);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
