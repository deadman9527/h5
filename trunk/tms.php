<?php
	$file = htmlspecialchars($_GET['f']);
	if ($file) {
		echo file_get_contents('http://act.ve.cn/m/'.$file.'.html');			
	} else {
		echo 'no file defined';
	}
?>