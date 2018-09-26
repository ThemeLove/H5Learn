<?php
header('content-type:text/html; charset= utf-8');
echo "双引号中的字符串";
echo "<br>";
echo '单引号中的字符串';
echo '<br>';


/*
php中单双引号的区别 在 字符串的内容 跟变量名相同时,单引号就是字符串，双引号会替换成变量的值
*/
$persion='jakelove';
echo "$persion";
echo "<br>";
echo '$persion';
echo '<br>';
//单双引号可以混用
echo "<input type='button' value='提交'>";
?>