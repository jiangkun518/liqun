<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/28
 * Time: 14:51
 */

include "config.php";

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $query="SELECT*FROM `cart` WHERE `uId`='".$_POST["uId"]."' AND `lId` = '".$_POST["lId"]."'";
    $resultA=$conn->query($query);

    if ($resultA->num_rows>=1){
        $update="UPDATE `cart` SET num=num+'".$_POST["num"]."',`total`=`lPrice`*`num` WHERE `uId`='".$_POST["uId"]."' AND `lId`='".$_POST["lId"]."'";
   $resultB=$conn->query($update);
   if ($resultB){
       print_r(json_encode(array("msg"=>"加入成功","status"=>1)));
   }else{
       print_r(json_encode(array("msg"=>"加入失败","status"=>-1)));
   }
    }else {
        $insert = "INSERT INTO `cart` (`lId`,`lName`,`lPrice`,`lImg`,`uId`,`num`,`total`)VALUES('".$_POST["lId"]."','".$_POST["lName"]."','". $_POST["lPrice"] ."','".$_POST["lImg"]."','".$_POST["uId"] ."','".$_POST["num"]."','".$_POST["lPrice"]*$_POST["num"]."')";
        $resultC = $conn->query($insert);
        if ($resultC) {
            print_r(json_encode(array("msg" => "加入成功了", "status" => 2)));
        } else {
            print_r(json_encode(array("msg" => "加入失败了", "status" => -2)));
        }
    }
}