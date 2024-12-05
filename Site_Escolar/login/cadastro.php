<?php
session_start();
require_once 'config/database.php';

if ( $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
    try {
        $nome = trim( $_POST[ 'nome' ] );
        $email = trim( $_POST[ 'email' ] );
        $senha = password_hash( $_POST[ 'senha' ], PASSWORD_DEFAULT );

        // Verifica se email já existe
        $stmt = $conn->prepare( 'SELECT id FROM usuarios WHERE email = ?' );
        $stmt->execute( [ $email ] );
        if ( $stmt->rowCount() > 0 ) {
            echo json_encode( [ 'success' => false, 'message' => 'Este email já está cadastrado!' ] );
            exit;
        }

        // Insere novo usuário
        $stmt = $conn->prepare( 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)' );
        $stmt->execute( [ $nome, $email, $senha ] );

        echo json_encode( [ 'success' => true, 'message' => 'Cadastro realizado com sucesso!' ] );
        exit;

    } catch( PDOException $e ) {
        echo json_encode( [ 'success' => false, 'message' => 'Erro ao cadastrar: ' . $e->getMessage() ] );
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang = 'pt-br'>
<head>
<meta charset = 'UTF-8' />
<meta name = 'viewport' content = 'width=device-width, initial-scale=1.0' />
<title>Cadastro</title>
<link rel = 'stylesheet' href = 'styles.css' />
</head>
<body>
<div class = 'container'>
<h1 class = 'site-title'>Educação é Mais</h1>
<form class = 'login-form' id = 'cadastroForm'>
<h2>Cadastro</h2>
<div class = 'message'></div>

<div class = 'form-group'>
<label for = 'nome'>Nome</label>
<input type = 'text' id = 'nome' name = 'nome' required />
</div>

<div class = 'form-group'>
<label for = 'email'>Email</label>
<input type = 'email' id = 'email' name = 'email' required />
</div>

<div class = 'form-group'>
<label for = 'senha'>Senha</label>
<input type = 'password' id = 'senha' name = 'senha' required />
</div>

<button type = 'submit'>Cadastrar</button>

<p class = 'signup-link'>
Já tem uma conta? <a href = 'login.php'>Faça login aqui</a>
</p>
</form>
</div>
<script src = 'script.js'></script>
</body>
</html>