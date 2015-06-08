;
(function(win, lib) {
    var doc = win.document;
    var HttpURL = lib.httpurl;
    var os = lib.env.os;
    var params = lib.env.params;
    var browser = lib.env.browser;

    lib.callapp = {};

    function appendParam(url, extraParam) {
        var currentUrl = new HttpURL(location.href);
        var hiddenInput = doc.getElementById('buried');

        // 当前页面href中的参数透传，优先级低于已有的参数
        for (var key in currentUrl.params) {
            if (!url.params.hasOwnProperty(key)) {
                url.params[key] = currentUrl.params[key];
            }
        }

        if (hiddenInput) {// 页面中植入的ttid
            url.params.ttid = hiddenInput.value;
        }

        // 额外的参数，优先级高于已有的参数
        if (typeof extraParam === 'object') {
            for (var key in extraParam) {
                url.params[key] = extraParam[key];
            }
        }

        return url;
    }

    var iframe;
    function callInIframe(url) {
        if (!iframe) {
            iframe = doc.createElement('iframe');
            iframe.id = 'callapp_iframe_' + Date.now();
            iframe.frameborder = '0';
            iframe.style.cssText = 'display:none;border:0;width:0;height:0;';
            doc.body.appendChild(iframe);
        }

        iframe.src = url;
    }

    function setLocation(url, options) {
        if (options.replace !== false && (options.replace === true)) {
            location.replace(url);
        } else {
            location.href = url;
        }
    }

    lib.callapp.gotoPage = function(url, options) {
        options = options || {};

        if (typeof options.params === 'undefined') {
            options.params = true; // 默认为true
        }

        var originUrl = url || location.href;

        url = new HttpURL(url);
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MobileVecn/i) && url.indexOf("brandcate-")>=0){
            var host = 'http://' + location.host;
            var titleurl = url.params.title ? "&"+url.params.title : "";
            var newurl = host + "/list.html?brandId=" + url.params.brandId + titleurl;
        }

        if ((url.protocal === 'http' || url.protocal === 'https')) {  // 为了统一给客户端打点，都用taobao协议
            url.protocal = 'vecn';
        }

        if (url.protocal === 'vecn') {
            if (options.params) {
                appendParam(url, options.params);
            }
        }

        if (os.isAndroid && os.version.lt('4.5') && browser.isChrome && !browser.isWebview) {
            // 在系统原生的chrome里，用intent协议
            url.hash = 'Intent;scheme=' + url.protocal + ';package=' + (options['package'])+';end';
            url.protocal = 'intent';
        }

        callInIframe(url.toString());
        var clickedAt = +new Date;
        setTimeout(function(){
            !window.document.webkitHidden && setTimeout(function(){
                if (+new Date - clickedAt < 1200){
                    var ua = window.navigator.userAgent.toLowerCase();
                    if(ua.match(/MicroMessenger/i)){
                        var url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.geetion.vecn';
                    }else{
                        var url = os.isIPhone?'https://itunes.apple.com/us/app/wei-yi-you-pin/id912303412?l=zh&ls=1&mt=8':
                            (os.isAndroid?'http://h5.ve.cn/downloadapp/index.php':'');
                    }
                    window.location = url;
                }
            }, 500);
        }, 500);
    }

    lib.callapp.download = function(url, options){
        options = options || {};
        if (!url) {
            url = os.isIPhone?'https://itunes.apple.com/us/app/wei-yi-you-pin/id912303412?l=zh&ls=1&mt=8':
                (os.isAndroid?'http://www.ve.cn/download-downloadapp.html#f=download_app&md=download':'');
        }
        url = new HttpURL(url);

        if (os.isAndroid && url.pathname.match(/\.apk$/)) {
            url.search = '';
            url.hash = '';
        } else if (options.params) {
            appendParam(url, options.params);
        }

        url = url.toString();
        setLocation(url, options);
    }

})(window, window['lib'] || (window['lib'] = {}));