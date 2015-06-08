/**
 * 注册页
 *
 * Created by huangdonglin on 14-12-9
 *
 * @author jingshuo
 * @time 2014-12-09
 */
;(function ($) {
    var main = {

        init: function () {
            this.isRegister = location.href.indexOf('register') > -1;
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            params['redirectUrl'] = params['redirectUrl']? params['redirectUrl']:'';
            this.redirectUrl = params['redirectUrl'];

            this.addEvents();
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
            this.transmit();

            $('#submit').on('click', function () {
                that.submit();
            });

            $('#get-code').on('click', function () {
                that.getCode();
            });

            $('#resetPasswd').on('click',function(){
                that.reset();
            });
        },
        //参数传递
        transmit: function(){
            var that = this;
            var isOnline = location.href.indexOf('http://h5.ve.cn') > -1;
            var redirectUrlLink='';
            if (isOnline) {
                redirectUrlLink = that.redirectUrl? "http://h5.ve.cn/login.html?redirectUrl=" + encodeURIComponent(that.redirectUrl) : "http://h5.ve.cn/login.html";
                $('#has-account').attr('href',redirectUrlLink);
            } else {
                redirectUrlLink = that.redirectUrl? "login.html?redirectUrl=" + encodeURIComponent(that.redirectUrl) : "login.html";
                $('#has-account').attr('href',redirectUrlLink);
            }
        },

        // 提交注册
        submit: function () {
            var that = this;
            if(that.isAjax){
                return;
            }

            // 验证手机号码的合法性
            if (this.verify()) {
                that.isAjax = true;

                // md5 password
                lib.md5 && (this.password = lib.md5(this.password));

                lib.api.get({
                    api: {
                        c: 'user',
                        a: 'signup'
                    },
                    data: {
                        phone: this.mobile,
                        password: this.password,
                        verify_code: this.code,
                        source: 'h5',
                        r: lib.storage.get('register_r') && lib.storage.get('register_r').r||null,
                        pid: lib.storage.get('pid') && lib.storage.get('pid')||null,
                        utm_medium: lib.storage.get('register_r') && lib.storage.get('register_r').utm||null
                    },

                    success: function (data) {
                        console.log(data);
                        //记录用户注册
                        lib.h5log.log(["setCustomVariable", 3, "isRegister", 1, "visit"]);
                        var redirectUrl = null;
                        lib.login.login(data, redirectUrl);
                        //location.href = that.redirectUrl?'login.html?redirectUrl=' + encodeURIComponent(that.redirectUrl) : 'login.html';
                    },

                    error: function (data) {
                        if(that.isRegister){
                            console.log('注册失败！');
                        }else{
                            console.log('重置密码失败！');
                        }

                        if (data && data.desc) {
                            alert(data.desc);
                        }
                    },

                    complete: function () {
                        setTimeout(function(){that.isAjax = false;},1000);
                    }
                });
                if(lib.storage.get('register_r'))
                    lib.storage.set('register_r',null);
            }
        },

        // 重置密码
        reset: function () {
            var that = this;
            if(that.isAjaxReset){
                return;
            }

            // 验证手机号码的合法性
            if (this.verify()) {
                that.isAjaxReset = true;

                // md5 password
                lib.md5 && (this.password = lib.md5(this.password));

                lib.api.get({
                    api: {
                        c: 'user',
                        a: 'changepwd'
                    },
                    data: {
                        phone: this.mobile,
                        password: this.password,
                        verify_code: this.code,
                        source: 'h5'
                    },

                    success: function (data) {
                        console.log(data);
                        location.href = that.redirectUrl?'login.html?redirectUrl=' + encodeURIComponent(that.redirectUrl) : 'login.html';
                    },

                    error: function (data) {
                        console.log('注册失败');
                        if (data && data.desc) {
                            alert(data.desc);
                        }
                    },

                    complete: function () {
                        that.isAjaxReset = false;
                    }
                });

            }
        },

        // 获取验证码
        getCode: function () {
            var that = this;
            if(that.isAjaxGetcode == true){
                return;
            }

            // 验证手机号码的合法性
            if (this.verify("tel")) {
                that.isAjaxGetcode = true;
                lib.api.get({
                    api: {
                        c: 'sms',
                        a: 'sendMsg'
                    },
                    data: {
                        mobile: this.mobile,
                        status: this.isRegister ? 'register' : ''
                    },

                    success: function (data) {
                        console.log(data);
                        alert("发送成功");
                        that.timerClock("#get-code");
                    },

                    error: function (data) {
                        console.log(data);
                        //alert('请求验证码失败');
                        if (data && data.desc) {
                            // alert('请求验证码失败');
                            alert(data.desc);
                        } else {
                            alert('请求验证码失败');
                        }
                    },

                    complete: function () {
                        setTimeout(function(){that.isAjaxGetcode = false;},1000);
                    }
                })
            }
        },

        // 表单验证
        verify: function (attr) {
            this.mobile = $('#tel').val(); // 手机号码的有效性
            this.code = $('#code').val(); // 6 位数字
            this.password = $('#password').val(); // 不能为空

            // 校验
            if(arguments.length == 0){
                if(!/^1(3[0-9]|5[012356789]|7[678]|8[0-9]|4[57])[0-9]{8}$/.test(this.mobile)){//手机号码的校验
                    alert("手机号码不正确！");
                    return false;
                }else if(this.password.length == 0){ //密码的校验
                    alert("密码不能为空");
                    return false;
                }else if(!/^[0-9]{6}$/.test(this.code)){//验证码的校验
                    alert("验证码不正确！");
                    return false;
                }else{
                    return true;
                }
            }else if(arguments.length == 1){
                if( attr = "tel"){
                    if(!/^1(3[0-9]|5[012356789]|7[678]|8[0-9]|4[57])[0-9]{8}$/.test(this.mobile)){//手机号码的校验
                        alert("手机号码不正确！");
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        },

        // 验证码计时器
        timerClock: function(target){
            var that = this;
            var total = 60;
            that.verifyFlag = 1;
            $(target).addClass("getcode-icon").html('剩余 ' + total + ' 秒');
            $(target).off();
            var t = setInterval(function () {
                if (total <= 1) {
                    clearInterval(t);
                    that.verifyFlag = 0;
                    $(target).removeClass("getcode-icon").html("获取验证码");
                    $(target).on('click', function () {
                        that.getCode();
                    })
                } else {
                    total--;
                    $(target).html("剩余 " + total + " 秒");
                }
            }, 1000);
        }
    };

    $(function () {
        main.init();
    })
})(Zepto)