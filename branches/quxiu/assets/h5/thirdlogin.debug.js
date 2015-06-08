/**
 * h5.quxiu.me thirdlogin
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
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;


            var title = params['title'] ? decodeURIComponent(params['title']) : '商品详情';
            winW = docEl.getBoundingClientRect().width;
            this.openid = params.openid;
            this.name = params.name;
            //追踪浏览商品的ID
            this.render();

        },
        render:function(){
            var that = this;
            if (that.isAjax) {
                return;
            }
            that.isAjax = true;
            lib.api.get({
                api: {
                    c: 'user',
                    a: 'huConnection'
                },
                data: {
                    openid: this.openid,
                    type:"qq",
                    name:this.name,
                    app:"h5"
                },
                success: function (data) {
                    if(decodeURIComponent (lib.storage.get("CallBackUrl")) == null || decodeURIComponent (lib.storage.get("CallBackUrl")) == "null"){
                        redirectUrl = null;
                    }else{
                        redirectUrl = decodeURIComponent (lib.storage.get("CallBackUrl"));
                    }
                    lib.storage.set("CallBackUrl",null);
                    //$("body").append('亲爱的QQ用户：'+ that.name +'，欢迎来到唯一优品<br /><a href="http://h5.quxiu.me">返回首页</a>');
                    lib.login.login(data, redirectUrl);
                    console.log(data);
                },
                error: function (data) {
                },
                complete: function () {
                    that.isAjax = false;
                }

                // mock 先
                //mock: {
                //   path: 'data/detail.json',
                //   error: 1
                //}
            })
        }
    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));