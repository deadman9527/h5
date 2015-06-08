
/**
 * Created by hellsing on 2014/12/18.
 */
;(function ($) {
    var main = {
        init: function () {

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '选择优惠券';

            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });

            this.code = params['code'] || 0;
            this.total = params['total'] || 0;
            this.proType = params['proType'] || 0;

            this.render();
            this.addEvents();
            // gotop
            new lib.goTop();
        },
        addEvents:function(){
            var that = this;
            $('.activate-btn').on('click',function(){
                var code = $('.input').val();
                if(code){
                    //激活优惠券
                    lib.api.get({
                        needLogin: true,
                        api: {
                            c: 'Coupons',
                            a: 'activateCoupon'
                        },
                        data: {
                            coupon_code:code
                        },
                        success: function (data) {
                            console.log(data);
                            $('#coupons').empty();
                            that.render();
                        },
                        error: function (data) {
                            var pop = lib.notification.alert(data.desc, function() {
                                this.hide();
                            });
                            pop.show();
                        },
                        complete: function () {
                            //that.isAjax = false;
                        }
                    });
                }else{
                    var pop = lib.notification.alert('请输入优惠券码', function() {
                        this.hide();
                    });
                    pop.show();
                }
            });
        },
        addEventsSelect: function () {
            var that = this;
            $('.coupon-container').on('click',function(){
                if(!$(this).hasClass('active')){
                    var condition = $(this).attr('data-condition');
                    if(parseFloat(condition)>parseFloat(that.total)){
                        var pop = lib.notification.alert('非常抱歉，您的订单金额未达到这张优惠券的使用要求', function() {
                            this.hide();
                        }, {useTap :  false});
                        pop.show();
                    }else{
                        $('.active .coupon-right .content').empty().append('<div class="unselected">未使用</div>');
                        $('.active').removeClass('active');
                        $(this).find('.coupon-right .content').empty().append('<div class="selected"></div>');
                        $(this).addClass('active');
                        var code = $(this).attr('data-code');
                        var id = $(this).attr('data-id');
                        var value = $(this).find('.price').text();
                        setTimeout(function(){
                            window.location.href = 'order-confirm.html?code='+code+'&value='+value+'&id='+id+(that.proType?'&proType=1':'');
                        },500);
                        $('.coupon-container').unbind('click');
                    }
                }else{
                    $('.active .coupon-right .content').empty().append('<div class="unselected">未使用</div>');
                    $('.active').removeClass('active');
                    setTimeout(function(){
                        window.location.href = 'order-confirm.html'+(that.proType?'?proType=1':'');
                    },500);
                    $('.coupon-container').unbind('click');
                }
            })
        },

        render: function () {
            console.log('getList');
            var that = this;
            if (that.isAjax) {
                return;
            }
            that.isAjax = true;
            //获取优惠券列表
            lib.api.get({
                needLogin: true,
                api: {
                    c: 'Coupons',
                    a: 'getUserConpon'
                },
                data: {
                    useable:1
                },
                success: function (data) {
                    console.log(data);
                    if(data.data.coupon){
                        that.renderItems(data);
                        that.addEventsSelect();
                    }else{
                        var pop = lib.notification.alert('优惠券列表为空哦，不过您可以通过优惠券码激活优惠券', function() {
                            this.hide();
                        });
                        pop.show();
                    }
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
        },

        // 是否需要翻页
        checkNeedScroll: function () {
            return !this.is_have;
        },
        //插入优惠券列表
        renderItems:function(data){
            var $target = $('#coupons');
            var tpl = $('#tpl-coupon').html();
            $target.append(_.template(tpl)({
                data: data,
                code:this.code
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