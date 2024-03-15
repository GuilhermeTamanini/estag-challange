<?php
include "../config.php";
include "../services/categories.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

switch ($_REQUEST["action"]) {
    case 'post':
        postCategory($myPDO);
        echo ("<script> history.back(); </script>");
        break;

    case 'get':
        getCategories($myPDO);
        break;

    case 'delete':
        try {
            delCategory($myPDO);
            echo ("<script> history.back(); </script>");
        } catch (Exception $e) {
            echo 'Erro ao deletar a categoria, possivelmente há um produto registrado a ela, quando há produtos registrados à uma determinada categoria ela não poderá ser excluída até todos os produtos que estão vinculados à ela sejão excluidos';
            echo '<button onclick="history.back()">Voltar</button>';
        }
        break;
}