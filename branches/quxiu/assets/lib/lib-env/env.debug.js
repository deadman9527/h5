/**
 * @desc    生成版本对象
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-05
 */

;(function(window, lib) {
    lib.env = lib.env || {};

    function Version(string){
        this.string = string.toString();
    };

    Version.prototype.toString = function(){
        return this.string;
    };

    Version.prototype.valueOf = function(){
        var v = this.toString().split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if(window.isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if(s.length < 5) {
                s = Array(6-s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return window.parseFloat(r.join(''));
    };

    Version.prototype.gt = function(v) {
        return Version.compare(this,v) > 0;
    };

    Version.prototype.gte = function(v) {
        return Version.compare(this,v) >= 0;
    };

    Version.prototype.lt = function(v) {
        return Version.compare(this,v) < 0;
    };

    Version.prototype.lte = function(v) {
        return Version.compare(this,v) <= 0;
    };

    Version.prototype.eq = function(v) {
        return Version.compare(this,v) === 0;
    };

    Version.compare = function (v1,v2){
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');

        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);

            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    }


    lib.version = function(string){
        return new Version(string);
    };

})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var search = window.location.search.replace(/^\?/,'')
    lib.env.params = {};
    if(search) {
        var params = search.split('&');
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split('=');
            try{
                lib.env.params[params[i][0]] = decodeURIComponent(params[i][1]);
            } catch(e) {
                lib.env.params[params[i][0]] = params[i][1];
            }
        }
    }

})(window, window['lib'] || (window['lib'] = {}));
/**
 * @desc    系统检测
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-05
 */

;(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;

    if((matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.os = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = matched[1];

        matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

        lib.env.os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: matched[1].split('_').join('.')
        }
    } else {
        lib.env.os = {
            name:'unknown',
            version:'0.0.0'
        }
    }

    if (lib.version) {
        lib.env.os.version = lib.version(lib.env.os.version);
    }

})(window, window['lib'] || (window['lib'] = {}));
/**
 * @desc    浏览器检测
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-05
 */

;(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;

    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
        lib.env.browser = {
            name: 'UC',
            isUC: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'QQ',
            isQQ: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/MiuiBrowser\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Xiaomi',
            isXiaomi: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: matched[1]
        }
    } else if(ua.match(/Mobile Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        }
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/)) {
            matched = ua.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name: 'Safari',
                isSafari: true,
                version: matched[1]
            }
        } else {
            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
            lib.env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: matched[1].replace(/\_/, '.')
            }
        }
    } else {
        lib.env.browser = {
            name:'unknown',
            version:'0.0.0'
        }
    }

    if (lib.version) {
        lib.env.browser.version = lib.version(lib.env.browser.version);
    }

})(window, window['lib'] || (window['lib'] = {}));
/**
 * @desc    App检测
 *
 */

;(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;

    if ((matched = ua.match(/MicroMessenger\/([\d\.]+)/))) {
        lib.env.app = {
            name: 'Weixin',
            isWeixin: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/__weibo__([\d\.]+)/))) {
        lib.env.app = {
            name: 'Weibo',
            isWeibo: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/MobileVecn\/([\d\.]+)/))) {
        lib.env.app = {
            name: 'Vecn',
            isVecn: true,
            version: matched[1]
        }
    } else {
        lib.env.app = {
            name:'unknown',
            version:'0.0.0'
        }
    }

    if (lib.version) {
        lib.env.app.version = lib.version(lib.env.app.version);
    }

    if (lib.env.app.name != 'unknown' && !lib.env.app.isWeixin && !lib.env.app.isVecn && !lib.env.app.isWeibo) {

        lib.env.husorApp = {
            appname: lib.env.app.name,
            platform: lib.env.os.name,
            version: lib.env.app.version
        }

    }

})(window, window['lib'] || (window['lib'] = {}));
