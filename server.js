// server.js
const express = require('express');
const dotenv = require('dotenv');
const knex = require('knex');
const tasksRoutes = require('./routes/tasksRoutes');
const path = require("path");

// Carregar variáveis de ambiente
dotenv.config();



// Configurar Knex
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

const app = express();

// Middleware
app.use(express.json());

// Rotas
app.use('/api/tasks', tasksRoutes(db));

app.use(express.static(path.join(__dirname, ".", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
