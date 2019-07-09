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
    $NUM=$_POST["num"];
    $LID=$_POST["lId"];

    $query="SELECT*FROM `cart` WHERE `uId`='".$UID."' AND `lId` = '".$_POST["lId"]."'";

    $resultA=$conn->query($query);
    if ($resultA->num_rows>=1){
        $update='UPDATE `cart` SET num="'.$NUM.'",total="'.$_POST["lPrice"]*$NUM.'" WHERE uId="'.$UID.'" AND lId="'.$LID.'"';
        $resultB=$conn->query($update);
        if ($resultB){
            print_r(json_encode(array("msg"=>"修改成功","status"=>1)));
        }else{
            print_r(json_encode(array("msg"=>"修改失败","status"=>-1)));
        }
    }
}