/**
 * h5.ve.cn 之发现
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    var docEl = document.documentElement;
    var winW;
    var main = {
        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '发现';
            winW = docEl.getBoundingClientRect().width;
            document.title = title;
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.bottombar = new ctrl.bottomBar({
                hoverIndex:1,
                showBottom:true
            });
            this.render();
            this.addEvent();
            // gotop
            new lib.goTop({position:{bottom:60}});
        },
        addEvent : function(){

        },
        render: function(){
            var that = this;
            if (that.cart_isAjax) {
                return;
            }
            that.cart_isAjax = true;
            lib.api.get({
                api: {
                    c: 'find'
                },
                data: {

                },
                success: function (data) {
                    console.log(data);
                    var $target = $('#item');
                    var tpl = $('#tpl-item').html();
                    $target.append(_.template(tpl)({
                        itemList: data.data.list
                    }));
                },
                error: function (data) {
                    console.log(data,data.desc);
                },
                complete: function () {
                    that.cart_isAjax = false;
                }
            })
        }
    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));