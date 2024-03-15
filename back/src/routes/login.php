<?php
include "../config.php";
include "../services/login.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("WWW-Authenticate: Basic realm=\"numsabo\"");
header("HTTP/ 1.0 401 Unauthorized");

switch ($_REQUEST["action"]) {
    case 'post':
        postUser($myPDO);
        break;

    case 'login':
        login($myPDO);
        break;

    case 'get':
        getAll($myPDO);
        break;
}
