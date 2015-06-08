
/**
 * Created by hellsing on 2014/12/26.
 */
;(function ($) {
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
            var title = params['title'] ? decodeURIComponent(params['title']) : '买二送一活动';
            lib.snow({
                minSize: 5,		//雪花的最小尺寸
                maxSize: 20, 	//雪花的最大尺寸
                newOn: 50,		//雪花出现的频率 这个数值越小雪花越多
                stopTime:15000  //5秒后停止
            });
            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });
            // gotop
            new lib.goTop();
        }




    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));