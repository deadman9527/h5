/**
 * h5.quxiu.me myve
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    var main = {
        init: function () {
            if(!lib.login.isLogin()){
                lib.login.goLogin();
                return;
            }
            if(lib.login.getNickName()){
                $("#username").html(lib.login.getNickName());
            }else{
                $("#username").html(lib.login.getUserName());
            }

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '我的';
            document.title = title;
            // gotop
            new lib.goTop({position:{bottom:60}});
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title
            });
            // $("body").append('<div class="bottomdown"><img src="http://img01.ve.cn/party/4eed63cee3e6f6d560d6bdf47da17e80.jpg" /></div>');
            //$(".bottomdown").css("margin-bottom",this.topbar.height+40+"px");
            $('.bottomdown').on('click', function(e) {
                var schema = "http://h5.quxiu.me/myve.html";
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });
            this.bottombar = new ctrl.bottomBar({
                hoverIndex:3,
                showBottom:true,
                showApp:false,
                showCircle:false
            });
            $('#callApp').on('click', function(e) {
                //window.location = "vecn://h5.quxiu.me/index.html";
                //lib.callapp.applink();
                var schema = location.href;
                schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });
            this.renderNum();

        },
        renderNum:function(){
            var that = this;
            if (that.isAjax) {
                return;
            }

            that.isAjax = true;
            lib.api.get({
                needLogin:true,
                api: {
                    c: 'order',
                    a: 'getUserNumber'
                },
                success: function (data) {
                    console.log(data);
                    if(data && data.data){
                        if(data.data.nopayOrder!=0){
                            $("#nopayOrder").show();
                            $("#nopayOrder").html(data.data.nopayOrder);
                        }else{
                            $("#nopayOrder").hide();
                        }
                        if(data.data.waitReciveOrder!=0){
                            $("#waitReciveOrder").show();
                            $("#waitReciveOrder").html(data.data.waitReciveOrder);
                        }else{
                            $("#waitReciveOrder").hide();
                        }
                    }

                },
                error: function () {
                },
                complete: function () {
                    that.isAjax = false;
                }
            });
        }
    };
    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));