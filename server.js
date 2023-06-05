const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const xlsx = require('xlsx-populate');

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para analisar os dados enviados no corpo das solicitações
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para lidar com o envio do formulário
app.post('/cadastro', (req, res) => {
  // Obter os dados enviados no formulário
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;

  // Criar objeto de cliente
  const cliente = {
    nome: nome,
    email: email,
    telefone: telefone
  };

  // Conectar-se ao banco de dados SQLite
  const db = new sqlite3.Database('database.db');

  // Executar a consulta de inserção
  const query = `INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)`;
  db.run(query, [cliente.nome, cliente.email, cliente.telefone], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar o cliente no banco de dados.');
    } else {
      console.log('Cliente cadastrado com sucesso!');

      // Salvar os dados em uma planilha do Excel
      const workbook = xlsx.readFile('clientes.xlsx');
      const worksheet = workbook.sheet(0);
      const lastRow = worksheet.usedRange().endCell().rowNumber();
      worksheet.cell(`A${lastRow + 1}`).value(cliente.nome);
      worksheet.cell(`B${lastRow + 1}`).value(cliente.email);
      worksheet.cell(`C${lastRow + 1}`).value(cliente.telefone);
      workbook.toFileAsync('clientes.xlsx')
        .then(() => {
          console.log('Dados salvos na planilha do Excel.');
          res.status(200).send('Cliente cadastrado com sucesso!');
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Erro ao salvar os dados na planilha do Excel.');
        });
    }
  });

  // Fechar a conexão com o banco de dados após a conclusão da consulta
  db.close();
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
