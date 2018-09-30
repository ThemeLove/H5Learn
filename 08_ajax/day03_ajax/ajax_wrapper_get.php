<?php
header('content-type:application/json; charset= utf-8');
    $dataArr=array(
            '1'=>array('name'=>'jack','age'=>'18','skill'=>'帅'),
            '2'=>array('name'=>'rose','age'=>'17','skill'=>'美'),
            '3'=>array('name'=>'iceMountain','age'=>'10000','skill'=>'hitBoat')
    );
    $id=$_GET['id'];
    $data=NULL;
    if(array_key_exists($id,$dataArr)){//判断该key是否在关系型数组中
        $data=$dataArr[$id];
    }

    $resultArr=NULL;
    if(!empty($data)){
        $resultArr=array('code'=>"0",
                          'message'=>"success",
                           'result'=>$data
                           );
    }else{
        $resultArr=array('code'=>'1',
                        'message'=>'fail',
                        'result'=>''
                        );
    }
    exit(json_encode($resultArr));
?>