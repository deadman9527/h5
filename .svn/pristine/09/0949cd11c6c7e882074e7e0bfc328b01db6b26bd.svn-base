/**
 * h5.ve.cn setting
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    var docEl = document.documentElement;
    var winW;
    var main = {
        init: function () {
            if(!lib.login.isLogin()){
                lib.login.goLogin();
                return;
            }
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '设置';

            document.title = title;
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title
            });
            $("#loginout").click(function(){
                lib.api.get({
                    needLogin:true,
                    api: {
                        c: 'user',
                        a: 'logout'
                    },
                    data: {
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (data) {
                        console.log(data);
                    },
                    complete: function () {
                        console.log(data);
                    }
                })
                lib.login.logout('myve.html');
            });
        }
    };
    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));