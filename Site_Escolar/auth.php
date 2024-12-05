<?php
session_start();

// Conectar ao banco de dados
$conn = new mysqli('localhost', 'root', '', 'site_escolar');

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Erro de conexão: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    // Verificar se o usuário existe
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            
            echo json_encode([
                'success' => true,
                'redirect' => 'index.html'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Senha incorreta'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Usuário não encontrado'
        ]);
    }
    exit();
}

// Verificar status do login
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode([
        'logged_in' => isset($_SESSION['logged_in']) && $_SESSION['logged_in'],
        'username' => $_SESSION['username'] ?? null
    ]);
    exit();
}
?>
