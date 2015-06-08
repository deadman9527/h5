<?php
	if (isset($_GET['json']))
	{
		$param = $_GET["json"];
		//echo $param; 
	}
?>

<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
<title>微信安全支付</title>
<script type="text/javascript">
	//调用微信JS api 支付
	function jsApiCall()
	{
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			<?php echo $param; ?>,
			function(res){
				//WeixinJSBridge.log(res.err_msg);
				//alert(res.err_msg);
				if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					location.href='http://<?php echo $_SERVER['HTTP_HOST'];?>/pay-success.html';
				}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
					history.go(-1);
				}else{
					location.href='http://<?php echo $_SERVER['HTTP_HOST'];?>/pay-failed.html';
				}
			}
		);
	}

	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
				document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			}
		}else{
			jsApiCall();
		}
	}
</script>
</head>
<body onload="callpay();">
</body>
</html>
