/**
 * 选择省市区
 *
 * @requires
 * js:  ../../shares/ctrl/ctrl-selectmenu/build/selectmenu.js
 * css: @import "../../../shares/ctrl/ctrl-selectmenu/build/selectmenu.css";
 *
 * @use
 *
 app.selectAddress.init({
        confirmText: '',
        title: '',
        cancelText: '',
        trigger: '',  // html element object
        onConfirm: function (selectedValue) {}
      })
 *
 * @author 景烁
 *
 */
;(function ($, app) {

    var instance;
    var caches = {};
    var local;
    var isAjax = false;

    function getArea (areaId, cb) {
        if (caches[areaId]) {
            cb(caches[areaId]);
            return;
        }

        var emptyData = [{id:'',name:'我不清楚',pid:areaId}];

        lib.api.get({
            api: {
                c: 'user',
                a: 'get_area'
            },
            needLogin: false,
            data: {
                area_id: areaId
            },
            success: function (data) {
                data.data && cb(data.data);
                console.log(data);
                caches[areaId] = data.data;

            },
            error: function (error) {
                console.error(error);
                cb(emptyData);
                caches[areaId] = emptyData;
            }
        });
    }

    function initData (opts){
        var defaultAddr = {};
        var addrData = {};
        var id = opts.id || 1;
        var deep = opts.deep || 4;
        var cb = opts.onReady;
        var deepMap = {
            4: 'province',
            3: 'city',
            2: 'area',
            1: 'street'
        };
        getArea(id, function (addrs) {
            var grade = deepMap[deep];
            var localIndex = null;
            addrData[grade] = [];
            addrs.forEach(function (data, index) {
                if(local.content.address_detail[grade] && (data.name.indexOf(local.content.address_detail[grade])!=-1||local.content.address_detail[grade].indexOf(data.name)!=-1)){
                    localIndex = index;
                }
                var addr = {
                    key: data.name,
                    value: data.id,
                    selected: index === (localIndex || 0)
                };
                addrData[grade].push(addr);


            });

            defaultAddr[grade] = addrData[grade][localIndex||0];
            deep--;
            if (deep < 1) {
                cb && cb(addrData);
            } else {
                getArea(defaultAddr[grade].value, arguments.callee);
            }
        })

    }

    function init(addrData, opts){
        opts = opts || {};

        var SelectMenu = ctrl.selectmenu;
        instance = new SelectMenu({
            confirmText: opts.confirmText || '确定',
            title: opts.title || '',
            cancelText: opts.opts || '取消',
            trigger: opts.trigger,
            verifyMe:function(){
                return !isAjax;
            }
        });

        instance.viewModel = addrData;

        instance.addEventListener('confirm', function (e) {
            console.log(isAjax);
            if(!isAjax){
                opts.onConfirm(this.selectedValue);
            }
        });

        instance.addEventListener('select', function (colName) {
            var selectedId = this.selectedValue['val-' + colName];
            var that = this;
            console.log(isAjax);
            isAjax = true;
            if (colName == 'province') {
                initData({
                    id: selectedId,
                    deep: 3,
                    onReady: function (data) {
                        that.linkage('city', data.city);
                        that.linkage('area', data.area);
                        that.linkage('street', data.street);
                    }
                })
            } else if (colName == 'city') {
                initData({
                    id: selectedId,
                    deep: 2,
                    onReady: function (data) {
                        that.linkage('area', data.area);
                        that.linkage('street', data.street);
                    }
                })
            } else if (colName == 'area') {
                initData({
                    id: selectedId,
                    deep: 1,
                    onReady: function (data) {
                        that.linkage('street', data.street);
                    }
                })
            } else if(colName == 'street'){
                isAjax = false;
            }
        });

        document.body.appendChild(instance.root);
    }

    app.selectAddress = {
        init: function (opts) {

            $.ajax({
                type: 'GET',
                url: 'http://api.map.baidu.com/location/ip?ak=7LKIOX88UcaHWrMDzN7coBub&coor=bd09ll&qt=loc&callback=?',
                data: { name: 'Zepto',type:"JSONP" },
                success: function(result){
//                    local.content.address_detail.province='西藏';
//                    local.content.address_detail.city='山南';
                    local = result;
                    initData({
                        onReady: function (data) {
                            init(data, opts);
                        }
                    });
                },
                error: function(xhr, type){
                    console.log('Ajax error!');
                    initData({
                        onReady: function (data) {
                            init(data, opts);
                        }
                    },{'content':{'address_detail':{'province':'浙江省','city':'杭州市'}}});
                }
            });
        }
    };

})(Zepto,  window['app'] || (window['app'] = {}))
/**
 * Created by chenmingyang on 15-2-12.
 */
/**
 * Created by hellsing on 2014/12/11.
 */
;(function ($) {

    // fix: http://img.ve.cnttp://s1.ve.cn/public/attachment/201411/17/23/20141117234717151_3.jpg
    Global.formatImgSrc = function (src) {
        if (!src) {
            return 'http://h5.ve.cn/assets/img/cart_img_black_640x253.png';
        }

        var match = src.match(/^http:\/\/img\.ve\.cnttp(.+)_3\.jpg/);
        if (match) {
            return 'http' + match[1] + '.jpg';
        } else {
            return src;
        }
    };

    var main = {
        init: function () {

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '确认订单';

            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });

            this.proType = parseInt(params['proType']) || 0;
            this.cartId = parseInt(params['cartId']) || 0;
            this.code = params['code'] || 0;
            this.id = params['id'] || 0;
            this.value = params['value'] || 0;

            this.duringPay = false;


            if(this.proType){
                $('.note-container a').attr('href','login.html?redirectUrl=order-confirm.html%3FproType%3D1');
            }

            // 初始化lazyload
            lib.lazyload.init();


            this.addEvents();

//            this.bottombar = new ctrl.bottomBar({
//                showBottom:true
//            });

            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) ){
                $(".weixinpay").css("display","block");
            }else{
                $(".weixinpay").hide();
            }

            // gotop
            new lib.goTop();

            //检测是否支持微信支付
            //if(lib.env.app.isWeixin){
            //    $('.weixinpay').removeClass('hidden');
            //}

            this.render();
            this.brandId = params['brandId'] || 0;
            this.categoryId = params['categoryId'] || 0;

        },
        addEvents: function () {
            var that = this;
            $('#get-code').on('click', function () {
                that.getCode();
            });
            //$('.weixinpay').on('click',function(){
            //    WeixinJSBridge.invoke('getBrandWCPayRequest', {
            //            "appId": "wxf187e8731e014854",
            //            "timeStamp": "1419832333",
            //            "nonceStr": "31784d9fc1fa0d25d04eae50ac9bf787",
            //            "package": "Sign=WXPay",
            //            "signType": "SHA1",
            //            "paySign": "d14fe23a832aa313e429bc87c2c0de37c47c15b9"
            //        },
            //        function(res) { //返回res.err_msg,取值//get_brand_wcpay_request:cancel用户取消 //get_brand_wcpay_request:fail 发送失败 //get_brand_wcpay_request:ok发送成功
            //            WeixinJSBridge.log(res.err_msg);
            //            alert(res.err_msg);
            //            alert(res.err_code+res.err_desc);
            //        }
            //    );
            //});

            $('.payinfo').on('click',function(){

                if(!that.verify()){
                    return;
                }

                var pay_type = 20,apiUrl = null;
                if($(this).attr("paytype")=="alipay"){
                    pay_type=20;
                }else if($(this).attr("paytype")=="wxpay"){
                    pay_type = 25;
                    apiUrl = "http://pay.api.ve.cn";
                }

                if(!that.duringPay){
                    that.duringPay = true;
                    that.paragram = {
                        source:'h5',
                        in_app:0,  //表示网页支付
                        order_type:(that.proType-0+1) //是否海淘商品
                    };
                    //that.paragram.pay_type = $(this).hasClass('alipay')?20:23; //20表示支付宝
                    that.paragram.pay_type = pay_type; //20表示支付宝
                    that.name && (that.paragram.name = that.name); //收货人
                    that.phone && (that.paragram.phone = that.phone); //手机
                    that.code && (that.paragram.verify_code = that.code); //手机验证码
                    that.province && (that.paragram.provice = that.province); //省
                    that.city && (that.paragram.city = that.city); //市
                    that.area && (that.paragram.area = that.area); //区
                    that.street && (that.paragram.town = that.street); //街道
                    that.addressDet && (that.paragram.address = that.addressDet); //详细地址
                    that.cartId && (that.paragram.ids = that.cartId); //购物车id

                    lib.api.get({
                        api: {
                            c: 'FreeOrder',
                            a: 'add_User_Order'
                        },
                        needLogin: lib.login.isLogin(),
                        apiUrl:apiUrl,
                        data: that.paragram,
                        success: function (data) {
                            console.log(data);
                            lib.login.login(data, data.html_url);
                            //下单后记录订单号和订单id
                            //lib.h5log.log(["setCustomVariable", 2, "orderId", data.order_id, "visit"]);
//                            lib.h5log.log(["setCustomVariable", 5, "orderSn", data.order_sn, "page"]);
//                            setTimeout(function(){
////                                window.location.href = data.html_url;
//                            },100);
                        },
                        error: function (data) {
                            var pop = lib.notification.alert(data.desc, function() {
                                this.hide();
                            });
                            pop.show();
                        },
                        complete: function () {
                            that.duringPay = false;
                        }
                    });
                }
            });

        },

        // 获取验证码
        getCode: function () {
            var that = this;
            if(that.isAjaxGetcode == true){
                return;
            }

            // 验证手机号码的合法性
            if (this.verifyMobile("tel")) {
                that.isAjaxGetcode = true;
                lib.api.get({
                    api: {
                        c: 'sms',
                        a: 'sendMsg'
                    },
                    data: {
                        mobile: this.phone,
                        status: 'free_user'
                    },

                    success: function (data) {
                        console.log(data);
                        lib.notification.simple("发送成功",'',1000);
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
        },


        render: function () {
//            if (!lib.login.isLogin()) {
//                lib.login.goLogin();
//                return;
//            }

            var that = this;
            app.selectAddress.init({
                confirmText: '',
                title: '',
                cancelText: '',
                trigger: document.getElementById('provice'),  // html element object
                onConfirm: function (selectedValue) {
                    that.pro = selectedValue;
                    console.log(selectedValue);
                    $("#provice").css("color","#333");
                    that.province = selectedValue['val-province'];
                    that.city = selectedValue['val-city'];
                    that.area = selectedValue['val-area'];
                    that.street = selectedValue['val-street'];
                    $("#provice").html((selectedValue['key-province']||"")+(selectedValue['key-city']||"")+(selectedValue['key-area']||"")+(selectedValue['key-street'])||"");
                }
            });



            if (that.isAjax) {
                return;
            }


            that.isAjax = true;
            //购物车接口获取商品信息
            lib.api.get({
                api: {
                    c: 'shoping',
                    a: 'get_User_Cart'
                },
                needLogin: lib.login.isLogin(),
                data: {
                    accessToken:"",
                    cart_ids:that.cartId||""
                },
                success: function (data) {
                    console.log(data);
                    if(that.proType && !data.is_sea_order){
                        var pop = lib.notification.alert(data.sea_limit_message, function() {
                            this.hide();
                            window.location.href = "cart.html?type=2";
                        }, {useTap :  true});
                        pop.show();
                    }
                    var products = that.proType?data.sea_products:data.products;
//                    var emptyFlag = true;
//                    if(products && products[0]){
//                        for(var i in products){
//                            if(products[i].orders && products[i].orders[0]){
//                                emptyFlag = false;
//                            }
//                        }
//                    }
                    if (products && products[0]) {
                        $('.container').show();
                        $('.loading').hide();
                        that.renderItems(data);
                        that.renderSum(data);
//                        that.renderCoupon(data);
//                        $('.coupon-row').attr('href','coupon-select.html?total='+(that.proType?data.sea_total_price:data.total_price)+(that.code?('&code='+that.code):'')+(that.proType?'&proType=1':''));
                    } else {
//                        var pop = lib.notification.alert('购物车内没有商品，请返回订单列表', function() {
//                            this.hide();
                            window.location.href = "order-list.html#status=1";
//                        }, {useTap :  true});
//                        pop.show();
                    }
                },
                error: function (data) {
                    var pop = lib.notification.alert(data.desc, function() {
                        this.hide();
                        window.location.href = "order-list.html";
                    }, {useTap :  true});
                    pop.show();
                },
                complete: function () {
                    that.isAjax = false;
                }
            });

        },
        verifyMobile:function(){
            this.phone = $('#phone').val();
            if(!this.phone){
                lib.notification.simple('请先填写手机号码','',1000);
                return false;
            }
            if( !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)){ //判断用户名是否是手机号码
                lib.notification.simple('手机格式错误','',1000);
                return false;
            }
            return true;
        },
        verify:function(){
            this.name = $('#username').val();
            this.phone = $('#phone').val();
            this.code = $('#code').val();
            this.addressDet = $('#addressDet').val();

            // 校验
            this.name = this.name.trim();
            this.addressDet = this.addressDet.trim();
            if(this.phone.length == 0){
                lib.notification.simple("手机号码不能为空",'',1000);
                return false;
            }
            if(this.code.length == 0){
                lib.notification.simple("验证码不能为空",'',1000);
                return false;
            }
            if(this.name.length == 0){
                lib.notification.simple("收货人不能为空",'',1000);
                return false;
            }
            if(this.name.length > 12){
                lib.notification.simple("用户名长度不能超过12个字符",'',1000);
                return false;
            }
            if( !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)){ //判断用户名是否是手机号码
                lib.notification.simple('手机格式错误','',1000);
                return false;
            }
            if(this.pro == null || this.pro==""){
                lib.notification.simple("省市区不能为空",'',1000);
                return false;
            }
            if(this.addressDet.length == 0){
                lib.notification.simple("详细地址不能为空",'',1000);
                return false;
            }

            return true;
        },

        // 是否需要翻页
        checkNeedScroll: function () {
            return !this.is_have;
        },
        //插入收货地址或新建收货地址
        renderAddress:function(addressData){
            var $target = $('#address');
            var that = this;
            var tpl = $('#tpl-address').html();
            $target.prepend(_.template(tpl)({
                addressData: addressData,
                proType:that.proType,
                isLogin:lib.login.isLogin()
            }));
        },
        // 插入商品列表
        renderItems: function (data) {
            var products = this.proType?data.sea_products:data.products;
            for(var i in products){
                var sum = 0;
                for(var j in products[i].orders){
                    sum += products[i].orders[j].price * products[i].orders[j].num;
                }
                products[i].sum = sum;
            }
            var total_price = this.proType?data.sea_total_price:data.total_price;
            var $target = $('#orders');
            var tpl = $('#tpl-goods').html();
            $target.append(_.template(tpl)({
                products: products,
                proType:this.proType,
                total_price:total_price
            }));
            lib.lazyload.trigger();
        },
        //插入商品总价
        renderSum: function(data){
            //var products = this.proType?data.sea_products:data.products;
            //for(var i= 0,sum=0;i<products.length;i++){
            //    sum += products[i].orders.length;
            //}
            var $target = $('.pay-container');
            var tpl = $('#tpl-pay').html();
            $target.prepend(_.template(tpl)({
                data: data,
                value:this.value,
                proType:this.proType
            }));
        },

        // type: empty, param, network
        renderError: function (type) {
            switch (type) {
                case 'param':
                    this.showTip('缺少必要参数');
                    break;
                case 'network':
                    this.showTip('服务器开小差啦');
                    break;
                case 'empty':
                    this.showTip('当前条件，列表为空');
                    break;
            }
        },

        showTip: function (txt) {
            var $errorBox = $('.info-tip');
            $errorBox.html(txt).show();
        }

    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));