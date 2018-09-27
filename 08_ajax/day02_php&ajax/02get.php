<?php
    header('content-type:text/html; charset= utf-8');

    $dataArr=array(
            'jack'=>array('name'=>'jack','age'=>'18','skill'=>'帅'),
            'rose'=>array('name'=>'rose','age'=>'17','skill'=>'美'),
            'iceMountain'=>array('name'=>'iceMountain','age'=>'10000','skill'=>'hitBoat')
    );
    $temp=$dataArr[$_GET['name']];
    echo '<h2>欢迎你回来'.$temp['name'].'<h2>';
    echo '<br>';
    echo '<h2>天啊，你竟然才'.$temp['age'].'岁<h2>';
    echo '<br>';
    echo '<h2>然后还这么'.$temp['skill'].'<h2>';
?>