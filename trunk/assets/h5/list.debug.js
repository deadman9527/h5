/**
 * h5.ve.cn 之列表页
 *
 * @todo 接口问题
 *
 * @author 景烁
 *
 * */
;(function ($) {

    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MobileVecn/i) ){
        SEMURL = false;
    }else{
        SEMURL = true;
    }

    // fix: http://img.ve.cnttp://s1.ve.cn/public/attachment/201411/17/23/20141117234717151_3.jpg
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
    Global.formatTitleLink = function (productid, brandId , alias) {
        var host = 'http://' + location.host;
        var brandurl = brandId ? "&brandId="+brandId : "";

        var oldUrl = "detail.html?productId="+productid + brandurl;
        var alias_url = alias ? alias : "" , newUrl = host + "/" + alias_url + "goods-" + productid + ".html?productId="+ productid + brandurl , reUrl = SEMURL ? newUrl : oldUrl;
        return reUrl;
    };

    var main = {
        init: function () {


            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var brandId = params['brandId'] ? decodeURIComponent(params['brandId']) : null;
            var title = params['title'] ? decodeURIComponent(params['title']) : null;
            this.title = title;
            if(title){
                document.title = title;
                this.topbar = new ctrl.topBar({
                    isIndex: false,
                    title: title
                });
            }
            else
                document.title = "商品列表";

            // gotop
            new lib.goTop();

            //if(lib.storage.get('ve_new_version')){
                this.bottombar = new ctrl.bottomBar({
                    showBottom:true,
                    showApp:false,
                    showCircle:false
                });
            //}
            $('#callApp').on('click', function(e) {
                //window.location = "vecn://h5.ve.cn/index.html";
                //lib.callapp.applink();
                var schema = location.href;
                //var schema = "http://test.h5.ve.cn/list.html?brandId=1421&title=%E8%BF%AA%E5%A3%AB%E5%B0%BC%E5%93%81%E7%89%8C%E7%89%B9%E5%8D%96%E4%B8%93%E5%9C%BA";
                schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });

            this.categoryId = params['categoryId'] || 0;
            this.brandId = brandId;
            if (!this.brandId && !this.categoryId) {
                this.renderError('param');
                return;
            }

            if (this.categoryId) {
                $('.main-hd').remove();
            } else {
                $('.main-hd').show();
            }

            //this.categoryId = params['cate_id'] || 0;
            // 默认综合排序
            this.is_sort = params['is_sort'] || 7;
            // 0 时存在翻页
            // 1 时是一次性给结果
            this.is_have = params['is_have'] || 0;
            this.count = 20;
            this.page = 1;


            //是否开始渲染倒计时
            this.time = true;

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

            this.addEvents();
            this.render();

            this.showPromotion = true;
            this.showTime = true;
        },

        addEvents: function () {
            var that = this;

            $('.j-sort').on('click', function () {
                that.sortHandler($(this));
            });

            $('.j-filter').on('click', function () {
                // 有货、无货过滤
                var $self = $(this);
                $self.toggleClass('active');
                var isActive = $self.hasClass('active');
                that.is_have = isActive ? 1 : 0;

                that.render(true);
            })
        },

        render: function (needReset) {
            var that = this;

            if (that.isAjax) {
               return;
            }
            this.isAjax = true;
            if (needReset) {
                this.page = 1;
                this.infiniteScroll.remove();

                $('#items').html('');
                this.showTip('数据加载中...');
            }

            var parameter = {
                brandGroupId: this.brandId,
                categoryId: this.categoryId,
                is_sort: this.is_sort,
                is_have: this.is_have,
                count: this.count,
                page: this.page
            };

            if(this.brandId != null){
                parameter.brandId = this.brandId;
            }

            lib.api.get({
                api: {
                    c: 'deal',
                    a: 'goodslist'
                },
                data: parameter,
                success: function (data) {
                    console.log(data);
                    if (!that.topbar) {
                        var title = data.title || document.title;
                        document.title = title;
                        that.topbar =  new ctrl.topBar({
                            isIndex: false,
                            title: title
                        });
                    }


                    if(that.showPromotion ){
                        that.renderPromotion(data);
                        that.showPromotion = false;
                    }

                    if (Array.isArray(data.products) && data.products.length) {
                        that.renderItems(data.products);


//                        if (that.checkNeedScroll()) {
                            !that.infiniteScroll.started && that.infiniteScroll.start();
//                        }
                    } else {
                        if (that.page == 1) {
                            that.renderError('empty');
                        } else {
                            console.log(that.isEnd);
                            that.isEnd = true;
                        }
                    }

                    if(that.time && data.surplusTime){
                        that.time = false;
                        console.log(data.surplusTime);
                        var time = parseInt(data.surplusTime);

                        var day = Math.floor(time/(24*3600));
                        var hour = Math.floor((time-day*24*3600)/(3600));
                        var minute = Math.floor((time-day*24*3600-hour*3600)/60);
                        var second = Math.floor(time-day*24*3600-hour*3600-minute*60);

                        var count = [day,hour,minute,second];
                        console.log(count);

                        that.renderTime(count);
                    }


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

        renderPromotion: function(data){
            var $target = $('#promotion');
            var tpl = $('#tpl-promotion').html();
            $target.append(_.template(tpl)({
                data: data
            }));
        },

        renderTime:function(count){
            var last_seconds = parseInt(count[0])*3600*24 + parseInt(count[1])*3600 + parseInt(count[2]*60) + parseInt(count[3]);
            console.log(count);

            if( last_seconds > 0){
                //var t = getTime(new Date(parseInt(data.products.begin_time) * 1000), new Date(parseInt(data.products.end_time) * 1000));
                //console.log(parseInt(data.products.end_time),parseInt(Date.parse(new Date())/1000));
                var cd2 = lib.countdown({
                    endDate: "+"+last_seconds.toString(),
                    stringFormatter: count[0]>0?'d天hh小时mm分ss秒':count[1]>0?'hh小时mm分ss秒':count[2]>0?'mm分ss秒':'ss秒',
                    onUpdate: function(data){
                       //console.log(data);
                        $(".time-end").html('还剩：'+ data.stringValue);
                    },
                    onEnd: function(){
                        console.log('cd2 ended');
                    }
                }).start();
                // $(".timeover").html('还剩'+ t.d+'天'+ t.h+'时'+ t.m+'分'+ t.s+'秒');
                $(".time-end").show();

            }else{
                $(".time-end").remove();
            }

        },

        renderItems: function (itemList) {
            $('.info-tip').hide();

            var $target = $('#items');
            var tpl = $('#tpl-item').html();
            var sum = $('.list-item').length;
            $target.append(_.template(tpl)({
                brandId: this.brandId,
                itemList: itemList,
                sum:sum
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
        },

        // type：筛选项； status 是否激活
        // 排序：综合排序，价格、销量，彼此互斥
        // 价格、销量，排序切换
        // 有货，筛选，采用toggle的形式，与排序不相关
        sortHandler: function ($sortItem) {
            var isActive = $sortItem.hasClass('active');

            $('.j-sort').removeClass('active');
            $sortItem.addClass('active');

            var type = $sortItem.attr('data-type');
            if (type) {
                // 价格排序
                isActive && $sortItem.toggleClass('down-up');

                if ($sortItem.hasClass('down-up')) {
                    this.is_sort = type == 'price' ? 3 : 5;
                } else {
                    this.is_sort = type == 'price' ? 4 : 6;
                }
            } else {
                // 综合排序
                this.is_sort = 7;
            }

            this.render(true);
        }
    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));