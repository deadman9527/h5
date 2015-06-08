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
    //根据时间戳转化为 YYYY-mm-dd hh:mm:ss 的标准格式
    Global.discount = function(time){
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
            var title = params['title'] ? decodeURIComponent(params['title']) : '我的订单';

            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.bottombar = new ctrl.bottomBar({
                showBottom:true
            });

            //if (!this.brandId && !this.categoryId) {
            //    this.renderError('param');
            //    return;
            //}

            // 0 时存在翻页
            // 1 时是一次性给结果
            this.is_have = params['is_have'] || 0;
            this.page = 1;

            this.status = parseInt(window.location.hash.split('status=')[1])||0;

            $('.order-status').eq(this.status).find('p').addClass('active');
            // 初始化lazyload
            lib.lazyload.init();

            // 初始化scroll load
            var that = this;
            this.infiniteScroll = lib.infiniteScroll.init({
                bufferPx: 150, // 距离低端px就触发onNear事件
                time: 200, // 设置延迟触发onNear
                onNear: function () {
                    that.render();
                },
                end: function () {
                    return that.isEnd;
                },
                //onEnd: null, // 加载完了怎么办
                //onScroll: null // scroll 事件处理
            });

            this.addEvents();
            this.render(true);

            // gotop
            new lib.goTop({
                position:{
                    bottom:60
                }
            });


        },

        addEvents: function () {
            var that = this;
            $('.order-status').on('click',function(){
                if(!$(this).find('p').hasClass('active')){
                    window.location.hash = 'status='+$(this).index();
                    $('.order-status p').removeClass('active');
                    $(this).find('p').addClass('active');
                }
            });
            window.addEventListener('hashchange',function(){
                that.status = parseInt(window.location.hash.split('status=')[1])||0;
                $('.order-status p').removeClass('active');
                $('.order-status').eq(that.status).find('p').addClass('active');
                that.render(true);
            })
        },
        addEventsLink:function(){
            var that = this;
            $('.detail-link').on('click',function(){
                var orderSn = $(this).attr('data-id');
                var location = 'order-detail.html?orderSn='+orderSn;
                if($('.active').parent().index()==3){
                    location += '&fromUseless=1'
                }
                window.location.href = location;
            });
            $('.show').on('click',function(){
                $(this).closest('.order-container').find('.hidden').removeClass('hidden');
                $(this).addClass('hidden');
            });
            $('.hide').on('click',function(){
                $(this).closest('.order-container').find('ul li').addClass('hidden').eq(0).removeClass('hidden');
                $('.show').removeClass('hidden');
                $(this).addClass('hidden');
            });
        },

        render: function (needReset) {
            if (!lib.login.isLogin()) {
                lib.login.goLogin();
                return;
            }
            var that = this;
            if (that.isAjax) {
                return;
            }

            if (needReset) {
                this.page = 1;
                this.infiniteScroll.remove();

                $('#orders').empty();
                this.showTip('数据加载中...');
            }

            that.isAjax = true;
            lib.api.get({

                api: {
                    c: 'order',
                    a: 'orderlist'
                },
                needLogin: true,
                data: {
                    page: this.page,
                    //accessToken:'536_96a45e03889079692c29806cb895fd47_1418262450',
                    status:this.status
                },
                success: function (data) {
                    console.log(that.page);
                    console.log(data);
                    if (Array.isArray(data.orders)) {
                        that.hideTip();
                        that.renderItems(data.orders);
                        if(!data.orders.length && that.page==1){
                            that.showTip('该状态还没有订单~');
                        }else{
                            if (that.checkNeedScroll()) {
                                !that.infiniteScroll.started && that.infiniteScroll.start();
                            }
                        }

                    } else {
                        if (that.page == 1) {
                            that.renderError('empty');
                        } else {
                            that.isEnd = true;
                        }
                    }
                    that.page++;
                    that.addEventsLink();
                    that.discount();
                },
                error: function (data) {
                    if(data.code=='10007'){
                        that.infiniteScroll.remove();
                        if(that.page==1){
                            that.showTip('该状态还没有订单~');
                        }
                    }
                },
                complete: function () {
                    that.isAjax = false;
                },

                // mock 先
//                mock: {
//                    path: 'data/order-list.json',
////                   error: 1
//                }
            })
        },

        //倒计时
        discount:function(){
            var that = this;
            if($('.order-discount')[0]){
                $('.order-discount span').each(function(i,item){
                    var seconds = parseInt($(item).attr('data'));
                    var t = setInterval(function(){
                        seconds--;
                        if(seconds<=0){
                            that.render(true);
                            clearInterval(t);
                        }else{
                            var minute = Math.floor(seconds/60);
                            var second = seconds%60;
                            $(item).text((minute>9?minute:'0'+minute)+':'+(second>9?second:'0'+second));
                        }
                    },1000)
                })
            }
        },

        // 是否需要翻页
        checkNeedScroll: function () {
            return !this.is_have;
        },

        renderItems: function (itemList) {
            $('.info-tip').hide();
            console.log(this.status);
            var $target = $('#orders');
            var tpl = $('#tpl-item').html();
            $target.append(_.template(tpl)({
                itemList: itemList,
                status:this.status
            }));
            this.addEventsAction();

            lib.lazyload.trigger();
        },
        //订单列表的操作事件绑定
        addEventsAction:function(){
            var that = this;
            $('.pay').on('click',function(){
                var order_sn = $(this).closest('.order-container').find('.detail-link').attr('data-id');
                if (that.payAjax) {
                    return;
                }
                that.payAjax = true;

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
                        order_sn:order_sn
                    },
                    success: function (data) {
                        console.log(data);
                        window.location.href = data.html_url;
                    },
                    error: function (data) {
                        console.log(data);
                        var pop = lib.notification.alert(data.desc, function() {
                            this.hide();
                        }, {useTap :  true});
                        pop.show();
                    },
                    complete: function () {
                        that.payAjax = false;
                    }
                    //mock 先
//                  mock: {
//                      path: 'data/order-list.json',
//                      error: 1
//                  }
                })
            });
            $('.logistic').on('click',function(){
                var order_sn = $(this).closest('.order-container').find('.detail-link').attr('data-id');
                window.location.href = 'logistics.html?order_sn='+order_sn;
            });
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
        },
        hideTip: function () {
            var $errorBox = $('.info-tip');
            $errorBox.html('').hide();
        }

    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));