
/**
 * Created by hellsing on 2015/1/4.
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
            var title = params['title'] ? decodeURIComponent(params['title']) : '申请退货';

            document.title = title;
            this.orderSn = params['orderSn'] || 0;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.bottombar = new ctrl.bottomBar({
                showBottom:true
            });


            // 初始化lazyload
            lib.lazyload.init();


            this.render(true);

            // gotop
            new lib.goTop({
                position:{
                    bottom:60
                }
            });


        },

        addEventsLink:function(){
            var that = this;
            $('.detail-link').on('click',function(){
                var orderSn = $(this).attr('data-id');
                var location = 'order-detail.html?orderSn='+orderSn;
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


            that.isAjax = true;
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
                    that.hideTip();
                    that.renderItems(data.order);
                    that.addEventsLink();
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


        renderItems: function (item) {
            $('.info-tip').hide();
            console.log(this.status);
            var $target = $('#orders');
            var tpl = $('#tpl-item').html();
            $target.append(_.template(tpl)({
                item: item
            }));
            //this.addEventsAction();

            lib.lazyload.trigger();
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