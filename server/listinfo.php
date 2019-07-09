<?php
/**
 * Created by PhpStorm.
 * User: JK
 * Date: 2019/2/27
 * Time: 20:19
 */
header("content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");

if (isset($_REQUEST["lId"])){

    $LID=$_REQUEST["lId"];

    $listStr= file_get_contents
    ("./data/list.json");
    $list=json_decode($listStr);

    for ($i=0;$i<count($list);$i++){
        if ($list[$i]->lId==$LID){
            print_r(json_encode($list[$i]));
            break;
        }
    }
}else{
    $list=file_get_contents("./data/list.json");
    print_r($list);
}