/**
 * Created by Administrator on 2014/12/31.
 */
;(function ($, Global) {
    var main = {
        init: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MobileVecn/i) ){
                return;
            }else{
                //alert('hello')
                var schema = location.href;
                schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            }


            $('#app-download').on('click', function(e) {
                //window.location = "vecn://h5.quxiu.me/index.html";
                //lib.callapp.applink();
                var schema = location.href;
                schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });

        }
    };

    $(function () {
        main.init();
    });
})(Zepto);