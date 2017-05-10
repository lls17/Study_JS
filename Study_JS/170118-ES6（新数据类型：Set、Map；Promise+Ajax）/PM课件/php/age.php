<?php
header("Access-Control-Allow-Origin:*");
$arr = array('age' => '29');
sleep(1);
echo json_encode($arr,true);