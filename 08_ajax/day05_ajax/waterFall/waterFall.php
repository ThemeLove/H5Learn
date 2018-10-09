<?php
header('content-type:text/html; charset= utf-8');
//从文本文件读取json字符串
$json=file_get_contents("data/data.json");
//将json字符串转化为php数组
$arr=json_decode($json);
//获取数组中随机10个索引
$indexArr=array_rand($arr,$_GET["count"]);
//
$dataArr=array();
for($i=0;$i<count($indexArr);$i++){
    $temp=$arr[$indexArr[$i]];
    array_push($dataArr,$temp);
}
echo json_encode($dataArr);
?>