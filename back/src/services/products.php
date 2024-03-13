<?php
include "../config.php";

//Posta um produto
function postProduct($myPDO)
{
    $name = $_POST["name"];
    $amount = $_POST["amount"];
    $price = $_POST["price"];
    $category_code = $_POST["category_code"];

    $productPost = $myPDO->prepare("INSERT INTO products (name, amount, price, category_code ) VALUES (:name, :amount, :price, :category_code)");
    $productPost->bindParam(":name", $name);
    $productPost->bindParam(":amount", $amount);
    $productPost->bindParam(":price", $price);
    $productPost->bindParam(":category_code", $category_code);
    $productPost->execute();
}

//Busca todos os produtos
function getProducts($myPDO)
{
    $products = $myPDO->query("SELECT products.code as productCode, products.name as productName, products.amount, products.price, categories.name as categoryName, categories.tax, products.category_code  FROM products INNER JOIN categories ON products.category_code = categories.code;");
    $data = $products->fetchALL();
    return print_r(json_encode($data));
}

//Deleta um produto
function delProduct($myPDO)
{
    $product = $myPDO->query("DELETE FROM products WHERE code=" . $_REQUEST["code"]);
}

//Atualiza o amount 
function updateProduct($myPDO)
{
    $amount = $_REQUEST["amount"];
    $product = $myPDO->prepare("UPDATE products SET amount = {$amount} WHERE code=" . $_REQUEST["code"]);
    $product->execute();
}
