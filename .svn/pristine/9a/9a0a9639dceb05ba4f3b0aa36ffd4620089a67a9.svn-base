/**
 * Created by chenmingyang on 15-2-9.
 */
;(function ($) {


    Global.formatTitleLink = function (link, title) {
        if (!title) {
            return link;
        }

        var url = new lib.httpurl(link);
        url.params.title = title;

        return url.toString();
    };

    Global.formatImgSrc = function (src) {
        if (!src) {
            return 'http://img01.ve.cn/party/60c0f7c1d5a7f76f5e2ba49358072bfd.jpg';
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
            new ctrl.topBar({
                isIndex: false
            });

            //if(lib.storage.get('ve_new_version')){
            this.bottombar = new ctrl.bottomBar({
                //showCircle:true,
                //showApp:true,
                showBottom:true
            });
            //}
            this.categoryIndex = parseInt(window.location.hash.split('#')[1])||0;


            $('#callApp').on('click', function(e) {
                //window.location = "vecn://h5.ve.cn/index.html";
                //lib.callapp.applink();
                var schema = location.href;
                schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });


            this.render();
            //this.adjustLink();
        },
        addEvents:function(){
            var that = this;
            $('.category-list li').on('tap',function(){
                if(!$(this).hasClass('active')){
                    that.categoryIndex = $(this).index();
                    $('.category-list .indicator').css({top:50*that.categoryIndex+'px'});
                    $('.category-list .active').removeClass('active');
                    setTimeout(function(){
                        $('.category-list li').eq(that.categoryIndex).addClass('active');
                    },200);
                    $('.container').remove();
                    that.renderItems(that.categoriesData[that.categoryIndex]);
                }
            });
//            window.addEventListener('hashchange',function(){
//                that.categoryIndex = parseInt(window.location.hash.split('#')[1])||0;
//                that.categoryIndex = that.categoryIndex < that.categoriesData.length?that.categoryIndex:that.categoriesData.length-1;
//                $('.category-list .indicator').css({top:50*that.categoryIndex+'px'});
//                $('.category-list .active').removeClass('active');
//                setTimeout(function(){
//                    $('.category-list li').eq(that.categoryIndex).addClass('active');
//                },200);
//                $('.container').remove();
//                that.renderItems(that.categoriesData[that.categoryIndex]);
//            });
//            $('.category').on('tap',function(){
//                if(!duringAnimation){
//                    duringAnimation = true;
//                    var delay = 0;
//                    var self = false;
//                    var target = this;
//                    if($('.active')[0]) {
//                        delay = 300;
//                        if($(target).hasClass('active')){
//                            self = true;
//                        }
//                        var height = $('.item-container').height();
//                        $('.item-container').animate({marginTop: -height}, 200,'ease-in', function () {
//                            $('.item-container').remove();
//                            $('.active').removeClass('active');
//                            if(self){duringAnimation=false;}
//                        });
//                    }
//                    if(!self){
//                        setTimeout(function(){
//                            $(target).addClass('active');
//                            var index = $('.category').index($(target));
//                            var row = Math.floor(index/3);
//                            var length = that.categoriesData.length;
//                            if((row+1)*3>=length){
//                                var interval = setInterval(function(){
//                                    target.scrollIntoView();
//                                },1);
//                            }
//                            that.renderItems(that.categoriesData[index],row);
//                            var height = $('.item-container').height();
//                            $('.item-container').css({marginTop:-height});
//                            $('.item-container').animate({marginTop:0},200,'ease-in',function(){
//                                setTimeout(function(){clearInterval(interval);},20);
//                                duringAnimation = false;
//                            });
//                        },delay);
//                    }
//                }
//            })
        },
        render:function(){
            var that = this;
            $.get('http://act.ve.cn/data/categories.json',function(data){
                console.log(data);
                that.categoriesData = data.data.list;
                that.renderCategories(data.data.list);
                $('.category-list .indicator').css({top:50*that.categoryIndex+'px'});
                $('.category-list li').eq(that.categoryIndex).addClass('active');
                that.renderItems(data.data.list[that.categoryIndex]);
                var Scroll = lib.scroll;
                that.scroller = new Scroll({
                    scrollElement: $('.category-list')[0]
                });
                that.addEvents();
                that.scroller.init();
            })
        },
        //插入二级类目
        renderCategories:function(data){
            var $target = $('.category-list');
            var tpl = $('#tpl-category').html();
            $target.prepend(_.template(tpl)({
                itemList: data
            }));
        },
        //插入三级类目
        renderItems:function(data){
            var $target = $('.item-container');
            var tpl = $('#tpl-item').html();
            $target.prepend(_.template(tpl)({
                itemList: data
            }));

            var Scroll = lib.scroll;
            var itemScroll = new Scroll({
                scrollElement: $('.container')[0]
            });
            itemScroll.init();
        },
        adjustLink: function () {
            $('.list-item').each(function (index, val) {
                var $link = $(val);

                var url = $link.attr('href');
                var title = $link.find('.title').html();

                var formated = Global.formatTitleLink(url, title);
                $link.attr('href', formated);
            })
        }
    };

    // run
    $(function () {
        main.init();
    })

})(Zepto, window.Global || (window.Global = {}));
