<?php
header('content-type:text/html; charset= utf-8');

$data=$_GET["callback"].'("珍惜时间")';
echo $data;
?>