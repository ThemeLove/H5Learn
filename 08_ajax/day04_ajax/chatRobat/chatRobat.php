<?php
header('content-type:text/html; charset= utf-8');

$message=$_POST["message"];
switch($message){
    case "你好":
    case "hello":
//      从文件中读取json字符串
        $helloJson=file_get_contents("data/hello.json");
//      将json字符串转化为php数组
        $helloArr=json_decode($helloJson);
//      随机获取数组中的一个索引
        $index=array_rand($helloArr,1);
//      随机返回一个数组中元素
        echo $helloArr[$index];
        break;
    default:
         //      从文件中读取json字符串
                 $defaultJson=file_get_contents("data/default.json");
         //      将json字符串转化为php数组
                 $defaultArr=json_decode($defaultJson);
         //      随机获取数组中的一个索引
                 $index=array_rand($defaultArr,1);
         //      随机返回一个数组中元素
                 echo $defaultArr[$index];
        break;
}
?>