<?php
session_start();

include_once( 'sinaconfig.php' );
include_once( 'saetv2.ex.class.php' );

$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY );
$token = null;
if (isset($_REQUEST['code'])) {
	$keys = array();
	$keys['code'] = $_REQUEST['code'];
	$keys['redirect_uri'] = WB_CALLBACK_URL;
	try {
		$token = $o->getAccessToken( 'code', $keys ) ;
	} catch (OAuthException $e) {
	}
}

if ($token) {
	
	$_SESSION['token'] = $token;
	setcookie( 'weibojs_'.$o->client_id, http_build_query($token) );
	echo "success";
	$c = new SaeTClientV2( WB_AKEY , WB_SKEY , $_SESSION['token']['access_token'] );
	$ms  = $c->home_timeline(); // done
	$uid_get = $c->get_uid();
	$uid = isset($uid_get['uid'])? $uid_get['uid'] : '';
	$user_message = $c->show_user_by_id( $uid);//根据ID获取用户等基本信息
	//foreach($user_message as $key=>$value)
	//	echo $key."=>".$value."<br />";
		
	$openid = $uid;
	$name = isset($user_message['name'])? $user_message['name'] : '';
	$url = "http://h5.quxiu.me/thirdlogin.html?openid=$openid&name=$name";  
	echo "<script language='javascript' 
	type='text/javascript'>";  
	echo "window.location.href='$url'";  
	echo "</script>"; 
} else {
?>
授权失败。<a href="http://test.h5.quxiu.me/login.html">返回登录页</a>
<?php
}
?>
