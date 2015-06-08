/**
 * h5.ve.cn 之首页
 *
 * @author 景烁
 *
 * */
;(function ($, Global) {
    var docEl = document.documentElement;
    var winW;
    var main = {
        init: function () {
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title:"我的定制",
                isSetting:true,
                settingTitle:"全部"
            });
            winW = docEl.getBoundingClientRect().width;
            // 初始化lazyload
            lib.lazyload.init();

            lib.lazyload.trigger();
            this.addEvents();

        },
        addEvents: function () {
            var that = this;
            $(".top-setting-title").on("click",function(){
                lib.storage.set("guideFilter",0);
                lib.storage.set("guideOver",1);
                location.href = "index.html";
            });
            if(!lib.login.isLogin()){
                $(".agefilter a").on("click",function(){
                    lib.storage.set("guideFilter",parseInt($(this).attr("filter")));
                    location.href = "index.html";
                });
            }else{
                $(".agefilter a").on("click",function(){
                    lib.storage.set("guideFilter",parseInt($(this).attr("filter")));
                    location.href = "index.html";
                });
            }

        }
    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));