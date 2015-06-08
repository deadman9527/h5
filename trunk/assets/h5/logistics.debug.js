/**
 * 物流详情页
 *
 * Created by dingqianqian on 14-12-9.
 *
 * @author qianqian
 * @time 2014-12-13
 */
;(function ($) {

    var main = {
        init: function () {
            this.len = this.render();

            this.hideGoods();

            this.getGoods();

            var title = "物流详情";

            new ctrl.topBar({
                isIndex: false,
                title: title
            });
        },

        addEvents: function () {
            var that = this;
            var isHide = true;
            var isHideLog = true;

            $('.hideLogistics').on('click', function(){
                //console.log('hideLogistics clicked');
                if(isHideLog == false){
                    that.hideLogistics($(this));
                    isHideLog = true;
                }else{
                    that.showLogistics($(this));
                    isHideLog = false;
                }
            });
            $('#hide-goods').on('click',function(){
                //console.log('hide-goods clicked');
                if(isHide == false){
                    that.hideGoods();
                    isHide = true;
                }else{
                    that.showGoods();
                    isHide = false;
                }
            });
        },

        getOrderSn: function(){
            //console.log('get orderSn');
            httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var order_sn = params['order_sn']? params['order_sn']:'';
            return order_sn;
        },

        //获取商品信息
        getGoods: function () {
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
                needLogin: true,
                api: {
                    c: 'order',
                    a: 'odetails'
                },
                data: {
                    order_sn: that.getOrderSn()
                },
                //mock: {
                //    path: 'data/odetail.json'
                //},
                success: function(data){

                    console.log(data);
                    if (data.order && data.order.product) {
                        that.renderItems(data.order);
                        that.length = data.order.product.length;
                        //console.log(length);

                        if(that.length > 1){
                            that.hideGoods();
                            $("#hide-goods").css('display','block');
                        }else{
                            $("#hide-goods").hide();
                        }
                        that.addEvents();
                    } else {
                        that.renderError('empty');
                    }
                },

                error: function(data){
                    if (data && data.desc) {
                        console.log(data.desc);
                    }
                },

                complete: function(){
                    //console.log('get goods complete');
                    that.isAjax = false;
                }
            });
        },

        // 获取物流信息
        render: function () {
            var that = this;
            var len = 0;

            lib.api.get({
                api: {
                    c: 'Logistics',
                    a: 'fast'
                },
                data: {
                    order_sn: that.getOrderSn()
                },
                //mock: {
                //    path: 'data/express.json'
                //},

                success: function (data) {
                    console.log(data );
                    //物流信息的展示

                    if(data){
                        if(data.code == "00000"){
                            that.renderLogistics(data);
                        }else if(data.code == "10002"){
                            $('.container').append('<div class="logistics module"><p class="text-center o_tips">该订单还没有快递单号</p></div>');
                        } else{
                            $('.container').append('<div class="logistics module"><p class="text-center o_tips">暂无物流信息</p></div>');
                        }

                        that.addEvents();
                    }
                },

                error: function (data) {
                    if (data && data.desc) {
                        console.log(data.desc);
                        //$(".logistics-info").hide();
                        $(".logistics").css("border-top","none");
                        $('.container').append('<div class="logistics module"><p class="text-center o_tips">该订单还没有快递单号</p></div>');
                    }
                },

                complete: function () {

                }
            });
        },

        //隐藏商品
        hideGoods: function(){
            var that = this;
            console.log('hide goods '+that.length);

            $(".goods ul li").first().show().siblings().hide();
            $(".goods ul li").first().css('padding-bottom',0);
            $("#hide-goods").text("显示全部"+ that.length +"条商品信息").css("color","#333");
        },

        showGoods: function(){
            console.log('show goods');
            $(".goods ul li").show();
            $(".goods ul li").first().css('padding-bottom','8px');
            $("#hide-goods").text("收起").css("color","#999");
        },

        //隐藏物流详情
        hideLogistics: function ($target) {
            console.log($target);

            $target.siblings('.logistics_list').find("li.hide").hide();
            $target.text("查看全部物流信息").css("color","#333");
            console.log('hide logistics over');
        },

        showLogistics: function($target){
            console.log('show logistics');
            $target.siblings(".logistics_list").find(".hide").show();
            $target.text("收起").css("color","#999");
            console.log('show logistics over');
        },

        // 插入商品列表
        renderItems: function (order) {
            var $target = $('.goods-container');
            var tpl = $('#tpl-goods').html();
            $target.append(_.template(tpl)({
                order: order
            }));
            //lib.lazyload.trigger();
        },

        //插入物流信息
        renderLogistics: function(data){
            console.log(orders);
            var $target = $('.container');
            var tpl = $('#tpl-logistics').html();
            $target.append(_.template(tpl)({
                orders: data.orders || '',
                code: data.code,
                desc: data.desc
            }));
        }
    };

    $(function () {
        main.init();
    })
})(Zepto)