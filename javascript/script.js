document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário

  // Obter os valores dos campos
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var telefone = document.getElementById('telefone').value;

  // Criar objeto de cliente
  var cliente = {
    nome: nome,
    email: email,
    telefone: telefone
  };

  // Salvar cliente no banco de dados
  salvarCliente(cliente);
  alert('Cliente cadastrado com sucesso!');
  this.reset(); // Limpar o formulário
});

function salvarCliente(cliente) {
  // Conectar-se ao banco de dados (SQLite) usando o DB Browser
  // e executar uma query de inserção para adicionar o cliente na tabela de clientes
  const fs = require('fs');

  // Ler o conteúdo do arquivo JSON existente, se houver
  let data = [];
  try {
    const fileData = fs.readFileSync('clientes.json');
    data = JSON.parse(fileData);
  } catch (err) {
    // O arquivo ainda não existe ou não é válido
  }

  // Adicionar o novo cliente aos dados existentes
  data.push(cliente);

  // Converter os dados para JSON
  const jsonData = JSON.stringify(data, null, 2);

  // Salvar os dados no arquivo JSON
  fs.writeFile('clientes.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      // Lidar com o erro caso ocorra
      return;
    }
    console.log('Cliente cadastrado com sucesso!');
  });
}
