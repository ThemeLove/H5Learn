<?php
    header('content-type:text/html; charset= utf-8');

//  php中的数组
    $arrayName=array('张三','李四','王五','UZI');
    echo 'arrayName[3]='.$arrayName[3];
    echo '<br>';


//    php中的关系型数组
//    获取方式 ['key']
    $language=array('Java'=>'rank 1','C++'=>'rank 2','python'=>'rank 3');
    echo 'python='.$language['python'];
?>