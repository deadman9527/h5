!function(a,b){function c(a){if(null===a||"undefined"==typeof a)return"";var b,c,d=a+"",e="",f=0;b=c=0,f=d.length;for(var g=0;f>g;g++){var h=d.charCodeAt(g),i=null;if(128>h)c++;else if(h>127&&2048>h)i=String.fromCharCode(h>>6|192,63&h|128);else if(55296!=(63488&h))i=String.fromCharCode(h>>12|224,h>>6&63|128,63&h|128);else{if(55296!=(64512&h))throw new RangeError("Unmatched trail surrogate at "+g);var j=d.charCodeAt(++g);if(56320!=(64512&j))throw new RangeError("Unmatched lead surrogate at "+(g-1));h=((1023&h)<<10)+(1023&j)+65536,i=String.fromCharCode(h>>18|240,h>>12&63|128,h>>6&63|128,63&h|128)}null!==i&&(c>b&&(e+=d.slice(b,c)),e+=i,b=c=g+1)}return c>b&&(e+=d.slice(b,f)),e}function d(a){var b,d,e,f,g,h,i,j,k,l,m=function(a,b){return a<<b|a>>>32-b},n=function(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f},o=function(a,b,c){return a&b|~a&c},p=function(a,b,c){return a&c|b&~c},q=function(a,b,c){return a^b^c},r=function(a,b,c){return b^(a|~c)},s=function(a,b,c,d,e,f,g){return a=n(a,n(n(o(b,c,d),e),g)),n(m(a,f),b)},t=function(a,b,c,d,e,f,g){return a=n(a,n(n(p(b,c,d),e),g)),n(m(a,f),b)},u=function(a,b,c,d,e,f,g){return a=n(a,n(n(q(b,c,d),e),g)),n(m(a,f),b)},v=function(a,b,c,d,e,f,g){return a=n(a,n(n(r(b,c,d),e),g)),n(m(a,f),b)},w=function(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g},x=function(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d},y=[],z=7,A=12,B=17,C=22,D=5,E=9,F=14,G=20,H=4,I=11,J=16,K=23,L=6,M=10,N=15,O=21;for(a=c(a),y=w(a),i=1732584193,j=4023233417,k=2562383102,l=271733878,b=y.length,d=0;b>d;d+=16)e=i,f=j,g=k,h=l,i=s(i,j,k,l,y[d+0],z,3614090360),l=s(l,i,j,k,y[d+1],A,3905402710),k=s(k,l,i,j,y[d+2],B,606105819),j=s(j,k,l,i,y[d+3],C,3250441966),i=s(i,j,k,l,y[d+4],z,4118548399),l=s(l,i,j,k,y[d+5],A,1200080426),k=s(k,l,i,j,y[d+6],B,2821735955),j=s(j,k,l,i,y[d+7],C,4249261313),i=s(i,j,k,l,y[d+8],z,1770035416),l=s(l,i,j,k,y[d+9],A,2336552879),k=s(k,l,i,j,y[d+10],B,4294925233),j=s(j,k,l,i,y[d+11],C,2304563134),i=s(i,j,k,l,y[d+12],z,1804603682),l=s(l,i,j,k,y[d+13],A,4254626195),k=s(k,l,i,j,y[d+14],B,2792965006),j=s(j,k,l,i,y[d+15],C,1236535329),i=t(i,j,k,l,y[d+1],D,4129170786),l=t(l,i,j,k,y[d+6],E,3225465664),k=t(k,l,i,j,y[d+11],F,643717713),j=t(j,k,l,i,y[d+0],G,3921069994),i=t(i,j,k,l,y[d+5],D,3593408605),l=t(l,i,j,k,y[d+10],E,38016083),k=t(k,l,i,j,y[d+15],F,3634488961),j=t(j,k,l,i,y[d+4],G,3889429448),i=t(i,j,k,l,y[d+9],D,568446438),l=t(l,i,j,k,y[d+14],E,3275163606),k=t(k,l,i,j,y[d+3],F,4107603335),j=t(j,k,l,i,y[d+8],G,1163531501),i=t(i,j,k,l,y[d+13],D,2850285829),l=t(l,i,j,k,y[d+2],E,4243563512),k=t(k,l,i,j,y[d+7],F,1735328473),j=t(j,k,l,i,y[d+12],G,2368359562),i=u(i,j,k,l,y[d+5],H,4294588738),l=u(l,i,j,k,y[d+8],I,2272392833),k=u(k,l,i,j,y[d+11],J,1839030562),j=u(j,k,l,i,y[d+14],K,4259657740),i=u(i,j,k,l,y[d+1],H,2763975236),l=u(l,i,j,k,y[d+4],I,1272893353),k=u(k,l,i,j,y[d+7],J,4139469664),j=u(j,k,l,i,y[d+10],K,3200236656),i=u(i,j,k,l,y[d+13],H,681279174),l=u(l,i,j,k,y[d+0],I,3936430074),k=u(k,l,i,j,y[d+3],J,3572445317),j=u(j,k,l,i,y[d+6],K,76029189),i=u(i,j,k,l,y[d+9],H,3654602809),l=u(l,i,j,k,y[d+12],I,3873151461),k=u(k,l,i,j,y[d+15],J,530742520),j=u(j,k,l,i,y[d+2],K,3299628645),i=v(i,j,k,l,y[d+0],L,4096336452),l=v(l,i,j,k,y[d+7],M,1126891415),k=v(k,l,i,j,y[d+14],N,2878612391),j=v(j,k,l,i,y[d+5],O,4237533241),i=v(i,j,k,l,y[d+12],L,1700485571),l=v(l,i,j,k,y[d+3],M,2399980690),k=v(k,l,i,j,y[d+10],N,4293915773),j=v(j,k,l,i,y[d+1],O,2240044497),i=v(i,j,k,l,y[d+8],L,1873313359),l=v(l,i,j,k,y[d+15],M,4264355552),k=v(k,l,i,j,y[d+6],N,2734768916),j=v(j,k,l,i,y[d+13],O,1309151649),i=v(i,j,k,l,y[d+4],L,4149444226),l=v(l,i,j,k,y[d+11],M,3174756917),k=v(k,l,i,j,y[d+2],N,718787259),j=v(j,k,l,i,y[d+9],O,3951481745),i=n(i,e),j=n(j,f),k=n(k,g),l=n(l,h);var P=x(i)+x(j)+x(k)+x(l);return P.toLowerCase()}function e(a){var b,c={},d=[];for(b in a)a.hasOwnProperty(b)&&d.push(b);for(d.sort(),b=0;b<d.length;b++)c[d[b]]=a[d[b]];return c}function f(a){var b="5899ac7839178f62ffc97dbfe1f88b50";a=e(a);var c="";for(var f in a)c+=a[f];c+=b;var g=d(c);return g}var g=function(){var a=location.href,b="",c="";return-1!=a.indexOf("isonline")?(c="online",b="http://www.api.ve.cn/"):-1!=a.indexOf("test.h5.ve.cn")||-1!=a.indexOf("istest")?(c="test",b="http://test.apire.ve.cn/"):-1!=a.indexOf("rc.h5.ve.cn")||-1!=a.indexOf("isrc")?(c="rc",b="http://rc.apire.ve.cn/"):-1!=a.indexOf("dev.h5.ve.cn")||-1!=a.indexOf("isdev")?(c="dev",b="http://www.newapi.com/"):(c="online",b="http://www.api.ve.cn/"),{apiUrl:b,platform:c}}(),h={lifetime:10,set:function(a,b,c){var d=Date.now();c=Number(c)||this.lifetime,this[a]={t:d,v:b,lifetime:60*c*1e3}},get:function(a){var b=this[a];if(b){var c=Date.now(),d=b.t;return c-d<b.lifetime?b.v:null}return null},apiKey:function(a){return JSON.stringify(a)}};b.md5=d,b.api={env:g,get:function(a){if(a.mock){console.log("mock",a);var c=a.mock;return void $.getJSON(c.path,function(b){c.error?a.error&&a.error(b):a.success&&a.success(b),a.complete&&a.complete()})}var d=a.data||{};if(d.app="h5",d.type="jsonp",a.needLogin&&b.storage&&(d.accessToken=b.storage.get("accessToken"),!d.accessToken))return void b.login.goLogin();var e=!!a.cacheLife,i=h.apiKey($.extend(!0,{},a.api,a.data));if(e){var j=h.get(i);if(j)return void(a.success&&a.success(j))}d.api_sign=f(d),d.timestamp=Math.floor(Date.now()/1e3),$.extend(!0,d,a.api);var k=a.apiUrl||g.apiUrl;$.ajax({url:k,data:d,dataType:"jsonp",success:function(c){if("00000"==c.code||"10000"==c.code)e&&h.set(i,c,a.cacheLife),a.success&&a.success(c);else{if(c.desc.indexOf("令牌错误或过期")>-1)return"online"!=g.platform&&alert(c.desc),void b.login.logout();a.error&&a.error(c)}a.complete&&a.complete()},error:function(b){a.error&&a.error(b),a.complete&&a.complete()},complete:function(){}})}}}(window,window.lib||(window.lib={}));