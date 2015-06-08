/**
 * Created by hellsing on 2014/12/12.
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
    //根据时间戳转化为 YYYY-mm-dd hh:mm:ss 的标准格式
    Global.timeFormat = function(time){
        var timeDate = new Date(time*1000);
        var year = timeDate.getFullYear(timeDate);
        var month = timeDate.getMonth(timeDate)+1;
        var day = timeDate.getDate(timeDate);
        var hour = timeDate.getHours(timeDate);
        var minute = timeDate.getMinutes(timeDate);
        var second = timeDate.getSeconds(timeDate);
        return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    };
    var main = {
        init: function () {

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '订单详情';

            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });

            this.orderSn = params['orderSn'] || 0;
            this.fromUseless = params['fromUseless'] || 0;


            // 初始化lazyload
            lib.lazyload.init();


            this.addEvents();
            this.render();

            // gotop
            new lib.goTop();


        },

        addEvents: function () {
            var that = this;
            $('.radio').on('click',function(){
                if(!$(this).hasClass('radio-active')){
                    var name = $(this).attr('name');
                    $('.radio[name='+name+']').removeClass('radio-active');
                    $(this).addClass('radio-active');
                }
            })
        },
        //操作绑定事件
        addEventsAction:function(){
            var that = this;
            //取消订单接口
            $('.cancel').on('click',function(){
                var pop = lib.notification.confirm('您确定要取消这个订单吗？','',
                    function(e, isConfirm) {
                        if (isConfirm) {

                            lib.api.get({
                                api: {
                                    c: 'order',
                                    a: 'cancelOrder'
                                },
                                needLogin: true,
                                data: {
                                    //accessToken:"536_96a45e03889079692c29806cb895fd47_1418262450",
                                    order_sn:that.orderSn
                                },
                                success: function (data) {
                                    console.log(data);
                                    var pop = lib.notification.alert(data.desc, function() {
                                        this.hide();
                                        history.go(-1);
                                    });
                                    pop.show();
                                },
                                error: function (data) {
                                    var pop = lib.notification.alert(data.desc, function() {
                                        this.hide();
                                    });
                                    pop.show();
                                },
                                complete: function () {
                                    that.isAjax = false;
                                }
                            });
                        }
                        this.hide();
                    });
                pop.show();

            });
            //删除订单接口
            $('.delete').on('click',function(){
                var pop = lib.notification.confirm('您确定要删除这个订单吗？','',
                    function(e, isConfirm) {
                        if (isConfirm) {
                            lib.api.get({
                                api: {
                                    c: 'order',
                                    a: 'delorder'
                                },
                                needLogin: true,
                                data: {
                                    //accessToken:"536_96a45e03889079692c29806cb895fd47_1418262450",
                                    order_sn:that.orderSn
                                },
                                success: function (data) {
                                    console.log(data);
                                    var pop = lib.notification.alert(data.desc, function() {
                                        this.hide();
                                        window.location.href="order-list.html";
                                    });
                                    pop.show();
                                },
                                error: function (data) {
                                    var pop = lib.notification.alert(data.desc, function() {
                                        this.hide();
                                    });
                                    pop.show();
                                },
                                complete: function () {
                                    that.isAjax = false;
                                }
                            });
                        }
                        this.hide();
                    });
                pop.show();

            });
            //立即支付接口
            $('.pay').on('click',function(){
                if (that.isAjax) {
                    return;
                }

                var ua = window.navigator.userAgent.toLowerCase();
                var pay_type=20,apiUrl = null;
                if(ua.match(/MicroMessenger/i) ){
                    pay_type = 25;
                    apiUrl = "http://pay.api.ve.cn";
                }else{
                    pay_type = 20;
                }

                lib.api.get({

                    api: {
                        c: 'pay',
                        a: 'payOrder'
                    },
                    needLogin: true,
                    apiUrl:apiUrl,
                    data: {
                        pay_type:pay_type, //支付宝支付
                        in_app:0,     //网页支付
                        order_sn:that.orderSn
                    },
                    success: function (data) {
                        console.log(data);
                        window.location.href = data.html_url;
                    },
                    error: function (data) {
                        console.log(data);
                        var pop = lib.notification.alert(data.desc, function() {
                            this.hide();
                        });
                        pop.show();
                    },
                    complete: function () {
                        that.isAjax = false;
                    }

                    // mock 先
//                mock: {
//                    path: 'data/order-list.json',
////                   error: 1
//                }
                })
            });
            $('.logistic').on('click',function(){
               window.location.href = "logistics.html?order_sn="+that.orderSn;
            })
        },

        render: function () {
            if (!lib.login.isLogin()) {
                lib.login.goLogin();
                return;
            }

            var that = this;
            if (that.isAjax) {
                return;
            }

            that.isAjax = true;
            //获取订单信息
            lib.api.get({
                api: {
                    c: 'order',
                    a: 'odetails'
                },
                needLogin: true,
                data: {
                    //accessToken:"536_96a45e03889079692c29806cb895fd47_1418262450",
                    order_sn:that.orderSn
                },
                success: function (data) {
                    console.log(data);
                    if (data.order) {
                        that.renderAddress(data.order);
                        that.renderItems(data.order);
                        that.renderSum(data.order);
                        that.renderOrder(data.order);
                        that.renderAction(data.order);
                        that.addEventsAction();
                        that.discount();
                    } else {
                        that.renderError('empty');
                    }
                },
                error: function (data) {
                    var pop = lib.notification.alert(data.desc, function() {
                        this.hide();
                    }, {useTap :  true});
                    pop.show();
                },
                complete: function () {
                    that.isAjax = false;
                }
            });

        },
        //倒计时
        discount:function(){
            var that = this;
            if($('.order-discount')[0]){
                $('.order-discount span').each(function(i,item){
                    var seconds = parseInt($(item).attr('data'));
                    setInterval(function(){
                        seconds--;
                        if(seconds<=0){
                            window.location.reload();
                        }else{
                            var minute = Math.floor(seconds/60);
                            var second = seconds%60;
                            $(item).text((minute>9?minute:'0'+minute)+'分'+(second>9?second:'0'+second)+'秒');
                        }
                    },1000)
                })
            }
        },
        // 是否需要翻页
        checkNeedScroll: function () {
            return !this.is_have;
        },
        //插入收货地址或新建收货地址
        renderAddress:function(order){
            var $target = $('#address');
            var tpl = $('#tpl-address').html();
            $target.prepend(_.template(tpl)({
                order: order
            }));
        },
        // 插入商品列表
        renderItems: function (order) {
            var $target = $('.goods-container');
            var tpl = $('#tpl-goods').html();
            $target.append(_.template(tpl)({
                order: order
            }));
            lib.lazyload.trigger();
        },
        //插入商品总价
        renderSum: function(order){
            var $target = $('.goods-sum');
            var tpl = $('#tpl-sum').html();
            $target.append(_.template(tpl)({
                order: order
            }));
        },
        //插入订单信息
        renderOrder: function(order){
            var $target = $('.information-content');
            var tpl = $('#tpl-order-info').html();
            $target.prepend(_.template(tpl)({
                order: order,
                fromUseless:this.fromUseless
            }));
        },
        //插入操作
        renderAction: function(order){
            var $target = $('.main');
            var tpl = $('#tpl-action').html();
            $target.append(_.template(tpl)({
                order: order
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