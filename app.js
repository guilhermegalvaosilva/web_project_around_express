const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = 3000;

// Middleware para rotas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Rota para qualquer outra coisa (404)
app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
