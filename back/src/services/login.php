<?php
include "../config.php";
require "../vendor/autoload.php";

use Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__FILE__, 2));
$dotenv->load();

function getAll($myPDO) {
    $users = $myPDO->query("SELECT username FROM users");
    $data = $users->fetchALL();
    printf(json_encode($data));
}

//Cria um usuario
function postUser($myPDO){
    $users = $myPDO->query("SELECT username FROM users");
    $data = $users->fetchALL();
    $username = $_POST["username"];
    $password = $_POST["password"];

    $userPost = $myPDO->prepare("INSERT INTO users (username, password, is_admin) VALUES (:username, :password, FALSE)");
    $userPost->bindParam(":username", $username);
    $userPost->bindParam(":password", $password);
    $userPost->execute();
}

//Verifica se o usuario existe e manda um token pra ele
function login($myPDO){
    $username = strip_tags($_POST["username"]);
    $password = strip_tags($_POST["password"]);

    $login = $myPDO->prepare("SELECT * FROM users WHERE username = :username AND password = :password");
    $login->bindParam(":username", $username);
    $login->bindParam(":password", $password);
    $login->execute();

    $data = $login->fetch();
    
    $payload = [
        "exp" => time() + 1,
        "iat" => time(),
        "username" => $username,
        "isAdmin" => $data[1],
    ];

    $encode = JWT::encode($payload, $_ENV['KEY'], 'HS256');
    
    echo json_encode($encode);
}