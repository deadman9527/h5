/*!
 * share分享组件 
 * Copyright(c) 2013 m.taobao.com
 * Author: 玄寂 <xuanji.jw@taobao.com>
 */

;(function(lib){
    
    var __cache = {
        'platform' : '',
        'version' : '',
        'isInTaobaoApp' : 'noRecord',
        'URLInfo' : '',
        'UAWindVaneInfo' : ''
    };

    var Share = {};

    Share = {

        /**
        * 返回设备平台
        *
        * @returns {string}    返回值为 'ios' or 'android' or ''
        */
        platform : function(){
            var userAgent = navigator.userAgent;
            var platform = '';
            if (userAgent.match(/iPad|iPhone|iPod|iOS/i) != null) {
                platform = 'ios';
            } else if (userAgent.match(/Android/i) != null) {
                platform = 'android';
            }
            __cache.platform = platform;
            return platform;
        },
        /**
        * 如果页面是客户端打开，则返回true 反之返回false
        *
        * @returns {boolean} 
        */
        isInTaobaoApp : function(){
            var isTaobaoTTID = Share.hasURLTTIDInfo().hasTaobaoURLTTID;
            var isWindVane = Share.hasUAWindVaneInfo().hasUAWindVaneInfo;
            var isInClient;

            isInClient = isWindVane ? true : (isTaobaoTTID ? true : false);
            __cache.isInTaobaoApp = isInClient;
            return isInClient;
        },


        /**
        * 获取URL中TTID的相关信息
        *
        * @returns {Object}
        * @returns Object.hasURLTTID {boolean} URL中是否含有 ttid信息 有true 无false
        * @returns Object.version {string} UA中的客户端版本号
        * @returns Object.platform {string} UA中体现出来的平台  
        */
        hasURLTTIDInfo : function(){
            var info = {};
            var decodeURL = decodeURIComponent(window.location.href);
            var ttid = decodeURL.match(/(?:\?|&)ttid=(?:.*)@taobao_(iphone|android)_((?:\d+\.){2,3}\d)/i);
            info.hasTaobaoURLTTID = ttid ? true : false;
            if(info.hasTaobaoURLTTID){
                info.platform = ttid[1];
                var ver = ttid[2].split('.');
                if(ver.length < 4){
                    ver.push('0');
                }
                info.version = parseInt(ver.join('')); 
            }
            __cache.URLInfo = info;
            return info;
        },

        /**
        * 获取UA中WindVane的相关信息
        *
        * @returns {Object} 
        * @returns Object.hasUAWindVaneInfo {boolean} UA中是否含有 WindVane信息 有true 无false
        * @returns Object.version {string} UA中的客户端版本号
        * @returns Object.platform {string} UA中体现出来的平台
        */
        hasUAWindVaneInfo : function(){
            var UAInfo = {};
            var userAgent = navigator.userAgent;
            var UAWindVaneInfo = userAgent.match(/\bWindVane\/((?:\d+\.){2,3}\d)(?:\s|$)/i);
            UAInfo.hasUAWindVaneInfo = UAWindVaneInfo ? true : false; 
            if(UAWindVaneInfo){
                // var ver = UAWindVaneInfo[1].split('.');
                // if(ver.length < 4){
                //     ver.push('0');
                // }
                // UAInfo.version = parseInt(ver.join(''));
                // 匹配到的是WindVane的版本号，保留后用，目前凡是UA中含有WindVane的版本全部支持分享故为9999
                // 安卓支持从3.9.2  iOS 3.4.0
                UAInfo.version = 9999;
                UAInfo.platform = __cache.platform || Share.platform();
            }
            __cache.UAWindVaneInfo = UAInfo;
            return UAInfo;
        },

        /**
        * 根据UA或者TTID给出客户端版本号
        *
        * @returns {string} 
        */        
        hasClientVersion : function(){
            var version = '';
            var isInTaobaoApp = (__cache.isInTaobaoApp != 'noRecord' ? __cache.isInTaobaoApp : Share.isInTaobaoApp());
            //由上决定了之下两个对象只需从缓存中获取
            var URLInfo = __cache.URLInfo;
            var UAWindVaneInfo = __cache.UAWindVaneInfo;
            var version = '';
            if(isInTaobaoApp){
                version = UAWindVaneInfo.version || URLInfo.version;
            }
            __cache.version = version;
            return version;
        },

        /**
        * 指定打开淘宝APP
        *
        * @param {string} title 分享标题
        * @param {string} text  分享主体内容
        * @param {string} url   分享出去的url
        * @param {string} image 分享出去的图片地址
        * @param {Function} success 调起分享的回调
        * @param {Function} fail   不能调起分享的回调
        * @no returns
        */
        openTaobaoAPPNativeShare : function(title, text, url, image, success, fail){

            var isInTaobaoApp = (__cache.isInTaobaoApp != 'noRecord' ? __cache.isInTaobaoApp : Share.isInTaobaoApp());

            var version = __cache.version || Share.hasClientVersion();

            var platform = __cache.platform || Share.platform();

            var param = {};
            param.title = title || '发现一个好玩的';
            param.text = text;
            param.url = url;
            param.image = image;

            if(isInTaobaoApp && ((platform == 'ios' && version >= 3200)||(platform == 'android' && version >= 3800))){
                window.WindVane.call('TBSharedModule', 'showSharedMenu', JSON.stringify(param), function(data){
                    data.params = param;
                    success(data);
                }, function(data){
                    data.params = param;
                    fail(data);
                });                
            }else{
                var data = {};
                data.params = param;
                fail(data);
            }   
        }
    }

    lib.share = Share;

})(window.lib || (window.lib = {}));