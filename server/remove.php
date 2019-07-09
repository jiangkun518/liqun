<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/28
 * Time: 14:51
 */

include "config.php";
session_start();

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $UID=json_decode($_SESSION["currentLogin"]);
    $LID=$_REQUEST["lId"];
    $sql="DELETE FROM `cart` WHERE lId='".$LID."' AND uId='".$UID."'
";

    if ($conn->query($sql)){
        print_r(json_encode(array("msg"=>"删除成功","status"=>1)));
    }else{
        print_r(json_encode(array("msg"=>"删除失败","status"=>-1)));
    }

}