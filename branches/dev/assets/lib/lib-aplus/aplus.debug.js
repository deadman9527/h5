;(function(win, lib) {
    var doc = win.document;
    var loc = win.location;

    function createImg(url) {
        var img = doc.createElement('img');
        img.style.cssText = 'display:none';
        img.src = url;
        doc.body.appendChild(img);
    }

    function aplus(options) {
        options = options || {};

        var params = {}
        var apname = options.apname || options.ap_name;
        var apuri = options.apuri || options.ap_uri;
        var apdata = options.apdata || options.ap_data;

        if (!apname) return;

        if (apname.charAt(0) === '/') {
            apname = apname.slice(1);
        }

        if (apuri) {
            params['apuri'] = apuri;
        }
        if (apdata) {
            for (var k in apdata) {
                params[k] = apdata[k];
            }
        }
        params['cache'] = parseInt((Math.random() + 1) * Date.now());   //随机数

        var search = [];
        for (var name in params) {
            var val = params[name];
            if (typeof val === 'object') {
                val = JSON.stringify(val);
            }
            search.push(name + '=' + encodeURIComponent(val));
        }

        createImg('http://wgo.mmstat.com/' + apname + '?' + search.join('&'));
    }

    if (window['Zepto']) {
        var ajax = Zepto.ajax;
        Zepto.ajax = function(options) {
            if (!options) return;

            var complete = options.complete;

            options.complete = function () {
                if (options.aplus === true || options.apname) {
                    aplus(options);
                }
                complete && complete.apply(this, arguments);
            }

            if (options.url) {
                ajax.call(Zepto, options);
            } else {
                options.complete();
            }
        }
    }

    lib.aplus = aplus;
})(window, window['lib'] || (window['lib'] = {}))