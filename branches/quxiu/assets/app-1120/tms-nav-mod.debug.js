/**
 * Created by huangdonglin on 14-11-23.
 */
;(function () {
    // cfg
    var pageNavData = {
        'diaper': {
            data:[
               '花王',
               '好奇',
               '帮宝适',	
               '大王',	
               '安尔乐'
            ],
            notNeedAll:false
        },
        'cloth': {
            data:[
                '舒适百搭',
                '潮牌爆款',
                '可爱萌萌哒'
            ],
            notNeedAll: true
        },
        'dry-milk': {
            data:[
                '牛栏',
                '爱他美',
                '美素佳儿',
                '贝拉米',
                '德国喜宝'
            ],
            notNeedAll:false
        }
    };

    var Style = {
        style: '.single-line{\
                    white-space: nowrap;\
                    overflow: hidden;\
                    text-overflow: ellipsis;\
                }\
                .inject-nav-box{\
                    background: #f0f0f0;\
                    padding: 0.5rem 0.5rem 0;\
                }\
                .inject-nav{\
                    display: inline-block;\
                    width: 4.8rem;\
                    height: 1.8rem;\
                    line-height: 1.8rem;\
                    text-align: center;\
                    margin-right: 0.3rem;\
                    font-size: 13px;\
                    margin-bottom: 0.5rem;\
                    background: #fff;\
                    color: #808080;\
                    -webkit-border-radius: 3px;\
                }\
                [data-dpr="2"] .inject-nav{\
                    font-size: 26px;\
                }\
                [data-dpr="3"] .inject-nav{\
                    font-size: 39px;\
                }\
                .inject-nav.current{\
                    background: #ff4a8b;\
                    color: #fff;\
                }',
        add: function () {
            var csStyle = document.createElement('style');
            document.head.appendChild(csStyle);
            csStyle.innerHTML = this.style;
        }
    };


    var main = {
        init: function () {
            Style.add();
            this.page = this.checkPage();
            this.types = pageNavData[this.page];
            this.notNeedAll = this.types.notNeedAll;

            this.renderNav();
            this.addEvents();

        },

        addEvents: function () {
            $('.inject-nav').on('click', function () {
                var $self = $(this);
                $('.inject-nav').removeClass('current');
                $self.addClass('current');

                var index = $self.attr('data-type');
                var $itemList = $('[hui-widget=itemlist]');

                if (index == 'all') {
                    // 默认展示
                    $itemList.show();
                } else {
                    $itemList.each(function (key, val) {
                        if (key == index) {
                            $(val).show();
                        } else {
                            $(val).hide();
                        }
                    })
                }
            })
        },

        checkPage: function () {
            var match = location.href.match(/.+\/([^\.]+)\.html/);
            return match[1];
        },

        renderNav: function () {
            var htm = [];
            htm.push('<a class="inject-nav single-line current" href="javascript:void(0)" data-type="all">全部</a>');
            var _that = this;
            this.types.data.forEach(function (val, index) {
                var totalCate = 1;
                if(_that.notNeedAll){
                    totalCate = 2;
                }else{
                    totalCate = 1;
                }
                if(index == totalCate || index%3 == totalCate){
                    htm.push('<a class="inject-nav single-line" href="javascript:void(0)" data-type="' + index + '" style="margin-right:0px;">' + val + '</a>');
                }else{
                    htm.push('<a class="inject-nav single-line" href="javascript:void(0)" data-type="' + index + '">' + val + '</a>');
                }
            })

            var htmStr = '<div class="inject-nav-box">' + htm.join('') + '</div>';
            var target = document.querySelector("[hui-widget=banner]");

            $(target).after(htmStr);
        }
    };

    $(function () {
        main.init();
    })
})()
