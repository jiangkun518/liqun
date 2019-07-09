<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/27
 * Time: 11:08
 */

include "config.php";

session_start();

if ($_SERVER["REQUEST_METHOD"]=="POST"){
     $UNAME=$_POST["uName"];
     $UPWD=$_POST["uPwd"];

     $sql="SELECT `uId`,`uName`,`uTel` FROM userinfo WHERE uName='".$UNAME."'AND uPwd='".$UPWD."'";
     $result=$conn->query($sql);

     $arr=array("msg"=>"登录失败","status"=>-1,"data"=>"");

     if ($result->num_rows==1){
        $arr["msg"]="登陆成功";
        $arr["status"]="1";
        $arr["data"]=$result->fetch_assoc();

        $_SESSION["currentLogin"]=$arr["data"]["uId"];

     }
     print_r(json_encode($arr));

     $conn->close();

}

