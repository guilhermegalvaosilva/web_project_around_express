const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = process.env.PORT || 3000; // Porta configurável via variável de ambiente

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Rota para qualquer outra coisa (404)
app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

// Inicialização do servidor com tratamento de erro
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
