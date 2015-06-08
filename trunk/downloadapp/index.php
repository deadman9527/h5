<?php
header("Content-type: text/html; charset=utf-8");
if(get_device_type()=='ios'){
    $downloadurl =  'https://itunes.apple.com/us/app/wei-yi-you-pin/id912303412?l=zh&ls=1&mt=8';
} else {
    $json = @file_get_contents('http://act.ve.cn/data/appdownload.json');
    $obj = json_decode($json, TRUE);
    $downloadurl =  $obj['data'][0]['url'];
}
header("Location:$downloadurl");

function get_device_type(){
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	$type = 'other';
	if(strpos($agent, 'iphone') || strpos($agent, 'ipad')){
		$type = 'ios';
	}
	if(strpos($agent, 'android')){
		$type = 'android';
	}
	return $type;
}
?>
