!function(a,b){function c(a){this.string=a.toString()}b.env=b.env||{},c.prototype.toString=function(){return this.string},c.prototype.valueOf=function(){for(var b=this.toString().split("."),c=[],d=0;d<b.length;d++){var e=parseInt(b[d],10);a.isNaN(e)&&(e=0);var f=e.toString();f.length<5&&(f=Array(6-f.length).join("0")+f),c.push(f),1===c.length&&c.push(".")}return a.parseFloat(c.join(""))},c.prototype.gt=function(a){return c.compare(this,a)>0},c.prototype.gte=function(a){return c.compare(this,a)>=0},c.prototype.lt=function(a){return c.compare(this,a)<0},c.prototype.lte=function(a){return c.compare(this,a)<=0},c.prototype.eq=function(a){return 0===c.compare(this,a)},c.compare=function(b,c){b=b.toString().split("."),c=c.toString().split(".");for(var d=0;d<b.length||d<c.length;d++){var e=parseInt(b[d],10),f=parseInt(c[d],10);if(a.isNaN(e)&&(e=0),a.isNaN(f)&&(f=0),f>e)return-1;if(e>f)return 1}return 0},b.version=function(a){return new c(a)}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c)for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1])}catch(f){b.env.params[d[e][0]]=d[e][1]}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Android[\s\/]([\d\.]+)/))b.env.os={name:"Android",isAndroid:!0,version:c[1]};else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")}}else b.env.os={name:"unknown",version:"0.0.0"};b.version&&(b.env.os.version=b.version(b.env.os.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/MiuiBrowser\/([\d\.]+)/))?b.env.browser={name:"Xiaomi",isXiaomi:!0,version:c[1]}:(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?b.env.browser={name:"Chrome",isChrome:!0,version:c[1]}:d.match(/Mobile Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)?d.match(/Safari/)?(c=d.match(/Version\/([\d\.]+)/),b.env.browser={name:"Safari",isSafari:!0,version:c[1]}):(c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/,".")}):b.env.browser={name:"unknown",version:"0.0.0"},b.version&&(b.env.browser.version=b.version(b.env.browser.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;b.env.app=(c=d.match(/MicroMessenger\/([\d\.]+)/))?{name:"Weixin",isWeixin:!0,version:c[1]}:(c=d.match(/__weibo__([\d\.]+)/))?{name:"Weibo",isWeibo:!0,version:c[1]}:(c=d.match(/MobileVecn\/([\d\.]+)/))?{name:"Vecn",isVecn:!0,version:c[1]}:{name:"unknown",version:"0.0.0"},b.version&&(b.env.app.version=b.version(b.env.app.version)),"unknown"==b.env.app.name||b.env.app.isWeixin||b.env.app.isVecn||b.env.app.isWeibo||(b.env.husorApp={appname:b.env.app.name,platform:b.env.os.name,version:b.env.app.version})}(window,window.lib||(window.lib={}));