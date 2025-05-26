// app.js
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb");

// Middleware JSON
app.use(express.json());

// Middleware de autorização temporária
app.use((req, res, next) => {
  req.user = {
    _id: "6834b4cb3cfe631d26479dc7",
  };
  next();
});

// Rotas principais
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Rota 404
app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

// Inicialização do servidor
app
  .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Erro: a porta ${PORT} já está em uso.`);
    } else {
      console.error("Erro ao iniciar o servidor:", err);
    }
  });
