const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost",
    credentials: true
  })
);
app.use(express.json());

// Conexão com MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portal_educacao"
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");

  // Criar tabela de usuários se não existir
  const createTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTable);
});

// Rotas
app.post("/api/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se usuário já existe
    connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          return res.status(400).json({ erro: "Email já cadastrado" });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        // Insere novo usuário
        connection.query(
          "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
          [nome, email, senhaCriptografada],
          (err, result) => {
            if (err) throw err;
            res
              .status(201)
              .json({ mensagem: "Usuário cadastrado com sucesso" });
          }
        );
      }
    );
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    connection.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
          return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        const usuario = results[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
          return res.status(400).json({ erro: "Senha incorreta" });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
          expiresIn: "1d"
        });

        res.json({
          token,
          usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
          }
        });
      }
    );
  } catch (erro) {
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
