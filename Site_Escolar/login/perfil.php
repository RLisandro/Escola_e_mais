<?php
session_start();
require_once 'config/database.php';

// Verifica se usuário está logado
if ( !isset( $_SESSION[ 'usuario_id' ] ) ) {
    header( 'Location: login.php' );
    exit;
}

// Processar exclusão de conta
if ( $_SERVER[ 'REQUEST_METHOD' ] == 'POST' && isset( $_POST[ 'excluir_conta' ] ) ) {
    try {
        $stmt = $conn->prepare( 'DELETE FROM usuarios WHERE id = ?' );
        $stmt->execute( [ $_SESSION[ 'usuario_id' ] ] );

        session_destroy();
        header( 'Location: login.php?message=conta_excluida' );
        exit;
    } catch( PDOException $e ) {
        $erro = 'Erro ao excluir conta: ' . $e->getMessage();
    }
}

// Buscar dados do usuário
try {
    $stmt = $conn->prepare( 'SELECT nome, email FROM usuarios WHERE id = ?' );
    $stmt->execute( [ $_SESSION[ 'usuario_id' ] ] );
    $usuario = $stmt->fetch( PDO::FETCH_ASSOC );
} catch( PDOException $e ) {
    $erro = 'Erro ao buscar dados: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang = 'pt-br'>
<head>
<meta charset = 'UTF-8'>
<meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'>
<title>Perfil do Usuário</title>
<link rel = 'stylesheet' href = 'styles.css'>
</head>
<body>
<div class = 'container'>
<h1 class = 'site-title'>Educação é Mais</h1>
<div class = 'login-form'>
<h2>Meu Perfil</h2>

<?php if ( isset( $erro ) ): ?>
<div class = 'message error'><?php echo $erro;
?></div>
<?php endif;
?>

<div class = 'form-group'>
<label>Nome</label>
<p><?php echo htmlspecialchars( $usuario[ 'nome' ] );
?></p>
</div>

<div class = 'form-group'>
<label>Email</label>
<p><?php echo htmlspecialchars( $usuario[ 'email' ] );
?></p>
</div>

<form method = 'POST' onsubmit = "return confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');">
<input type = 'hidden' name = 'excluir_conta' value = '1'>
<button type = 'submit' class = 'btn-danger'>Excluir Conta</button>
</form>

<p class = 'signup-link'>
<a href = 'logout.php'>Sair da conta</a>
</p>
</div>
</div>
</body>
</html>