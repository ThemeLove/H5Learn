<?php
header('content-type:text/html; charset= utf-8');
$books=array("《骆驼祥子》","《斗罗大陆》","《平凡的世界》","《乔布斯》");
exit(json_encode($books));
?>