/**
 * Created by hellsing on 2014/12/12.
 */
;(function ($) {
    var main = {
        init: function () {

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '选择地址';

            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });

            this.is_select = params['is_select'] || 0;
            this.proType = params['proType'] || 0;

            if(this.is_select){
                $('.add-address').attr('href','address-add.html?toConfirm=1&proType='+this.proType);
            }
            // 初始化lazyload
            lib.lazyload.init();

            this.render();
            // gotop
            new lib.goTop();
        },
        addEvents:function(){
            var that = this;
            $('.save-btn').on('click',function(){
                lib.storage.set('addressSelectedId',$('.active').closest('.address-container').attr('data-id'));
                window.location.href = 'order-confirm.html'+(that.proType?'?proType=1':'');
            });
        },
        addEventsSelect: function () {
            var that = this;
            $('.address-container').on('click',function(){
                if(that.is_select){
                    if(!$(this).find('.active').length){
                        $('.active').remove();
                        $(this).append('<span class="active"></span>');
                        lib.storage.set('addressSelectedId',$('.active').closest('.address-container').attr('data-id'));
                        setTimeout(function(){
                            window.location.href = 'order-confirm.html'+(that.proType?'?proType=1':'');
                        },500);
                        $('.address-container').unbind('click');
                    }
                }else{
                    var index = $(this).index();
                    lib.storage.set('editAddressData',that.addressData[index]);

                    window.location.href = 'address-add.html?title=编辑地址';
                }
            })
        },

        render: function () {
            var that = this;
            if (that.isAjax) {
                return;
            }
            that.isAjax = true;
            //收货地址接口获取收货地址
            lib.api.get({
                needLogin: true,
                api: {
                    c: 'user',
                    a: 'getaddress'
                },
                data: {

                },
                success: function (data) {
                    console.log(data);
                    that.addressData = data.addresses;
                    that.renderAddress(data);
//                    that.renderSaveBtn();
                    that.addEventsSelect();
                    that.addEvents();
                },
                error: function (data) {
                    if(data.code!='00007'){
                        var pop = lib.notification.alert(data.desc, function() {
                            this.hide();
                        }, {useTap :  true});
                        pop.show();
                    }
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
        //插入收货地址或新建收货地址
        renderAddress:function(data){
            var $target = $('#addresses');
            var tpl = $('#tpl-address').html();
            $target.append(_.template(tpl)({
                data: data,
                is_select:this.is_select
            }));
        },
        //插入确定按钮
        renderSaveBtn:function(){
            var $target = $('.main');
            var tpl = $('#tpl-save-btn').html();
            $target.append(_.template(tpl)({
                is_select:this.is_select
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