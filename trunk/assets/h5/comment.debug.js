/**
 * h5.ve.cn comment
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    function getTime(startDate, endDate) {
        var mmSec = (endDate.getTime() - startDate.getTime()); //得到时间戳相减 得到以毫秒为单位的差
        var d = Math.floor(mmSec / 3600000 / 24);
        var h = Math.floor((mmSec - d*24*3600000)/3600000);
        var m = Math.floor((mmSec - d*24*3600000 - h*3600000)/60000);
        var s = (mmSec - d*24*3600000 - h*60*60000 - m*60000)/1000
        //console.log(d,'-',h,'-',m,'-',s);
        return {d:d,h:h,m:m,s:s}; //单位转换为天并返回
    };
    var docEl = document.documentElement;
    var winW;
    var main = {
        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '商品口碑';
            winW = docEl.getBoundingClientRect().width;
            this.productId = params.productId;
            document.title = title;

            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.renderComment(1);
            // 初始化lazyload
            lib.lazyload.init();
            // gotop
            new lib.goTop({position:{bottom:60}});
        },
        addEvent : function(){

        },
        renderComment:function(page){
            this.page = page;
            var that = this;
            if (that.comment_isAjax) {
                return;
            }
            that.comment_isAjax = true;
            lib.api.get({
                api: {
                    c: 'comment',
                    a: 'get_Deal_Reputation'
                },
                data: {
                    productId: this.productId,
                    page:this.page,
                    count:10
                },
                success: function (data) {
                    that.moreComm = data;
                    if(that.page==1){
                        var $target = $('#dia-evaluation');
                        var tpl = $('#tpl-dia-evaluation_title').html();
                        $target.append(_.template(tpl)({
                            itemList: data
                        }));
                    }
                    var $target = $('#dia-evaluation');
                    var tpl = $('#tpl-dia-evaluation').html();
                    $target.append(_.template(tpl)({
                        itemList: data
                    }));

                    lib.lazyload.trigger();

                    that.hide = true;
                    that.evaDialog = new lib.Dialog({
                        boxClass: '#dialog',
                        triggerClass: '.evaimg-trigger',
                        hideClass: '#slider2Div',
                        onShow:function(){
                            if(that.hide){
                                that.maskSlider_eva(this.obj,data);
                            }
                            that.hide = false;

                        },
                        onHide:function(){
                            that.hide = true;
                        }
                    });
                    if(data.total_page>that.page){
                        $("#dia-evaluation").append('<p id="loadMore">加载更多</p>');
                    }else{
                        $("#loadMore").remove();
                    }
                    $("#loadMore").click(
                        function(){
                            $("#loadMore").remove();
                            that.page = parseInt(that.page) + 1;
                            that.renderComment(that.page);
                        }
                    );
                    console.log(data);
                },
                error: function () {
                    that.renderError('network');
                },
                complete: function () {
                    that.comment_isAjax = false;
                }
            })
        },
        maskSlider_eva:function(obj,data){
            this.maskslider_eva = null;
            if (!this.maskslider_eva) {
                //testDat = [{img: "http://s1.ve.cn/public/attachment/201501/02/16/20150102160716201.jpg",img_height: "400",img_width: "225"},{img: "http://img01.ve.cn/party/9989bc09b1825d9c55d186da2419c430.jpg",img_height: "248",img_width: "640"}];
                var tpldata = data.data[parseInt( $(obj).attr("index") )].imgurl;
                $(".dialog-box").css("width",winW*0.9+"px");
                $("#slider2Div").html('<div class="slider-box2"><div class="slider-outer"> <div id="slides2" class="slider-wrap"> </div> </div> <div class="slider-status2"></div> </div>');
                var $target = $('#slides2');
                var tpl = $('#tpl-masklides').html();
                $target.html(_.template(tpl)({
                    itemList: tpldata,
                    w:winW*0.9
                }));
                this.maskslider_eva = new lib.Slider('.slider-box2',{
                    trigger : '.slider-status2',
                    //curIndex:parseInt( $(obj).attr("i") )
                });
            }
            this.maskslider_eva.slideTo($(obj).attr("i"));
        }
    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));