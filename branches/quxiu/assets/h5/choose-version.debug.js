
/**
 * h5.quxiu.me choose-version
 *
 * @todo
 *
 * @author hellsing
 *
 * */
;(function ($) {
    var main = {
        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '入口选择';
            document.title = title;
            this.addEvents();
        },
        addEvents:function(){
            $('.btn-active').on('click',function(){
                lib.storage.set('ve_new_version',1);
                window.location.href = 'index.html';
            });
            $('.btn-default').on('click',function(){
                lib.storage.set('ve_new_version',0);
                window.location.href = 'index.html';
            })
        }
    };
    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));