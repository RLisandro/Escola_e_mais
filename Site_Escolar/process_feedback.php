<?php
header('Content-Type: application/json');

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'site_escolar';
$username = 'root';
$password = '';

try {
    // Conexão com o banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Receber dados do formulário
    $experiencia = $_POST['experiencia'];
    $facilidade = $_POST['facilidade'];
    $conteudo = $_POST['conteudo'];
    $acessibilidade = $_POST['acessibilidade'];
    $sugestoes = $_POST['sugestoes'] ?? null;

    // Preparar e executar a query
    $sql = "INSERT INTO feedback_respostas (experiencia, facilidade, conteudo, acessibilidade, sugestoes, created_at) 
            VALUES (:experiencia, :facilidade, :conteudo, :acessibilidade, :sugestoes, NOW())";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':experiencia' => $experiencia,
        ':facilidade' => $facilidade,
        ':conteudo' => $conteudo,
        ':acessibilidade' => $acessibilidade,
        ':sugestoes' => $sugestoes
    ]);

    echo json_encode(['success' => true, 'message' => 'Feedback recebido com sucesso!']);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar feedback: ' . $e->getMessage()]);
}
