!function(a,b){function c(a){this.string=a.toString()}b.env=b.env||{},c.prototype.toString=function(){return this.string},c.prototype.valueOf=function(){for(var b=this.toString().split("."),c=[],d=0;d<b.length;d++){var e=parseInt(b[d],10);a.isNaN(e)&&(e=0);var f=e.toString();f.length<5&&(f=Array(6-f.length).join("0")+f),c.push(f),1===c.length&&c.push(".")}return a.parseFloat(c.join(""))},c.prototype.gt=function(a){return c.compare(this,a)>0},c.prototype.gte=function(a){return c.compare(this,a)>=0},c.prototype.lt=function(a){return c.compare(this,a)<0},c.prototype.lte=function(a){return c.compare(this,a)<=0},c.prototype.eq=function(a){return 0===c.compare(this,a)},c.compare=function(b,c){b=b.toString().split("."),c=c.toString().split(".");for(var d=0;d<b.length||d<c.length;d++){var e=parseInt(b[d],10),f=parseInt(c[d],10);if(a.isNaN(e)&&(e=0),a.isNaN(f)&&(f=0),f>e)return-1;if(e>f)return 1}return 0},b.version=function(a){return new c(a)}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c)for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1])}catch(f){b.env.params[d[e][0]]=d[e][1]}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Android[\s\/]([\d\.]+)/))b.env.os={name:"Android",isAndroid:!0,version:c[1]};else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")}}else b.env.os={name:"unknown",version:"0.0.0"};b.version&&(b.env.os.version=b.version(b.env.os.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/MiuiBrowser\/([\d\.]+)/))?b.env.browser={name:"Xiaomi",isXiaomi:!0,version:c[1]}:(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?b.env.browser={name:"Chrome",isChrome:!0,version:c[1]}:d.match(/Mobile Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)?d.match(/Safari/)?(c=d.match(/Version\/([\d\.]+)/),b.env.browser={name:"Safari",isSafari:!0,version:c[1]}):(c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/,".")}):b.env.browser={name:"unknown",version:"0.0.0"},b.version&&(b.env.browser.version=b.version(b.env.browser.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;b.env.app=(c=d.match(/MicroMessenger\/([\d\.]+)/))?{name:"Weixin",isWeixin:!0,version:c[1]}:(c=d.match(/__weibo__([\d\.]+)/))?{name:"Weibo",isWeibo:!0,version:c[1]}:(c=d.match(/MobileVecn\/([\d\.]+)/))?{name:"Vecn",isVecn:!0,version:c[1]}:{name:"unknown",version:"0.0.0"},b.version&&(b.env.app.version=b.version(b.env.app.version)),"unknown"==b.env.app.name||b.env.app.isWeixin||b.env.app.isVecn||b.env.app.isWeibo||(b.env.husorApp={appname:b.env.app.name,platform:b.env.os.name,version:b.env.app.version})}(window,window.lib||(window.lib={}));
!function(a,b){var c,d={getItem:function(a){return a?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(a,b,c,d,e,f){if(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))return!1;var g="";if(c)switch(c.constructor){case Number:g=1/0===c?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+c;break;case String:g="; expires="+c;break;case Date:g="; expires="+c.toUTCString()}return document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+g+(e?"; domain="+e:"")+(d?"; path="+d:"")+(f?"; secure":""),!0},removeItem:function(a,b,c){return this.hasItem(a)?(document.cookie=encodeURIComponent(a)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(c?"; domain="+c:"")+(b?"; path="+b:""),!0):!1},hasItem:function(a){return a?new RegExp("(?:^|;\\s*)"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie):!1},keys:function(){for(var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),b=a.length,c=0;b>c;c++)a[c]=decodeURIComponent(a[c]);return a}},e=function(){var a={isLocalStorageOk:!1,prefix:"m_ve_",data:{},init:function(){return this.checkLocalStorage(),this.setMethod(),this},checkLocalStorage:function(){if("localStorage"in window&&null!==window.localStorage)try{window.localStorage.setItem("test","test"),window.localStorage.removeItem("test"),this.isLocalStorageOk=!0}catch(a){}},setPrefix:function(a){this.prefix=a},setMethod:function(a){a=a||"",c=this.isLocalStorageOk?"cookie"==a?d:window.localStorage:d},set:function(a,b){this.data[a]=b,"object"==typeof b&&(b=JSON.stringify(b)),c.setItem(this.prefix+a,b)},get:function(a){var b=this.data[a];if("undefined"==typeof b){b=c.getItem(this.prefix+a);try{b=JSON.parse(b)}catch(d){}}return b},rm:function(a){a&&(a=this.prefix+a,c.removeItem(a))}};return a.init()}();b.storage=e,b.cookie=d}(window,window.lib||(window.lib={}));
/**
 * bottombar
 *
 * @author linshitan
 *
 * */
;(function(win, ctrl) {
    function addStyle (style) {
        var csStyle = document.createElement('style');
        document.head.appendChild(csStyle);
        csStyle.innerHTML = style;
    }
    var isH5Ve= location.href.indexOf('http://h5.ve.cn') != -1;
    var defVal = 50,defSize = 18,defL = 10,defR = 5,defBack = 24,defW = 50,defFont = 12,defLine = 78,appVal = 60,dpr = parseInt($("html").attr("dataset").dpr) || 1;
    // 默认配置
    var defoptions = {
        style: '.bottombar {\
                position: fixed;\
                width: 100%;\
                bottom: 0;\
                left: 0;\
                background-color: #f9f9f9;\
                z-index: 10;\
                height: '+defVal*dpr+'px;\
                font-size:'+defFont*dpr+'px;\
                border-top:1px solid #e5e5e5;\
            }\
            .bottombar ul{\
            margin:0;\
            padding:0;\
            }\
            .bottombar a{\
            color:#333333;\
            }\
            .bottombar ul li{\
            float:left;\
            list-style:none;\
            width:25%;\
            text-align:center;\
            }\
			.hovercss{\
			color:#ff3862 !important;\
			}\
            .bbar-index{\
                        display: block;\
                    height: '+defVal*dpr+'px;\
                    left: 0px;\
                    top: 0;\
                    line-height: '+defLine*dpr+'px;\
                    background-attachment: scroll;\
                    background-clip: border-box;\
                    background-color: rgba(0, 0, 0, 0);\
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDQUIyNjhBQkIwOTExRTQ5NTg1QkJBNDg2NjVDMTM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDQUIyNjhCQkIwOTExRTQ5NTg1QkJBNDg2NjVDMTM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0NBQjI2ODhCQjA5MTFFNDk1ODVCQkE0ODY2NUMxMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0NBQjI2ODlCQjA5MTFFNDk1ODVCQkE0ODY2NUMxMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5MrvDqAAADTElEQVR42uyaaUhUURiGHZfCioggiKAyql+FFDSKbWY7FVEWhhJRBi2ktIA/jFY1I8yotIiKoIXSiopCqD9FQbQv9Dciw2ilrLBFLafnwGtcrBnv6Mx4jXvg4Zv57jnne+853z3n3FGPz+eL6owlOqqTFk8oO1u/qTAGswRWQiLUwm0oLS7YeN2RwhHdF3MGxvqpcgRyuIHvjkkVRKdgHllEV8E4GAoX5MuGm9RNcMSII2Q5pgzioAFWMaqHW9QxqbNHdUz6ZFLnSocIR0xXzH6NpCkvYR6C7gaYlXNgUqoJNsM26vsiJhwR/TFnIUmuG5CBiLc2ngPTboxcF2ER7T6HPccJnoq5bxFtUmBya6JNoc4bzETNlCmzTV/0OTysI06A1ZidEAs/YBlijrdx1hZjDoBJuW+wlL4qQiqcIPGYg7BQrheQTqCH7XywvUqdAXLthjz6/dlu4Vq+zEM1Uq6ryucPIVpK+2BOwwTL87JAadW2HKfTSZgHFtGlMDVUopX37zFTYJdc401MrULBjTiNjD8PtuvmTA5mE6QynOcP4mZhDkE3aIS1xNxnSziNu2t7zpDrmfL5SSQOT8RP1G47SK5jsKLlUcHTotEQNRom12XIolFtJE9+6OiNOQnT5HqswXv+V45TeQbmnkV0McyKtGjl/UfMTKWqKSOU99P/jLjyeQNs1QzUaTc774RzN/rSMUehh44KW6DIjPheKJDop5DsFNEafbMUJ0tbtLSWmRGv50MX1bsGX3Rnt2hU0sGjbVa2FAnuCWm61GC27hoYLEeapd1cKOngAd/hZ8muMcJHaypi5DTL4QmHvVqao8ZXff4Fd2JJh3d8uGSZnl4OfDeuQuen/+It3xXuCneFu8JDW2JDuD3302HNqx9+rKVRJ88i1uNXjhKuc7w3wPVRIskxqaJftZpFZ+od1UqqrnlV1zEjHm85hlb4uTlr3Xp3VXGFu8Jd4a7wsAlvsqy9CTb7iQsipq0NiNgD/6XJr3A2EPPzRLW+rqMDO5vUHNnXAeo0X5tvQ7SJmaOv1dJka+fMh1OQa7Dseq2VylaurYFy+isPYobybee4tm0jui6IAObvQoHusFB17BYTO9ffEcLTWf8J4bcAAwC5RBBKdbj1/AAAAABJRU5ErkJggg==) 50% '+defR*dpr+'px no-repeat;\
                    background-origin: padding-box;\
                    background-size: auto '+defBack*dpr+'px;\
                }\
                .bbar-found{\
                        display: block;\
                    height: '+defVal*dpr+'px;\
                    left: 0px;\
                    top: 0;\
                    line-height: '+defLine*dpr+'px;\
                    background-attachment: scroll;\
                    background-clip: border-box;\
                    background-color: rgba(0, 0, 0, 0);\
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDQUIyNjhFQkIwOTExRTQ5NTg1QkJBNDg2NjVDMTM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDQUIyNjhGQkIwOTExRTQ5NTg1QkJBNDg2NjVDMTM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0NBQjI2OENCQjA5MTFFNDk1ODVCQkE0ODY2NUMxMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0NBQjI2OERCQjA5MTFFNDk1ODVCQkE0ODY2NUMxMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7CoB8LAAAGOklEQVR42txZf0xW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) 50% '+defR*dpr+'px no-repeat;\
                    background-origin: padding-box;\
                    background-size: auto '+defBack*dpr+'px;\
                }\
                .bbar-cart{\
                        display: block;\
                    height: '+defVal*dpr+'px;\
                    left: 0px;\
                    top: 0;\
                   line-height: '+defLine*dpr+'px;\
                    background-attachment: scroll;\
                    background-clip: border-box;\
                    background-color: rgba(0, 0, 0, 0);\
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDQUIyNjkyQkIwOTExRTQ5NTg1QkJBNDg2NjVDMTM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwMkMxMkYyQkIwQTExRTQ5NTg1QkJBNDg2NjVDMTM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0NBQjI2OTBCQjA5MTFFNDk1ODVCQkE0ODY2NUMxMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0NBQjI2OTFCQjA5MTFFNDk1ODVCQkE0ODY2NUMxMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Y4nxDAAADKElEQVR42tRZSWgUQRTtjG1co4QgURRxTYzbISpGBOMSL948eggqRIwezEkho8QMLgdPRuMCHhQED4oIghf3IKLxIswpZlwwICLuS6JGzfg+/QqKYZzUdI/T1R8eb7q6mnlT8+v/X79L0um0E0UribcdSIIXaWNfgQvALmDwfws4lNjn67lYlrEyYDuQsHnFRfhioFzDTt4THmmzcLFPGk4Bj4EJQK3twjPtAbkqasJ7yXOiKjxyK/7EduESx7ONjwC+WxhVPgKngXb3HxP+AClgvmXCJVy3AhVujkm9FN4EXLZE+GbgKNA4nHCxaYzvoaf8vfsPdvOjG8sxr4c81yJXqSd35xKeItdYJLyBfCsyKw43GQ1aaSL8HX1bqsUpFmivA8YA/eIq7jCTJREtB6qB15a4yT1s6MGYgXBbMug65Sa5Un7mBp0Xsn9PBC3j5U0T4bZs0HqWIe+BZD4rHnZIXEu+A/8eMhGusueMkAuuBt2/TYRLhdjHv2l2SP69HrSAlzdMhevuUh2C6Emgs7y8Czd5pu65Bs/3MBRVFVFwKWgVcBKY6nj9nRaTg4Ru0hjqCNG/fwKbsNpXTI5u2ZJQsU1S+yWJ35miTV1FRRZpMk52itCWg/2C2P5cE0yEv6TYUgpPhnWQyNdVhrRVt+YMGjOcl4qqcLVBa6Mm/D55A+NrZIRfkwJe4j5wlW2C8jCFmyQgZZJ+bwMLi6xRTl41iD6f/ay42Fse49qBF4zroZmb5/wBx3vFkuCz44ug8YuqwYMI1+038EOynOP1GguWgFBkjcX4QCFXXNlSoJOuI0XQRRZjgVp1ENwMapN2CD6/AR8GjuNHpAshfBY3aRmvRwGNwHRgjV/fh9Btjvf+SVmlVpUe8xsOdWum6EeO1xBdTd+XA+2KAAveSj4CVDAIiMWDxHHd1IHiPPAK6AJUFzXIO6OZ5A64xgdttSvxb4wrhHBVcG2hUDkT1mXc82NPyXsgVKrQ3SqOZytx/Qjv5CZcwuLruuP19OQE/jBIhUtuYdKJZ4wHFt5Hv+5iyfsNOANsDFiXnwNtBZ5r37MD4yeyzf8rwAA9K8ijSjgz4QAAAABJRU5ErkJggg==) 50% '+defR*dpr+'px no-repeat;\
                    background-origin: padding-box;\
                    background-size: auto '+defBack*dpr+'px;\
                }\
                .bbar-me{\
                        display: block;\
                    height: '+defVal*dpr+'px;\
                    left: 0px;\
                    top: 0;\
                    line-height: '+defLine*dpr+'px;\
                    background-attachment: scroll;\
                    background-clip: border-box;\
                    background-color: rgba(0, 0, 0, 0);\
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwMkMxMkY1QkIwQTExRTQ5NTg1QkJBNDg2NjVDMTM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwMkMxMkY2QkIwQTExRTQ5NTg1QkJBNDg2NjVDMTM4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjAyQzEyRjNCQjBBMTFFNDk1ODVCQkE0ODY2NUMxMzgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjAyQzEyRjRCQjBBMTFFNDk1ODVCQkE0ODY2NUMxMzgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6I+hOFAAAD00lEQVR42uyZfWjNURjHf/feZTIjfyDvshZCtvKWzGYMwyhGhCi2vC3K+zbb2FsjJi+bkJFo2l+KGWq4oTA2aSaTlyIvmzTZrpdxfR/73rqt7bbde852V059Om33/s7vc899fuc8z7kmu91udMRm6rDi8UmpKsbpARaAGSAYDACd+Np38Ao8AlfARfDNcWH67kS3bujjoXBPkARWg87833NwGXzk373BCLCU1IBckAm+untjT8SjwXHO9jtwGJwDb5t5f3+Kx4EdYAVYCa65c3Ozm9LJoAB0A3tAIMhyIW3wtSy+V67pJaGTkJwW11biMlsp4AsI54ewteJ6G68JZ9gcgnyMbnF5+DL4cE0HVg9CzcrxZKwcyE/QJe7HmDbxYSxRsBo9ADF81k5B3keHeCwYCC6BC6rWYyyH+VyFhoNlqsVlljc4PZiqm2PMjarFZVMZAsq4kShtmPWHHDsI4RKgUjyEfZHGXfwq+0kqxYeyf6JR3DH2MJXiPdh/0ijuSBG6qxT/xd5Xo7ivU1KmTPwD+34axfs2mnkl4mXsx2oUd4xdqlL8BvgDZgOLamMsgRaOXQvuqBR/D66DPmCehtmey1ApwJpeq3rLT2OfoaAAcZ5tH475W/YiHbnKbXCea3qmyo2Ta/d+zPYLXWmt5CsvwRawVoH0KrAN3GcJqC0fl+JhJpfHHPmm3SxGTCxIToJnYA5m+4fuCqgSTAQVjPtiJmEtbaNYZ2Yy/EIgXdVWNaccN4xnphgKJLtb2ILr5oPHYBoolPIN0tXuCFhCQsNbe40/2ATymPz/ZCFwhqHkqtWDQUyR5YGMLr5prQflU6dMrtd1ICQV/VYeL0giVA6OgvwWCDeVtC0G63nmIs/MAXAE34BNlbiFNWYqD4Bugb08lfL0/E4e0kiuLBJyb8BOmQx8ALsnMT4S3APHQDVvEsb4VHHoaIdgIQjj2HXcK6zYmALdFY9lJT8a7GKvrQKCfJHTveSoohTyS1oTKvJhDjKWX3O1KNEo3FQaMIYnZYOZDiQ2Dh1zEzF3mtJ3wTid0i4+TAnvLQ7x3Oxchso+sJypZQSoMtqpcVOKoMsafAspzYnL+fZm8JS5cZ3Rzg3ydXQRp2TIz2osLutyLmUXGQ2HkV7RIF9DJ3E7AXl/Z/EErtHp3Fi8qkG+nG5SbGx3iHfl0ifn19mG97ZsOq7DrHcR8SiGiuQeNm+1ZiqQx3QhyswdS9pZw/ubwzFSxIOMht9wKr3dGrNeSddgM1PMCqPjNHENEHH5peFzBxIXVz+zh5VQe7R/rqb/v+W3cfsrwAAmCRCYBVhPPQAAAABJRU5ErkJggg==) 50% '+defR*dpr+'px no-repeat;\
                    background-origin: padding-box;\
                    background-size: auto '+defBack*dpr+'px;\
                }\
                .bar-app{\
                position:fixed;\
                width: 100%;\
                bottom: 0;\
                left: 0;\
                background: rgba(51,51,51,0.8);\
                z-index: 999;\
                background-size:100%;\
                height:'+60*dpr+'px;\
                }\
                .bar-app ul{\
                width:100%;\
                margin-top:'+8*dpr+'px;\
                height:100%;\
                }\
                .bar-app ul li{\
                float:left;\
                width:40%;\
                }\
                .bar-app .second{\
                background:url(data:image/png;base64,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) '+73*dpr+'px '+3*dpr+'px no-repeat;\
                background-size:50%;\
                color:#fff;\
                line-height:'+22*dpr+'px;\
                }\
                .bar-app .third{\
                float:right;\
                text-align:center;\
                line-height:'+27*dpr+'px;\
                height:'+27*dpr+'px;\
                width:'+70*dpr+'px;\
                margin-right:'+10*dpr+'px;\
                background:#ff3862;\
                border-radius:'+4*dpr+'px;\
                font-size:'+15*dpr+'px;\
                color:#fff;\
                margin-top:'+12*dpr+'px\
                }\
                .bar-app img{\
                vertical-align: bottom;\
                }\
                .bar-del{\
                position:absolute;\
                width:'+20*dpr+'px;\
                height:'+20*dpr+'px;\
                top:0px;\
                background:url(data:image/png;base64,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) no-repeat;\
                background-size:100%;\
                }'
    };

    // constructor
    function BottomBar(options) {
        this.options = {};
        $.extend(this.options, defoptions, options || {});
        this._init();
    }

    $.extend(BottomBar.prototype, {
        // 初始化
        _init: function() {
            if(lib.cookie.getItem("bar-app")){
                this.options.showApp = false;
                this.options.showCircle = false;
                this.options.showBottom = true;
                //return;
            }
            var ua = window.navigator.userAgent.toLowerCase();
            var that = this;
            this.height = 0;
            if(this.options.showApp){
                this.height = 60*dpr;
            }
            if(this.options.showBottom && ua.match(/MicroMessenger/i) ){
                this.height = defVal*dpr;
            }
            if(ua.match(/MobileVecn/i) ){
                this.height = 0;
            }
            ctrl.bottomBar.getInfo = function(){
                return {height:that.height};
            };
            if(ua.match(/MobileVecn/i) ){
                return;
            }
            if(ua.match(/MicroMessenger/i)){
                this.options.showBottom = true;
                this.options.showApp = false;
                this.options.showCircle = false;
            }

            /*var os = lib.env.os;
             if(os.isAndroid){
             this.options.showCircle = false;
             this.options.showApp = false;
             this.options.showBottom = true;
             }*/
            //lib.cookie.removeItem("bar-app","/");


            if(!this.options.showCircle && !this.options.showApp && !this.options.showBottom){
                this.options.showBottom = true;
            }
            addStyle(this.options.style);
            var topTitle = this.options.title || document.title;
            var host = 'http://' + location.host;
            if(host.indexOf("h5")<0){
                host = "http://h5.ve.cn";
            }
            var url = [ host+"/index.html",host+"/discover.html",host+"/cart.html",host+"/myve.html"];
            if(this.options.showCircle){
                var el = [
                    '<div class="toolbar">',
                    '<a href="javascript:void(0);" class="tool-main"></a>',
                    '<a href="'+ url[0] +'" class="tool-home"></a>',
                    '<a href="'+ url[1] +'" class="tool-find"></a>',
                    '<a href="'+ url[2] +'" class="tool-cart"></a>',
                    '<a href="'+ url[3] +'" class="tool-my"></a>',
                    '</div>'
                ].join('');
                $(document.body).append(el);

                $('.tool-main').on('touchstart', function(e){
                    $(this).closest('.toolbar').toggleClass('active');
                    e.preventDefault();
                });
                $(".toolbar a").on("click",function(e){
                    var $self = $(this);
                    if($self.attr("href").indexOf("h5.ve.cn")>=0){
                        $self.parent().removeClass("active");
                        setTimeout(function () {
                            location.href = $self.attr('href');
                        }, 500);
                        e.preventDefault();
                    }
                });
                $(".toolbar").css("bottom",10*dpr+"px");
            }
            if(this.options.showApp){
                var logo = this.options.logo || "唯一优品",appTitle = this.options.appTitle || "为妈妈，全球精挑细选",star = this.options.star || true,getTitle = this.options.getTitle || "立即体验";

                var el = [
                    '<div class="bar-app">',
                    '<div class="bar-del"></div>',
                    '<a href="javascript:;" id="callApp"><ul><li style="width:'+44*dpr+'px;margin-right:'+10*dpr+'px;margin-left:'+22*dpr+'px;"><img width="'+44*dpr+'" src="data:image/png;base64,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" />' +
                    '</li><li class="second" style="width:'+150*dpr+'px;"><span style="font-size:'+17*dpr+'px;">'+logo+'</span><br /><span style="font-size:'+13*dpr+'px">'+appTitle+'</span>' +
                    '</li><li class="third">立即体验' +
                    '</li></ul></a>',
                    '</div>'
                ].join('');
                $(document.body).append(el);
                if(!star){
                    $(".second").css("background","none");
                }
                var cookieTime = this.options.cookieTime || 1;
                $(".bar-del").on("click",function(){
                    $(".bar-app").hide();
                    lib.cookie.setItem("bar-app","true",cookieTime*3600*24,"/");
                });
                var oldPaddingTop = $("body").css("padding-bottom");
                /*$("body").css("padding-bottom",($("#downapp").height()) + "px");
                 $(".ve-gotop").css("bottom",($("#downapp").height()+10)+"px");
                 $(".toolbar").css("bottom",($("#downapp").height()+10)+"px");*/
                $("body").css("padding-bottom",appVal*dpr + "px");
                $(".ve-gotop").css("bottom",(appVal+15)*dpr+"px");
                $(".toolbar").css("bottom",(appVal+10)*dpr+"px");
                this.options.showBottom = false;
            }
            if(this.options.showBottom){
				var hoverclass = ["","","",""];
                if(this.options.hoverIndex>=0){
                    url[this.options.hoverIndex] = "javascript:;";
					hoverclass[this.options.hoverIndex] = "hovercss";
                }
                $("body").append('<div class="bottombar"><ul><a href="'+url[0]+'" class="'+hoverclass[0]+'" data-src="0"><li class="bbar-index">首页</li></a><a href="'+url[1]+'" class="'+hoverclass[1]+'" data-src="1"><li class="bbar-found">发现</li></a><a href="'+url[2]+'" class="'+hoverclass[2]+'" data-src="2"><li class="bbar-cart">购物车</li></a><a href="'+url[3]+'" class="'+hoverclass[3]+'" data-src="3"><li class="bbar-me">我的</li></a></ul></div>');
                var hover_img = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXxJREFUeNrs2cFtwjAUBmC76gAZoSPk2CMjwAakE8AEpROUCdps0GxAjj1mhIzgDeA3/OqBxsQkcbCl9yQrQoSXj8cjjhOlEg0dIunx9S3DJufLRv9+majhBH9irK/eKjG2U34BPSF6gc0PRubYxaJXwNfRwIHesNI+YSu/fyj8Rmv0xejW0SPQL2yNfGCKhq3Tzgb36GffsBUvgK+Cw4HeYfM+8dntA/hdEDj7+RtjGWhOqVh9Mxkc6JzoXIWNhvhmNBzoJdGZmie8+l4/oJ99Yw/89i74DP3sGzVPmaYXPmM/+0ZLfOOEA73mTJipuMJwpi3/wYG24E3kl+El8MUZzn62s+AikTXE5VIB8ENC6D+8hR9TXLo9sfQquYo7zuNR/Qr4Q+quiqtUW0XgAhe4wAUu8NnjOUDO1fVClzeQDlFXvGt1PtUdWulxgQtc4AIXuDP4bCh4The8GniM9sbDqHZgzqorpwteDMAbfs55DcN97om6J2d6cRJgAFzcg8JWh2d9AAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6tJREFUeNrUWctx20AM5WpyD1NBrAoi3XKzXEHoCiylAVsVSKxAcgMxXYHsCkjfcpNSgZkKzFSQAM5bDaRwfxQtMZjZoT/L3Qcs8IAFo+g/FdXGIr8/fx3Rg8cnGjF+llJibGj8oFGo79/KkwAH2CsaCcCGCitxTyMjJao3Bw7ACxqDlk6dQd/SWIYooAIAn9HjrsYNohYVSAn8sjXgBHoMK8dHiLuCxqXL+soDNFt5fGTSKAF+0wj4iUBL17kwgVcdBe0E3zOAvukA6AgxtSI8sRO4oLuuiGYzM3BodtfBDJ+A2YwWv4GGXZSFdJl3e9a+bomHnxBYOqgG8NfzAxJYDMPOd1iFgPMfZgfwbkrjwZU4YKAEe501YJk+7yGBPzdcaEoLZaIsSGBZWSUWmPsE5UqRkUMVmPB+CgvwZqtA0A9YpAITzQLcoEBdUghCSHz3pfcudXCeB4LmTS/ZqrRxTs880Hd5bo53Y6w1DWCYuCcWCjmqOay8NrzLrjOkeXyiH7jugJXrFFjzWqgKJ76K90TU+wgX/Rl8M6+pFisAZgAllDuj3/l4L6BQHVuw9ceIFZ+ydqDohQEs57yx0MJDx3yu6B5qGGpb7cE9TCc89Jjz189hldwDeB8WfTbU5VoxU6Az+CEYZG2jO6y/ttT/RS/ARUrHZeIRz2tLzTFCpVdZkswCe93aAPU8A/Mez0MrxoG4KJtkLCjTCnzjsaG2YmqZ814ct+1m72IxvceVC3jlyZ18zHOLoolDuQ0CN3EQgKZa6+mGBKcOLlvgpGJj2cLIRIJZG1J8hfUry5xtcCqk3BffVM18DErMDeCndS0G7JMbcsb2ikbzVh7pP1UNCixmmAkKqpUBiO5Sabf6gqOPDXOZ48uAe+5ENbwYb3sfSDbXDXourx0suFYM1/LF0Nc8/hS4qawx5vDNpWegV5g7BGjtdr6gSz4dJfzvJWomGYKyFJftEehR8vYvxEgh9pzhVhNamc5Vi30UVuCRKc9xA0qEzzeR/tbi4vby3GL/j0/gJ37/qFP+getmqDx3O1kd6V45rV3Xnkg9A+wUspRfMXaA4x9pB0H/g0sZAsgnex1ThvuNT1M9PvGsGo8hk7purXI0bvKovW89TUFntdWhR9fpVOCNoG2uooP1tWpD8+dYUqEOyqzYfFdDs38Wve0HrAKWLl0Tg75zIrvO3iBJlajjvU+20ZdloUBy4Amwhe9dbtEa8JqiSfe9Bx7+W0R7Xdsm8keAAQBXY7FFMzjiVgAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAg1JREFUeNrsmd9tglAUxoF0AEewE4hvfdQJWjaQLmA6QeME0gUaOkF1AuWtb2WD3k5QOoE9JzmkpwhyARO/m5TkBsTr9cfJd/5xPc/Rwz/c3O/oPKvcNzQi/+05RwUPGu6PabxCW1x/IOuP6LSgsZZbbPUNvMUJsqCR0OVeboWuSSWT88Q18Fxp3SnwAl0qftMX5KgHubwm3RuXwD9ApcKBIw5OTDCgKuFkuTsFDps1WQmnwL+RM2fQoiUnwQ0wt2kERwyBWg1BywRUB922gReuWjwDhM65im0DR9T5vi2qoIJnNuBwzll2ZEHLpAJRJjYWR8ugWRdwJJ2nXcA/QaATnc1twBEclGP3g22RhZA92cIrgp5at24N/SfMC6Kgw5NDdf1dwSeugcO9ILIFL/vPUF6MOgOus+caomaxnVjZAODI8kQRZu8COEtkd6HIEpOR0j5SKSvFudQLqC3d/3F5jVf0PpbocqecdTV0l47W5fUexY8KkeWqrqHxeyzOTvpek4x48WnfF0m07kyc/ygU05rzvnFcHwsFzaVmLND8QMsBBl8qA0SqaZjRQ4XnAB8pSyQSptIzFGGl7FgaGxqx+u5o3asBfxSKJQr1p0PavFwAb2nd1Pu7223OYfFUWZ61rrdcXgaAl79l4C/vd2fb1GXozuDifFElCRWS3XqXALIxnNSU01Hd/B8BBgBXCqXVvZFUkAAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAchJREFUeNrsmNFNwzAQhu1M0BHSDfLIG+kESScgZQKYIHQCNqB0gmSDhjfemg3oCNkAztIZodBA7NxdY6m/dMpT7c9/z2eflbpKVppqoM+b+xQ+dxAJRl8txl6/vzQXB0fgHUTs8LMTxGbKAvQE4AV8niGKCet+hXiEBXQi4Ah9GEgJV5n0WbnCR56TVUTQCsc5oBl84DDBE3xS4iJh4Eu2VAFoswE/GKvcauyGdXW8VLwqyR0XcNtqCa6fKB3PhQ7FnDpVboXAM2rwhRB4TA2ehAou5Tj5AdQKMXXU4J0QeEsN/hYqeC0EvicFh9PMONFwu43zkN9Vtszgo8d3AsebG1fK1DB+zQKO2jCUxhbHZW/dEmzdKA6lDu/hLTs4Yd/p1W9O6TntFWBqlWl8/zXt4XSMnUpBmOPmmWI7poHw6YAo3lHIFhCNhH7Ato0TWuH4R5zP33F0uWJ4jhib/+uhjav/KXmVcnsT5Ljini2VWqBOs8DrmUMPwuszOX28cHr8Bb+0Od+vKruZQtsDr/pVDvGBPlfzVgqcRd/xUoWh8jvHBd8FqbS2jucqLGUWPAsMPLXgSWDgcfSj1ASlSAWqYMGD1ZcAAwDMqotZKnS18AAAAABJRU5ErkJggg=="]
                if(this.options.hoverIndex>=0){
                    $(".bottombar li:eq("+this.options.hoverIndex+")").css("background-image","url("+hover_img[parseInt(this.options.hoverIndex)]+")");
                }
                var oldPaddingTop = $("body").css("padding-bottom");
                $("body").css("padding-bottom",(defVal+parseInt(oldPaddingTop))*dpr + "px");
                $(".toolbar").css("bottom",(defVal+10)*dpr+"px");
                $(".ve-gotop").css("bottom",(defVal+10)*dpr+"px");
            }

        },
        hide : function(){
            $(".topbar").hide();
        },
        show :function(){
            $(".topbar").show();
        }


    });
    // node
    $.fn.bottombar = function(options) {
        if (!options) {
            options = {};
        }
        return new BottomBar(options);

    };
    ctrl.bottomBar = BottomBar;

})(window, window['ctrl'] || (window['ctrl'] = {}));