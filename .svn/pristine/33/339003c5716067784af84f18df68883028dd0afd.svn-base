/**
 * VE登陆组件验证
 *
 * @requires lib.storage
 * @author 景烁
 */
;(function(win, lib) {
    var helper = {
        getParamsFromUrl: function () {
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");

            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");

                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = pair[1];
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [ query_string[pair[0]], pair[1] ];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(pair[1]);
                }
            }
            return query_string;
        }
    };

    var isOnline = location.href.indexOf('http://h5.quxiu.me') > -1;

    lib.login = {
        // 判断是否登陆
        isLogin: function () {
            return !!lib.storage.get('accessToken');
        },

        // 跳转登陆页
        goLogin: function (redirectUrl) {
            redirectUrl = redirectUrl || location.href;

            if (isOnline) {
                location.href = "http://h5.quxiu.me/login.html?redirectUrl=" + encodeURIComponent(redirectUrl);
            } else {
                location.href = "login.html?redirectUrl=" + encodeURIComponent(redirectUrl);
            }
        },

        // 登出
        logout: function (redirectUrl) {
            redirectUrl = redirectUrl || '';
            lib.storage.rm('accessToken');
            var that = this;
            setTimeout(function () {
                that.goLogin(redirectUrl);
            }, 100);
        },

        // 登陆后写入数据
        login: function (logData, redirectUrl) {
            if (!logData || !logData.accessToken) {
                return;
            }

            // 最后跳首页
            if (!redirectUrl) {
                var params = helper.getParamsFromUrl();
                if (params['redirectUrl']) {
                    redirectUrl = decodeURIComponent(params['redirectUrl']);
                } else {
                    redirectUrl = isOnline ? 'http://h5.quxiu.me' : 'index.html';
                }
            }

            lib.storage.set('accessToken', logData.accessToken);
            lib.storage.set('userId', logData.user.userId);
            lib.storage.set('userName', logData.user.userName);
            if(logData.user.nickName){
                lib.storage.set('nickName', logData.user.nickName);
            }else{
                lib.storage.set('nickName', logData.user.userName);
            }


            setTimeout(function () {
                location.href = redirectUrl;
            }, 100);
        },

        // 获取账号昵称
        getUserName: function () {
            return lib.storage.get('userName');
        },
        // 获取账号昵称
        getNickName: function () {
            return lib.storage.get('nickName');
        }
    };
})(window, window['lib'] || (window['lib'] = {}))