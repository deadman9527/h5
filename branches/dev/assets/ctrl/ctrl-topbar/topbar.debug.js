!function(a,b){function c(a){this.string=a.toString()}b.env=b.env||{},c.prototype.toString=function(){return this.string},c.prototype.valueOf=function(){for(var b=this.toString().split("."),c=[],d=0;d<b.length;d++){var e=parseInt(b[d],10);a.isNaN(e)&&(e=0);var f=e.toString();f.length<5&&(f=Array(6-f.length).join("0")+f),c.push(f),1===c.length&&c.push(".")}return a.parseFloat(c.join(""))},c.prototype.gt=function(a){return c.compare(this,a)>0},c.prototype.gte=function(a){return c.compare(this,a)>=0},c.prototype.lt=function(a){return c.compare(this,a)<0},c.prototype.lte=function(a){return c.compare(this,a)<=0},c.prototype.eq=function(a){return 0===c.compare(this,a)},c.compare=function(b,c){b=b.toString().split("."),c=c.toString().split(".");for(var d=0;d<b.length||d<c.length;d++){var e=parseInt(b[d],10),f=parseInt(c[d],10);if(a.isNaN(e)&&(e=0),a.isNaN(f)&&(f=0),f>e)return-1;if(e>f)return 1}return 0},b.version=function(a){return new c(a)}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c)for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1])}catch(f){b.env.params[d[e][0]]=d[e][1]}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Android[\s\/]([\d\.]+)/))b.env.os={name:"Android",isAndroid:!0,version:c[1]};else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")}}else b.env.os={name:"unknown",version:"0.0.0"};b.version&&(b.env.os.version=b.version(b.env.os.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/MiuiBrowser\/([\d\.]+)/))?b.env.browser={name:"Xiaomi",isXiaomi:!0,version:c[1]}:(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?b.env.browser={name:"Chrome",isChrome:!0,version:c[1]}:d.match(/Mobile Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)?d.match(/Safari/)?(c=d.match(/Version\/([\d\.]+)/),b.env.browser={name:"Safari",isSafari:!0,version:c[1]}):(c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/,".")}):b.env.browser={name:"unknown",version:"0.0.0"},b.version&&(b.env.browser.version=b.version(b.env.browser.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;b.env.app=(c=d.match(/MicroMessenger\/([\d\.]+)/))?{name:"Weixin",isWeixin:!0,version:c[1]}:(c=d.match(/__weibo__([\d\.]+)/))?{name:"Weibo",isWeibo:!0,version:c[1]}:(c=d.match(/MobileVecn\/([\d\.]+)/))?{name:"Vecn",isVecn:!0,version:c[1]}:{name:"unknown",version:"0.0.0"},b.version&&(b.env.app.version=b.version(b.env.app.version)),"unknown"==b.env.app.name||b.env.app.isWeixin||b.env.app.isVecn||b.env.app.isWeibo||(b.env.husorApp={appname:b.env.app.name,platform:b.env.os.name,version:b.env.app.version})}(window,window.lib||(window.lib={}));
!function(a,b){var c,d={getItem:function(a){return a?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(a,b,c,d,e,f){if(!a||/^(?:expires|max\-age|path|domain|secure)$/i.test(a))return!1;var g="";if(c)switch(c.constructor){case Number:g=1/0===c?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+c;break;case String:g="; expires="+c;break;case Date:g="; expires="+c.toUTCString()}return document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+g+(e?"; domain="+e:"")+(d?"; path="+d:"")+(f?"; secure":""),!0},removeItem:function(a,b,c){return this.hasItem(a)?(document.cookie=encodeURIComponent(a)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(c?"; domain="+c:"")+(b?"; path="+b:""),!0):!1},hasItem:function(a){return a?new RegExp("(?:^|;\\s*)"+encodeURIComponent(a).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie):!1},keys:function(){for(var a=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),b=a.length,c=0;b>c;c++)a[c]=decodeURIComponent(a[c]);return a}},e=function(){var a={isLocalStorageOk:!1,prefix:"m_ve_",data:{},init:function(){return this.checkLocalStorage(),this.setMethod(),this},checkLocalStorage:function(){if("localStorage"in window&&null!==window.localStorage)try{window.localStorage.setItem("test","test"),window.localStorage.removeItem("test"),this.isLocalStorageOk=!0}catch(a){}},setPrefix:function(a){this.prefix=a},setMethod:function(a){a=a||"",c=this.isLocalStorageOk?"cookie"==a?d:window.localStorage:d},set:function(a,b){this.data[a]=b,"object"==typeof b&&(b=JSON.stringify(b)),c.setItem(this.prefix+a,b)},get:function(a){var b=this.data[a];if("undefined"==typeof b){b=c.getItem(this.prefix+a);try{b=JSON.parse(b)}catch(d){}}return b},rm:function(a){a&&(a=this.prefix+a,c.removeItem(a))}};return a.init()}();b.storage=e,b.cookie=d}(window,window.lib||(window.lib={}));
/**
 * topbar
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

    var defVal = 40,defSize = 18,defL = 10,defR = 0,defBack = 40,defW = 50,setW=9,setSize=20,dpr = parseInt($("html").attr("dataset").dpr) || 1;
    // 默认配置
    var defoptions = {
        style: '.topbar {\
                position: fixed;\
                width: 100%;\
                top: 0;\
                left: 0;\
                background-color: #fff;\
                z-index: 999;\
                height: '+defVal*dpr+'px;\
                border-bottom:1px solid #e5e5e5;\
                color:#333;\
                font-size:18px;\                
        }\
            .topbar a{\
                        display: block;\
                    position: absolute;\
                    width: '+defW*dpr+'px;\
                    height: '+defVal*dpr+'px;\
                    font-family:Microsoft yahei;\
                    top: 0;\
                    line-height: '+defVal*dpr+'px;\
                    background-attachment: scroll;\
                    background-clip: border-box;\
                    background-color: rgba(0, 0, 0, 0);\
                    background-origin: padding-box;\
                }\
                .top-back{\
                left: 0px;\
                 background: url(data:image/png;base64,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) '+defL*dpr+'px '+defR*dpr+'px no-repeat;\
                background-size: auto '+defBack*dpr+'px;\
                }\
                .top-setting{\
                position:absolute;\
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4N0VBMkNGMzdEMzQxMUU0QTA5RkFBNTJCNzg3QkRFNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4N0VBMkNGNDdEMzQxMUU0QTA5RkFBNTJCNzg3QkRFNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg3RUEyQ0YxN0QzNDExRTRBMDlGQUE1MkI3ODdCREU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg3RUEyQ0YyN0QzNDExRTRBMDlGQUE1MkI3ODdCREU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Z/YxugAAA2lJREFUeNqsl0FIlEEUxz83CcyKoksnhdCSTMtdcu0QgpAdFOpiGGSE0gpiByMqJQIhMi96SCIzO2jYoUMS2cHAMIJUUCEtUiRQ6BiVtEgk2n/g/8FjfLPulzvwY7+d781775t58+ZNWiwW8wK0EHgA6kC69W4V9IIGsBZEYZBWCuoV4x776injpcKBfHAH1AqDJUnoLBEO1VJHvks43dFfBl6BDP4369QGqvh/GoStMVOgiDKfQTOI8t1VUAlGkpkB27hHRYM0YNqsMs7vK6JsVLzLoM6yzRywjS+DTgaYbBOKAxNKUHZSh9MJ6UCeYryc0xflFLeDbNClONDFd+2UjXJsueJEnuZAjWJ8XKxvBNwESwkCcIkyEY7xqMN2okZzYEE89wrjqWjj1LnBlnSgXxi9okS51tLIZi1Mnb4z/ZoDq9xq/vbscSjL5BabAX/IDPsyHWN6xJZvk0GdTidKmUCqxKA3iqIcMAQOWv1HwF1wCVRYy+nr8mf0NjgMxsBoGs6Ch0yhdsu2Ai6TgeUbH6LiXaBaZLt5GouLsVlgUbHRvS0SibwQS/ERDIPHygxcA+f4bFLsda7nO/AI5IICsA/8Bu/F2F/gO1kH+9l/zMzAuhDcC3461nGGUz3EtGq3neAb2M2sWJAgKNf/5zQ8lCA2PH71ByGbzO4IfBx7XHMvwQ7Z8JWpcmCOv9WOUzRXHMVzQeoBedCMgj7QqMgOiDqhj2sujQ8KxwaU8Y0cNy1zz1a24TLXfAc4IYwH2oYh1nDmiGyxvGuwhONMMvP8b6L9NDhpGa+wjNu6pmjL2GwIsYB8yxTZKgRPKR4v8OtauNX+kln2hZUsaOtqpS1jcy1klWfN4ly47IibOBWYfb6dFLAv7hgTE7HWIoPYrgf8Muq+OM9T0Sap0y/vLmgO5IjnOqum22qLUucGW3Y9sCICbFg4EeZX3GNEu1oWZSZZFfnGh6nTo42nmgNfmONtJzp46BgnbnA7NTr2+SJlwjxuOxTjlbSlZsIRxYkmJfMVKw4UK3eOJsX4yGap2HbCL6POijxRCPZYFIpLyxmrplxxXUxcNyMjeBycB1+ZQldZyZiLx1HwwzH2OXgJXoOL4AB4Bj4FuZp5HHDL6htLIuLHRC55kurj2BxW3cpNyTfYTZmk2z8BBgCfYtyy5Q/2+QAAAABJRU5ErkJggg==) '+defL*dpr+'px '+setW*dpr+'px no-repeat;\
                right:0px;\
                background-size: auto '+setSize*dpr+'px;\
                top:0px;\
                }\
				.top-home{\
                position:absolute;\
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMkU0QjNGOUI1QjExMUU0QjQyN0UxQTRENUM3NUMxNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMkU0QjNGQUI1QjExMUU0QjQyN0UxQTRENUM3NUMxNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQyRTRCM0Y3QjVCMTExRTRCNDI3RTFBNEQ1Qzc1QzE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQyRTRCM0Y4QjVCMTExRTRCNDI3RTFBNEQ1Qzc1QzE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+62yGWwAAAuRJREFUeNrsmGuITGEYx8/Mzm6IMkhR2A98QW4ta0lsZmS/2I0il1KSorC5RZaodanVysZ3pVAUwpDhAyE0E+USIlIkfBiWVWYtvyfPqdNp9sysc5n9ME/9mjnv5bz/87yX533fUCwWMzywOtgBNfAVbsBueJGvYjKZdMwPuxQWgSOQgFmQhU5YDI9hvdsvdyNwsDgANkAX7IchMBL2QRm0wXHoE7TASZCGOZDRLt4JHfALmmCBdvdKuAOjghK4xNLgU5gK13KUuwzT4DlMgRTU+ilQuuwAnIZ+cF4nxSuHOi+hGi5q98uQaPRD4EC4BNv1eQ8shPYC6n6DemjWjzwMJ6CvVwLHwgOYD9+hAfbCnx44Qsru0o/6ASvgdiHjMp9AGej3YIx2pXTXBRcz/xxMh9fmuIzH47X/IzCkC62IGQBXdcA/82BRf6LvSuq4vI7Izd0VDuWIJP11jDToc4tGid+Gtybj8SBs0edTsJrI0uHkwdHapSLuJyyDbT6IM/SdW2G5trUU7uLNyu4EztPJMA7ewUz9Kl8Nj53UMCltTpQAgMi5doHi5isQhZtQBQ+NgAyRaW3zFgyShd8cl2EN9i36/yjE4bMRsCFS2pQJcUy1HEJkm+xG1mkZiakj4Ay8hU26CfDdECKCWqHSokWCw9qIBv1qTai31BOvvg/IgcNgY470dFjjadRCQjPLA+xhs62ETUtNRMNQxlI4axTPsozFjJc7at+tJLAksNgW8eg9cgQYakv7pIeoonqwAs7q1v+NjXbNqyimB+W4uQg+akTq1HT5naB5dW524W4FRi1hsdWW16gHpGhvmCRdpWWmJLAksBcKLGQJCnnkhLKeVDY3jIXcDY/X3y858sy0yQW8Z7atbcebBbmcTOnBOuWwwy7XKwzxotyqfrDlD9ezruTfN/5dbHbXU1XmLzvqR/m6UQqs0uPfjAJurZpyiDM0Te53mvXc42Rya7bGLk7srwADAPfar2BOIExVAAAAAElFTkSuQmCC) '+defL*dpr+'px '+setW*dpr+'px no-repeat;\
                right:0px;\
                background-size: auto '+setSize*dpr+'px;\
                top:0px;\
                }\
                .top-share{\
                    position:absolute;\
                    background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QN6aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWE1YTY3MGQtZDRmNC04YjQ2LWIxMWMtY2M0OTA5MWQ5ZGJiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0MTAyMTYxMDVEMDExRTVCMEFDOEEzQjYzOTEzMzE2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0MTAyMTYwMDVEMDExRTVCMEFDOEEzQjYzOTEzMzE2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphYzlmZjM3MS1hNDc1LWYxNDYtYTA2ZS04OWE4NTdkODVmNTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MWE1YTY3MGQtZDRmNC04YjQ2LWIxMWMtY2M0OTA5MWQ5ZGJiIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAIAAeAwERAAIRAQMRAf/EAGgAAAICAwAAAAAAAAAAAAAAAAQFAAYDBwgBAQAAAAAAAAAAAAAAAAAAAAAQAAEDAgUDAwMFAAAAAAAAAAMBAgQFBgARIRITMRQVQSIyUTMHgUIjFhcRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOqcBMBS7jfVa3eILWj1A9Kp4YK1GceIqMkn3F4WBYRUXY1MlV6t16JgFyU6owbk/pZq1UJVJrEJ8yLKU+U+I+KUfIxJKJuUZUcia6pqmeuAaz7/AJS1GXDoNBl11lOeoahKA4QhMKiIrhDcVzeR7UX3I3p0zwADb4uO6c4tmQHRRtVRzq1U2KwcYjdHiYDPcUzPVPii4DMz8UxBtbNFWag250cr33CpEcd+aZOGonIouH6DRumAKi/j88cM2T52YW45rBh86RBOKEQyITiCLbxMY5U9yZa54BTSJ9Xsl1Qo8ihT6pELMkTKZPpw2nQjZRFLxmRXNUZGOcrc10VNcAPbFyHtaVUEvCnmozK9PJPBO3IaENTo1rQFKP7RGoxM1cm1V9cA8lfla2AHOgxTpcCK9RyqtFilNCG5vyzMxFRUb+5W5omAtHk6d47yfcj8fxdx3e5OLi27t+7pt2654AnAD1GG2bT5MR23KQJ4/eiOb7mqmatXRcBri172pNr2rEtmrQJYq7Sw9o6liilKsp7c0R4HNao3sN8s8/XXAEpZ1d/xdbe4W+V7fk7Lcm37/cdru6ZbP4vp+mA//9k=) '+defL*dpr+'px '+setW*dpr+'px no-repeat;\
                    m6UQqs0uPfjAJurZpyiDM0Te53mvXc42Rya7bGLk7srwADAPfar2BOIExVAAAAAElFTkSuQmCC) '+defL*dpr+'px '+setW*dpr+'px no-repeat;\
                right:0px;\
                background-size: auto '+setSize*dpr+'px;\
                top:0px;\
                }\
                .top-setting-title{\
                position:absolute;\
                font-size:12px;\
                color:#333;\
                right:0px;\
                background-size: auto '+setSize*dpr+'px;\
                top:0px;\
                }\
                    .topbar h1{\
                    padding:0;\
                    height: '+defVal*dpr+'px;\
                    margin: 0 '+defVal*dpr+'px;\
                    color: #333;\
                    line-height: '+defVal*dpr+'px;\
                    text-align: center;\
                    white-space: nowrap;\
                    text-overflow: ellipsis;\
                    overflow: hidden;\
                    font-size: '+defSize*dpr+'px;\
                }'
    };

    // constructor
    function TopBar(options) {
        this.options = {};
        $.extend(this.options, defoptions, options || {});
        this._init();
    }

    $.extend(TopBar.prototype, {
        // 初始化
        _init: function() {
            this.height = defVal*dpr;
            var ua = window.navigator.userAgent.toLowerCase();
            var os = lib.env.os;
            var that = this;
            if(ua.match(/MobileVecn/i) ){//唯一客户端不需要topbar,微信,QQ目前还是显示
                this.height = 0;
            }
            ctrl.topBar.getInfo = function(){
                return {height:that.height};
            };
            if(ua.match(/MobileVecn/i) ){
                return;
            }


            addStyle(this.options.style);
            var topTitle = "";
            if(this.options.title){
                topTitle = this.options.title;
            }else{
                topTitle = document.title;
            }
            if(this.options.isIndex){
                $("body").prepend('<div class="topbar"><a class="top-back" href="javascript:;" style="background: none;color: #fff;font-size: 12px;padding-left: 10px;width: 100px;"></a><h1><img width="88" height="31" style="vertical-align: middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAAA9CAYAAAANmeNYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQxJREFUeNrsnYGRozgQReWrS4AUfCFwIUAI2hBwCBCCHcIQwjoEkwIhLCEMIfhMVaus7WsJCXt2bOn/KlWtwQvy8NT91ZJndtfrVUHQu+ov/AggAAxBABiCADAEgCEIAEMQAIYgAAwBYAgCwBAEgCHod/2dwWdsbk1br2s8dgD8TipurRKOL8fKDdcbb234or7uqfnk6nMlvG/57DsAnKaWB3zc8P+6jQB/17a/ZUBM8MDQoxq+EWBE4AR1JjugySdLHvlopezeitprkXvnANik+ZnuHSLbGvQsmo4vNlgA8BN0WYlAFwbA5Hn4s/Xv6cFodqIWo4oBfM4JzlwBriLPAwh44GxUkz3gDaU5APw0cbg6z/nak7aXVniiuH2uWIn4143tItifrddqYSHy0MVz7kgTvoIGxknw2RN+hAD4lf21ibaNBXDhAXiO9NkhixlmAjpHXHcGwPn4XDvi2itfSxnrwwKtUffymgvgMcIjtxGp3mSBrCehqQHcCH60EiAJrUrwqNUT1OYeOgDg0Kj7IfRlZNeerXvvye70lAnytC7LLzZJqF2uj8t1vZaOtez9JXtdRfS3uLWjox8tXYtf+0N47ye9v0jsea42lNHidWavP4SoGRJxl0zwS8gIE1kO16LH4dZ+sOxQUGb4pP6UuTyM1CxE5yhp+ZaL+blqpTw2EcRmiya3D77JUkn3ahznzWrdHDCIBoJVCzaqsfp5VuHL1gD4mzV6wHH53DKijGYDpIXjgyPaamquyDjQ4IsBbaZIXFEUrxxRvrUqIX1qk75UqxBmojV9UfQ5K3lvxChMGH0bfyayBIMH0mGlFDao+0YhCWSTSbSK34sBgL9JpfUguyeW0TjE7UoE7imd7z0Ax5TOjiv2qbZsimYWqFMJWolc68A+n7sW8Ww4WxZ9pUWMg2VLeqsUV6n1jUcxKqx+HKhpusee7gsP/EYR2KfLim99BCApxdcqfuXsWVbnnHIkSrWMVnzBNffq9+/RacdkzQXxzGwK33R0EqzMztEOQqTPciEjBwshTbY6Bh6Hv6RmnzPlKbM03DqsydaIVwZUNEx/uRc+AeB07YMUjU/q/q1d7kM/A67fKHe9udtoFapA731k956tiocSqiIDAH5v+9A6JjDHDZMoYwVaz731hglTExh9pc9XeKoTyW/2SdEDl0LKdUUnl0Z1r/XaMNQCRAcWMbdUFnRE36DMLITLRkxWtDMlsJHBc2E+WDPYJnXfjdZY7ykibIQWoO9XKguD57Nr4TMC4DdSaATsI1P9AiXfuHOwBkHDoOw3XrNX6/Vnl1oG8Jw6wKlZiFL5vx3xiFp2bTsSnjfAUlCE5xOyk4KyBZh7yR8OP3nZ4FXtXV2T+n8ttqP2T0D0LakPpVAdeWTQVbl56V1Cf6lziWS/rIg2EUyFAxZ7smZWyUahOmAv0Y50bHDAUbL7T45I3gq+vBcGRWyG4NWIXeoAp+SBGyHFm7RcK3nvbKm+bvN3x+yAJshKh68NgffqGISlI2PAQryRJs9kx+ydrf9gWu2tQbJkhp8O0E4RkXcMrLqsTfYA8AvKrtsOjvS9HP+XWuexAs/oy2wNHlcZr1Zx2z3HwIFcq0y+rbxL7K/VGx/4ag9QUwQ2gPUbqw1rvzNiUpntiUgNYLMRZ3jRwTXnktoBMARl5oEhAAxBABiCADAEAWAIAEMQAIYgAAxBABgCwBAEgCEIAEPQfwIMAFSogD5VNYZOAAAAAElFTkSuQmCC" /></h1></div>');
            }
            else{
				var href="",home = this.options.topHome ? '<a class="top-home" href="http://h5.quxiu.me"></a>' : "";
                var share = this.options.topShare ? '<a class="top-share" href="javascript:;"></a>' : "";
				if(history.length > 1){
					href='<a class="top-back" href="javascript:history.go(-1);"></a>';
				}
			 
                if(os.isAndroid && (ua.match(/sogoumobilebrowser/i)  || ua.match(/360 aphone browser/i))){
                    if(this.options.isSetting){
                        if(this.options.settingTitle){
                            $("body").prepend('<div class="topbar"><h1>'+topTitle+'</h1><a class="top-setting-title" href="javascript:;">'+this.options.settingTitle+'</a></div>');
                        }else{
                            $("body").prepend('<div class="topbar"><h1>'+topTitle+'</h1><a class="top-setting" href="setting.html"></a></div>');
                        }

                    }else{
                        if(share != ""){
                            $("body").prepend('<div class="topbar">'+href+'<h1>'+topTitle+'</h1>'+share+'</div>');
                        }else{
                            $("body").prepend('<div class="topbar">'+href+'<h1>'+topTitle+'</h1>'+home+'</div>');
                        }
                    }
                }else{
                    if(this.options.isSetting){
                        if(this.options.settingTitle){
                            $("body").prepend('<div class="topbar">'+href+'<h1>'+topTitle+'</h1><a class="top-setting-title" href="javascript:;">'+this.options.settingTitle+'</a></div>');
                        }else{
                            $("body").prepend('<div class="topbar">'+href+'<h1>'+topTitle+'</h1><a class="top-setting" href="setting.html"></a></div>');
                        }
                    }else{
                        if(share != ""){
                            $("body").prepend('<div class="topbar">'+href+'<h1>'+topTitle+'</h1>'+share+'</div>');
                        }else{
                            $("body").prepend('<div class="topbar">'+href+'<h1>'+topTitle+'</h1>'+home+'</div>');
                        }
                    }
                }



            }
            /*if($(".topbar").next().attr("type") == "hidden"){
             $(".topbar").next().next().css("margin-top",""+defVal*dpr+"px");
             }else
             $(".topbar").next().css("margin-top",""+defVal*dpr+"px");*/
            var oldPaddingTop = $("body").css("padding-top");
            $("body").css("padding-top",""+(defVal+parseInt(oldPaddingTop))*dpr+"px");

            $(".top-share").on("click", function(){
                console.log("to share");
            });
        },
        hide : function(){
            $(".topbar").hide();
        },
        show :function(){
            $(".topbar").show();
        },
        setIndexName:function(name){
            $(".top-back").html(name);
        },
		setBackUrl:function(url){
			$(".top-back").attr("href",url);
		}



    });
    // node
    $.fn.topbar = function(options) {
        if (!options) {
            options = {};
        }
        return new TopBar(options);

    };
    ctrl.topBar = TopBar;

})(window, window['ctrl'] || (window['ctrl'] = {}));
