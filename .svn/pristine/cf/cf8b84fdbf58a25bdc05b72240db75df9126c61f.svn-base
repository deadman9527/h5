;(function(win, lib) {
    var localStorage;
    try {
        localStorage = win.localStorage;
        localStorage.setItem('@private', 'false');
    } catch(e) {
        localStorage = null;
    }

    var $ = win['$'];

    var queueHandler = function() {
        var that = this;
        var _i = setInterval(function() {
            if (that.Queue.length > 0 && !that.stop) {
                var obj = that.Queue.shift();
                obj["fn"](obj.argument);
                if (obj["callBack"]) {
                    obj["callBack"]();
                }
            } else {
                clearInterval(_i);
            }
        },
        this.setTimeout);
    }

    var queue = {
        Queue: [],
        /* 异步队列 */
        syncQueue: [],
        /* 同步队列 */
        setTimeout: 100,
        /* 执行间隔 */
        add: function(fn, argument, callBack) {
            /* 添加队列 */
            this.Queue.push({
                fn: fn,
                argument: argument,
                callBack: callBack
            });
            return this;
        },
        addSync: function(fn, argument, callBack) {
            /* 添加队列 */
            this.syncQueue.push({
                fn: fn,
                argument: argument,
                callBack: callBack
            });
            return this;
        },
        clear: function() {
            /* 清空队列 */
            this.Queue = [];
            return this;
        },
        stop: false,
        //异步模式延时队列，按timeout执行，防连续触发。
        start: function() {
            this.stop = false;
            if (this.setTimeout > 0) {
                queueHandler.apply(this);
            }
            return this;
        },
        shift: function() {

        },
        //同步模式先进先出
        dequeue: function() {
            var obj = this.syncQueue.shift();
            if (obj) {
                obj["fn"](obj.argument);
                obj["callBack"] && obj["callBack"]();
            }
        }
    };

    $.fn.autoComplete = function(options) {
        var self = this;
        var setting = {
            ajaxUrl: 'http://m.taobao.com',
            //ajax路径
            operator: '.J_autocomplete',
            //触发搜索文本框
            cat: '.J_cat',
            //分类传参
            wrapEl: '.wrap',
            //内容展示层
            meatEl: '.meat',
            //用来包裹列表内层元素的层
            childEl: 'li',
            //列表内层元素
            submit: '.btn',
            //提交表单的按钮
            close: '.close',
            //关闭内容展示层
            collapse: 'collapse',
            //收缩状态class
            expand: 'expand',
            //展开状态class
            delay: 0,
            //延迟时间，2012.6.28暂时引入了队列，来阻止异步的时候，出现的bug，异步的设置里有timeout
            anim: true,
            //是否动画
            isUseKey: true,
            //用于开启或者关闭---检测用户是否使用了搜索联想词进行搜索功能
            history: false,
            //历史记录请求的url，支持字符串和数组
            localStorage: 'searchhistory',
            //历史从本地读取,false自动从网上获取。设置为本地的key
            clearHistory: 'clear',
            //清除历史的url
            addition: false,
            //是否有附加功能
            additionClass: '.addition',
            //附加按钮的样式
            max: 7,
            //最多记录数
            onFocus: function(e) {},
            //点击列表项时执行
            afterItemClick: function(n) {
                /*console.log(n)*/
            },
            textInput: function(n) {
                /*console.log(n)*/
            },
            //input
            //历史加载完成
            onHisLoad: function() {
                /*console.log('history ready.')*/
            }
        }

        $.extend(setting, options || {});

        var autoComplete = {
            //存放发生ajax请求，用于清除
            ajax: [],
            //历史数据的数组
            hisList: [],
            //用于设置历史数据的索引
            hisIndex: 0,
            //历史加载完成
            onHisLoad: setting.onHisLoad
        };

        $(this).each(function() {
            var self = $(this);
            /* 优先请求历史记录 支持数组*/
            if (setting.history) {

                //是否从本地读取
                if (setting.localStorage && localStorage) {
                    autoComplete.hisList = eval(localStorage.getItem(setting.localStorage) || []);
                } else {
                    var hisArray = typeof(setting.history) == "string" ? [setting.history] : setting.history;
                    for (var i = 0; i < hisArray.length; i++) {
                        queue.addSync($.ajax, {
                            url: hisArray[i],
                            type: "GET",
                            dataType: "jsonp",
                            error: function() {
                                console.log('网络连接失败，请刷新页面重试');
                                return false;
                            },
                            success: function(json, status, xhr) {
                                autoComplete.hisList.push(json);
                                queue.dequeue();
                            }
                        });
                    };
                    queue.addSync(autoComplete.onHisLoad);
                    queue.dequeue();
                }
            }
            var operator = $(this).find(setting.operator);
            var $close = self.find(setting.close).addClass('c-btn-grey-small s-btn-grey');
            //设置文本框的autocomplete
            operator.attr('autocomplete', 'off');
            //文本框上的事件
            ///UC/.test(navigator.userAgent) && operator.keyup(initInput); 现在uc又支持oninput了。
            operator.on("input", initInput);
            //文本框获取焦点
            operator.focus(function(e) {
                var data;

                if ($(this).val() == '') { //解决HTML5 placeholder属性在Android Webkit上的交互细节BUG
                    $(this).val('');
                }

                data = $(this).val().replace(/(^\s+)|(\s+$)/g, '');

                setting.onFocus && setting.onFocus.call(operator, e, data);

                if (data.length == 0 && setting.history) {
                    queue.clear();
                    queue.add(getHistory);
                    queue.start();
                    return;
                }
            });

            function initInput(e) {
                var e = e || window.event;
                var data;
                data = $(this).val().replace(/(^\s+)|(\s+$)/g, '');
                //文本为空时返回
                if (!data.length && setting.history) {
                    queue.clear();
                    queue.add(getHistory);
                    queue.start();
                    return;
                }
                if (e.keyCode == 13 || e.keyCode == 32) return;
                //首次触发滚动屏幕，让文本框置顶
                setting.textInput.call(this, data.length);

                //搜索店铺，关闭浮层
                var st = self.find('#J_ST'),
                st_name = st.attr('name');

                if (st.length > 0 && st_name == "event_submit_do_search_shop") {
                    self.find(setting.wrapEl).hide();
                    return false;
                }

                if (setting.status !== 'close') { // status为close时，不进行联想搜索
                    queue.clear();
                    queue.add(getList, data);
                    queue.start();
                }

            };

            //异步请求数据
            function getList(text) {
                var ajaxurl = setting.ajaxUrl;

                autoComplete.ajax.push($.ajax({
                    url: ajaxurl,
                    type: "GET",
                    dataType: "jsonp",
                    data: "code=utf-8&extras=1&q=" + text,
                    error: function() {
                        return false;
                    },
                    success: function(json) {
                        pack(json);
                        $close.html("关闭").removeClass("clear");
                    }
                }));
            }

            //获得历史记录
            function getHistory() {
                var json = autoComplete.hisList[autoComplete.hisIndex];
                pack(json);
                $close.html("清除历史记录").addClass("clear");
            }

            //清除历史记录
            function clearHistory() {
                if (setting.localStorage && localStorage) {
                    localStorage.removeItem(setting.localStorage);
                } else {
                    var clearArray = typeof(setting.clearHistory) == "string" ? [setting.clearHistory] : setting.clearHistory;

                    //这里也要用到同步来清除，同一时间删cookie会有问题。
                    queue.clear();
                    for (var i = 0; i < clearArray.length; i++) {
                        queue.addSync($.ajax, {
                            url: clearArray[i],
                            dataType: "jsonp",
                            success: function(data) {
                                queue.dequeue();
                            }
                        });
                    };
                    queue.dequeue();

                }
                autoComplete.hisList = [];
            }

            //DOM组装联想搜索数据
            function pack(json) {
                var arr = [],
                minitaoArr = [],
                catArr = [],
                rltArr = [],
                we = json && json.minitao,
                cat = json && json.cat,
                rlt = json && json.result,
                isT = false;

                if (setting.isUseKey) {
                    self.find('#J_IsUseSearchSuggest').val('');
                }

                if (!setting.status) {
                    // TODO:双十一临时逻辑，在没有请求到接口数据的之后，都不再发起请求
                    if (json && json.result && json.result.length === 0) {
                        setting.status = 'close';
                    } else {
                        setting.status = json && json.status;
                    }
                }

                if (we) { //微淘 shiying
                    for (var i = 0; i < we.length; i++) {
                        var we_name = we[i][0],
                        //名称
                        we_num = Number(we[i][1]),
                        //关注数
                        we_id = we[i][2] //id
                        ;
                        if (we_num >= 10000) {
                            we_num = we_num / 10000;
                            we_num = we_num.toFixed(1) + '万'
                        }

                        minitaoArr.push('<li class="we" key="' + we_id + '">');
                        minitaoArr.push('<div class="logo we"></div>');
                        minitaoArr.push('<div class="title"> <span class="grey name">微淘</span> <span>' + we_name + '</span> <span class="grey type">' + we_num + '关注者</span></div>');
                        minitaoArr.push('<div class="arrow"></div>') ;
                        minitaoArr.push('</li>');
                    }
                    isT = true
                }

                if (cat) { //分类 shiying
                    for (var j = 0; j < cat.length; j++) {
                        var cat_name = cat[j][2],
                        //关键字、名称
                        cat_id = cat[j][1],
                        //id
                        cat_sort = cat[j][0] //分类
                        ;
                        minitaoArr.push('<li catmap="' + cat_id + '" key="' + cat_name + '">');
                        minitaoArr.push('<div class="logo cat"></div>')
                        minitaoArr.push('<div class="title"><span>' + cat_name + '</span> <span class="grey name">分类</span> <span class="grey type">' + cat_sort + '</span></div>');
                        minitaoArr.push('<div class="arrow"></div>');
                        minitaoArr.push('</li>')
                    }
                    isT = true
                }

                if (json && json.result != false && json.result.length > 0) { //请求结果成功
                    var num = rlt.length > setting.max ? setting.max: rlt.length;

                    var addition = setting.addition ? "<div class='" + setting.additionClass.slice(1) + "'></div>": "";
                    for (var i = 0; i < num; i++) {
                        rltArr.push('<li key="' + rlt[i][0] + '">' + '<div class="title">' + rlt[i][0] + '</div></li>')
                    }

                    isT = true;
                }

                if (isT) {
                    arr.push(catArr.join('') + minitaoArr.join('') + rltArr.join(''))
                    self.find(setting.meatEl).html(arr.join(''));
                    effect();
                } else {
                    self.find(setting.wrapEl).hide();
                    return;
                }
            }

            //组装内容后操作
            function effect() {
                var timer = null;
                //展开联想搜索内容
                timer = setTimeout(function() {
                    if (!setting.anim) {
                        self.removeClass(setting.collapse).addClass(setting.expand);
                    } else {
                        self.find(setting.wrapEl).show();
                    }
                },
                setting.delay);

                //避免重复绑定
                self.find(setting.close).unbind('click');
                self.find(setting.childEl).unbind('click');

                //点击关闭联想内容
                self.find(setting.close).click(function() {
                    var interval = 0;
                    var timer = null;
                    timer = setTimeout(function() {
                        if (!setting.anim) {
                            self.removeClass(setting.expand).addClass(setting.collapse);
                        } else {
                            self.find(setting.wrapEl).hide();
                        }
                    },
                    setting.delay);

                    if ($close.hasClass("clear")) {
                        logAjax('', 'clean');
                        clearHistory();
                    }
                });

                //搜索提交表单
                //uc下有点击反馈，不用代理了
                self.find(setting.childEl).click(function() {

                    var $this = $(this),
                    text = $this.attr('key'),
                    catmap = $this.attr('catmap') || '';
                    setting.afterItemClick.call(this, Number($this.index()) + 1);

                    if ($this.hasClass('we')) { //微淘
                        location.href = 'http://h5.m.taobao.com/we/index.htm#account/' + text
                    } else {
                        operator.val(text); //赋值给文本框
                        $(setting.cat).val(catmap) //分类赋值
                        //出发提交
                        var submitBtn = self.find(setting.submit)[0];
                        submitBtn && submitBtn.click();
                    }
                });
            }

            //让文本框位置移到顶部
            function toTop() {
                return;
                var offsetTop = operator.offset().top;
                setTimeout(function() {
                    window.scrollTo(0, offsetTop)
                },
                1000);
            }

            //添加联想词附加到关键词上的功能
            setting.addition && self.find(setting.meatEl).on("touchstart click", "div" + setting.additionClass,
            function(e) {
                var $this = $(this);
                operator.focus();
                operator.val($this.parent().attr("key"));

                initInput.call(operator);
                e.preventDefault();
                e.stopPropagation();
            });

            //是否历史功能
            if (setting.history) {
                autoComplete.getHistory = function() {
                    queue.clear();
                    queue.add(getHistory);
                    queue.start();
                };
            } else {
                autoComplete.getHistory = function() {};
            };

            autoComplete.close = function() {
                queue.clear();
                if (autoComplete.ajax.length) {
                    for (i = 0; i < autoComplete.ajax.length; i++) {
                        autoComplete.ajax[i] && autoComplete.ajax[i].abort();
                    }
                    autoComplete.ajax = [];
                }
                self.find(setting.wrapEl).hide();
            }

            autoComplete.initInput = initInput;

            function logAjax(Q, OP) {
                var that = this,
                url = 'http://log.mmstat.com/search',
                cookie = document.cookie,
                nkRep = cookie && cookie.match('_w_tb_nick=.*'),
                op = OP || '',
                //清空
                nk = nkRep && nkRep[0].split(';')[0].split('=')[1] || '',
                //用户昵称
                src = 'smtaobao',
                //来自无线主搜
                q = Q || '',
                //关键字
                app = 'sug' //下拉推荐的应用
                ;
                $.ajax({
                    url: url,
                    data: {
                        op: op,
                        nk: nk,
                        src: src,
                        q: q,
                        app: app
                    },
                    error: function() {
                        console.log('网络连接失败，请刷新页面重试');
                        return false;
                    },
                    success: function(json) {

}
                })
            }
        });
        return autoComplete;
    };

    function getParam(n) { //参数
        var text = $('#J_search .cc-search-tab li.cur').html(),
        param = text == '宝贝' ? 'hbword': (text == '店铺' ? 'hshopword': 'tmallword');
        param = param + n + '%23h%23search';
        return param;
    }

    lib.autocomplete = {
        template: [
        '<section id="J_search" class="in-search cc-search showoff">', 
            '<div class="cc-search-hide">', 
                '<a class="cc-back">关闭</a>', 
                '<ul class="cc-search-tab">', 
                    '<li class="cur" i="event_submit_do_new_search_auction">宝贝</li>', 
                    '<li i="event_submit_do_search_shop">店铺</li>', 
                    '<li i="event_submit_do_new_search_tmall_auction">天猫</li>', 
                '</ul>', 
            '</div>', 
            '<div id="J_dropdown" class="c-form-suggest">', 
                '<div class="c-form-search">', 
                    '<form id="J_indexform" name="wapSearchForm" action="http://s.m.taobao.com/h5.htm?pds=hbword0%23h%23search" method="get" autocomplete="off">', 
                        '<input id="J_searchtext" class="inp-search" name="q" value="" autocomplete="off" />', 
                        '<a id="J_cleartext" class="clearText"><span></span></a>', 
                        '<input type="submit" value="" name="search-bton" class="bton-search" />', 
                        '<input type="hidden" id="J_ST" name="event_submit_do_new_search_auction" value="1" />', 
                        '<input type="hidden" value="utf-8" name="_input_charset" />', 
                        '<input type="hidden" value="1" name="topSearch" />', 
                        '<input type="hidden" value="b" name="atype" />', 
                        '<input type="hidden" value="1" name="searchfrom" />', 
                        '<input type="hidden" value="home:redirect_app_action" name="action" />', 
                        '<input type="hidden" value="1" name="from" />', 
                        '<input type="hidden" name="ttid" />', 
                    '</form>', 
                '</div>', 
                '<div class="suggest"><ul class="meat"></ul><span class="close">关闭</span></div>', 
            '</div>', 
        '</section>'].join(''),

        init: function(contentEl, options) {
            $(this.template).appendTo(document.body);

            options || (options = {});

            var autocomplete = $('#J_dropdown').autoComplete({
                ajaxUrl: 'http://suggest.taobao.com/sug',
                wrapEl: '.suggest',
                operator: '.inp-search',
                meatEl: '.suggest .meat',
                close: '.suggest .close',
                submit: '.bton-search',
                addition: true,
                anim: true,
                history: true,
                clearHistory: true,
                onFocus: function() {
                    $searchText.val('');
                    $search.removeClass('showoff');
                    $(contentEl).hide();
                },
                textInput: function() {
                    if ($searchText.val().length) {
                        $clearText.css('visibility', 'visible');
                    } else {
                        $clearText.css('visibility', 'hidden');
                    }
                },
                afterItemClick: function(n) {
                    var param = getParam(n);

                    $indexForm.attr('action', 'http://s.m.taobao.com/h5?pds=' + param + '&suggest=' + encodeURIComponent($(this).text()) + '_' + n + '&q=' + encodeURIComponent($(this).text()));
                }
            });
            var $search = $('#J_search');
            var $searchText = $('#J_searchtext');
            var $clearText = $('#J_cleartext');
            var $indexForm = $('#J_indexform');
            var $ST = $('#J_ST');

            $searchText.attr('placeholder', options.title || '');
            $search.on('click', '#J_cleartext', function() {
                $searchText.val('');
                $clearText.css('visibility', 'hidden');
                $search.find('.suggest').hide();
            });

            $search.on('click', '.cc-back', function() {
                $search.addClass('showoff');
                $(contentEl).show();
            });

            $search.on('click', '.cc-search-tab li', function(e, n) {
                var that = $(this),
                name = that.attr('i');

                if (that.hasClass('cur')) return;

                $ST[0].setAttribute('name', name);
                that.addClass('cur').siblings('.cur').removeClass('cur');

                $indexForm.attr('action', 'http://s.m.taobao.com/index.htm?pds=' + getParam(0));

                switch (that.html()) {
                case '店铺':
                    autocomplete.hisIndex = 1;
                    autocomplete.getHistory();
                    break;
                case '天猫':
                    autocomplete.hisIndex = 2;
                    autocomplete.getHistory();
                    break;
                default:
                    autocomplete.hisIndex = 0;
                    autocomplete.getHistory();
                    break;
                }
            });

            $search.on('submit', '#J_indexform', function() {
                var input = $searchText[0];
                if (!options.searchkey) {
                    options.searchkey = ''
                }
                var value = input.value ? input.value: options.searchkey;

                input.value = value;

                if (value === '') {
                    notification.simple('请输入关键字');
                    return false;
                }

                $('#J_indexform').attr('action', $('#J_indexform').attr('action'));

                if (localStorage) {
                    var key = 'searchhistory';
                    ls = localStorage.getItem(key);

                    var listh = ls && JSON.parse(ls) || [],
                    hisnum = autocomplete.hisIndex,
                    store = listh.length > hisnum && listh[hisnum] || {
                        'result': []
                    };

                    var filtero = $.map(store.result,
                    function(item, index) { //去掉之前的重复记录
                        if (item[0] == value || index > 6) return null;
                        else return [item];
                    });

                    filtero.unshift([value]); //追加到第一位
                    store.result = filtero;
                    listh[hisnum] = store;

                    localStorage.setItem(key, JSON.stringify(listh));
                }
            });
        }
    }

})(window, window['lib'] || (window['lib'] = {}));