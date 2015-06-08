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
            this.code = params['code'] || 0;
            this.id = params['id'] || 0;
            this.value = params['value'] || 0;

            this.duringPay = false;

            // 初始化lazyload
            lib.lazyload.init();


            this.addEvents();
            this.render();

            this.bottombar = new ctrl.bottomBar({
                showBottom:true
            });

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

        },
        addEvents: function () {
            var that = this;

            $('.radio').on('click',function(){
                if(!$(this).hasClass('radio-active')){
                    var name = $(this).attr('name');
                    $('.radio[name='+name+']').removeClass('radio-active');
                    $(this).addClass('radio-active');
                }
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
            $('.delivery-title').on('click',function(){
                if($(this).find('.arrow-right').hasClass('arrow-down')){
                    $(this).find('.arrow-right').removeClass('arrow-down');
                    $('.delivery-content').hide();
                }else{
                    $(this).find('.arrow-right').addClass('arrow-down');
                    $('.delivery-content').show();
                }
            });
            $('.delivery-content .radio').unbind('click');
            $('.delivery-content .select-row').on('click',function(){
                if(!$(this).find('.radio-active')[0]){
                    console.log('change');
                    $('.delivery-content .radio-active').removeClass('radio-active');
                    $(this).find('.radio').addClass('radio-active');
                    $('.delivery-text').html($(this).text());
                }
                $('.delivery-content').hide();
                $('.delivery-title .arrow-right').removeClass('arrow-down');
            });
            $('.invoice-title').on('click',function(){
                if($(this).find('.arrow-right').hasClass('arrow-down')){
                    $(this).find('.arrow-right').removeClass('arrow-down');
                    $('.invoice-content').hide();
                }else{
                    $(this).find('.arrow-right').addClass('arrow-down');
                    $('.invoice-content').show();
                }
            });

            $('.payinfo').on('click',function(){
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
                    that.paragram.addr_id = $('.address-container').attr('data-id'); //收货地址id
                    that.paragram.mess = $('.delivery-text').text(); //备注
                    if(that.code){
                        that.paragram.code = that.code; //优惠券码
                    }
                    if(that.id){
                        that.paragram.coupon_id = that.id; //优惠券ID
                    }
                    that.paragram.is_invoices = $('.invoice-content .radio-active[name="type"]').index()>1?1:0; //是否开发票
                    if(that.paragram.is_invoices){
                        that.paragram.invoices_type =$('.invoice-content .radio-active[name="type"]').index()-2;//0个人 1公司
                        that.paragram.invoices_cpy = $('.invoice-content .invoice-input').val(); //发票抬头
                        that.paragram.invoices_class  =$('.invoice-content .radio-active[name="content"]').index(); //发票内容
                    }
                    if(that.paragram.addr_id){
                        lib.api.get({
                            api: {
                                c: 'order',
                                a: 'add_User_Order'
                            },
                            needLogin: true,
                            apiUrl:apiUrl,
                            data: that.paragram,
                            success: function (data) {
                                console.log(data);
                                //下单后记录订单号和订单id
                                //lib.h5log.log(["setCustomVariable", 2, "orderId", data.order_id, "visit"]);
                                lib.h5log.log(["setCustomVariable", 5, "orderSn", data.order_sn, "page"]);
                                setTimeout(function(){
                                    window.location.href = data.html_url;
                                },100);
                            },
                            error: function (data) {
                                var pop = lib.notification.alert(data.desc, function() {
                                    this.hide();
                                }, {useTap :  true});
                                pop.show();
                            },
                            complete: function () {
                                that.duringPay = false;
                            }
                        });
                    }else{
                        var pop = lib.notification.alert('请添加收货地址', function() {
                            this.hide();
                        }, {useTap :  false});
                        pop.show();
                    }
                }
            });

        },

        render: function () {
//            if (!lib.login.isLogin()) {
//                lib.login.goLogin();
//                return;
//            }
            var that = this;
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
                    accessToken:""
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
                        that.renderNext();
                        that.renderItems(data);
                        that.renderSum(data);
                        that.renderCoupon(data);
                        $('.coupon-row').attr('href','coupon-select.html?total='+(that.proType?data.sea_total_price:data.total_price)+(that.code?('&code='+that.code):'')+(that.proType?'&proType=1':''));
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
        renderNext:function(){
            var that = this;
            if(lib.login.isLogin()){
                if(lib.login.isLogin()){
                    //收货地址接口获取收货地址
                    lib.api.get({
                        api: {
                            c: 'user',
                            a: 'getaddress'
                        },
                        needLogin: true,
                        data: {
                            //accessToken:"536_32e5986629c7e5be5f94fbdcaad8026f_1418111865"
                        },
                        success: function (data) {
                            console.log(data);
                            lib.storage.set('addressList',data);
                            var addressData=data.addresses[0];
                            if(lib.storage.get('addressSelectedId')){
                                for(var i=0;i<data.addresses.length;i++){
                                    if(data.addresses[i].id == lib.storage.get('addressSelectedId')){
                                        addressData = data.addresses[i];
                                    }
                                }
                            }
                            that.renderAddress(addressData);
                            $('.container').show();
                            $('.loading').hide();

                            //lib.storage.set('addressList','');
                        },
                        error: function (data) {
                            if(data.code= '00007'){
                                that.renderAddress();
                                $('.container').show();
                                $('.loading').hide();
                            }
                        },
                        complete: function () {
                            that.isAjax = false;
                        }
                    });
                }else{
                    that.renderAddress();
                }
            }else{
                that.renderAddress();
                $('.container').show();
                $('.loading').hide();
            }


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
        //插入coupon-container
        renderCoupon:function(data){
            var $target = $('.coupon-container');
            var tpl = $('#tpl-coupon').html();
            var isLogin = lib.login.isLogin();
            $target.prepend(_.template(tpl)({
                data: data,
                proType:this.proType,
                isLogin:isLogin
            }));


            if(this.code){
                $('.coupon-row .unselected').remove();
                $('.coupon-row').append('<span class="select-content">'+this.value+'元优惠券</span>');
            }
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