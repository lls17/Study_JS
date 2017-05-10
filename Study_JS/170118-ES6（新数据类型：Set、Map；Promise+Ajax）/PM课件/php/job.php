<?php
header("Access-Control-Allow-Origin:*");
$arr = array('job' => 'CEO');

echo json_encode($arr,true);