// knexfile.js
module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',  // Ajuste para o usuário do seu banco de dados
    password: 'senac',  // Adicione a senha do seu banco de dados
    database: 'todo_db'
  }
};
