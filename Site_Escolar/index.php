<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      Portal Ciências Humanas - Seu guia de estudos em Ciências Humanas
    </title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="quiz.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
      rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <style>
    .btn-sair {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff5252;
        color: white !important;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        z-index: 1000;
        text-decoration: none;
        display: inline-block;
    }
    .btn-sair:hover {
        background-color: #ff3939;
    }
    </style>
  </head>
  <body>
    <?php if(isset($_SESSION['usuario_id'])): ?>
      <a href="login/logout.php" class="btn-sair">
        <i class="fas fa-sign-out-alt"></i> Sair
      </a>
    <?php endif; ?>

    <!-- Resto do conteúdo original do index.html aqui -->
    <header>
      <div id="header">
        <div id="logo">
          <a href="/" class="logo-container">
            <img
              src="logo.svg"
              alt="Logo Educação é Mais"
              width="100"
              height="100" />
            <div class="logo-text">
              <h1>Educação é Mais</h1>
              <p>A EDUCAÇÃO TRANSFORMA</p>
            </div>
          </a>
        </div>
        <nav class="navbar">
          <ul class="nav-links">
            <li>
              <a href="#inicio"><i class="fas fa-home"></i> Início</a>
            </li>
            <li>
              <a href="#historia-card"><i class="fas fa-book"></i> História</a>
            </li>
            <li>
              <a href="#filosofia-card"><i class="fas fa-lightbulb"></i>
                Filosofia</a>
            </li>
            <li>
              <a href="#sociologia-card"><i class="fas fa-users"></i>
                Sociologia</a>
            </li>
            <li>
              <a href="#geografia-card"><i class="fas fa-globe"></i>
                Geografia</a>
            </li>
            <li>
              <a href="#quiz-section"><i
                  class="fas fa-question-circle"></i> Quiz</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Resto do conteúdo do site aqui -->
    
    <script src="script.js"></script>
    <script src="quiz.js"></script>
  </body>
</html>
