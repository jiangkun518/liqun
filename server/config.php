<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/27
 * Time: 9:26
 */

header("content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");

$localhost="127.0.0.1";
$dbname="root";
$dbpwd="";
$dbPort="3306";
$database="liqun";

$conn=new mysqli($localhost,$dbname,$dbpwd,$database,$dbPort);
mysqli_query($conn,"set names utf8");
