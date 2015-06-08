/**
 * @fileoverview param deliver
 * @module deliver
 * @author wanyan.wz
 * @since 2013-11-13
 */

;(function (lib) {

    var deliver = {};
    var doc = document;

    /**
     * _Url components from hualei
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    function _Url(url) {
        if (!url) return;
        var a = document.createElement('a');
        a.href = url;
        this.url = url;
        this.a = a;
    }
    _Url.prototype = {
        hostname: function () {
            return this.a.hostname;
        },
        hash: function () {
            return this.a.hash;
        },
        search:function () {
            return this.a.search;
        },
        //仅支持xx=yy类型
        setkv:function (kv) {
            if (!kv || -1 === kv.indexOf('=')) return;
            var search = this.a.search;
            var url = this.url;
            if (search) {
                return url + '&' + kv;
            } else {
                if ('?' == url.substr(url.length - 1)) return url + kv;
                else return url + '?' + kv;
            }
        },
        getval: function (key) {
            //if (!key) return;
            //console.log(key)
            var search = this.a.search;
            var params,kvs=[],k,v;
            var keyArr = [], valArr = [], paramArr = [];
            if (search) {
                params = search.indexOf('?') == 0 ? search.substr(1) : '';
                if (params) {
                    kvs = params.split('&');
                    for (var i = 0; i < kvs.length; i++) {
                        var kv = kvs[i].split('='),len=kv.length;

                        if(key){
                            //console.log(key);
                            if (len == 2) {
                                if (key == kv[0]) return kv[1];
                            } else if(len==1){
                                if (key == kv[0]) return '';
                            }
                        }else{
                            keyArr[i] = kv[0];
                            valArr[i] = kv[1];
                        }
                    }
                }
            }
            if(!key){
                paramArr = [keyArr, valArr]
                return paramArr;
            }
        },
        changeval : function(key,value){
            if(!key) return;
            var search = this.a.search;
            var params,kvs,kv;
            if(search){
                params = search.indexOf('?') == 0 ? search.substr(1) : '';
                if(params){
                    kvs = params.split('&');
                    for(var i = 0; i < kvs.length;i++){
                        var kv = kvs[i].split('='),
                            len = kv.length;
                        if(key == kv[0]){
                            kv[1] = value;
                            kvs[i] = kv.join('=');
                        } 
                    }
                }
                return kvs.join('&');
            }
        }
    };

    /**
     * 链接替换
     * @param  {[type]} param    [description]
     * @param  {[type]} paramVal [description]
     * @param  {[type]} el       [description]
     * @return {[type]}          [description]
     */
    var _changeLink = function(param, paramVal, el){
        if (!param || !paramVal || !el) return;
        var link = el.href;
        if(link && link.indexOf('#') == -1){
            var url = new _Url(link),
                index = link.indexOf('?');

            if (-1 == link.indexOf('?'+param+'=') && -1 == link.indexOf('&'+param+'=')) {
                el.href = url.setkv(param + '=' + paramVal);
            }else{
                el.href = el.href.substr(0,index+1) +url.changeval(param,paramVal);    
            }
        }
    };

    /**
     * 处理param的每一项
     * @param  {[type]} params [description]
     * @param  {[type]} aList  [description]
     * @return {[type]}        [description]
     */
    var _packParam = function(paramsAll,el){
        for(var k=0;k<paramsAll[2];k++){
            _changeLink(paramsAll[0][k],paramsAll[1][k],el);
        }
    };

    /**
     * 处理不透传的a的情况
     * @param  {[type]} i        [description]
     * @param  {[type]} exLength [description]
     * @param  {[type]} exList   [description]
     * @param  {[type]} aList    [description]
     * @param  {[type]} params   [description]
     * @return {[type]}          [description]
     */
    var _packExlist = function(i,exLength,exList,aList,paramsAll){
        //console.log(i,exLength,exList,aList,paramsAll)
        for(var j=0;j<exLength;j++){
            if(aList[i] != exList[j]){
                _packParam(paramsAll,aList[i]);
            }
        }
    };

    /**
     * [deliver description]
     * @param  {[object]} options 参数
     *   {
     *       deliver: true, //开启透传
     *       params: ['ttid','sid'], //透传的参数
     *       exclude: '.selector' //不透传的a的node，标准Selector格式，支持列表
     *   }
     * @return {[type]}         [description]
     */
    lib.deliver = function(options){
        options = options || {};
        var deliver = options.isDeliver || true,
            params = options.params || [],
            exclude = options.exclude;
            paramsVal = [];
        var aList = doc.querySelectorAll('a');
        if(!aList || !deliver) return;
        var paramLen = Object.prototype.toString.apply(params) == '[object Array]' ? params.length : 1;
        var exLength = 0, exType = Object.prototype.toString.apply(exclude);

        if(exType == '[object Array]'){
            exLength = exclude.length;
        }else if(exType == '[object String]'){
            if(exclude == ''){
                exLength = 0;
            }else{
                exLength = 1;
            }
        }

        //var paramLen = params.length;
        var url = new _Url(location.href);
        if(paramLen > 0){
            for(var i=0;i<paramLen;i++){ //传入的param数量
                paramsVal[i] = url.getval(params[i]);
            }
        }

        //不带参数时
        if(paramLen == 0){
            params = url.getval()[0];
            paramsVal = url.getval()[1];
            paramLen = url.getval()[0].length;
        }
        url = null;

        var paramsAll = [params,paramsVal,paramLen];

        //var exLength = exclude.length;
        if(exLength > 0){
            var exList = doc.querySelectorAll(exclude);
        }

        for(var i=0;i<aList.length;i++){
            if(exLength > 0){
                _packExlist(i,exLength,exList,aList,paramsAll);
            }else{
                _packParam(paramsAll,aList[i]);
            }
        };
    }

})(window.lib || (window.lib = {}));