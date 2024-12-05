<?php
session_start();
require_once 'config/database.php';

// Processamento do login
if ( $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
    try {
        $email = trim( $_POST[ 'email' ] );
        $senha = $_POST[ 'senha' ];

        $stmt = $conn->prepare( 'SELECT id, nome, email, senha FROM usuarios WHERE email = ?' );
        $stmt->execute( [ $email ] );
        $usuario = $stmt->fetch( PDO::FETCH_ASSOC );

        if ( $usuario ) {
            if ( password_verify( $senha, $usuario[ 'senha' ] ) ) {
                $_SESSION[ 'usuario_id' ] = $usuario[ 'id' ];
                $_SESSION[ 'usuario_nome' ] = $usuario[ 'nome' ];
                echo json_encode( [ 'success' => true, 'message' => 'Login realizado com sucesso!', 'redirect' => '../index.html' ] );
            } else {
                echo json_encode( [ 'success' => false, 'message' => 'Senha incorreta!' ] );
            }
        } else {
            echo json_encode( [ 'success' => false, 'message' => 'Email não cadastrado!' ] );
        }
        exit;
    } catch( PDOException $e ) {
        error_log( 'Erro no login: ' . $e->getMessage() );
        echo json_encode( [ 'success' => false, 'message' => 'Erro ao fazer login: ' . $e->getMessage() ] );
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang='pt-br'>
<head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>Tela de Login</title>
    <link rel='stylesheet' href='styles.css' />
</head>
<body>
    <div class='container'>
        <h1 class='site-title'>Educação é Mais</h1>
        <div class='login-form'>
            <h2>Login</h2>
            <?php
            if (isset($_SESSION['logout_message'])) {
                echo '<div class="message success logout-message">' . $_SESSION['logout_message'] . '</div>';
                unset($_SESSION['logout_message']);
            }
            ?>
            <form id='loginForm'>
                <div class='message'></div>
                <div class='form-group'>
                    <label for='email'>Email</label>
                    <input type='email' id='email' name='email' required />
                </div>
                <div class='form-group'>
                    <label for='senha'>Senha</label>
                    <input type='password' id='senha' name='senha' required />
                </div>
                <button type='submit'>Entrar</button>
                <p class='signup-link'>
                    Não tem uma conta? <a href='cadastro.php'>Cadastre-se aqui</a>
                </p>
            </form>
        </div>
    </div>
    <script src='script.js'></script>
</body>
</html>