<?php
header('content-type:text/xml; charset= utf-8');
$books=file_get_contents("./book.xml");//读取文件的内容
echo $books;
?>