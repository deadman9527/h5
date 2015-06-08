
/**
 * Created by hellsing on 2014/12/18.
 */
;(function ($) {
    var main = {
        init: function () {

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '优惠券';

            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });

            this.is_select = params['is_select'] || 0;

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


        render: function () {
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
                    //useable:1
                },
                success: function (data) {
                    console.log(data);
                    that.renderItems(data);
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

        // 是否需要翻页
        checkNeedScroll: function () {
            return !this.is_have;
        },
        //插入优惠券列表
        renderItems:function(data){
            var couponList = [];
            couponList[0] = [];
            couponList[1] =[];
            couponList[2] =[];
            for(var i in data.data.coupon){
                console.log(data.data.coupon[i]);
                switch (data.data.coupon[i].useable){
                    case 1:
                        console.log(1);
                        console.log(couponList);
                        couponList[0].push(data.data.coupon[i]);
                        break;
                    case 2:
                        console.log(2);
                        couponList[1].push(data.data.coupon[i]);
                        break;
                    default :
                        console.log(3);
                        couponList[2].push(data.data.coupon[i]);
                        break;
                }
            }
            console.log(couponList);
            var $target = $('#coupons');
            var tpl = $('#tpl-coupon').html();
            $target.append(_.template(tpl)({
                couponList:couponList
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