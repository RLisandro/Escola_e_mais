<?php
define( 'DB_HOST', 'localhost' );
define( 'DB_USER', 'root' );
define( 'DB_PASS', '' );
define( 'DB_NAME', 'educacao_mais' );

try {
    $conn = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME,
        DB_USER,
        DB_PASS,
        array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        )
    );
    error_log( 'Conexão com banco de dados estabelecida' );
} catch( PDOException $e ) {
    error_log( 'Erro na conexão com banco de dados: ' . $e->getMessage() );
    die( 'Erro na conexão: ' . $e->getMessage() );
}
?>