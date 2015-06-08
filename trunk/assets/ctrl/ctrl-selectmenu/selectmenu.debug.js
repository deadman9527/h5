/**
 * select menu 控件
 *
 * @author 景烁
 * @created 2014-07-31
 *
 * @requires lib.scroll
 *
 */

;(function(win, ctrl) {

    // 辅助方法：负责窗口弹出和收起
    var SelectBox =  {
        open: function (selectContainer, onOpen) {
            if (!selectContainer) return;

            var selectBox = selectContainer.firstChild;

            selectContainer.style.opacity = 1;
            selectContainer.style.visibility = 'visible';

            // fix android 展示不出 selectContainer
            setTimeout(function () {
                selectBox.style.webkitTransform = 'translateY(0)';
                onOpen && onOpen();
            }, 0);
        },

        close: function (selectContainer, onClose) {
            if (!selectContainer) return;

            var selectBox = selectContainer.firstChild;

            selectBox.style.webkitTransform = 'translateY(100%)';

            setTimeout(function () {
                selectContainer.style.opacity = 0;
                selectContainer.style.visibility = 'hidden';
                onClose && onClose();
            }, 200);
        }
    };

    // main
    var incId = 0;
    var Klass = {
        container: 'ctrl-selectmenu',
        innerBox: 'ctrl-selectmenu-picker',
        header: 'ctrl-selectmenu-header',
        confirm: 'ctrl-selectmenu-btn-confirm',
        cancel: 'ctrl-selectmenu-btn-cancel',
        col: 'ctrl-selectmenu-col',
        option: 'ctrl-selectmenu-option',
        wrapper: 'ctrl-selectmenu-wrapper',
    };

    var SelectMenu = function (element, options) {

        /**
            控件规范
         */

        var that = this;

        var id = Date.now() + '-' + (++incId); // 每个控件有唯一的id
        var root = document.createDocumentFragment(); // 文档片段，用于append时提高效率

        if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
            // 参数个数的兼容判断
            options = arguments[0];
            element = null;
        }
        if (!element) {
            // 如果不是从已有DOM元素创建控件，则可以新建一个元素
            element = document.createElement('div');
        }
        root.appendChild(element);

        element.setAttribute('data-ctrl-name', 'selectmenu');
        element.setAttribute('data-ctrl-id', id);
        element.className = Klass.container;

        // 全局配置
        this.options = options;

        // --- 编写控件的属性

        // 编写控件的属性
        var title = options.title || '';
        Object.defineProperty(this, 'title', {
            get: function() {
                return title;
            },

            set: function(v) {
                if (v) {
                    title = v;
                    element.querySelector('.tip').innerHTML = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        var confirmText = options.confirmText || '确定';
        Object.defineProperty(this, 'confirmText', {
            get: function() {
                return confirmText;
            },

            set: function(v) {
                if (v) {
                    confirmText = v;
                    element.querySelector('.' + Klass.confirm).innerHTML = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });
        var cancelText = options.cancelText || '取消';
        Object.defineProperty(this, 'cancelText', {
            get: function() {
                return cancelText;
            },

            set: function(v) {
                if (v) {
                    cancelText = v;
                    element.querySelector('.' + Klass.cancel).innerHTML = v;
                } else {
                    throw new Error('Non expected value');
                }
            }
        });


        // -- vm属性的获取和设置

        var viewModel;
        Object.defineProperty(this, 'viewModel', {
            get: function() {
                return viewModel;
            },

            set: function(v) {
                if (v) {
                    viewModel = v;
                    that.syncViewModel(); // 自动同步数据和视图
                } else {
                    throw new Error('Non expected value');
                }
            }
        });

        // 同步数据和视图的方法
        this.syncViewModel = function() {
            var that = this;

            // 重新渲染
            this.render();
            // todo: 待验证是否必须。 延迟，等待dom ready
            setTimeout(function () {
                that.addEvents();
            }, 100);
        };

        // --- 事件代理
        this._events = {};

        this.addEventListener = function(type, fn) {
            if ( !this._events[type] ) {
                this._events[type] = [];
            }

            this._events[type].push(fn);
        };

        this.removeEventListener = function(type, fn) {
            if ( !this._events[type] ) {
                return;
            }

            var index = this._events[type].indexOf(fn);

            if ( index > -1 ) {
                this._events[type].splice(index, 1);
            }
        };

        // 后可带参数
        // 执行自定义事件绑定
        this.execEvent = function (type) {
            if ( !this._events[type] ) {
                return;
            }

            var i = 0,
                l = this._events[type].length;

            if ( !l ) {
                return;
            }

            for ( ; i < l; i++ ) {
                this._events[type][i].apply(this, [].slice.call(arguments, 1));
            }
        };

        // 移除控件元素
        this.remove = function() {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };

        this.element = element;
        this.root = root;

        /**
            业务代码
         */
        var myScroll = {};
        var currentOptions = {};
        var selectedValue = {};

        // -- 拼装 select dom
        this.render = function () {
            var selectData = viewModel;

            var headHtm = ['<div class="' + Klass.header + '">',
                '<a href="javascript:void(0);" class="' + Klass.cancel + '">' + cancelText + '</a>',
                '<span class="tip">' + title + '</span>',
                '<a href="javascript:void(0);" class="' + Klass.confirm + '">' + confirmText + '</a>',
            '</div>'].join('');

            var bodyHtm = '<div class="' + Klass.wrapper + '"></div>';

            this.element.innerHTML = '' +
                '<div class="' + Klass.innerBox + '">' +
                    headHtm +
                    bodyHtm +
                '</div>';

            for (var key in selectData) {
                this.renderColumn(key, selectData[key]);
            }

            // 刷新
            this.refresh();
        };

        // 选择数据集
        this.selectedIndex = {};
        this.renderColumn = function (key, dataList) {
            var that = this;

            if (Array.isArray(dataList)) {
                var selectDomHtm = [];

                // 默认选中是第一个
                that.selectedIndex[key] = 0;
                dataList.forEach(function (item, index) {
                    if (item.selected) {
                        that.selectedIndex[key] = index;
                    }

                    selectDomHtm.push(
                        '<div class="' + Klass.option + '" data-value="' + item.value + '">' + item.key + '</div>'
                    );
                });

                var selectHTML = selectDomHtm.join('');

                var parentNode = that.element.querySelector('.' + Klass.wrapper);
                var oldEl = parentNode.querySelector('[data-type=' + key + ']');

                if (oldEl) {
                    oldEl.firstChild.innerHTML = selectHTML;
                } else {
                    var columnHtml = '<div class="scroller">' + selectHTML + '</div>';
                    var colEl = document.createElement('div');
                    colEl.className = Klass.col;
                    colEl.setAttribute('data-type', key);
                    colEl.innerHTML = columnHtml;

                    parentNode.appendChild(colEl);
                }
            } else {
                throw ('select项数据列表必须是数组');
            }
        };

        // --- scroll 操作

        this.setScroll = function () {
            var that = this;

            var selects = [].slice.call(this.element.querySelectorAll('.' + Klass.col));
            selects.forEach(function (value) {
                var scrollElement = value.querySelector('.scroller');

                var scroll = lib.scroll({
                    scrollElement: scrollElement,
                    inertia: 'slow'
                }).init();

                scrollElement.addEventListener('click', function (e) {
                    var target = e.target;
                    if (target.className.indexOf(Klass.option) === 0) {
                        scroll.scrollToElement(target, true);
                    }
                }, false);

                scroll.addScrollendHandler(function () {
                    that.scrollEndHandler(scroll, value);
                });

                var type = value.getAttribute('data-type');

                // 初始化滚动位置
                that.scrollToNthChild(scroll, that.selectedIndex[type]);

                // 增加是否需要触发事件处理器flag, 默认 true
                scroll.handler = true;

                myScroll[type] = scroll;
            });

            // cache
            this.selects = selects;
            this.scrolls = myScroll;
        };

        // 暴露当前操作的列名
        this.currentColName = '';
        this.scrollEndHandler = function (scrollObj, container) {
            if (!scrollObj.handler) {
                // reset to true
                scrollObj.handler = true;
                return;
            }

            var scrollTop = scrollObj.getScrollTop();

            // 修正按一行一行滚动
            var scrolled = Math.round(scrollTop/this.height);
            scrollObj.handler = false;
            this.scrollToNthChild(scrollObj, scrolled, false);

            var type = container.getAttribute('data-type');
            this.currentColName = type;

            this.setSelectedStatus(type, Math.abs(scrolled));

            // 选中值
            this.execEvent('select', type);
        };
        this.setSelectedStatus = function (colName, selectedIndex) {
            var container = this.scrolls[colName].element;

            var options = container.querySelectorAll('.' + Klass.option);
            currentOptions[colName] = container.querySelector('.current');
            currentOptions[colName] && (currentOptions[colName].className = Klass.option);

            currentOptions[colName] = options[selectedIndex];
            currentOptions[colName].className = Klass.option + ' current';

            selectedValue['val-' + colName] = currentOptions[colName].getAttribute('data-value');
            selectedValue['key-' + colName] = currentOptions[colName].innerHTML;

            // public
            this.selectedValue = selectedValue;
            this.selectedIndex[colName] = selectedIndex;
        };
        // 调整选中状态
        this.resetScrollPos = function () {
            var that = this;

            this.selects && this.selects.forEach(function (value) {
                var type = value.getAttribute('data-type');
                var scroll = that.scrolls[type];
                that.scrollToNthChild(scroll, that.selectedIndex[type]);
            })
        };

        // 滚动到某个元素
        this.scrollToNthChild = function (scroll, index, smooth) {
            var el = scroll.element;

            var target = el.querySelector(':nth-child(' + (1 + index) + ')');

            var isSmooth = typeof smooth != 'undefined' ? smooth : true;
            scroll.scrollToElement(target, isSmooth);
        };

        // -- 事件监听

        var scrollHasSet = false;
        var inited = false;
        this.addEvents = function () {
            var opts = this.options;
            var that = this;

            if (!inited) {

                // 兼容tbm：同步 tbm resize 监听 resize
                var timeout;
                function resize () {
                    that.refresh();
                }
                window.addEventListener('resize', function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(resize, 310);
                }, false);

                if (opts.trigger) {
                    var triggers = opts.trigger.length > 1 ? [].slice.call(opts.trigger): [opts.trigger];
                    triggers.forEach(function (value) {
                        value.addEventListener('click', function () {
                            // cache 触发器
                            that.trigger = value;
                            that.show();
                        });
                    });
                }
                inited = true;
            }

            // 确定
            this.element.querySelector('.' + Klass.confirm).addEventListener('click', function () {

                if (opts.verifyMe) {
                    if (opts.verifyMe(that.selectedValue)) {
                        that.hide();
                    } else {
                        return;
                    }
                } else {
                    that.hide();
                }

                // confirm select
                that.execEvent('confirm', that.trigger);
            }, false);

            // 取消
            this.element.querySelector('.' + Klass.cancel).addEventListener('click', function () {
                // cancel select
                that.execEvent('cancel', that.trigger);

                that.hide();
            }, false);
        };


        // --  接口方法


        this.show = function () {
            var that = this;

            // 展示之前
            this.execEvent('beforeShow', that.trigger);

            SelectBox.open(this.element);

            // 设置scroll
            setTimeout(function () {
                if (!scrollHasSet) {
                    that.setScroll();
                    scrollHasSet = true;
                }
            }, 100);

            this.execEvent('show');
        };

        this.hide = function () {
            SelectBox.close(this.element);
            this.execEvent('hide');
        };

        // 当窗口 resize 时调用
        this.refresh = function () {
            // fix 浮出窗口跑顶上去了
//            this.element.style.height = window.innerHeight + 'px';   //多个浏览器默认窗口变化会引发展示bug，暂时注释掉 by hellsing

            var that = this;
            var getHeightInterval = setInterval(function () {
                var optionClass = '.' + Klass.option;
                var el = document.querySelector(optionClass);

                if (el && el.clientHeight) {
                    that.height = el.clientHeight;
                    that.resetScrollPos();

                    clearInterval(getHeightInterval);
                    getHeightInterval = null;
                }
            }, 100);
        };

        // 触发联动
        this.linkage = function (colName, colData) {
            this.viewModel[colName] = colData;
            this.renderColumn(colName, colData);

            // refresh scroll
            var scroll = this.scrolls[colName];
            var selectedIndex = this.selectedIndex[colName];
            scroll.refresh();
            this.scrollToNthChild(scroll, selectedIndex);
        }

        // 滚动选择值
        this.scrollToIndex = function (colName, index) {
            var scroll = this.scrolls[colName];
            this.scrollToNthChild(scroll, index);
            this.setSelectedStatus(colName, index);
        };
    };

    // export
    ctrl.selectmenu = SelectMenu;

})(window, window['ctrl'] || (window['ctrl'] = {}));
