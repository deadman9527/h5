/**
 * Created by chenmingyang on 15-2-5.
 */
;(function ($) {
    var main = {

        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
//            this.redirectUrl = params['redirectUrl'];
            this.proType = parseInt(params['proType']) || 0;
            this.addEvents();
            this.topbar = new ctrl.topBar({
                isIndex: false
            });
        },

        addEvents: function () {
            var that = this;

            $('#submit').on('click', function () {
                that.submit();
            });

            $('#get-code').on('click', function () {
                that.getCode();
            });

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
                        c: 'FreeUser',
                        a: 'free_register'
                    },
                    data: {
                        phone: this.mobile,
                        verify_code: this.code,
                        app: 'h5'
                    },

                    success: function (data) {
                        console.log(data);
                        //记录用户注册
                        data.user.area = data.user.area?data.user.area:{};
                        data.user.area.phone = that.mobile;
                        lib.storage.set('editAddressData',data.user.area);
                        lib.login.login(data, 'address-add.html?isDirect=1&proType='+that.proType);

                        //location.href = that.redirectUrl?'login.html?redirectUrl=' + encodeURIComponent(that.redirectUrl) : 'login.html';
                    },

                    error: function (data) {

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
                        status: 'free_user'
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

            // 校验
            if(arguments.length == 0){
                if(!/^1(3[0-9]|5[012356789]|7[678]|8[0-9]|4[57])[0-9]{8}$/.test(this.mobile)){//手机号码的校验
                    alert("手机号码不正确！");
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