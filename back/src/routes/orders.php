<?php
include "../config.php";
include "../services/orders.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

switch ($_REQUEST["action"]) {
    case 'post':
        postOrder($myPDO);
        echo ("<script> location.href='http://localhost:5173/purchase' </script>");
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
        echo ("<script> location.href='http://localhost:5173/' </script>");
        break;

    case 'updateproduct':
        updateOrderProduct($myPDO);
        echo ("<script> location.href='http://localhost:5173/history'</script>");
        break;
        
}
