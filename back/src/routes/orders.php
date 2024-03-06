<?php
include "../config.php";
include "../services/orders.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

switch ($_REQUEST["action"]) {
    case 'post':
        postOrder($myPDO);
        echo ("<script> location.href='/frontendhtml/purchase.html' </script>");
        break;
        
    case 'postorder':
        postOrderItem($myPDO);
        break;

    case 'getall':
        getOrders($myPDO);
        break;

    case 'getdetail':
        getOrderDetail($myPDO);
        break;

    case 'get':
        getOrder($myPDO);
        break;

    case 'del':
        delOrder($myPDO);
        echo ("<script> location.href='/frontendhtml/home.html' </script>");
        break;

    case 'updateproduct':
        updateOrderProduct($myPDO);
        echo ("<script> history.back(); </script>");
        break;
        
}
