<?php
header("Access-Control-Allow-Origin:*");
$arr = array('userName' => 'leo');
sleep(1);
echo json_encode($arr,true);