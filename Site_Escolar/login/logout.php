<?php
session_start();
session_destroy();
$_SESSION = array();

// Mensagem de despedida
session_start();
$_SESSION['logout_message'] = "Até logo! 👋 Esperamos ver você em breve novamente! 😊";

header('Location: login.php');
exit;
?>