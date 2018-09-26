<?php
    header('content-type:text/html; charset= utf-8');
// if 语句
    $person='man';
    if($person=='man'){
        echo "男人";
        echo '<br>';
    }else{
        echo "女人";
        echo '<br>';
    };

//  switch case 语句
    $day='tuesday';
    switch ($day) {
    case 'monday':
        echo '星期一：感觉被床封印了';
        break;
    case 'tuesday':
        echo '星期二：今天要好好工作了';
        break;
    default:
        echo '不知道星期几：就去学习吧';
        break;
    }

    //  for 循环
        for($i=0;$i<10;$i++){
            echo '第'.$i.'次循环';
            echo '<br>';
        }

    //  while 循环,break
        $num=0;
        while(true){
            echo "我不想要循环了，第".$num.'次想要停下来';
            echo '<br>';
            $num++;
            if($num==8){
                break;
            }
        }

    //do while 循环
        $index=10;
        do{
           echo 'index='.$index;
           echo '<br>';
           $index--;
        }while($index>0);

//       三元运算符
    $food='小青菜';
    $food2=$food=='小青菜'?$food:'胡萝卜';
    echo 'food2='.$food2;
?>