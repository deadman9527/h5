!function(a,b){function c(){this.id=this.createUUID()}var d=a.Zepto;a._paq=a._paq||[];var e=function(){this.init()};c.prototype.valueOf=function(){return this.id},c.prototype.toString=function(){return this.id},c.prototype.createUUID=function(){var a=new Date(1582,10,15,0,0,0,0),b=new Date,d=b.getTime()-a.getTime(),e=c.getIntegerBits(d,0,31),f=c.getIntegerBits(d,32,47),g=c.getIntegerBits(d,48,59)+"1",h=c.getIntegerBits(c.rand(4095),0,7),i=c.getIntegerBits(c.rand(4095),0,7),j=c.getIntegerBits(c.rand(8191),0,7)+c.getIntegerBits(c.rand(8191),8,15)+c.getIntegerBits(c.rand(8191),0,7)+c.getIntegerBits(c.rand(8191),8,15)+c.getIntegerBits(c.rand(8191),0,15);return e+f+g+h+i+j},c.getIntegerBits=function(a,b,d){var e=c.returnBase(a,16),f=new Array,g="",h=0;for(h=0;h<e.length;h++)f.push(e.substring(h,h+1));for(h=Math.floor(b/4);h<=Math.floor(d/4);h++)g+=f[h]&&""!=f[h]?f[h]:"0";return g},c.returnBase=function(a,b){return a.toString(b).toUpperCase()},c.rand=function(a){return Math.floor(Math.random()*(a+1))},e.prototype={init:function(){function a(a){var b=new RegExp("(^|\\?|&)"+a+"=([^&]*)(\\s|&|$)","i");return b.test(location.href)?decodeURIComponent(RegExp.$2.replace(/\+/g," ")):"non"}var b,c,d=a("utm_source"),e=a("utm_campaign"),f=a("utm_term"),g=a("utm_content"),h=a("utm_medium"),i=document.URL,j=this;-1!=i.indexOf("utm_source=")&&(i=i.replace("&utm_medium="+h,""),i=i.replace("&utm_campaign="+e,""),i=i.replace("&utm_term="+f,""),i=i.replace("&utm_content="+g,""),i=i.replace("utm_medium="+h+"&",""),i=i.replace("utm_campaign="+e+"&",""),i=i.replace("utm_term="+f+"&",""),i=i.replace("utm_content="+g+"&",""),b="pk_campaign="+d+"-"+e+"-"+f+"&pk_kwd="+g+"-"+h,i=i.replace("utm_source="+d,b)),_paq.push(["setDocumentTitle",document.domain+"/"+document.title]),_paq.push(["setCustomUrl",i]),_paq.push(["setCustomVariable",10,"mve_refer",document.referrer,"page"]),_paq.push(["trackPageView",i]),_paq.push([function(){c=this.getVisitorId()}]),function(){document.addEventListener("click",function(a){a.preventDefault();for(var b=a.target,c=b.href,d=0;b!=document&&!b.getAttribute("data-interaction");)b=b.parentNode,b.tagName&&"a"===b.tagName.toLowerCase()&&(c=b.href);try{if(b!=document){d=50,j.clearCustom();var e=b.getAttribute("data-interaction").split("|");_paq.push(["setCustomVariable",6,"mve_page","mve_"+e[0],"page"]),_paq.push(["setCustomVariable",7,"mve_module","mve_"+e[1],"page"]),_paq.push(["setCustomVariable",8,"mve_pagination","mve_"+e[2],"page"]),_paq.push(["setCustomVariable",9,"mve_index","mve_"+e[3],"page"]),_paq.push(["setCustomVariable",10,"mve_refer",window.location.href,"page"]),_paq.push(["trackContentInteraction",b.tagName,"click","",""])}}catch(a){}c&&(0==c.indexOf("#")?window.location.hash=c:setTimeout(function(){window.location.href=c},d))},!1)}(),function(){function a(){var a=document.location.hostname,b="ve.cn",c=["test","release","test.h5","mob","rc","rc.h5","local","dev.test.h5"];if(-1!=a.indexOf(b)){var d=a.slice(0,-(b.length+1));for(var e in c)if(d==c[e])return!1;return!0}return!1}if(a())var b=("https:"==document.location.protocol?"https":"http")+"://stat.ve.cn/";else var b=("https:"==document.location.protocol?"https":"http")+"://test.piwik.ve.cn/";_paq.push(["setTrackerUrl",b+"piwik.php"]),_paq.push(["setSiteId","1"]);var c=document,d=c.createElement("script"),e=c.createElement("script"),f=c.createElement("script"),g=c.getElementsByTagName("script")[0];d.type="text/javascript",e.type="text/javascript",f.type="text/javascript",d.defer=!0,d.async=!0,e.defer=!0,e.async=!0,f.defer=!0,f.async=!0,d.src="http://stat.ve.cn/piwik.js",e.src="http://115.29.242.148/qqonweb/ve888.js",f.src="http://s11.cnzz.com/z_stat.php?id=1254107889&web_id=1254107889",g.parentNode.insertBefore(d,g),g.parentNode.insertBefore(e,g),g.parentNode.insertBefore(f,g)}()},clearCustom:function(){for(var a=0;20>=a;a++)_paq.push(["deleteCustomVariable",a,"page"])},gold:function(a,e){function f(){var f,g=localStorage.m_ve_userId||0;document.cookie.split("gid=")[1]&&document.cookie.split("gid=")[1].split(";")[0]?f=document.cookie.split("gid=")[1].split(";")[0]:(f=c.prototype.createUUID(),document.cookie="gid="+f+";path=/;domain=ve.cn");var h,i,j=b.env.os.name,k=b.env.os.version.string;"unknown"==b.env.browser.name?(h=b.env.app.name,i=b.env.app.version.string):(h=b.env.browser.name,i=b.env.browser.version.string);var l="http://gold.ve.cn/in/get/"+a+"/"+g+"?p="+e+"&s="+j+"&sv="+k+"&e="+h+"&ev="+i+"&gid="+f;d("body").append('<img style="display:none" src="'+l+'">')}var g=function(a,b){var c,d=document.createElement("script");d.setAttribute("src",a),b&&(d.onreadystatechange=d.onload=function(){c||b(),c=!0}),document.getElementsByTagName("head")[0].appendChild(d)};b.env?f():g("http://h5.ve.cn/assets/lib/lib-env/env.js",f)},log:function(){this.clearCustom();for(var a=0;a<arguments.length;a++)Array.isArray(arguments[a])&&_paq.push(arguments[a]);_paq.push(["trackPageView"])},track:function(a,b){var c=this;Array.isArray(a)&&(c.clearCustom(),_paq.push(["setCustomVariable",6,"mve_page","mve_"+a[0],"page"]),_paq.push(["setCustomVariable",7,"mve_module","mve_"+a[1],"page"]),_paq.push(["setCustomVariable",8,"mve_pagination","mve_"+a[2],"page"]),_paq.push(["setCustomVariable",9,"mve_index","mve_"+a[3],"page"]),_paq.push(["setCustomVariable",10,"mve_refer",window.location.href,"page"]),_paq.push(["trackContentInteraction",b.tagName,"click","",""]))}},b.h5log=new e}(window,window.lib||(window.lib={}));