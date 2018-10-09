<?php
header('content-type:text/html; charset= utf-8');
$nameArr=array("张三","李四","王五","杰克马","麻花藤");
$registerName=$_GET["name"];
$isIn=in_array($registerName,$nameArr);
if($isIn){
    echo "该用户名已被使用";
}else{
    echo "该用户名可以使用";
}
?>