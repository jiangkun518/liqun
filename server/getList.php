<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/28
 * Time: 14:51
 */

include "config.php";

session_start();

if($_SERVER["REQUEST_METHOD"]=="GET"){
    $UID=json_decode($_SESSION["currentLogin"]);
    $sql="SELECT * FROM `cart` WHERE lstatus=0 AND uId='".$UID."'";

    $stmt=$conn->query($sql);
    $result=array();

    while ($row=$stmt->fetch_assoc()){
        array_push($result,$row);
    }
    print_r(json_encode($result));
}