!function(e,t){function a(){this.id=this.createUUID()}var n=e.Zepto;e._paq=e._paq||[];var r=function(){this.init()};a.prototype.valueOf=function(){return this.id},a.prototype.toString=function(){return this.id},a.prototype.createUUID=function(){var e=new Date(1582,10,15,0,0,0,0),t=new Date,n=t.getTime()-e.getTime(),r=a.getIntegerBits(n,0,31),i=a.getIntegerBits(n,32,47),o=a.getIntegerBits(n,48,59)+"1",s=a.getIntegerBits(a.rand(4095),0,7),p=a.getIntegerBits(a.rand(4095),0,7),c=a.getIntegerBits(a.rand(8191),0,7)+a.getIntegerBits(a.rand(8191),8,15)+a.getIntegerBits(a.rand(8191),0,7)+a.getIntegerBits(a.rand(8191),8,15)+a.getIntegerBits(a.rand(8191),0,15);return r+i+o+s+p+c},a.getIntegerBits=function(e,t,n){var r=a.returnBase(e,16),i=new Array,o="",s=0;for(s=0;s<r.length;s++)i.push(r.substring(s,s+1));for(s=Math.floor(t/4);s<=Math.floor(n/4);s++)o+=i[s]&&""!=i[s]?i[s]:"0";return o},a.returnBase=function(e,t){return e.toString(t).toUpperCase()},a.rand=function(e){return Math.floor(Math.random()*(e+1))},r.prototype={init:function(){function e(e){var t=new RegExp("(^|\\?|&)"+e+"=([^&]*)(\\s|&|$)","i");return t.test(location.href)?decodeURIComponent(RegExp.$2.replace(/\+/g," ")):"non"}var t,a,n=e("utm_source"),r=e("utm_campaign"),i=e("utm_term"),o=e("utm_content"),s=e("utm_medium"),p=document.URL,c=this;-1!=p.indexOf("utm_source=")&&(p=p.replace("&utm_medium="+s,""),p=p.replace("&utm_campaign="+r,""),p=p.replace("&utm_term="+i,""),p=p.replace("&utm_content="+o,""),p=p.replace("utm_medium="+s+"&",""),p=p.replace("utm_campaign="+r+"&",""),p=p.replace("utm_term="+i+"&",""),p=p.replace("utm_content="+o+"&",""),t="pk_campaign="+n+"-"+r+"-"+i+"&pk_kwd="+o+"-"+s,p=p.replace("utm_source="+n,t)),_paq.push(["setDocumentTitle",document.domain+"/"+document.title]),_paq.push(["setCustomUrl",p]),_paq.push(["setCustomVariable",10,"mve_refer",document.referrer,"page"]),_paq.push(["trackPageView",p]),_paq.push([function(){a=this.getVisitorId()}]),function(){document.addEventListener("click",function(e){e.preventDefault();for(var t=e.target,a=t.href,n=0;t!=document&&!t.getAttribute("data-interaction");)t=t.parentNode,t.tagName&&"a"===t.tagName.toLowerCase()&&(a=t.href);try{if(t!=document){n=50,c.clearCustom();var r=t.getAttribute("data-interaction").split("|");_paq.push(["setCustomVariable",6,"mve_page","mve_"+r[0],"page"]),_paq.push(["setCustomVariable",7,"mve_module","mve_"+r[1],"page"]),_paq.push(["setCustomVariable",8,"mve_pagination","mve_"+r[2],"page"]),_paq.push(["setCustomVariable",9,"mve_index","mve_"+r[3],"page"]),_paq.push(["setCustomVariable",10,"mve_refer",window.location.href,"page"]),_paq.push(["trackContentInteraction",t.tagName,"click","",""])}}catch(e){}a&&(0==a.indexOf("#")?window.location.hash=a:setTimeout(function(){window.location.href=a},n))},!1)}(),function(){function e(){var e=document.location.hostname,t="ve.cn",a=["test","release","test.h5","mob","rc","rc.h5","local","dev.test.h5"];if(-1!=e.indexOf(t)){var n=e.slice(0,-(t.length+1));for(var r in a)if(n==a[r])return!1;return!0}return!1}if(e())var t=("https:"==document.location.protocol?"https":"http")+"://stat.ve.cn/";else var t=("https:"==document.location.protocol?"https":"http")+"://test.piwik.ve.cn/";_paq.push(["setTrackerUrl",t+"piwik.php"]),_paq.push(["setSiteId","1"]);{var a=document,n=a.createElement("script"),r=a.createElement("script"),i=a.createElement("script");a.getElementsByTagName("script")[0]}n.type="text/javascript",r.type="text/javascript",i.type="text/javascript",n.defer=!0,n.async=!0,r.defer=!0,r.async=!0,i.defer=!0,i.async=!0,n.src="http://stat.ve.cn/piwik.js",r.src="http://115.29.242.148/qqonweb/ve888.js",i.src="http://s11.cnzz.com/z_stat.php?id=1254107889&web_id=1254107889"}()},clearCustom:function(){for(var e=0;20>=e;e++)_paq.push(["deleteCustomVariable",e,"page"])},gold:function(e,r){function i(){var i,o=localStorage.m_ve_userId||0;document.cookie.split("gid=")[1]&&document.cookie.split("gid=")[1].split(";")[0]?i=document.cookie.split("gid=")[1].split(";")[0]:(i=a.prototype.createUUID(),document.cookie="gid="+i+";path=/;domain=ve.cn");var s,p,c=t.env.os.name,u=t.env.os.version.string;"unknown"==t.env.browser.name?(s=t.env.app.name,p=t.env.app.version.string):(s=t.env.browser.name,p=t.env.browser.version.string);var m="http://gold.ve.cn/in/get/"+e+"/"+o+"?p="+r+"&s="+c+"&sv="+u+"&e="+s+"&ev="+p+"&gid="+i;n("body").append('<img style="display:none" src="'+m+'">')}var o=function(e,t){var a,n=document.createElement("script");n.setAttribute("src",e),t&&(n.onreadystatechange=n.onload=function(){a||t(),a=!0}),document.getElementsByTagName("head")[0].appendChild(n)};t.env?i():o("http://h5.quxiu.me/assets/lib/lib-env/env.js",i)},log:function(){this.clearCustom();for(var e=0;e<arguments.length;e++)Array.isArray(arguments[e])&&_paq.push(arguments[e]);_paq.push(["trackPageView"])},track:function(e,t){var a=this;Array.isArray(e)&&(a.clearCustom(),_paq.push(["setCustomVariable",6,"mve_page","mve_"+e[0],"page"]),_paq.push(["setCustomVariable",7,"mve_module","mve_"+e[1],"page"]),_paq.push(["setCustomVariable",8,"mve_pagination","mve_"+e[2],"page"]),_paq.push(["setCustomVariable",9,"mve_index","mve_"+e[3],"page"]),_paq.push(["setCustomVariable",10,"mve_refer",window.location.href,"page"]),_paq.push(["trackContentInteraction",t.tagName,"click","",""]))}},t.h5log=new r}(window,window.lib||(window.lib={}));