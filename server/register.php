<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/27
 * Time: 9:40
 */

include "config.php";

if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $UNAME=$_REQUEST["uName"];
    $UPWD=$_REQUEST["uPwd"];
    $UTEL=$_REQUEST["uTel"];
}

$sql="INSERT INTO `userinfo` (`uName`,`uPwd`,`uTel`)VALUES('".$UNAME."','".$UPWD."','".$UTEL."')";

$result=$conn->query($sql);

$arr=array("msg"=>"注册失败","status"=>"-1");
if ($result){
    $arr["msg"]="注册成功";
    $arr["status"]="1";
}
print_r(json_encode($arr));

$conn->close();
