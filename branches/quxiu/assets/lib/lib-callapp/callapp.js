!function(a,e){function o(a,e){var o=new r(location.href),t=i.getElementById("buried");for(var n in o.params)a.params.hasOwnProperty(n)||(a.params[n]=o.params[n]);if(t&&(a.params.ttid=t.value),"object"==typeof e)for(var n in e)a.params[n]=e[n];return a}function t(a){d||(d=i.createElement("iframe"),d.id="callapp_iframe_"+Date.now(),d.frameborder="0",d.style.cssText="display:none;border:0;width:0;height:0;",i.body.appendChild(d)),d.src=a}function n(a,e){e.replace!==!1&&e.replace===!0?location.replace(a):location.href=a}var i=a.document,r=e.httpurl,p=e.env.os,s=(e.env.params,e.env.browser);e.callapp={};var d;e.callapp.gotoPage=function(a,e){e=e||{},"undefined"==typeof e.params&&(e.params=!0);a||location.href;a=new r(a);var n=window.navigator.userAgent.toLowerCase();if(n.match(/MobileVecn/i)&&a.indexOf("brandcate-")>=0){var i="http://"+location.host,d=a.params.title?"&"+a.params.title:"";i+"/list.html?brandId="+a.params.brandId+d}("http"===a.protocal||"https"===a.protocal)&&(a.protocal="vecn"),"vecn"===a.protocal&&e.params&&o(a,e.params),p.isAndroid&&p.version.lt("4.5")&&s.isChrome&&!s.isWebview&&(a.hash="Intent;scheme="+a.protocal+";package="+e["package"]+";end",a.protocal="intent"),t(a.toString());var l=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){if(+new Date-l<1200){var a=window.navigator.userAgent.toLowerCase();if(a.match(/MicroMessenger/i))var e="http://a.app.qq.com/o/simple.jsp?pkgname=com.geetion.vecn";else var e=p.isIPhone?"https://itunes.apple.com/us/app/wei-yi-you-pin/id912303412?l=zh&ls=1&mt=8":p.isAndroid?"http://h5.quxiu.me/downloadapp/index.php":"";window.location=e}},500)},500)},e.callapp.download=function(a,e){e=e||{},a||(a=p.isIPhone?"https://itunes.apple.com/us/app/wei-yi-you-pin/id912303412?l=zh&ls=1&mt=8":p.isAndroid?"http://www.ve.cn/download-downloadapp.html#f=download_app&md=download":""),a=new r(a),p.isAndroid&&a.pathname.match(/\.apk$/)?(a.search="",a.hash=""):e.params&&o(a,e.params),a=a.toString(),n(a,e)}}(window,window.lib||(window.lib={}));