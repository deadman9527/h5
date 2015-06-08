
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

            /*this.snow = lib.snow({
                minSize: 5,		//雪花的最小尺寸
                maxSize: 50, 	//雪花的最大尺寸
                newOn: 100,		//雪花出现的频率 这个数值越小雪花越多
                stopTime:5000  //5秒后停止
            });*/

            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '买二送一活动';

            document.title = title;
            this.page = 1;
            //头部
            new ctrl.topBar({
                isIndex: false,
                title: title
            });
            // 初始化lazyload
            lib.lazyload.init();
            // 初始化scroll load
            var that = this;
            this.infiniteScroll = lib.infiniteScroll.init({
                bufferPx: 150, // 距离低端px就触发onNear事件
                time: 200, // 设置延迟触发onNear
                onNear: function () {
                    that.render();
                },
                end: function () {
                    return that.isEnd;
                },
                //onEnd: null, // 加载完了怎么办
                //onScroll: null // scroll 事件处理
            });
            this.render();
            // gotop
            new lib.goTop();
        },
        addEvents:function(){
            $('.save-btn').on('click',function(){
                lib.storage.set('addressSelectedId',$('.active').closest('.address-container').attr('data-id'));
                window.location.href = 'order-confirm.html';
            });
        },
        addEventsSelect: function () {
            var that = this;
            $('.address-container').on('click',function(){
                if(that.is_select){
                    if(!$(this).find('.active').length){
                        $('.active').remove();
                        $(this).append('<span class="active"></span>');
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
            lib.api.get({
                api: {
                    c: 'deal',
                    a: 'goodslist'
                },
                data: {
                    brandGroupId: 1293,
                    categoryId: 0,
                    brandId: 1293,
                    is_sort: 7,
                    is_have: 0,
                    count: 20,
                    page: that.page
                },
                success: function (data) {
                    console.log(data);
                    if (Array.isArray(data.products)) {
                        that.renderItems(data.products);

                        if (that.checkNeedScroll()) {
                            !that.infiniteScroll.started && that.infiniteScroll.start();
                        }
                    } else {
                        if (that.page == 1) {
                            that.renderError('empty');
                        } else {
                            that.isEnd = true;
                        }
                    }
                    lib.snow({
                        minSize: 5,		//雪花的最小尺寸
                        maxSize: 20, 	//雪花的最大尺寸
                        newOn: 100,		//雪花出现的频率 这个数值越小雪花越多
                        stopTime:15000  //5秒后停止
                    });
                    that.page++;
                },
                error: function () {
                    that.renderError('network');
                },
                complete: function () {
                    that.isAjax = false;
                },

//                // mock 先
//                mock: {
//                    path: 'data/list.json',
////                   error: 1
//                }
            })

        },

        // 是否需要翻页
        checkNeedScroll: function () {
            return !this.is_have;
        },
        //插入列表数据
        renderItems:function(data){
            var $target = $('#goods');
            var tpl = $('#tpl-items').html();
            $target.append(_.template(tpl)({
                data: data
            }));
            lib.lazyload.trigger();
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