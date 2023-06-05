const express = require("express");
const app = express();
const port = 3000;
const router = require("./router");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// Definindo o router para gerenciar as rotas
app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
