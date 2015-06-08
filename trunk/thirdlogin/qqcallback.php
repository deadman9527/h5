<?php
header("Content-type: text/html; charset=utf-8");

require_once("qqAPI/qqConnectAPI.php");
$qc = new QC();  
$acs = $qc->qq_callback();  
$openid = $qc->get_openid();  
$qc = new QC($acs,$openid);  
$uinfo = $qc->get_user_info();  
//print_r($uinfo);
$arr = object_array($uinfo);
$arr = $arr['response'];
//print_r($arr['response']);
$name = $arr["nickname"];
$url = "http://h5.ve.cn/thirdlogin.html?openid=$openid&name=$name";  
echo "<script language='javascript' 
type='text/javascript'>";  
echo "window.location.href='$url'";  
echo "</script>";

//echo $qc->qq_callback();
//$openid = $qc->get_openid();
/*$r_arr = $qc->get_user_info();
$openid = $r_arr['openid'];
$arr = object_array($r_arr['response']);
print_r($arr);
$name = $arr["nickname"];
$url = "http://h5.ve.cn/thirdlogin.html?openid=$openid&name=$name";  
echo "<script language='javascript' 
type='text/javascript'>";  
echo "window.location.href='$url'";  
echo "</script>";  */

echo '<meta charset="UTF-8">';
echo "<p>";
echo "Gender:".$arr["gender"];
echo "</p>";
echo "<p>";
echo "NickName:".$arr["nickname"];
echo "</p>";
echo "<p>";
echo "<img src=\"".$arr['figureurl']."\">";
echo "<p>";
echo "<p>";
echo "<img src=\"".$arr['figureurl_1']."\">";
echo "<p>";
echo "<p>";
echo "<img src=\"".$arr['figureurl_2']."\">";
echo "<p>";
echo "vip:".$arr["vip"];
echo "</p>";
echo "level:".$arr["level"];
echo "</p>";
echo "is_yellow_year_vip:".$arr["is_yellow_year_vip"];
echo "</p>";
function object_array($array)
{
   if(is_object($array))
   {
    $array = (array)$array;
   }
   if(is_array($array))
   {
    foreach($array as $key=>$value)
    {
     $array[$key] = object_array($value);
    }
   }
   return $array;
}
?>
