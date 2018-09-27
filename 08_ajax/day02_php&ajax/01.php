<?php
header('content-type:text/html; charset= utf-8');
//二维数组
$twoArr=array(
               array('西兰花','西葫芦','西红柿'),
               array('猪肉','鸭肉','驴肉','鸡肉'),
               array('白菜','油菜','娃娃菜'),
               array('皮皮虾','小龙虾','小米虾'),
);

//西红柿 获取二位数组中的一个值
echo $twoArr[0][2];
echo '<br>';
//php中输出变量的详细内容print_r() 是php中预定义的一个函数
$temp=$twoArr[0];
echo print_r($temp);
?>