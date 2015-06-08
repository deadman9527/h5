;(function(win, ctrl) {
    'use strict';

    var supportClassList = (function() {
        if (!!document.body.classList) {
            return true;
        }
        return false;
    }) ();

    var utils = {

        hasClass: function(elem, klass) {
            if (supportClassList) {
                return elem.classList.contains(klass);
            }

            if (klass.length == 0 || klass.indexOf(' ') != -1) {
                throw new Error('Invalid class name: "' + klass + '".');
            }
            var classes = elem.className;
            if (!classes) { // 不含类名
                return false;
            }
            if (classes == klass) { // 类名完全匹配
                return true;
            }
            return classes.search('\\b' + klass + '\\b') != -1; // 否则用正则表达式搜索
        },

        addClass: function(elem, klass) {
            if (supportClassList) {
                return elem.classList.add(klass);
            }

            if (utils.hasClass(elem, klass)) {
                return;
            }
            var classes = elem.className;
            if (classes && classes[classes.length - 1] != ' ') {
                klass = ' ' + klass; // 已经有其他类，则前面添加一个空格
            }
            elem.className += klass;
        },

        removeClass: function(elem, klass) {
            if (supportClassList) {
                return elem.classList.remove(klass);
            }

            if (klass.length == 0 || klass.indexOf(' ') != -1) {
                throw new Error('Invalid class name: "' + klass + '".');
            }
            var pattern = new RegExp('\\b' + klass + '\\b\\s*', 'g'); // 删除类，还有多余的空格
            var classes = elem.className;
            elem.className = utils.trim(classes.replace(pattern, ''));
        }
    };

    ctrl.pagenav = ctrl.pagenav || {};
    ctrl.pagenav.utils = utils;

}) (window, window['ctrl'] || (window['ctrl'] = {}));

;(function(win, ctrl) {
    'use strict';

    var doc = document;
    var incId = 0;

    var utils = ctrl.pagenav.utils;
    var hasClass = utils.hasClass;
    var addClass = utils.addClass;
    var removeClass = utils.removeClass;

    function PageNav(element, options) {

        var self = this;
        var ctrlId = Date.now() + '-' + (++incId); // 每个控件有唯一的id
        var root = doc.createDocumentFragment();

        if (!options && typeof element == 'object') { // 只传入了options对象
            options = element;
            element = options.elem;
        }
        if (element && element.nodeType != doc.ELEMENT_NODE) { // 传入的不是DOM元素节点
            throw new Error('Require a dom element.');
        }
        if (!element) { // 如果不是从已有DOM元素创建控件，则可以新建一个元素
            element = document.createElement('div');
        }
        root.appendChild(element);

        element.setAttribute('data-ctrl-name', 'pagenav');
        element.setAttribute('data-ctrl-id', ctrlId);

        this.root = root;
        this.element = element;

        var viewModel = {};
        Object.defineProperty(this, 'viewModel', {
            get: function() {
                return viewModel;
            },
            set: function(vm) {
                var idx = vm.index;
                idx = +idx;
                if (isNaN(idx) || idx <= 0) {
                    idx = 1;
                }

                var total = vm.total;
                if (total != null) {
                    total = +total;
                    if (isNaN(total) || total <= 0) {
                        total = 1;
                    }
                    if (idx > total) {
                        idx = total;
                    }
                }

                viewModel.index = idx;
                viewModel.total = total;

                self.syncViewModel();
            }
        });

        // 初始化控件
        this.init(options || {});
    }

    PageNav.prototype = {

        constructor: PageNav,

        // 控件初始化
        init: function(options) {
            options = options || {};
            var vm = {
                index: options.index,
                total: options.total
            };
            this.viewModel = vm;
        },

        // 同步viewModel设置
        syncViewModel: function() {
            this.oldIndex = this.viewModel.index;
            this.createDom();
            this.eventAttach();
            this.renderPage();
        },

        // 创建分页控件DOM
        createDom: function() {
            var element = this.element;
            var count = this.viewModel.total;
            var arrowElem = count && '<i class="aw a-u"></i>' || '';
            var selectElem = count && '<select class="c-p-select"></select>' || '';
            var tmpl = '';

            tmpl += '<div class="c-p-con">' +
                        '<a class="c-btn c-btn-aw c-p-pre"><span>上一页</span></a>' +
                        '<div class="c-p-cur c-btn"><span>' +
                            '<div class="c-p-arrow">' +
                                '<span></span>' +
                                arrowElem +
                            '</div>' +
                            selectElem +
                        '</span></div>' +
                        '<a class="c-btn c-btn-awr c-p-next"><span>下一页</span></a>' +
                    '</div>';
            element.innerHTML = tmpl;

            this.prevElem = element.querySelector('.c-p-pre');
            this.nextElem = element.querySelector('.c-p-next');
            this.selectElem = element.querySelector('select');

            if (!count) { // 总页数未知则不创建select元素的option
                return;
            }
            tmpl = '';
            for (var i = 0; i < count; i++) {
                tmpl += '<option>第' + (i + 1) + '页</option>';
            }
            this.selectElem.innerHTML = tmpl;
        },

        // 翻页时控件的状态显示
        renderPage: function(param) {
            var selectElem = this.selectElem;
            var index = this.viewModel.index;
            var total = this.viewModel.total;
            var prevElem = this.prevElem;
            var nextElem = this.nextElem;

            // 按钮及select显示状态
            if (total) { // 有总页数
                if (total == 1) {
                    addClass(prevElem, 'c-btn-off');
                    addClass(nextElem, 'c-btn-off');
                } else {
                    if (index == 1) {
                        addClass(prevElem, 'c-btn-off');
                        if (total > 1) {
                            removeClass(nextElem, 'c-btn-off');
                        }
                    } else if (index == total) {
                        addClass(nextElem, 'c-btn-off');
                        if (total > 1) {
                            removeClass(prevElem, 'c-btn-off');
                        }
                    } else {
                        if (index > 1 && index < total) {
                            removeClass(prevElem, 'c-btn-off');
                            removeClass(nextElem, 'c-btn-off');
                        }
                    }
                }
                if (selectElem) {
                    selectElem.selectedIndex = index - 1;
                }
            } else { // 没有总页数
                if (param == 'end') { // 翻到底
                    index--;
                    addClass(nextElem, 'c-btn-off');
                    this.viewModel.total = this.viewModel.index = index;
                }
                if (index <= 1) {
                    addClass(prevElem, 'c-btn-off');
                } else {
                    removeClass(prevElem, 'c-btn-off');
                }
            }

            // 文字信息
            var element = this.element;
            var pageText;
            if (selectElem) {
                pageText = index + '/' + total;
            } else {
                pageText = '第 ' + index + ' 页';
            }
            this.element.querySelector('.c-p-arrow span').innerText = pageText;
        },

        // 解除控件上的事件绑定
        eventDetach: function() {
            var prevElem = this.prevElem;
            var nextElem = this.nextElem;
            var selectElem = this.selectElem;
            prevElem.removeEventListener('click', this.handler, false);
            nextElem.removeEventListener('click', this.handler, false);
            if (selectElem) {
                selectElem.removeEventListener('change', this.handler, false);
            }
        },

        // 事件绑定
        eventAttach: function() {
            var self = this;
            var prevElem = this.prevElem;
            var nextElem = this.nextElem;
            var selectElem = this.selectElem;
            var handler = this.handler = function(e) {
                self.triggerEvent.call(self, e);
            }
            prevElem.addEventListener('click', handler, false);
            nextElem.addEventListener('click', handler, false);
            if (selectElem) {
                selectElem.addEventListener('change', handler, false);
            }
        },

        // 事件处理程序
        triggerEvent: function(e) {
            e.preventDefault();
            var self = this;
            var curElem = e.currentTarget;
            var type = e.type;
            var index = this.viewModel.index;
            var typebtn;
            var param = {};

            if (type == 'click') {
                if (hasClass(curElem, 'c-btn-off')) {
                    return;
                }
                if (hasClass(curElem, 'c-p-pre')) {
                    index--;
                    typebtn = 'prev';
                } else if (hasClass(curElem, 'c-p-next')) {
                    index++;
                    typebtn = 'next';
                }
            } else if (type == 'change') {
                index = curElem.selectedIndex + 1;
                if (this.oldIndex == index) {
                    return;
                }
                typebtn = 'select';
            }

            this.viewModel.index = index;
            this.oldIndex = index;
            param.index = index;
            param.type = typebtn;
            if (this.selectElem) {
                this.renderPage();
            } else { // 总页数未知，需请求后执行回调
                param.callback = function(param) {
                    self.renderPage(param);
                };
            }

            var event = doc.createEvent('HTMLEvents');
            event.initEvent('pagenav:switchPage', true, true);
            event.page = param;
            this.element.dispatchEvent(event);
        },

        // 事件代理
        addEventListener: function() {
            var element = this.element;
            element.addEventListener.apply(element, arguments);
        },
        removeEventListener: function() {
            var element = this.element;
            element.removeEventListener.apply(element, arguments);
        },

        // 移除控件
        remove: function() {
            this.eventDetach();
            var element = this.element;
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    };

    ctrl.pagenav = PageNav;

}) (window, window['ctrl'] || (window['ctrl'] = {}));
