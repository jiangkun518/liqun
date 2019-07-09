<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/3/12
 * Time: 20:00
 */

include "config.php";

session_start();


if (isset($_SESSION["currentLogin"])){
    print_r($_SESSION["currentLogin"]);
}else{
    $arr=array("msg"=>"未登录","status"=>"-1");
    print_r(json_encode($arr));
}