<?php
// Conectar ao banco de dados
$conn = new mysqli('localhost', 'root', '', 'site_escolar');

if ($conn->connect_error) {
    die('Erro de conexão: ' . $conn->connect_error);
}

// Dados do usuário de teste
$username = "professor";
$email = "professor@teste.com";
$password = password_hash("123456", PASSWORD_DEFAULT);

// Primeiro, vamos criar a tabela se ela não existir
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === FALSE) {
    die("Erro ao criar tabela: " . $conn->error);
}

// Verificar se o usuário já existe
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Usuário de teste já existe!<br>";
    echo "Email: professor@teste.com<br>";
    echo "Senha: 123456";
} else {
    // Inserir o usuário de teste
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $username, $email, $password);
    
    if ($stmt->execute()) {
        echo "Usuário de teste criado com sucesso!<br>";
        echo "Email: professor@teste.com<br>";
        echo "Senha: 123456";
    } else {
        echo "Erro ao criar usuário: " . $stmt->error;
    }
}

$conn->close();
?>
