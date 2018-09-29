<?php
header('content-type:text/html; charset= utf-8');
$filename=$_FILES['file']['name'];
echo 'filename='.$_FILES['file']['name'];
echo '<br>';
echo 'tmp_name='.$_FILES['file']['tmp_name'];
echo '<br>';
print_r('detailmsg='.$_FILES);
move_uploaded_file($_FILES['file']['tmp_name'],'./images/'.'upload_'.$filename);
?>