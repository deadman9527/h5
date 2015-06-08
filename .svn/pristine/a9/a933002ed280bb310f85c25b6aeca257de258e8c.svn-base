/**
 * @desc    互秀Grid
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-12
 */

;(function(win) {
    var h;
    var dpr = win.navigator.appVersion.match(/iphone/gi)?win.devicePixelRatio:1;
    var scale = 1 / dpr;
    var docEl = document.documentElement;
    var metaEl = document.createElement('meta');

    function setUnitA(){
        win.rem = docEl.getBoundingClientRect().width / 16;
        docEl.style.fontSize = win.rem + 'px';
    }

    win.dpr = dpr;
    win.addEventListener('resize', function() {
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(h);
            h = setTimeout(setUnitA, 300);
        }
    }, false);

    docEl.setAttribute('data-dpr', dpr);
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = document.createElement('div');
        wrap.appendChild(metaEl);
        document.write(wrap.innerHTML);
    }

    setUnitA();
})(window);
/**
 * @desc    cookie操作
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-19
 */
;(function(win, lib){
    var $ = win['Zepto'] || win['$'];

    lib.cookie = function (key, value, options) {
        var days, time, result, decode

        // A key and value were given. Set cookie.
        if (arguments.length > 1 && String(value) !== "[object Object]") {
            // Enforce object
            options = $.extend({}, options)

            if (value === null || value === undefined) options.expires = -1

            if (typeof options.expires === 'number') {
                days = (options.expires * 24 * 60 * 60 * 1000)
                time = options.expires = new Date()

                time.setTime(time.getTime() + days)
            }

            value = String(value)

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''))
        }

        // Key and possibly options given, get cookie
        options = value || {}

        decode = options.raw ? function (s) { return s } : decodeURIComponent

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
    }

})(window, window.lib || (window.lib = {}))
/**
 * @desc    uri操作
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-07
 */

;(function(win, lib) {
    function HttpURL(string){
        var params = {};
        Object.defineProperty(this, 'params', {
            set: function(v){
                if (typeof v === 'object'){
                    for(var p in params) {
                        delete params[p];
                    }
                    for(var p in v) {
                        params[p] = v[p];
                    }
                }
            },
            get: function() {
                return params;
            },
            enumerable: false
        });

        Object.defineProperty(this, 'search', {
            set: function(v) {
                if(typeof v === 'string') {
                    if (v.indexOf('?') === 0) {
                        v = v.substr(1);
                    }
                    var search = v.split('&');
                    for(var p in params) {
                        delete params[p];
                    }
                    for(var i = 0 ; i < search.length; i++) {
                        var pair = search[i].split('=');
                        if (pair[0]) {
                            try {
                                params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                            } catch(e) {
                                params[pair[0]] = pair[1] || '';
                            }
                        }
                    }
                }
            },
            get: function(){
                var search = [];
                for(var p in params) {
                    if (params[p]) {
                        try {
                            search.push(encodeURIComponent(p) +'=' + encodeURIComponent(params[p]));
                        } catch(e) {
                            search.push(p +'=' + params[p]);
                        }
                    } else {
                        try {
                            search.push(encodeURIComponent(p));
                        } catch(e) {
                            search.push(p);
                        }
                    }
                }
                if (search.length) {
                    return '?' + search.join('&');
                } else {
                    return '';
                }

            },
            enumerable: true
        });

        var hash;
        Object.defineProperty(this, 'hash', {
            set: function(v) {
                if (v && v.indexOf('#') < 0) {
                    v = '#' + v;
                }
                hash = v || '';
            },
            get: function() {
                return hash;
            },
            enumerable: true
        });

        this.set = function(v) {
            v = v || '';
            var matchArr;
            if((matchArr = v.match(new RegExp('^(https?|beibei|beibeiapp|mizhe|mizheapp):[/]{2}' + //protocal
                '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
                '([^:/?#]+)' +                        //hostname
                '(?:[:]([0-9]+))?' +                  //port
                '([/][^?#;]*)?' +                     //pathname
                '(?:[?]([^?#]*))?' +                  //search
                '(#[^#]*)?$'                          //hash
            )))){
                this.protocal = matchArr[1];
                this.username = matchArr[2] || '';
                this.password = matchArr[3] || '';
                this.hostname = this.host = matchArr[4] ;
                this.port = matchArr[5] || '';
                this.pathname = matchArr[6] || '/';
                this.search = matchArr[7] || '';
                this.hash = matchArr[8] || '';
                this.origin = this.protocal + '://' + this.hostname;
            } else {
                throw new Error('Wrong uri scheme.');
            }
        }

        this.toString = function(){
            var string = this.protocal + '://';
            if(this.username) {
                string += this.username;
                if(this.password) {
                    string += ':' + this.password;
                }
                string += '@';
            }
            string += this.host;
            if(this.port && this.port !== '80') {
                string += ':' + this.port;
            }
            if(this.pathname) {
                string += this.pathname;
            }
            if(this.search) {
                string += this.search;
            }
            if(this.hash) {
                string += this.hash;
            }
            return string;
        }


        if (string) {
            this.set(string.toString());
        }
    }

    lib.httpurl = HttpURL;
    lib.uri = new HttpURL(location.href);

})(window, window['lib'] || (window['lib'] = {}));

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
 * @desc    App检测 目前支持微信检测 米折检测 贝贝检测
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-05
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
    }  else if ((matched = ua.match(/Mizhe\/([\d\.]+)/))) {
        lib.env.app = {
            name: 'Mizhe',
            isMizhe: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/Beibei\/([\d\.]+)/))) {
        lib.env.app = {
            name: 'Beibei',
            isBeibei: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/MizheHD\/([\d\.]+)/))) {
        lib.env.app = {
            name: 'MizheHD',
            isMizheHD: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/BeibeiHD\/([\d\.]+)/))) {
        lib.env.app = {
            name: 'BeibeiHD',
            isBeibeiHD: true,
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

    if (lib.env.app.name != 'unknown' && !lib.env.app.isWeixin && !lib.env.app.isWeibo) {

        lib.env.husorApp = {
            appname: lib.env.app.name,
            platform: lib.env.os.name,
            version: lib.env.app.version
        }

    }

})(window, window['lib'] || (window['lib'] = {}));
/**
 * @desc    跨域ajax
 * @author  冯子龙 <zilong.feng@husor.com.cn>
 * @date    2014年9月23日
 */

;(function(win, lib){
	var $ = win['Zepto'] || win['$'],
		crossdomain,
		slice = Array.prototype.slice;

	crossdomain = {};

	$.extend(crossdomain, {
		iframeLoaded : 0,
		iframeSrc : 'http://api.beibei.com/proxy/h5.html',
		iframeEl : $('<iframe />'),
		_waitQueue : {
			get : [],
			post : [],
			ajax : []
		},
		setDomain : function(){
			document.domain = 'beibei.com';
		},
		copyCookie : function(){
			this.iframeEl[0].contentWindow.document.cookie = document.cookie;
		},
		copyCookieBack : function(){
			document.cookie = this.iframeEl[0].contentWindow.document.cookie;
		},
		init : function(){
			var args = slice.call(arguments),
				method = args.shift();

			if(this.iframeLoaded === 0){
				this._waitQueue[method].push(args);
				
				if($('.m-beibei-crossdomain').length === 0){
					this.iframeEl[0].onload = $.proxy(function(){
						this.iframeLoaded = 1;

						this.setDomain();
						
						this.iframeEl[0].contentWindow.$(this.iframeEl[0].contentWindow.document).on('ajaxSuccess', $.proxy(function(){
							this.copyCookieBack();
						}, this));
						
						for(mhd in this._waitQueue){
							this.copyCookie();
							this._waitQueue[mhd].forEach($.proxy(function(args){
								this.iframeEl[0].contentWindow.$[mhd].apply(this, args);
							}, this));
						}
					}, this);
					
					$('body').append(this.iframeEl.addClass('m-beibei-crossdomain').attr({'src' : this.iframeSrc, 'hidden':'true'}));
				}
			} else {
				this.copyCookie();
				this.iframeEl[0].contentWindow.$[method].apply(this, args);
			}
		},
		get : $.proxy(function(){
			var args = slice.call(arguments);
			args.unshift('get');
			this.init.apply(this, args);
		}, crossdomain),
		post : $.proxy(function(){
			var args = slice.call(arguments);
			args.unshift('post');
			this.init.apply(this, args);
		}, crossdomain),
		ajax : $.proxy(function(){
			var args = slice.call(arguments);
			args.unshift('ajax');
			this.init.apply(this, args);
		}, crossdomain)
	});

	lib.crossdomain = crossdomain;
	
})(window, window['lib'] || (window['lib'] = {}))

// @desc 前段模板引擎 参照 juicer http://juicer.name
// @author 王玉林 <veryued@gmail.com>
// @date 2014-08-11

;(function(window, lib){

    var juicer = function() {
        var args = [].slice.call(arguments);

        args.push(juicer.options);

        if(args[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
            args[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function($, $id) {
                var _document = document;
                var elem = _document && _document.getElementById($id);
                args[0] = elem ? (elem.value || elem.innerHTML) : $;
            });
        }

        if(arguments.length == 1) {
            return juicer.compile.apply(juicer, args);
        }

        if(arguments.length >= 2) {
            return juicer.to_html.apply(juicer, args);
        }
    };

    var __escapehtml = {
        escapehash: {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2f;'
        },
        escapereplace: function(k) {
            return __escapehtml.escapehash[k];
        },
        escaping: function(str) {
            return typeof(str) !== 'string' ? str : str.replace(/[&<>"]/igm, this.escapereplace);
        },
        detection: function(data) {
            return typeof(data) === 'undefined' ? '' : data;
        }
    };

    var __throw = function(error) {
        if(typeof(console) !== 'undefined') {
            if(console.warn) {
                console.warn(error);
                return;
            }

            if(console.log) {
                console.log(error);
                return;
            }
        }

        throw(error);
    };

    var __creator = function(o, proto) {
        o = o !== Object(o) ? {} : o;

        if(o.__proto__) {
            o.__proto__ = proto;
            return o;
        }

        var empty = function() {};
        var n = Object.create ?
            Object.create(proto) :
            new(empty.prototype = proto, empty);

        for(var i in o) {
            if(o.hasOwnProperty(i)) {
                n[i] = o[i];
            }
        }

        return n;
    };

    juicer.__cache = {};
    juicer.version = '0.6.5-stable';
    juicer.settings = {};

    juicer.tags = {
        operationOpen: '{@',
        operationClose: '}',
        interpolateOpen: '\\${',
        interpolateClose: '}',
        noneencodeOpen: '\\$\\${',
        noneencodeClose: '}',
        commentOpen: '\\{#',
        commentClose: '\\}'
    };

    juicer.options = {
        cache: true,
        strip: true,
        errorhandling: true,
        detection: true,
        _method: __creator({
            __escapehtml: __escapehtml,
            __throw: __throw,
            __juicer: juicer
        }, {})
    };

    juicer.tagInit = function() {
        var forstart = juicer.tags.operationOpen + 'each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?' + juicer.tags.operationClose;
        var forend = juicer.tags.operationOpen + '\\/each' + juicer.tags.operationClose;
        var ifstart = juicer.tags.operationOpen + 'if\\s*([^}]*?)' + juicer.tags.operationClose;
        var ifend = juicer.tags.operationOpen + '\\/if' + juicer.tags.operationClose;
        var elsestart = juicer.tags.operationOpen + 'else' + juicer.tags.operationClose;
        var elseifstart = juicer.tags.operationOpen + 'else if\\s*([^}]*?)' + juicer.tags.operationClose;
        var interpolate = juicer.tags.interpolateOpen + '([\\s\\S]+?)' + juicer.tags.interpolateClose;
        var noneencode = juicer.tags.noneencodeOpen + '([\\s\\S]+?)' + juicer.tags.noneencodeClose;
        var inlinecomment = juicer.tags.commentOpen + '[^}]*?' + juicer.tags.commentClose;
        var rangestart = juicer.tags.operationOpen + 'each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)' + juicer.tags.operationClose;
        var include = juicer.tags.operationOpen + 'include\\s*([^}]*?)\\s*,\\s*([^}]*?)' + juicer.tags.operationClose;

        juicer.settings.forstart = new RegExp(forstart, 'igm');
        juicer.settings.forend = new RegExp(forend, 'igm');
        juicer.settings.ifstart = new RegExp(ifstart, 'igm');
        juicer.settings.ifend = new RegExp(ifend, 'igm');
        juicer.settings.elsestart = new RegExp(elsestart, 'igm');
        juicer.settings.elseifstart = new RegExp(elseifstart, 'igm');
        juicer.settings.interpolate = new RegExp(interpolate, 'igm');
        juicer.settings.noneencode = new RegExp(noneencode, 'igm');
        juicer.settings.inlinecomment = new RegExp(inlinecomment, 'igm');
        juicer.settings.rangestart = new RegExp(rangestart, 'igm');
        juicer.settings.include = new RegExp(include, 'igm');
    };

    juicer.tagInit();

    // Using this method to set the options by given conf-name and conf-value,
    // you can also provide more than one key-value pair wrapped by an object.
    // this interface also used to custom the template tag delimater, for this
    // situation, the conf-name must begin with tag::, for example: juicer.set
    // ('tag::operationOpen', '{@').

    juicer.set = function(conf, value) {
        var that = this;

        var escapePattern = function(v) {
            return v.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function($) {
                return '\\' + $;
            });
        };

        var set = function(conf, value) {
            var tag = conf.match(/^tag::(.*)$/i);

            if(tag) {
                that.tags[tag[1]] = escapePattern(value);
                that.tagInit();
                return;
            }

            that.options[conf] = value;
        };

        if(arguments.length === 2) {
            set(conf, value);
            return;
        }

        if(conf === Object(conf)) {
            for(var i in conf) {
                if(conf.hasOwnProperty(i)) {
                    set(i, conf[i]);
                }
            }
        }
    };

    // Before you're using custom functions in your template like ${name | fnName},
    // you need to register this fn by juicer.register('fnName', fn).

    juicer.register = function(fname, fn) {
        var _method = this.options._method;

        if(_method.hasOwnProperty(fname)) {
            return false;
        }

        return _method[fname] = fn;
    };

    // remove the registered function in the memory by the provided function name.
    // for example: juicer.unregister('fnName').

    juicer.unregister = function(fname) {
        var _method = this.options._method;

        if(_method.hasOwnProperty(fname)) {
            return delete _method[fname];
        }
    };

    juicer.template = function(options) {
        var that = this;

        this.options = options;

        this.__interpolate = function(_name, _escape, options) {
            var _define = _name.split('|'), _fn = _define[0] || '', _cluster;

            if(_define.length > 1) {
                _name = _define.shift();
                _cluster = _define.shift().split(',');
                _fn = '_method.' + _cluster.shift() + '.call({}, ' + [_name].concat(_cluster) + ')';
            }

            return '<%= ' + (_escape ? '_method.__escapehtml.escaping' : '') + '(' +
                (!options || options.detection !== false ? '_method.__escapehtml.detection' : '') + '(' +
                _fn +
                ')' +
                ')' +
                ' %>';
        };

        this.__removeShell = function(tpl, options) {
            var _counter = 0;

            tpl = tpl
                // for expression
                .replace(juicer.settings.forstart, function($, _name, alias, key) {
                    var alias = alias || 'value', key = key && key.substr(1);
                    var _iterate = 'i' + _counter++;
                    return '<% ~function() {' +
                        'for(var ' + _iterate + ' in ' + _name + ') {' +
                        'if(' + _name + '.hasOwnProperty(' + _iterate + ')) {' +
                        'var ' + alias + '=' + _name + '[' + _iterate + '];' +
                        (key ? ('var ' + key + '=' + _iterate + ';') : '') +
                        ' %>';
                })
                .replace(juicer.settings.forend, '<% }}}(); %>')

                // if expression
                .replace(juicer.settings.ifstart, function($, condition) {
                    return '<% if(' + condition + ') { %>';
                })
                .replace(juicer.settings.ifend, '<% } %>')

                // else expression
                .replace(juicer.settings.elsestart, function($) {
                    return '<% } else { %>';
                })

                // else if expression
                .replace(juicer.settings.elseifstart, function($, condition) {
                    return '<% } else if(' + condition + ') { %>';
                })

                // interpolate without escape
                .replace(juicer.settings.noneencode, function($, _name) {
                    return that.__interpolate(_name, false, options);
                })

                // interpolate with escape
                .replace(juicer.settings.interpolate, function($, _name) {
                    return that.__interpolate(_name, true, options);
                })

                // clean up comments
                .replace(juicer.settings.inlinecomment, '')

                // range expression
                .replace(juicer.settings.rangestart, function($, _name, start, end) {
                    var _iterate = 'j' + _counter++;
                    return '<% ~function() {' +
                        'for(var ' + _iterate + '=' + start + ';' + _iterate + '<' + end + ';' + _iterate + '++) {{' +
                        'var ' + _name + '=' + _iterate + ';' +
                        ' %>';
                })

                // include sub-template
                .replace(juicer.settings.include, function($, tpl, data) {
                    return '<%= _method.__juicer(' + tpl + ', ' + data + '); %>';
                });

            // exception handling
            if(!options || options.errorhandling !== false) {
                tpl = '<% try { %>' + tpl;
                tpl += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';
            }

            return tpl;
        };

        this.__toNative = function(tpl, options) {
            return this.__convert(tpl, !options || options.strip);
        };

        this.__lexicalAnalyze = function(tpl) {
            var buffer = [];
            var method = [];
            var prefix = '';
            var reserved = [
                'if', 'each', '_', '_method', 'console',
                'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do',
                'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch',
                'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'null', 'typeof',
                'class', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface',
                'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'const', 'arguments',
                'true', 'false', 'undefined', 'NaN'
            ];

            var indexOf = function(array, item) {
                if (Array.prototype.indexOf && array.indexOf === Array.prototype.indexOf) {
                    return array.indexOf(item);
                }

                for(var i=0; i < array.length; i++) {
                    if(array[i] === item) return i;
                }

                return -1;
            };

            var variableAnalyze = function($, statement) {
                statement = statement.match(/\w+/igm)[0];

                if(indexOf(buffer, statement) === -1 && indexOf(reserved, statement) === -1 && indexOf(method, statement) === -1) {

                    // avoid re-declare native function, if not do this, template
                    // `{@if encodeURIComponent(name)}` could be throw undefined.

                    if(typeof(window) !== 'undefined' && typeof(window[statement]) === 'function' && window[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return $;
                    }

                    // compatible for node.js
                    if(typeof(global) !== 'undefined' && typeof(global[statement]) === 'function' && global[statement].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return $;
                    }

                    // avoid re-declare registered function, if not do this, template
                    // `{@if registered_func(name)}` could be throw undefined.

                    if(typeof(juicer.options._method[statement]) === 'function' || juicer.options._method.hasOwnProperty(statement)) {
                        method.push(statement);
                        return $;
                    }

                    buffer.push(statement); // fuck ie
                }

                return $;
            };

            tpl.replace(juicer.settings.forstart, variableAnalyze).
                replace(juicer.settings.interpolate, variableAnalyze).
                replace(juicer.settings.ifstart, variableAnalyze).
                replace(juicer.settings.elseifstart, variableAnalyze).
                replace(juicer.settings.include, variableAnalyze).
                replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/igm, variableAnalyze);

            for(var i = 0;i < buffer.length; i++) {
                prefix += 'var ' + buffer[i] + '=_.' + buffer[i] + ';';
            }

            for(var i = 0;i < method.length; i++) {
                prefix += 'var ' + method[i] + '=_method.' + method[i] + ';';
            }

            return '<% ' + prefix + ' %>';
        };

        this.__convert=function(tpl, strip) {
            var buffer = [].join('');

            buffer += "'use strict';"; // use strict mode
            buffer += "var _=_||{};";
            buffer += "var _out='';_out+='";

            if(strip !== false) {
                buffer += tpl
                    .replace(/\\/g, "\\\\")
                    .replace(/[\r\t\n]/g, " ")
                    .replace(/'(?=[^%]*%>)/g, "\t")
                    .split("'").join("\\'")
                    .split("\t").join("'")
                    .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
                    .split("<%").join("';")
                    .split("%>").join("_out+='")+
                    "';return _out;";

                return buffer;
            }

            buffer += tpl
                .replace(/\\/g, "\\\\")
                .replace(/[\r]/g, "\\r")
                .replace(/[\t]/g, "\\t")
                .replace(/[\n]/g, "\\n")
                .replace(/'(?=[^%]*%>)/g, "\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(/<%=(.+?)%>/g, "';_out+=$1;_out+='")
                .split("<%").join("';")
                .split("%>").join("_out+='")+
                "';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";

            return buffer;
        };

        this.parse = function(tpl, options) {
            var _that = this;

            if(!options || options.loose !== false) {
                tpl = this.__lexicalAnalyze(tpl) + tpl;
            }

            tpl = this.__removeShell(tpl, options);
            tpl = this.__toNative(tpl, options);

            this._render = new Function('_, _method', tpl);

            this.render = function(_, _method) {
                if(!_method || _method !== that.options._method) {
                    _method = __creator(_method, that.options._method);
                }

                return _that._render.call(this, _, _method);
            };

            return this;
        };
    };

    juicer.compile = function(tpl, options) {
        if(!options || options !== this.options) {
            options = __creator(options, this.options);
        }

        try {
            var engine = this.__cache[tpl] ?
                this.__cache[tpl] :
                new this.template(this.options).parse(tpl, options);

            if(!options || options.cache !== false) {
                this.__cache[tpl] = engine;
            }

            return engine;

        } catch(e) {
            __throw('Juicer Compile Exception: ' + e.message);

            return {
                render: function() {} // noop
            };
        }
    };

    juicer.to_html = function(tpl, data, options) {
        if(!options || options !== this.options) {
            options = __creator(options, this.options);
        }

        return this.compile(tpl, options).render(data, options._method);
    };


    lib.template = juicer;

})(window, window['lib'] || (window['lib'] = {}) );
/**
 * @desc    slide组件（支持translate3d）
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-05
 */

;(function (win, lib) {
    var $ = win['Zepto'] || win['$'],
        hasTransform = function () { // 判断浏览器是否支持transform（仅webkit）
            var ret = ('WebkitTransform' in document.documentElement.style) ? true : false;
            return ret;
        },
        has3d = function () { // 判断浏览器是否支持3d效果（仅webkit）
            var style,
                ret = false,
                div = document.createElement('div'),
                style = ['&#173;', '<style id="smodernizr">', '@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', '</style>'].join(''),
                mStyle = document.documentElement.style;
            div.id = 'modernizr';
            div.innerHTML += style;
            document.body.appendChild(div);
            if ('WebkitPerspective' in mStyle && 'webkitPerspective' in mStyle) {
                ret = (div.offsetLeft === 9 && div.offsetHeight === 3);
            }
            div.parentNode.removeChild(div);
            return ret;
        },

        gv1 = has3d ? 'translate3d(' : 'translate(',
        gv2 = has3d ? ',0)' : ')';

    var touchSlider = function (container, options) {
        if (!container) return null;
        if (options) options.container = container; //container会覆盖options内的container
        else options = typeof container == 'string' ? {'container': container} : container;
        $.extend(this, {
            container: ".slider",  //大容器，包含面板元素、触发元素、上下页等
            wrap: null,  //滑动显示区域，默认为container的第一个子元素。（该元素固定宽高overflow为hidden，否则无法滑动）
            panel: null,  //面板元素，默认为wrap的第一个子元素
            trigger: null,   //触发元素，也可理解为状态元素
            activeTriggerCls: 'sel',  //触发元素内子元素的激活样式
            hasTrigger: false,  //是否需要触发事件，例tab页签就需要click触发
            steps: 0,  //步长，每次滑动的距离
            left: 0,  //panel初始的x坐标
            visible: 1,  //每次滑动几个panels，默认1
            margin: 0,  //面板元素内子元素间的间距
            curIndex: 0,  //初始化在哪个panels上，默认0为第一个
            duration: 300,  //动画持续时间
            //easing : 'ease-out', //动画公式
            loop: false,  //动画循环
            play: false,  //动画自动播放
            interval: 5000,  //播放间隔时间，play为true时才有效
            useTransform: has3d ? true : false, //以translate方式动画，安卓现在也支持了

            lazy: '.lazyimg', //图片延时加载属性
            lazyIndex: 1,  //默认加载到第几屏
            callback: null, //动画结束后触发

            fullScreen: 0, //全屏支持 如果开启全屏 css中设置的宽度将失效
            sizeRadio: 120/320, //只有开启fullScreen 此项配置才生效 图片比例 高／宽

            prev: null,  //上一页
            next: null,  //下一页
            activePnCls: 'none'  //prev和next在头尾时的样式
        }, options);

        this.findEl() && this.resetToFullScreen() && this.init() && this.increaseEvent();
    };
    $.extend(touchSlider.prototype, {
        reset: function (options) {
            if (this.loop) {
                this._oldLoop = true;  //保存之前的值，init需要处理
            }
            $.extend(this, options || {});
            this.init();
        },
        findEl: function () {
            var container = this.container = $(this.container);
            if (!container.length) {
                return null;
            }

            this.wrap = this.wrap && container.find(this.wrap) || container.children().first();
            if (!this.wrap.length) {
                return null;
            }

            this.panel = this.panel && container.find(this.panel) || this.wrap.children().first();
            if (!this.panel.length) {
                return null;
            }

            this.panels = this.panel.children();
            if (!this.panels.length) {  //对于没有图片的元素，直接隐藏
                this.container.hide();
                return null;
            }

            this.trigger = this.trigger && container.find(this.trigger);
            this.prev = this.prev && container.find(this.prev);
            this.next = this.next && container.find(this.next);

            return this;
        },

        resetToFullScreen: function () {

            if (this.fullScreen) {
                $(this.container).css('display','none');
                $(this.panel).children('li').css('width', document.body.clientWidth);
                $(this.panel).css('width', document.body.clientWidth * $(this.panel).children('li').length);
                $(this.wrap).css('width', '100%');
                //根据图片比例缩放
                $(this.wrap).css('height', document.body.clientWidth * this.sizeRadio);
                $(this.container).css('height',document.body.clientWidth * this.sizeRadio);
                $(this.container).css('display','block');
            }

            return this;

        },

        init: function () {
            var wrap = this.wrap,
                panel = this.panel,
                panels = this.panels,
                trigger = this.trigger,
                len = this.len = panels.length,  //子元素的个数
                margin = this.margin,
                allWidth = 0,  //滑动容器的宽度
                status = this.visible,  //每次切换多少个panels
                useTransform = this.useTransform = hasTransform ? this.useTransform : false;  //不支持直接false

            this.steps = this.steps || wrap.width();  //滑动步长，默认wrap的宽度
            panels.each(function (n, item) {
                allWidth += item.offsetWidth;
            });

            if (margin && typeof margin == 'number') {
                allWidth += (len - 1) * margin;  //总宽度增加
                this.steps += margin;  //步长增加margin
            }

            if (status > 1) {
                this.loop = false;
            }  //如果一页显示的子元素超出1个，或设置了步长，则不支持循环；若自动播放，则只支持一次

            //初始位置为了计算卡片内偏移
            var initLeft = this.left;
            initLeft -= this.curIndex * this.steps;
            this.setCoord(panel, initLeft);
            if (useTransform) {
                if (has3d) {
                    wrap.css({'-webkit-transform': 'translateZ(0)'});  //防止ios6下滑动会有顿感
                }
                panel.css({'-webkit-backface-visibility': 'hidden'});
                //panels.css({'-webkit-transform':gv1+'0,0'+gv2});
            }

            var pages = this._pages = Math.ceil(len / status);  //总页数
            //初始坐标参数
            this._minpage = 0;  //最小页
            this._maxpage = this._pages - 1;  //最大页

            this.loadImg();
            this.updateArrow();
            if (pages <= 1) { //如果没超出一页，则不需要滑动
                this.getImg(panels[0]);  //存在一页的则显示第一页
                trigger && trigger.hide();
                return null;
            }

            if (this._oldLoop) {  //之前已经复制过的删除
                var oldpanels = panel.children();
                oldpanels.eq(oldpanels.length - 2).remove();
                oldpanels.eq(oldpanels.length - 1).remove();
            }
            if (this.loop) {  //复制首尾以便循环
                panel.append(panels[0].cloneNode(true));
                var lastp = panels[len - 1].cloneNode(true);
                panel.append(lastp);
                this.getImg(lastp);
                lastp.style.cssText += 'position:relative;left:' + (-this.steps * (len + 2)) + 'px;';
                allWidth += panels[0].offsetWidth;
                allWidth += panels[len - 1].offsetWidth;
            }
            panel.css('width', allWidth);
            if (trigger && trigger.length) {  //如果触发容器存在，触发容器无子元素则添加子元素
                var temp = '',
                    childstu = trigger.children();
                if (!childstu.length) {
                    for (var i = 0; i < pages; i++) {
                        temp += '<span' + (i == this.curIndex ? " class=" + this.activeTriggerCls + "" : "") + '></span>';
                    }
                    trigger.html(temp);
                }
                this.triggers = trigger.children();
                this.triggerSel = this.triggers[this.curIndex];  //当前状态元素
            }
            else {
                this.hasTrigger = false;
            }
            this.slideTo(this.curIndex);

            return this;
        },
        increaseEvent: function () {
            var that = this,
                _panel = that.wrap[0],  //外层容器
                prev = that.prev,
                next = that.next,
                triggers = that.triggers;
            if (_panel.addEventListener) {
                _panel.addEventListener('touchstart', that, false);
                _panel.addEventListener('touchmove', that, false);
                _panel.addEventListener('touchend', that, false);
                _panel.addEventListener('webkitTransitionEnd', that, false);
                _panel.addEventListener('msTransitionEnd', that, false);
                _panel.addEventListener('oTransitionEnd', that, false);
                _panel.addEventListener('transitionend', that, false);
            }
            if (that.play) {
                that.begin();
            }
            if (prev && prev.length) {
                prev.on('click', function (e) {
                    that.backward.call(that, e)
                });
            }
            if (next && next.length) {
                next.on('click', function (e) {
                    that.forward.call(that, e)
                });
            }
            if (that.hasTrigger && triggers) {
                triggers.each(function (n, item) {
                    $(item).on('click', function () {
                        that.slideTo(n);
                    });
                });
            }
        },
        handleEvent: function (e) {
            switch (e.type) {
                case 'touchstart':
                    this.start(e);
                    break;
                case 'touchmove':
                    this.move(e);
                    break;
                case 'touchend':
                case 'touchcancel':
                    this.end(e);
                    break;
                case 'webkitTransitionEnd':
                case 'msTransitionEnd':
                case 'oTransitionEnd':
                case 'transitionend':
                    this.transitionEnd(e);
                    break;
            }
        },
        loadImg: function (n) {  //判断加载哪屏图片
            n = n || 0;
            //不考虑循环时候复制的元素
            if (n < this._minpage) n = this._maxpage;
            else if (n > this._maxpage) n = this._minpage;

            var status = this.visible,
                lazyIndex = this.lazyIndex - 1,
                maxIndex = lazyIndex + n;
            if (maxIndex > this._maxpage) return;
            maxIndex += 1;  //补上,for里判断没有=
            var start = (n && (lazyIndex + n) || n) * status,
                end = maxIndex * status,
                panels = this.panels;
            end = Math.min(panels.length, end);
            for (var i = start; i < end; i++) {
                this.getImg(panels[i]);
            }
        },
        getImg: function (obj) {  //加载图片
            if (!obj) return;
            obj = $(obj);
            if (obj.attr('l')) {
                return;
            }  //已加载
            var that = this,
                lazy = that.lazy,
                cls = 'img' + lazy;
            lazy = lazy.replace(/^\.|#/g, '');
            obj.find(cls).each(function (n, item) {
                var nobj = $(item);
                src = nobj.attr('dataimg');
                if (src) {
                    nobj.attr('src', src).removeAttr('dataimg').removeClass(lazy);
                }
            });
            obj.attr('l', '1');
        },
        start: function (e) {  //触摸开始
            var et = e.touches[0];
            //if(this._isScroll){return;}  //滑动未停止，则返回
            this._movestart = undefined;
            this._disX = 0;
            this._coord = {
                x: et.pageX,
                y: et.pageY
            };
        },
        move: function (e) {
            if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
            var et = e.touches[0],
                disX = this._disX = et.pageX - this._coord.x,
                initLeft = this.left,
                tmleft;
            if (typeof this._movestart == 'undefined') {  //第一次执行touchmove
                this._movestart = !!(this._movestart || Math.abs(disX) < Math.abs(et.pageY - this._coord.y));
            }
            if (!this._movestart) { //不是上下
                e.preventDefault();
                this.stop();
                if (!this.loop) {  //不循环
                    disX = disX / ( (!this.curIndex && disX > 0 || this.curIndex == this._maxpage && disX < 0 ) ? ( Math.abs(disX) / this.steps + 1 ) : 1 );  //增加阻力
                }
                tmleft = initLeft - this.curIndex * this.steps + disX;
                this.setCoord(this.panel, tmleft);
                this._disX = disX;
                //this._left = tmleft;
            }
        },
        end: function (e) {
            if (!this._movestart) {  //如果执行了move
                var distance = this._disX;
                if (distance < -10) {
                    e.preventDefault();
                    this.forward();
                } else if (distance > 10) {
                    e.preventDefault();
                    this.backward();
                }
                distance = null;
            }
        },
        backward: function (e) {
            if (e && e.preventDefault) {
                e.preventDefault()
            }
            var cur = this.curIndex,
                minp = this._minpage;
            cur -= 1;
            if (cur < minp) {
                if (!this.loop) {
                    cur = minp;
                }
                else {
                    cur = minp - 1;
                }
            }
            this.slideTo(cur);
            this.callback && this.callback(Math.max(cur, minp), -1);
        },
        forward: function (e) {
            if (e && e.preventDefault) {
                e.preventDefault()
            }
            var cur = this.curIndex,
                maxp = this._maxpage;
            cur += 1;
            if (cur > maxp) {
                if (!this.loop) {
                    cur = maxp;
                }
                else {
                    cur = maxp + 1;
                }
            }
            this.slideTo(cur);
            this.callback && this.callback(Math.min(cur, maxp), 1);
        },
        setCoord: function (obj, x) {
            this.useTransform && obj.css("-webkit-transform", gv1 + x + 'px,0' + gv2) || obj.css("left", x);
        },
        slideTo: function (cur, duration) {
            cur = cur || 0;
            this.curIndex = cur;  //保存当前屏数
            var panel = this.panel,
                style = panel[0].style,
                scrollx = this.left - cur * this.steps;
            style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = (duration || this.duration) + 'ms';
            this.setCoord(panel, scrollx);
            this.loadImg(cur);
        },
        transitionEnd: function () {
            var panel = this.panel,
                style = panel[0].style,
                loop = this.loop,
                cur = this.curIndex;
            if (loop) {  //把curIndex和坐标重置
                if (cur > this._maxpage) {
                    this.curIndex = 0;
                } else if (cur < this._minpage) {
                    this.curIndex = this._maxpage;
                }
                this.setCoord(panel, this.left - this.curIndex * this.steps);
            }
            if (!loop && cur == this._maxpage) {  //不循环的，只播放一次
                this.stop();
                this.play = false;
            }
            else {
                this.begin();
            }
            this.update();
            this.updateArrow();
            style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = 0;
            //this._isScroll = false;
        },
        update: function () {
            var triggers = this.triggers,
                cls = this.activeTriggerCls,
                curIndex = this.curIndex;
            if (triggers && triggers[curIndex]) {
                this.triggerSel && (this.triggerSel.className = '');
                triggers[curIndex].className = cls;
                this.triggerSel = triggers[curIndex];
            }
        },
        updateArrow: function () {  //左右箭头状态
            var prev = this.prev,
                next = this.next;
            if (!prev || !prev.length || !next || !next.length) return;
            if (this.loop) return;  //循环不需要隐藏
            var cur = this.curIndex,
                cls = this.activePnCls;
            cur <= 0 && prev.addClass(cls) || prev.removeClass(cls);
            cur >= this._maxpage && next.addClass(cls) || next.removeClass(cls);
        },
        begin: function () {
            var that = this;
            if (that.play && !that._playTimer) {  //自动播放
                that.stop();
                that._playTimer = setInterval(function () {
                    that.forward();
                }, that.interval);
            }
        },
        stop: function () {
            var that = this;
            if (that.play && that._playTimer) {
                clearInterval(that._playTimer);
                that._playTimer = null;
            }
        },
        destroy: function () {
            var that = this,
                _panel = that.wrap[0],
                prev = that.prev,
                next = that.next,
                triggers = that.triggers;
            if (_panel.removeEventListener) {
                _panel.removeEventListener('touchstart', that, false);
                _panel.removeEventListener('touchmove', that, false);
                _panel.removeEventListener('touchend', that, false);
                _panel.removeEventListener('webkitTransitionEnd', that, false);
                _panel.removeEventListener('msTransitionEnd', that, false);
                _panel.removeEventListener('oTransitionEnd', that, false);
                _panel.removeEventListener('transitionend', that, false);
            }
            if (prev && prev.length) prev.off('click');
            if (next && next.length) next.off('click');
            if (that.hasTrigger && triggers) {
                triggers.each(function (n, item) {
                    $(item).off('click');
                });
            }
        },


        attachTo: function (obj, options) {
            obj = $(obj);
            return obj.each(function (n, item) {
                if (!item.getAttribute('l')) {
                    item.setAttribute('l', true);
                    touchSlider.cache.push(new touchSlider(item, options));
                }
            });
        }
    });
    touchSlider.cache = [];

    touchSlider.destroy = function () {
        var cache = touchSlider.cache,
            len = cache.length;
        if (len < 1) {
            return;
        }
        for (var i = 0; i < len; i++) {
            cache[i].destroy();
        }
        touchSlider.cache = [];
    };

    lib.slider = touchSlider;
})(window, window['lib'] || (window['lib'] = {}))

/**
 * @desc    图片延迟加载插件
 * @author  贺晨超 <earlyhe0@gmail.com>
 * @date    2014-08-06
 */

;(function(window, lib){

    // default config
    var defaultConfig = {

        placeholder : 'http://h5.ve.cn/assets/img/blank.png',

        initload : true,

        // 'scroll' or 'click'
        event : 'scroll',

        // 'click' or 'tap'
        defaultTap : 'click',

        // px 
        threshold : 50,

        originImgAttr : 'data-src',

        markAttr : 'use-lazyload'

    };

    lib.lazyload = function( config ){
        
        var cf = $.extend( {}, defaultConfig, config ),
            $t, len, img,
            scrollTop = 0, $win = $(window), screenHeight = $win.height(), cantTrigger = false,
            loadedImg = [], watingImg = [];

        var scrollLoadImg = function(){
            
            scrollTop = $win.scrollTop();
            len = watingImg.length;

            for ( ; len--; ) {

                img = watingImg[len];
                if ( img.showTop <= scrollTop+screenHeight && scrollTop <= img.showBottom ) {
                    img.$img.attr( 'src', img.oriImg );
                    watingImg.splice( len, 1 );
                    loadedImg.push(img);
                }

            }

        };

        var clickLoadImg = function( ev ){

            $t = $(this);

            len = watingImg.length;

            for ( ; len--; ) {

                img = watingImg[len];
                if ( $t[0] === img.$img[0] ) {
                    $t.attr( 'src', img.oriImg );
                    watingImg.splice( len, 1 );
                    loadedImg.push(img);
                }

            }
            
            $t.off('click', clickLoadImg);

        };

        var getLazyImg = function(){

            var $imgs = $('['+cf.markAttr+']');
            
            // get lazylog img list
            $imgs.each(function(){
            
                $t = $(this);

                if ( cf.placeholder !== null ) {
                    $t.attr('src', cf.placeholder);
                }

                var info = {
                    $img : $t,
                    oriImg : $t.attr( cf.originImgAttr )
                };

                if ( cf.event === 'scroll' ) {
                    info.showTop = $t.offset().top - cf.threshold;
                    info.showBottom = $t.offset().top + $t.height() + cf.threshold;
                }

                watingImg.push(info);
                $t.removeAttr( cf.markAttr ).removeAttr( cf.originImgAttr );

                if ( cf.event === 'click' ) {
                    $t.on('click', clickLoadImg);
                }

            });

        };

        // init
        getLazyImg();

        // first load img
        if ( cf.initload && cf.event === 'scroll' ) {
            setTimeout(function(){
                scrollLoadImg();
            });
        } 
        
        if ( cf.event === 'scroll' ) {
            $(window).on('scroll', scrollLoadImg);
        }

        return {

            getLazyImg : getLazyImg,
            scrollLoadImg : scrollLoadImg,
            loadedImg : loadedImg,
            watingImg : watingImg

        };

    };

    lib.lazyload = lib.lazyload || lazyload;

})(window, window.lib || (window.lib = {}));
/**
 * @desc    弹出层组件
 * @author  贺晨超 <earlyhe0@gmail.com>
 * @date    2014-09-17
 */

;(function(window, lib){

    // default config
    var defaultConfig = {

        content : '',

        size : 'auto',

        background : '#fff',

        opacity : 1,

        mask : false,

        maskOpacity : 0.7,

        position : 'center',

        radius : 8,

        offset : {
            left : 0,
            top: 0
        },

        closeTime : 0,

        action : false,

        actionConfig : [],

        // todo
        closeBtn : true,
        // 

        mainStyle : {
            'display' : 'inline-block',
            'overflow' : 'auto',
            'max-width' : '80%',
            'max-height' : '80%'
        }

    };

    lib.popup = function( content, config ){

        var cf = $.extend( true, {}, defaultConfig, config );

        cf.content = content || cf.content;

        // 初始化html
        var $mask = $('<div></div>').addClass('popup-mask'),
            $main = $('<div></div>').addClass('popup-main'),
            $content = $('<div></div>').addClass('popup-content');

        // 构建初步的样式
        $mask.css({
            'position' : 'fixed',
            'left' : 0,
            'top' : 0,
            'width' : '100%',
            'height' : '100%',
            'background' : 'rgba( 0, 0, 0, ' + cf.maskOpacity + ')',
        });

        // config.mainStyle
        cf.mainStyle['border-radius'] = cf.radius + 'px';
        cf.mainStyle['background'] = 'rgba(' + cf.background.colorRgb() + ',' + cf.opacity + ' )';
        $main.css(cf.mainStyle);

        $mask.append($main);
        $main.append($content);

        // config.mask
        if ( cf.mask === false ) {
            $mask.css({
                'background' : 'rgba(0,0,0,0)',
                'pointer-events' : 'none'
            });
        }

        // config.content
        $content.html( cf.content );

        // config.size
        if ( typeof cf.size === 'object' ) {
            
            $main.css({
                'width' : cf.size.width,
                'height' : cf.size.height
            });

        }

        // config.action
        if ( cf.action === true && cf.actionConfig.length > 0 ) {

            var $action = $('<div></div>').addClass('popup-action'),
                $actionBtn = $('<a></a>').addClass('popup-action-btn'),
                defaultAction = {
                    text : '',
                    callback : function(){}
                };

            $main.append($action);
            $actionBtn.css({
                'width' : 100/cf.actionConfig.length + '%',
                'text-align' : 'center',
                'font-size' : '0.875rem',
                'color' : '#0d81ff',
                'display' : 'inline-block',
                'text-decoration' : 'none',
                'border-top' : '1px #eee solid',
                'padding' : '0.625rem 0'
            });

            for ( var k in cf.actionConfig ) {

                var $t = $actionBtn.clone(),
                    acf = $.extend( {}, defaultAction, cf.actionConfig[k]);
                    
                $t
                .html( acf.text )
                .on('click', {
                    acf : acf
                }, function(ev){
                    ev.data.acf.callback(); 
                });

                if ( k < cf.actionConfig.length-1 ) {
                    $t.css({
                        'box-sizing' : 'border-box',
                        'border-right' : '1px #eee solid'
                    });
                }

                $action.append($t);

            }

        } 

        // 插入popbox
        $('body').append( $mask ); 

        // 定位&偏移
        if ( cf.position === 'center' ) {
            $main.css({
                'position' : 'absolute',
                'top' : '50%',
                'left' : '50%',
                'margin-left' : - $main.width()/2 + cf.offset.left,
                'margin-top' : - $main.height()/2 + cf.offset.top
            });
        } else if ( cf.position === 'top' ) {
            $main.css({
                'position' : 'absolute',
                'top' : '5%',
                'left' : '50%',
                'margin-left' : - $main.width()/2 + cf.offset.left,
                'margin-top' : cf.offset.top
            });
        } else if ( cf.position === 'bottom' ) {
            $main.css({
                'position' : 'absolute',
                'top' : '95%',
                'left' : '50%',
                'margin-left' : - $main.width()/2 + cf.offset.left,
                'margin-top' : - $main.height() + cf.offset.top
            });
        }

        // config.closeTime
        if ( cf.closeTime !== 0 ) {
            setTimeout(function(){
                method.fadeOut(function(){
                    method.remove();
                });
            }, cf.closeTime);
        }

        var method = {

            $mask : $mask,

            $main : $main,

            $contnet : $content,

            show : function(){
                this.$mask.show();
                return this;
            },

            hide : function(){
                this.$mask.hide();
                return this;
            },

            fadeOut : function( callback ){
                var self = this;
                var fadeOut = function( a, b ){
                    a -= b;
                    self.$mask.css('opacity', a/200);
                    setTimeout(function(){
                        fadeOut(a,b);
                    }, b);
                    if ( a === 0 ) {
                        callback();
                    }
                };
                fadeOut(200, 20);
            },

            remove : function(){
                this.$mask.remove();
                return this;
            }

        };

        return method;

    };

    lib.popup.loading = function( config ){
        
        config = $.extend( true, {}, {

            mainStyle : {
                'padding' : '.375rem .5rem'
            },
            mask : false,
            opacity : 0.5,
            radius : 5,
            background : '#000'

        }, config);

        return lib.popup( '<p style="color:#fff;font-size:0.8rem;margin:0">请稍后...</p>', config );

    };

    lib.popup.note = function( text, config ){

        var defaultCfg = {

            mainStyle : {
                'padding' : '.375rem .5rem'
            },
            mask : false,
            opacity : 0.5,
            radius : 5,
            closeTime : 2000,
            background : '#000'

        };

        if ( typeof config === 'number' ) {
            config = $.extend( true, {}, defaultCfg, {closeTime:config});
        } else {
            config = $.extend( true, {}, defaultCfg, config);
        }

        

        return lib.popup( '<div style="color:#fff;font-size:0.8rem;margin:0">'+text+'</div>', config );

    };

    lib.popup.confirm = function(text,confirmCallback,cancelCallback,config){
        
        config = $.extend( true, {}, {

            mainStyle : {
                width : '70%'
            },
            mask : true,
            radius : 10,
            action : true,
            actionConfig : [
                {
                    text : '取消',
                    callback : function(){
                        re.remove();
                        cancelCallback.apply(re);
                    }
                },
                {
                    text : '确认',
                    callback : function(){
                        re.remove();
                        confirmCallback.apply(re);
                    }
                }

            ]

        }, config);

        var re = lib.popup( '<div style="padding:1rem;text-align:center;font-size:0.75rem;">'+text+'</div>', config );

        return re;

    };

    lib.popup.alert = function( text, config ){
        
        config = $.extend( true, {}, {

            mainStyle : {
                width : '70%'
            },
            radius : 10,
            mask : true,
            action : true,
            actionConfig : [
                {
                    text : '了解',
                    callback : function(){
                        re.remove();
                    }
                }
            ]

        }, config);

        var re = lib.popup( '<div style="padding:1rem;text-align:center;font-size: 0.75rem;">'+text+'</div>', config );

        return re;

    };

    // rgb转换函数
    String.prototype.colorRgb = function(){
        var sColor = this.toLowerCase();
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
            }
            return sColorChange.join(",");
        }else{
            return sColor;  
        }
    };

    lib.popup = lib.popup || popup;

})(window, window.lib || (window.lib = {}));
/**
 * @desc    工具条
 * @author  Xaber - 曾瑞想 - xaber@foxmail.com
 * @note    相应css html 字符串见 lib\veryjs\lib-toolbar\test\demo-1.html
 * @date    2014-09-17
 */

;
(function (win, lib) {
    var $ = win.Zepto || win.$,
    // imgHomeBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDAwMjQ2QjYzRTJCMTFFNDhDNjM4MENFQ0VFOUFFNzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDAwMjQ2QjczRTJCMTFFNDhDNjM4MENFQ0VFOUFFNzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MDAyNDZCNDNFMkIxMUU0OEM2MzgwQ0VDRUU5QUU3OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MDAyNDZCNTNFMkIxMUU0OEM2MzgwQ0VDRUU5QUU3OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp8Su2EAAAFTUExURQAAAP///+7u7gEBATAwMEtLS2lpaaurqzw8PPf391paWsPDw0FBQcbGxg8PDx0dHQ4ODmpqauPj42tra7i4uGxsbFBQUE9PTzU1NQYGBhwcHNbW1h4eHtLS0vz8/EJCQpaWljc3N7q6ulVVVfPz821tbTY2NgcHBzo6OgMDA+Dg4MXFxfb29u/v7+Li4hsbG3t7e+vr61FRUczMzNnZ2TIyMujo6BoaGvDw8Pn5+QgICNjY2Pv7+4yMjOfn57S0tBYWFhAQEKmpqaysrJubm/7+/omJifj4+CUlJZ6enuTk5PT09Nra2tDQ0BQUFKSkpDMzMwICAhISEkZGRiYmJubm5pGRkQoKCsnJya+vr+np6V1dXSkpKV9fX8vLy0NDQ4iIiIKCgkVFRc7OzgQEBKWlpS8vL35+ftzc3EpKSg0NDSMjI8fHx1NTU7m5ue3t7f////sKwrMAAABxdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AKUzAZQAAAclJREFUeNqclFdDwjAUhe8NSK20LBmiCCqIbFRw77333nvP//9khbZJWsBxnk5uvock9+bAJysy44vkHeDIR3wC4XaA8V5/F1B1BbwVObkJjGqSTZzotoBZFrfIczkrVJY1x3ItTqgmZwvlPM1QXc0ejROtUEtWUeUaufLB0XmIBxvL3Ct30yk74l4ff2u5xHHvNnmDY1ExVseB7d+cl62ERrAbINETtnFgh8L5mfVuaq502MVVnGdP4/8EEqTL+/7Rk7JbT+P0MN0IEhDoKpFdCGh+WED7Nt0SoFP31yuxCN3ZGsPii77qBEmzvUMf7fyzhY/1ggRaZ8/CeMWPTHIDM9o5QuBS3SAi8hMYUSrjqnfp1c3oLNZzXB3uR2ljKGkzcQ0M5TRwb95CQb47NXAhet8ydzsUJv0enDBwEvN+Jc6BS4pdths4H9MPlWtTbKuRE5j+1uCU/tJ5sWGC4y4o52fnrxcHCcmWuVFCSAx32PnT5zl5WSQ9j4dPin1YS5HsSHdS3YmX5l62QG1Z0pX+m1lu9V9mfvi/mT/mwa/zpVZepf6Vf995Gjdh8XTFfO4IsPkcDLxXyXEl7wWfNOCC5wHJmPdfAgwAWP2dewuZUKEAAAAASUVORK5CYII=',
    // imgBuyBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUNCMTg5QzczRTJCMTFFNDhEREFGNDc3RTZCRTA2RDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUNCMTg5QzgzRTJCMTFFNDhEREFGNDc3RTZCRTA2RDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1Q0IxODlDNTNFMkIxMUU0OEREQUY0NzdFNkJFMDZEMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1Q0IxODlDNjNFMkIxMUU0OEREQUY0NzdFNkJFMDZEMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhZbQZUAAAE1UExURQAAAP///1BQUKCgoCAgIBAQEHBwcLCwsAEBATAwMO7u7vf396urq0FBQcbGxh0dHQcHBwYGBjU1NWxsbGpqarq6ug4ODri4uNbW1hwcHBoaGs3NzePj409PT/b29mtra6ioqPHx8TY2NhsbGwMDA21tbeLi4gkJCefn5/T09B4eHunp6UJCQuDg4FNTU0VFRZ+fn8XFxQ8PD6Ojo9LS0qmpqUNDQ15eXsvLyw0NDS8vLyEhIQQEBIuLiygoKMLCwvz8/EpKSqenpxUVFXd3d/7+/nFxcQsLCz09PSsrK/v7+4ODg+/v7ykpKd7e3r29vezs7KysrJubm4yMjLW1tbm5uZ2dne3t7ZiYmHJycsfHx1dXV5CQkDc3N/j4+GhoaGZmZpWVlVFRUdHR0QICAlZWVv///8AS+V8AAABndFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAUFrp4AAABqUlEQVR42pyU1XqDQBCFZ1NDAiHuLo1b3d3d3du8/yMUguxAQirn6uw3PyzszB7oYHFn3mq2De1s1evkTBVAPuiQgEqKB/tyoges8og9HO9joFeMjzdzBRb6iy1gLuQCO7lClIuFwV7hmM7xLAwSy2tcEgYrqXL3zA8cI3Y55dwqW4e16Jcd+KRwQcUtnUSPid/2jX6Zc2g+xxdtOUcHOLe+iJL1IYvutJKbA6fxUJP0qKTXnJA3uG1yMGzSC0nptTwIBjdNmuavmiB13QpAO7tBoiZMSpfGdV+GAC0Un3OYq9NtMSWfEjnCyxR5RytEXhBxDCmRlhCFJm/GcipvtFRG/wssuRzBQrsK6PzAvVoZxXql+3pRPwA+LBs3gPaD9hcg4jCp8Qm0v8a8KNqZN06WWY6Y5kWdP+1ep8npnmoXVwjZNM1fh+bAlPxN56pdky2vtyfTnXvRuB/XcvFRtbuy5bQC07Lct4VJMpvV/O3+zYNmfdq9TPxwfxN/zINf58ugvKr9K/+UPM30YJlW33z2x3E+u+NXNjku573TK0QCMBcRrHn/LcAA6JuLhBMhWB0AAAAASUVORK5CYII=',
    // imgUserBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODA2NDBEQ0MzRTJCMTFFNEJBN0JFNkQ1NjcyQjJBMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODA2NDBEQ0QzRTJCMTFFNEJBN0JFNkQ1NjcyQjJBMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MDY0MERDQTNFMkIxMUU0QkE3QkU2RDU2NzJCMkEyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MDY0MERDQjNFMkIxMUU0QkE3QkU2RDU2NzJCMkEyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl3CrwYAAAGAUExURQAAAAoKCgwMDBUVFREREQQEBAICAv////7+/v39/cbGxu7u7gEBAQYGBjAwMPz8/BwcHIeHh6urq1BQUNbW1vf39x4eHh0dHUFBQQcHBxMTE2xsbO/v7yoqKuLi4pmZmcfHx7OzszU1NWpqauPj4w4ODn9/f+Hh4XJycr29vZCQkGBgYLq6uri4uICAgNDQ0Le3tzIyMufn55WVlZiYmMjIyK2trXNzc09PTzw8PHh4eGtra2RkZPb29sXFxYGBgW1tbTY2NhoaGhsbG3Z2dtjY2J+fn3BwcHFxcQ8PDxISEs/Pz+Dg4Lm5uZ6enqysrImJiUJCQu3t7Tc3N7u7u93d3WNjY+np6dHR0dLS0sDAwKenp9TU1IKCgvDw8JOTkywsLFVVVZ2dnVlZWUxMTH19ferq6jMzM6Ojozg4OIaGhsTExKioqN/f387OzvLy8vn5+fr6+vPz89zc3FJSUo+PjxgYGF9fX2VlZTs7O6KiokBAQE5OTkpKSklJSf///4KePEgAAACAdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AOAVLZwAAAlFJREFUeNqcVGdXIlEMDSibmaEMXZSuYAUbFiyggLprr9t7771X/7pD8p4ztD17Nh9IyNzz3ktyc+HUas796GFtEzZrh1G/s+ELWOJ8oBdM6y3m2+K0fmi2fq0FFxpwQau5BkKNuIQH2psnYcUFe6CT9QRNXMYrs+Hh9JCK6lB6OCxT3ozEheSl8TlFmUguXlxMTijKXFxeHRK4Jf7vWNGPBuXJ3sEjfcXB8RLjUlypbRI3tiwP29rASRtXrRGO++YeUZebSlhWR9wUHNdxeU6O4hj5vrVXuw/uX6B4DEf5Y87ABShawAL5e1eV7ZME5niCBfxOPnAKTj56dtpOtay/Nsp0fVV9lLVPz/KjnOCnYArnyRfxD/m9D3zgPE6R98MqeZ/ex/4d9+ITPuXX6nzwKkTIpzR+8F5GMAUfcaClyEWAJxubEelbYjJ4iYOZGM8TsuRxnNMf33Rx+e9fcGIcyWVFSyUuoBxQ2cGdagNOIuW98EP/afx+xl/QcG9WvE/WAd2XywBfMClnJ+oIi3plX8B+7SVADX0CJvsSEf0TfY7ffaLU5/gMt9ds1j5HxTx4bscl583nVMeVG/p1mzk3AyXmSzzQEl3npPpd72ABF+R8BV/qvOrG2xb2rZ+YvAqY/DN4+hgfWnD7wXOeEv8En+u8x28WXPqO5D1UiPeaUALHgRqz7NFbVe6Rq9ywb532EgbEXpZM0Wiz5+AptepBGzP14J/15W96tfNf+lfX00oLrFJuq8+5olWf3cXdDjpu6L0/GqlmwV6NNOv9mQADAOGHyADwhb1jAAAAAElFTkSuQmCC',
    // imgMainBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkQ4MDY1MUYzRTJCMTFFNDlDNzFEODY3NTUwMUMyN0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkQ4MDY1MjAzRTJCMTFFNDlDNzFEODY3NTUwMUMyN0YiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRDgwNjUxRDNFMkIxMUU0OUM3MUQ4Njc1NTAxQzI3RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRDgwNjUxRTNFMkIxMUU0OUM3MUQ4Njc1NTAxQzI3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmNoxb4AAAB1UExURf9Kev/////z9v9Le/9sk/9wlv/D0/9fif94nP/5+//X4f9Ugf+DpP+Xsv+Vsf/N2v9Off9eif/r8P/i6v+Co/+Xs/+Wsv/O2//q8P9Pfv9fiv9diP95nP/5+v9Vgv9ciP/W4f/E1P/p7/9Tgf9xl//X4v///6c05HUAAAAndFJOU///////////////////////////////////////////////////AINWl9kAAADuSURBVHjanJTZEoIwEASH+wwgcqigePL/n6giFuEenScq25UiyW6jlqNeRFmccCpKYaq9CqTv0N+jyz4JJznXwDCGO+KcQMM4WuD0uZ2O6eg7mdtamIu17bh4g/ls4i/n6FiK7rRc1l9XFKW/kH24h7bCaW7DDe9txOH+5kKscshfnE9wfg01IrhIhQmCe1EpxaWwKc6GRXEHeF11Km3Vk3dZ4EDvx/4fe17u/gT9Huz7sv1C9x/Rz0bT9+7qfJy5eQvauTyuzO/xRx/Qflny1fUv/8349Dzp5zyR/RzN+LnxvSnsysOtsoe+fwowAGuFL+jvIfa7AAAAAElFTkSuQmCC';
        toolbarStyle = "<style>.toolbar{position:fixed;bottom:.5rem;left:.5rem;width:2rem;height:2rem;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;}.toolbar a{position:absolute;width:2rem;height:2rem;-webkit-background-size:60% 60%;-moz-background-size:60% 60%;-o-background-size:60% 60%;background-size:60% 60%;-webkit-transition:-webkit-transform .3s,opacity .3s;-moz-transition:-moz-transform .3s,opacity .3s;-o-transition:-o-transform .3s,opacity .3s;transition:transform .3s,opacity .3s;background-color:rgba(0,0,0,0.8);opacity:0;z-index:99;background-repeat:no-repeat;background-position:center center;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;}.toolbar .tool-buy{background-position:0.3125rem,0.4375rem;}.toolbar .tool-main{display:block;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNkIwQTU1REFEM0NFNDExQjU2MTkwNzQ3OTJBQUEwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjcwMzE2MTQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjcwMzE2MDQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMxMTMxODZEOTA0NEU0MTFBNzI1QkI3MjgyMEI1OTM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM2QjBBNTVEQUQzQ0U0MTFCNTYxOTA3NDc5MkFBQTBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+M6MUzwAAALtJREFUeNrs2j0KwkAQBtBdEU9iJaTSw3jEXCaVYJWTpBlHrBMIhN3CN/ClmWLCY3+KpEZEUaWcOswcMrGS4Z8grAgQIECAAAECBAgQIECAAAEChAIBAgQIECBAgAAB4rA6Z+6NZ143erfMpfH7TN9HDZ/Dq63hjAABAsSO6/PR4focV3rPzNwLYmo8c9novTMvW8MZAQIECBAgQIAAAQIECBAgQIAAAQIECAUCBAgQIEDsrOrPoV99BBgAIW4Xy8xRNtYAAAAASUVORK5CYII=');background-color:#ff356a;opacity:1;z-index:100;}.toolbar .tool-home{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA2CAYAAABz508/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNkIwQTU1REFEM0NFNDExQjU2MTkwNzQ3OTJBQUEwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjU3MkFCRTQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjU3MkFCRDQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMxMTMxODZEOTA0NEU0MTFBNzI1QkI3MjgyMEI1OTM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM2QjBBNTVEQUQzQ0U0MTFCNTYxOTA3NDc5MkFBQTBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9IDVdAAAA5xJREFUeNrsm1tIFFEYx2dbWc3SwthMyowKjdJSVKjsQpAPUZQPVlAhiC8RQYYQUkRB4ItBUVRERPbSBYugKDKQbkIPYUaQRZaYZXbDTE2lXLf/tP+Jg+g6u87Ozfngx+w65/qfc75zvjOry+/3SwbZcnAdvAObQbtkoE0wqN5CUAtmgDzwDCwdb0LsA9XAA0rBGQryEJQYpoQ8NXTCDc76A9YD1gv3SsBv3jsNPDq26x96VRQH7rKjn0DWMGmWgXameQQS7SbELPCcHXwBkoOkTQJPmPYDyLWLEJmgjR2rAfEq8sjT4jzz9IMiqwuxDnSzQ+dAVIj5dwl+43gY+U0hxE7gYyfKx1DOCvCF5dwHXqsI4QKVwrDeokGZsk95yjJbON1MLcREcI0N/g7yNCw7BlSx7F6wzaxCeAVv/wbMj9AQLgUDrKeSexPTCJEGmtm4OjAtwh5+DfjG+u6BBDMIsQp0sFGXQbRO634KaGC98kPIMFKI7cLyVkFHqee2OBZcErbshUYIcZAN+MM4QTKQMmGprgjXb4SawSN4758g32ARFPKFKXobTI2kEFNALStrBekmEUFhLmMZZeVaGAkh5oBGVlLP4EgyIZNANdspb+83aSlEDvjMwm+xMsnEyE57v+A3Dqtx5KMVWsCdnGwntdzA6IAc9P1g22+OFvkGK2gPVZXZayEBRFKFKf2K31UL4ebTV/b1BRYVQTwdu8H+dIINaoSI5TDyM/zNtbgIot84xH4NggND/cbQY7J6Jm7kSiHZjI2gi32UI+XJyj0XX/AsAnfAbPAS7ACdwmH3APgoWdOSgVv4vgBcBNPZ1wLwVlFK2ZUFs60WHAHFKvr1VU4bRZWOgewRFJ0H0kGSBUdDCq8NoHWENPK9/0IcCVJYKYWysp0AVWZ892k6c4RwhHCEcIRwhFBhUTrW5QUrQSqIGeZ+PIgD0cAH3oMr4LWdhCgDFfyVTChWDtaCOjsIsRocBY+5x/epyOPi6CkGp8ASOwhRxKv8+6imEPJdADlgMZgJ2qzuLDN4bQojb7PgXyy/angkC5iey6fbESJgcY4QNpsaA44QAetxhAiYzxEiYN2OEAGLHe9CDPKaYOF+dmkhhPJiJ9uCRwyZ/Pxei6DrAehn8JQVRoPSNOjUVdA3zN97pcAbuV+kj2cdiQzYvDzPaNBCiA6Gw5VjCIdbwnS2SqCWGkZe+eHVgN3C9B457jfwn9tMZX8FGADylpgQSzwUqwAAAABJRU5ErkJggg==');}.toolbar .tool-tuan{background-image:url(http://h5.ve.cn/assets/img/1710eb52d0706b8bab415149a00ffb63.png)}.toolbar .tool-buy{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA8CAYAAADSfGxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNkIwQTU1REFEM0NFNDExQjU2MTkwNzQ3OTJBQUEwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjU3MkFDMjQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjU3MkFDMTQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMxMTMxODZEOTA0NEU0MTFBNzI1QkI3MjgyMEI1OTM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM2QjBBNTVEQUQzQ0U0MTFCNTYxOTA3NDc5MkFBQTBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qtP65wAAA59JREFUeNrsm01oE0EUxycxflSCikWkKLaKWDU11IN4qF5Eikj8qKiI2EsPKngSES+C4MWDIgre7UFUELUq8SAUEUSs1YPVtKVWwfqFVouKn9E0/p/7lkTbhMnuTLOzyYMfu6WTmew/8+a9+dhAOp0WZRMixNcHYCn4CIZy0Aeugs9+FCLAPeIZmCtR/h1YDzr8KkQFWAAmg+lMJWPfrwIzwFswH3zxoxAyVgW6wTSwFVzwkxDBAsq+Abf4vt5vrhEssHyCr5FSF6K7LMS/PWIemFTKQvSCYf7cwlIW4gd44kf3CDn4DI0TtWALWGbws1PecBtc+ntPeUSBHE5bNpD2hx2h5wo4mHRtA+c4wzxvcI+YBTazu1c4ESIKHnLXCoNvhgoRA9d4Ejk16KACihwpSs8Njxwb+NruJGqQJUE/39cZHC1tIS47FSI7w1xsqBANPJP+DeJuhHhsuBAb+UqTyCEVPaLOcCHanGaW/wtRw4s5JlmU50pKhDA5cjTxtRO8dCuEyZFjhFu4EcLUyEGuXJ8dNlUI0WWgEHZvoK2JHlVCJAx0jabReoMq1zAlclACtWK08cGtEH2cmZkSOdbx89JqfIdKIX6xGGRLDHKLKzxzViaESRkmLReszjU+qBAiYUjkWCOsVfdP4KZOIby+kNvM1zi79AgLKXKNarBDQX061h0ahbWDT3Y6V8GAy4Mi44W1VBfi0bjKw73iBNib659uf0E7ctAYMSis8xNeMgrvz0GrsNYnhS4hbPcgIW6A/YauT7geLE2KHGMmRKQsRCZyhEtZiL6s2LyolIWgkbnXdPcIKqrHdo8GU4VQlQlS6kqbwy389ysPPus4MBMcFZkzHsoyy+xGLorMNpqXjX60mK4eQUv7m8B2zu2neFCACcI6OHtSx1zDNxYsS1AWQssYkc8o26wBP8FTYR1P1GG0iEx7mrSiPiCs1ShP9AhamzgDPoBHnIG+Bvs0tLubp9u0DUkbT++FdVquWroGB6fqZJgNXuQ5yXYWBBS1dSpPO4OgVqYeXULEJY71NStoJybRzl2ZunS4xhywVqLcLgVt7ZQos1xYr2mN+Rghu8eh4p2PqGS5SDGESEmWSypoK6nqO+kQ4r6kGCpekOuULHevGEJQuGyVKHdMQVvHJfKSNs5fihI+w+BOnpH8oMK29oBUjna6QGUxwycxERwAPfxFv4N20KihrZXgOvgKhkE/OMQ/iFQd5dkn2x8BBgCraPsREY0D4gAAAABJRU5ErkJggg==');}.toolbar .tool-user{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNkIwQTU1REFEM0NFNDExQjU2MTkwNzQ3OTJBQUEwRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjcwMzE1OTQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjcwMzE1ODQ0OTIxMUU0QUE2NTg3QjI2QzFCNDFBMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMxMTMxODZEOTA0NEU0MTFBNzI1QkI3MjgyMEI1OTM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM2QjBBNTVEQUQzQ0U0MTFCNTYxOTA3NDc5MkFBQTBGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+1lsQYwAABnJJREFUeNrsnH9InVUYx/Vq/ph36XQObyUGgunAyCYrqM1Va9Uy9sclaM3WD8YKhAUVUWtjwbY/RgvKiAWBFG39WC2I/tMtMqg/httq2jTJnBBcghw6LSdpt+9L32PP3ub19Z7n3KvlgQ9H7t73Oec873nP+zzPec4y4/F4RgpKBVgLVoJqUAVKQBgU8JrfwBgYAn2gF5wDX4FB1x3MdKSITA58M1gPKi3l9YPj4AMqJj7fFbEcNIPHwPXi9ylwEnTyafeAGBglXllKIqCGs6YerAZZQtZ58A54E/yq1nNPEQqUgYNgLP5PuQhawf0gbCE7TBmtlGnKGNss0xiDrYBssAOMiA6eAU0gX0nJknzKPiPaG2EfstOliFpfh06BRpDpQAF+MtnWKd8DqE21IraBcXZgGDSDrBQowE8W2x5mX8bZN+eKyOG7akobiKRBAX4i7IspreyrE0UsAe1saArsAqF5oARDiH2aYh/b2WdVRXgCO9jABIjOIwX4ibKPcfZ5iZYicsRM8FbodfNYCYZ14kvWHuQ1CSK0VcyEhaAEqYwJsWZYKWKbWBOiC0gJ8jUxa0bCr0kiE7uWZnEe2A32KRmz14ANoI7mtGdWj4NfQDc4QYdLq+wCe8ElmutdczGxs4Wx1Kb0dbgZfA7+jM9eOsEDil+TNmF0Zc9lRuwAr4MROkAxS0/0JfAynSevwW9IP91vb9aV84ndCXJ472GwnTPGpkTo6BWCp0FLkBlRJlbcZoUn0iKe9Hugcpbrl4H94A/ec2KuxtEMNIsvX1mQxfKg8B1szeatYrF9Yo733iYeyBtK5rjxTQ7OpojlwpVutGy4CFygrBeSlLGB93vrSp2CMhqFC788kSL2iEXF1ot8kbK+tZxZ71LOx0peq/kI7JlJEd5FA7yoSaHRHyhri6Wcasrx1oxihX41Ud6AfNjyggYRWbINqlSIzocVOt9FeRpGXb6IdDWY30PiA7KZ9ScKn6s1rE8yMm1bvvDJtSnjHKMc82WKWM/6mEJjVazPKlmHXT65tuWYb8zTiqhgyN2LNncoNHSdiDhrFLOvUa4kr4NjreTYpxWxVnkqF7IeVur4kAj5a5QxjnV67EYRK1l3KjU0ZQxX5X0YTXmdcuxGEdWs+5QaKfDNDNtSzPoqkK0ks0+OPeRbhHoUGrgW3Me/Tyh1+iQdQE/2vUoye+TYjSJKWMcUGlhNj9ObeqeVOn0RfMi/b1WSGZNjN4oIsx5VaOB38VpkKb7Ty4QdoFFGLxs7LStTihQst7DwGg8rmMW5YLfoY51SwKZIyHSiCI+HRKzwgKWsB0X/DijGM6+oCON6lys29AhlxkCBhZwvKec15cBuuXDJp9eIMWWDJYNJHV4orgzsT1LGFtDAwOsBZZtkqRx7yGe5RRQbmgTPihjoHUl8hk1s8RWlL5o/jjk99pDPuKhRbuwzcISf06PGrg9QcughFtNx25+hX2rk2I0iepW9O1meovfopRV9FPCeV2kveL5KFEw46FeVHLtRxDnW9Q4a9N7BTfQ/bgErAtyzifXj4EdHiXT1cuxmX6OCLrPX2SIlD9RfBphgtiqAxRkXVt8FB30Jc7ZlsU+DIeHv9/MfGhw0nEMFZwQcmLmm1NFsaOBY+02sQ0aojrOOOmj4GSrip4DBGtOXvVxotUvU146z4K0MlO4TFtyjAe+rEztdR0Gpcmbev4K3LsL53vbc7VRATCihJYmEtUlh/R0CG8HVrsP5ths8ubx/yLezHbNQrKfQsz55Xubc22CFqw0emy2/Um7lmzII3gcPgzyFbf17wFug26fgWldbfslsAoeEYxRjXoPLpFNv/fiO7f0MSlxsAieTFrBdbLffkKKUoELwPds95CotIIO5zSarNhJwj/O5NCSLmSS32YI/EZGdu2MuyWRBU4dWiXcuHE99sphZl560TR0KJXChtzIOcDfYOcN1xrVuc2SWz1Y+Zb0uwTU7OYZLHNPklY16u/TCI/z359OUPngX2++zTS+0TTj9WnG73ib94JLrhNPZUpB7+fuaNCkiV9gVha5TkBMlpZ/nbzelMbvWH4F3lpSe6JhCd5pnRJ5QREEqjinMdHDFfJs3pkkRpWx/MpUHV2Y6ymQSSdNxlOlGkX6Y0qNM/sNtfWk+3HY63YfbFo87/lcPwC4eiWZZPCTvWBH+8r/9bxMWXAktquDv8pcAAwDCQ4axDuUzJwAAAABJRU5ErkJggg==');}.toolbar.active a{opacity:1;}.toolbar.active .tool-main{-webkit-transform:rotateZ(135deg);-moz-transform:rotateZ(135deg);transform:rotateZ(135deg);}.toolbar.active .tool-home{-webkit-transform:translateY(-5rem);-moz-transform:translateY(-5rem);-ms-transform:translateY(-5rem);-o-transform:translateY(-5rem);transform:translateY(-5rem);}.toolbar.active .tool-tuan{-webkit-transform:translate(2.5rem,-4.33rem);-moz-transform:translate(2.5rem,-4.33rem);-ms-transform:translate(2.5rem,-4.33rem);-o-transform:translate(2.5rem,-4.33rem);transform:translate(2.5rem,-4.33rem);}.toolbar.active .tool-buy{-webkit-transform:translate(4.33rem,-2.5rem);-moz-transform:translate(4.33rem,-2.5rem);-ms-transform:translate(4.33rem,-2.5rem);-o-transform:translate(4.33rem,-2.5rem);transform:translate(4.33rem,-2.5rem);}.toolbar.active .tool-user{-webkit-transform:translateX(5rem);-moz-transform:translateX(5rem);-ms-transform:translateX(5rem);-o-transform:translateX(5rem);transform:translateX(5rem);}</style>",
        toolbarHtml = '<div class="toolbar"><a href="javascript:void(0);" class="tool-main"></a><a href="/" class="tool-home"></a><a href="/tuan/tuan-index.html" class="tool-tuan"></a><a href="/trade/cart.html" class="tool-buy"></a><a href="/i/i.html" class="tool-user"></a></div>',

        isInit = false;

    lib.toolbar = function (option) {

        if (!isInit) {
            $('body').append(toolbarHtml + toolbarStyle);
        }

        var $toolbar = $('.toolbar');

        if (option) {
            if (option.toolbar) {
                $toolbar.css(option.toolbar);
            }
            if (option.circle) {
                $toolbar.find('a').css(option.circle);
            }
        }

        if (!isInit) {
            $toolbar.find('.tool-main').on('click', function (event) {
                event.preventDefault();
                $toolbar[$toolbar.hasClass('active') ? 'removeClass' : 'addClass']('active');
            });

            isInit = true;
        }

        return $toolbar;
    };

})(window, window.lib || (window.lib = {}));
/**
 * @desc    返回顶部
 * @author  王思杰 <564774112@qq.com>
 * @date    2014-09-04
 */
;(function(win, lib){
    var $ = win['Zepto'] || win['$'];

    lib.backtop = function (thresholdTop) {
        var thresholdTop  = thresholdTop || window.innerHeight * 2 + 100,
        selector = '.backtop',
        $win = $(window),
        backtop = $('<a href="javascript:;" class="backtop"></a>'),
        imgBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAkBAMAAADx8p7SAAAAKlBMVEUAAAD+/v7//f7//f7+/f3//////v///////v///////v///P3//v7///8rNLtqAAAADXRSTlMA/NocCb9OcbXoz4VlIaFugwAAAIlJREFUKM/tyrENg1AMRVFLKdKmSpcR0mSCDJEBskikjMAQtEi0bEAJBaLyLoDvt54EK/Aq++pY2eVZ224vn95cQu6fPfLChEYvTOjuM0zo68MvmJD5cA0mtCYLJrQlWKJIsEQkGIgUTIgEA5FgIFKyZkMk2N8CkWCV9aBM/ErsTIf0uB1S1+a1AEa7aZ7PHZ7sAAAAAElFTkSuQmCC';

        backtop.css({
            'display': 'none',
            'position': 'fixed',
            'width': '2rem',
            'height': '2rem',
            'right': '0.5rem',
            'border-radius' : '0.3rem',
            'bottom': '0.5rem',
            'z-index' : '999',
            'background': 'rgba(0, 0, 0, 0.4) url('+imgBase64+') no-repeat center',
            'background-size' : '40% 40%'
        });

        $('body').append(backtop);

        $win.on('scroll', function(){
            if ($win.scrollTop() < thresholdTop) {
                backtop.css('display', 'none');
            } else{
                backtop.css('display', 'block');
            }
        });

        $(document).on('click', selector, function(){
            $win.scrollTop(0);
            backtop.css('display', 'none');
        });
    }

})(window, window.lib || (window.lib = {}))
/**
 * @desc    hui
 * @author  王玉林 <veryued@gmail.com>
 * @date    2014-08-13
 */

;(function($){

    var template = lib.template;
    var slider = lib.slider;

    

    var hui = {

        init: function(){
            var that = this;
            that.render();
            that.slider();
            //that.renderCallapp();
            that.pc();
        },

        slider: function(){
            var sliders = $('.J_slider');

            $.each(sliders, function(i, s){

                new slider({
                    container : s,
                    wrap: '.slider-outer',
                    panel: '.slider-wrap',
                    trigger : '.slider-status',
                    fullScreen: 1
                });

            });
        },

        render: function(){
            var hole_eles = $('.J_hole');
            var holes = [];
            $.each(hole_eles, function(i, hole){
                holes.push({
                    "queue": $(hole).attr('hui-queue'),
                    "widget": $(hole).attr('hui-widget')
                });
            });
            $.each(holes, function(j, hole){
                if(hole.queue && hole.widget){
                    //目前从页面中取数据 后面添加从接口请求数据
                    var html = template($('#template-'+hole.widget).text(), $.parseJSON($('#data-'+hole.queue).text()));
                    $('.J_queue'+hole.queue).html(html);
                }
            });

        },

        renderCallapp: function(){
            if(lib.env && !lib.env.app.isBeibei && !lib.env.app.isBeibeiHD){
                var html =  lib.template($('#callapp-template').html(),{});
                $('body').append(html);
            }
        },

        pc: function(){
            $('.J_go2Pc').on('click', function(e){
                e.preventDefault();
                lib.cookie('firstLogin',false,{
                    expires : 1,
                    path: '/',
                    domain: 'beibei.com'
                });

                location.href = $(e.target).attr('href');
            });
        }
    }

    hui.init();


//    //修复活动页面 APP下载事件
//    //TODO
//    var link = '',
//        env = lib.env,
//        os = env.os,
//        app = env.app,
//        iid = lib.uri.params.iid,
//        mid = lib.uri.params.eventId,
//
//    // 市场部推广链接地址
//        utm_source = lib.uri.params.utm_source;
//
//    // 小米平台推广地址
//    if ('xiaomixxl' === utm_source) {
//        link = 'http://dl.beibei.com/BeiBei-H5-release.apk';
//    }
//
//    else if (app.isWeixin) {
//        link = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.husor.beibei&g_f=993223';
//    } else {
//        switch(os.name) {
//
//            case 'iPhone':
//            case 'iPod' :
//                link = 'https://itunes.apple.com/cn/app/bei-bei-te-mai-ma-ma-bao-bei/id863998476?l=zh&ls=1&mt=8';
//                $('.ios-rules').removeClass('util-hidden');
//                $('.android-rules').addClass('util-hidden');
//                break;
//
//            case 'iPad' :
//                break;
//
//            case 'Android' :
//            default :
//                $('.android-rules').removeClass('util-hidden');
//                $('.ios-rules').addClass('util-hidden');
//                link = 'http://dl.beibei.com/beibei-touchsignedAligned.apk';
//                break;
//        }
//    }
//
//    $('body').on('touchend', function(e) {
//        if($(e.target).hasClass('ft-weixin')){
//            e.preventDefault();
//            $('.ft-weixin').addClass('util-hidden');
//        }
//    });
//
//    $('body').on('click', function(e){
//        if($(e.target).hasClass('J_closeAPP')){
//            e.preventDefault();
//            $('.J_fixBar').remove();
//            lib.cookie('callapp',0,{
//                expires : 1,
//                path: '/',
//                domain: 'm.beibei.com'
//            });
//            lib.cookie('welcome',1,{
//                expires : 1,
//                path: '/',
//                domain: 'm.beibei.com'
//            });
//            if($('.app-intro').length){
//                $('.app-intro').remove();
//            }
//        }
//
//        if($(e.target).hasClass('J_app')){
//            e.preventDefault();
//            var $this = $(e.target),
//                target = $this.attr('data-target'),
//                nativeUrl = 'beibeiapp://'; // 默认
//
//            if (app.isWeixin) {
//                $('.ft-weixin').removeClass('util-hidden');
//            } else {
//                if (target) {
//                    nativeUrl = 'beibeiapp://action?target=' + target;
//
//                    if (target === 'detail' && iid) {
//                        nativeUrl += '&iid=' + iid;
//                    }
//
//                    if (target === 'martshow' && mid){
//                        nativeUrl += '&mid=' + mid;
//                    }
//                }
//            }
//
//            lib.callapp.goNative(nativeUrl, link);
//        }
//    });

})(Zepto);