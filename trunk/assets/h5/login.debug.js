/**
 * 登陆
 *
 * Created by huangdonglin on 14-12-10.
 *
 * @author jingshuo
 *
 */
;(function ($) {
    var main = {
        init: function () {
            this.addEvents();
            this.transmit();
            this.topbar = new ctrl.topBar({
                isIndex: false
            });
            this.bottombar = new ctrl.bottomBar({
                showBottom:true,
                showApp:false,
                showCircle:false
            });
        },

        addEvents: function () {
            var that = this;

            $('#submit').on('click', function () {
                that.submit();
            });

            /*$("#qq_login_btn").on('click',function(){
                $("#qqLoginBtn a").trigger('click');
            });*/
            /*$("#login-sina").on('click',function(){
                $(this).attr('href','https://api.weibo.com/oauth2/authorize?client_id=2441162563&response_type=code&redirect_uri=http://h5.ve.cn/apilogin-callback.html');
            });*/
            $("#login-alipay").on('click',function(){
                $(this).attr('href','http://localhost/alipay/alipayapi.php').trigger('click');
            });
        },

        //参数传递
        transmit: function(){
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            params['redirectUrl'] = params['redirectUrl']? params['redirectUrl']:'';

            var isOnline = location.href.indexOf('http://h5.ve.cn') > -1;
            var redirectUrlLink='',redirectUrlLink2='';
            if (isOnline) {

                redirectUrlLink = params['redirectUrl'] ? "http://h5.ve.cn/getpassword.html?redirectUrl=" + encodeURIComponent(params['redirectUrl']) : "http://h5.ve.cn/getpassword.html";
                $('#forget').attr('href',redirectUrlLink);

                if(params['redirectUrl'].indexOf("cartfrom")>=0){
                    var proType= params['redirectUrl'].indexOf("proType=1")>=0 ? 1 :  0;
                    redirectUrlLink2 = params['redirectUrl'] ? "http://h5.ve.cn/register.html?redirectUrl=order-confirm.html%3FproType%3D" + proType : "http://h5.ve.cn/register.html";
                }else{
                    redirectUrlLink2 = params['redirectUrl'] ? "http://h5.ve.cn/register.html?redirectUrl=" + encodeURIComponent(params['redirectUrl']) : "http://h5.ve.cn/register.html";
                }

                $('#register').attr('href',redirectUrlLink2);
            } else {
                redirectUrlLink = params['redirectUrl'] ? "getpassword.html?redirectUrl=" + encodeURIComponent(params['redirectUrl']) : "getpassword.html";
                $('#forget').attr('href',redirectUrlLink);

                if(params['redirectUrl'].indexOf("cartfrom")>=0){
                    var proType= params['redirectUrl'].indexOf("proType=1")>=0 ? 1 :  0;
                    redirectUrlLink2 = params['redirectUrl'] ? "register.html?redirectUrl=order-confirm.html%3FproType%3D" + proType : "register.html";
                }else{
                    redirectUrlLink2 = params['redirectUrl'] ? "register.html?redirectUrl=" + encodeURIComponent(params['redirectUrl']) : "register.html";
                }

                $('#register').attr('href',redirectUrlLink2);
            }
            $("#login-sina").on("click",function(){
                lib.storage.set("CallBackUrl",encodeURIComponent(params['redirectUrl']));
                location.href = "https://api.weibo.com/oauth2/authorize?client_id=2441162563&redirect_uri=http%3A%2F%2Ftest.h5.ve.cn%2Fthirdlogin%2Fcallback.php&response_type=code" ;
            });
            $("#qq_login_btn").on("click",function(){
                lib.storage.set("CallBackUrl",encodeURIComponent(params['redirectUrl']));
                var url = "http://test.h5.ve.cn/thirdlogin/qqindex.php";
                location.href = url;
            });

        },

        // 登陆
        submit: function () {
            var that = this;

            if(that.isAjax){
                return;
            }

            // 验证手机号码的合法性
            if (this.verify("tel")) {
                that.isAjax = true;

                // md5 password
                lib.md5 && (this.password = lib.md5(this.password));

                lib.api.get({
                    api: {
                        c: 'user',
                        a: 'login'
                    },
                    data: {
                        phone: this.username,
                        password: this.password
                    },

                    success: function (data) {
                        //记录用户的登录
                        lib.h5log.log(["setCustomVariable", 1, "userId", data.user.userId, "visit"]);
                        var redirectUrl = null;
                        console.log(data);
                        try{
                            lib.storage.set("guideFilter",data.user.filter);
                        }catch(e){}

                        lib.login.login(data, redirectUrl);
                    },

                    error: function (data) {
                        if (data && data.desc) {
                            alert(data.desc);
                        }
                        console.error(data);
                    },

                    complete: function () {
                        that.isAjax = false;
                    }
                })
            }
        },

        // 验证
        verify: function () {
            this.username = $('#username').val();
            this.password = $('#password').val();

            // 校验
            if(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.username)){ //判断用户名是否是手机号码
            }else if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.username)){ //判断用户名是否是邮箱
            }else{
                alert("用户名不正确，请重新输入！");
                return false;
            }
            if(this.password.length == 0){
                alert("密码不能为空");
                return false;
            }
            return true;
        }

    };

    $(function () {
        main.init()
    });

})(Zepto)