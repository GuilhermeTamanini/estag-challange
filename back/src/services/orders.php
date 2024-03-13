<?php
include "../config.php";

//Cria uma order
function postOrder($myPDO)
{
    $total = $_REQUEST["total"];
    $tax = $_REQUEST["tax"];
    $ordersPost = $myPDO->prepare("INSERT INTO orders (total, tax) VALUES (:total, :tax)");
    $ordersPost->bindParam(":total", $total);
    $ordersPost->bindParam(":tax", $tax);
    $ordersPost->execute();
}

//Busca o code da ultima order criada
function getOrder($myPDO)
{
    $order = $myPDO->query("SELECT MAX(code) FROM orders");
    $data = $order->fetchALL();
    return print_r(json_encode($data));
}

//Busca todas as orders
function getOrders($myPDO)
{
    $order = $myPDO->query("SELECT * FROM orders");
    $data = $order->fetchALL();
    return print_r(json_encode($data));
}

//Busca os produtos da order que possui o code enviado
function getOrderDetail($myPDO)
{
    $orderCode = $_REQUEST["code"];
    $orderDetail = $myPDO->query("SELECT * FROM order_item INNER JOIN products ON products.code = order_item.product_code WHERE order_code ={$orderCode}");
    $data = $orderDetail->fetchALL();
    return print_r(json_encode($data));
}

//Posta o produto na order_item
function postOrderItem($myPDO)
{
    $orderCode = $_REQUEST["orderCode"];
    $productCode = $_REQUEST["productCode"];
    $quantity = $_REQUEST["amount"];
    $price = $_REQUEST["price"];
    $tax = $_REQUEST["tax"];

    $orderItemPost = $myPDO->prepare("INSERT INTO order_item (order_code, product_code, amount, price, tax) VALUES (:order_code, :product_code, :amount, :price, :tax)");
    $orderItemPost->bindParam(":order_code", $orderCode);
    $orderItemPost->bindParam(":product_code", $productCode);
    $orderItemPost->bindParam(":amount", $quantity);
    $orderItemPost->bindParam(":price", $price);
    $orderItemPost->bindParam(":tax", $tax);
    $orderItemPost->execute();
}

//Deleta a ultima order criada
function delOrder($myPDO)
{
    $orderCode = $myPDO->query("SELECT MAX(code) FROM orders");
    $code = $orderCode->fetchColumn();

    $orderDelete = $myPDO->prepare("DELETE FROM orders WHERE code = :code");
    $orderDelete->bindParam(':code', $code);
    $orderDelete->execute();
}

//Atualiza o amount dos produtos comprados
function updateOrderProduct($myPDO)
{
    $amount = $_REQUEST["amount"];
    $product = $myPDO->prepare("UPDATE products SET amount = products.amount - $amount WHERE code=" . $_REQUEST["code"]);
    $product->execute();
}

