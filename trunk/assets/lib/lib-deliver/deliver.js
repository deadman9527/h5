!function(a){function b(a){if(a){var b=document.createElement("a");b.href=a,this.url=a,this.a=b}}var c=document;b.prototype={hostname:function(){return this.a.hostname},hash:function(){return this.a.hash},search:function(){return this.a.search},setkv:function(a){if(a&&-1!==a.indexOf("=")){var b=this.a.search,c=this.url;return b?c+"&"+a:"?"==c.substr(c.length-1)?c+a:c+"?"+a}},getval:function(a){var b,c=this.a.search,d=[],e=[],f=[],g=[];if(c&&(b=0==c.indexOf("?")?c.substr(1):"")){d=b.split("&");for(var h=0;h<d.length;h++){var i=d[h].split("="),j=i.length;if(a){if(2==j){if(a==i[0])return i[1]}else if(1==j&&a==i[0])return""}else e[h]=i[0],f[h]=i[1]}}return a?void 0:g=[e,f]},changeval:function(a,b){if(a){var c,d,e,f=this.a.search;if(f){if(c=0==f.indexOf("?")?f.substr(1):""){d=c.split("&");for(var g=0;g<d.length;g++){{var e=d[g].split("=");e.length}a==e[0]&&(e[1]=b,d[g]=e.join("="))}}return d.join("&")}}}};var d=function(a,c,d){if(a&&c&&d){var e=d.href;if(e&&-1==e.indexOf("#")){var f=new b(e),g=e.indexOf("?");d.href=-1==e.indexOf("?"+a+"=")&&-1==e.indexOf("&"+a+"=")?f.setkv(a+"="+c):d.href.substr(0,g+1)+f.changeval(a,c)}}},e=function(a,b){for(var c=0;c<a[2];c++)d(a[0][c],a[1][c],b)},f=function(a,b,c,d,f){for(var g=0;b>g;g++)d[a]!=c[g]&&e(f,d[a])};a.deliver=function(a){a=a||{};var d=a.isDeliver||!0,g=a.params||[],h=a.exclude;paramsVal=[];var i=c.querySelectorAll("a");if(i&&d){var j="[object Array]"==Object.prototype.toString.apply(g)?g.length:1,k=0,l=Object.prototype.toString.apply(h);"[object Array]"==l?k=h.length:"[object String]"==l&&(k=""==h?0:1);var m=new b(location.href);if(j>0)for(var n=0;j>n;n++)paramsVal[n]=m.getval(g[n]);0==j&&(g=m.getval()[0],paramsVal=m.getval()[1],j=m.getval()[0].length),m=null;var o=[g,paramsVal,j];if(k>0)var p=c.querySelectorAll(h);for(var n=0;n<i.length;n++)k>0?f(n,k,p,i,o):e(o,i[n])}}}(window.lib||(window.lib={}));