<?php
header('content-type:text/html; charset= utf-8');
//读取文件为json字符串
$contentJson=file_get_contents("data/info.json");
//将json字符串转化为php数组
$contentArr=json_decode($contentJson);
//随机获取数组中的一个索引
$index=array_rand($contentArr,1);
//随机去除一个php数组中的对象
$randObj=$contentArr[$index];
//将对象转化为json字符串返回，用json_encode(obj)方法
echo json_encode($randObj);
?>