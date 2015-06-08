/**
 *   cookie的基础操作工具
 *
 * @class cookie
 * @module utils
 * @namespace lib.storage
 * @author butai,武仲(wuzhong@taobao.com)
 * @since 2013.6.14
 */
(function (lib) {

    /**
     * get cookieVauel
     * @method getCookieVal
     * @public
     * @static
     * @param {String} offset 偏移量
     * @return {String} cookieValue
     */
    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr === -1) {
            endstr = document.cookie.length;
        }
        return window.unescape(decodeURIComponent(document.cookie.substring(offset, endstr)));
    }
	lib.storage || (lib.storage={});
    lib.storage.cookie= {
        /**
         * 判断浏览器是否能使用cookie
         * @method isCookieEnable
         * @public
         * @static
         * @return {Boolean} ret
         */
        isCookieEnable: function () {
            if (!window.navigator.cookieEnabled) {
                return false;
            }
            var key = '_s_cookie_',
                v = this.getCookie(key);
            this.setCookie(key, '1');
            if (v === '1') {
                this.delCookie(key);
                return true;
            }
            return false;
        },


        /**
         * getCookie
         * @method getCookie
         * @public
         * @static
         * @param {String} name cookie名
         * @return {String} if not exist ,return null
         */
        getCookie: function (name) {
            var arg = name + "=", alen = arg.length, clen = document.cookie.length, i = 0, j;
            while (i < clen) {
                j = i + alen;
                if (document.cookie.substring(i, j) === arg) {
                    return getCookieVal(j);
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i === 0) {
                    break;
                }
            }
            return null;
        },

        /**
         * 将cookie设置到taobao域下
         * @method setCookie
         * @public
         * @static
         * @param {String} key cookie名
         * @param {String} value cookie值
         */
        setCookie: function (key, value) {
            var host = window.location.host,
                index = host.indexOf("."),
                subDomain = host.substring(0, index),
                expires = (arguments.length > 2) ? arguments[2] : null,
                expdate = new Date();
            if (subDomain !== 'waptest' && subDomain !== 'wapa' && subDomain !== 'm' && (host.indexOf("taobao") > -1 || host.indexOf("tmall") > -1)) {
                host = host.substr(index + 1);
            }
            if (expires == null) {
                document.cookie = key + "=" + window.escape(value) + ";path=/;domain=" + host;
            } else {
                expdate.setTime(expdate.getTime() + (expires * 1000 ));
                document.cookie = key + "=" + window.escape(value) + ";path=/;domain=" + host + ";expires=" + expdate.toGMTString();
            }

        },

        /**
         * 删除cookie
         * @method delCookie
         * @public
         * @static
         * @param {String} name cookie名
         */
        delCookie: function (name) {
            var exp = new Date(),
                cval = this.getCookie(name);
            exp.setTime(exp.getTime() - 1);
            document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
        }

    };

})(window.lib || (window.lib = {}));
/**
 *依赖：lib-storage.cooki
 *H5 初始化脚本
 * 目前提供以下功能
 * 1、webp检测并设置支持性标志到cookie中
 * 2、aplus埋点脚本
 * 
 * @author butai
 */
(function (lib){

lib.h5init || (lib.h5init={});

/***************webp操作*********************/
lib.h5init={

   /**
   *判断是否支持webp，并设置webp
   **/
  detectAndSetCookie : function () {
        var webpFlagKey = 'supportWebp';
        //true - 支持  false - 不支持
        if(window.lib.storage.cookie.getCookie(webpFlagKey) == null) {
            //TODO UA detect
             if (window.navigator.userAgent.indexOf("Chrome") > -1) {
                window.lib.storage.cookie.setCookie(webpFlagKey, false, 864000);
                return
            }
            //make Image detect
            var webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            webP.onload = function() {
                if(webP.height === 2) {
                    window.lib.storage.cookie.setCookie(webpFlagKey, true,1728000);
                } else {
                   window.lib.storage.cookie.setCookie(webpFlagKey, false ,432000);
                }
            };
            webP.onerror = function() {
                   window.lib.storage.cookie.setCookie(webpFlagKey, false ,8640);
            };
        }
    },
  apluslog : function(){
   (function (d) {
 var t=d.createElement("script");t.type="text/javascript";t.async=true;t.id="tb-beacon-aplus";
t.setAttribute("exparams","");
if("https:"==d.location.protocol){t.src="https://s.tbcdn.cn/s/aplus_wap.js";}else{t.src="http://a.tbcdn.cn/s/aplus_wap.js";}
d.getElementsByTagName("head")[0].appendChild(t);
})(document);

  }

 }   

})(window.lib || (window.lib={}));