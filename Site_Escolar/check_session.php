<?php
session_start();
header('Content-Type: application/json');

$response = [
    'loggedIn' => isset($_SESSION['usuario_id']),
    'userName' => isset($_SESSION['usuario_nome']) ? $_SESSION['usuario_nome'] : null
];

echo json_encode($response);
?>
