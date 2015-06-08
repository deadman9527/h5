/**
 * slideview
 *
 * lichao.lc
 * Copyright 2014, BSD License
 *
 **/
(function (global, ctrl, undef) {
    "use strict";
        //导致触发翻页的卡片拖拽距离的比率
    var RATE_OF_SNAPTHRESHOLD = 0.15,

        //翻页动画标准时长
        PAGE_FLIP_TIME = 300,

        //翻页动画最久时长
        MAX_PAGE_FLIP_TIME = 700,

        //拖拽到首尾极限后的减速拖拽倍率
        SLOW_RATE_OF_DRAW_OUT = 5,

        //拖拽到首尾极限后的回弹动画时长
        DRAW_OUT_BOUNCE_TIME = 200,

        slice = Array.prototype.slice,
        concat = Array.prototype.concat,
        hasOwnP = Object.prototype.hasOwnProperty,
        compatibility, cs, ce, SlideView, doc = global.document;

    function getConstructorName(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    SlideView = (function() {

        var incId = 0;

        function SlideView(el, options) {
            var i = 0,
                me = this,
                id = +new Date() + '-' + (incId+=1),
                root = doc.createDocumentFragment(),
                len, slider, items;

            this.pos = 0;
            this.page = 0;
            this.currentPage = 0;
            this.customEvents = [];

            options = options || {};
            if (getConstructorName(el) === 'String') {
                el = doc.querySelector(el);
            }
            el.setAttribute('data-ctrl-name', 'SlideView');
            el.setAttribute('data-ctrl-id', id);

            this.element = el;

            this.options = {

                //TODO:   v:vertical  or  h:horizontal(default)  x,y是废弃不兼容的
                direction: 'h',

                duration: PAGE_FLIP_TIME,
                visible: 1,
                play: false,
                loop: false,
                interval: 5000,
                snapThreshold: null,

                lazy: '.lazyimg',

                prev: null,
                next: null
            };
            for (i in options) {
                if (hasOwnP.call(options, i)) {
                    this.options[i] = options[i];
                }
            }
            if(this.options.direction === 'horizontal'){
                this.options.direction = 'h';
            }
            if(this.options.lazy){
                this.options.lazy = this.options.lazy.replace(/^\./, '');
            }

            this.element.style.overflow = 'hidden';
            this.element.style.position = 'relative';


            slider = this.element.querySelector('.ctrl-slideview') || doc.createElement('ul');
            if(!compatibility.hasClass(slider, 'ctrl-slideview')){
                compatibility.addClass(slider, 'ctrl-slideview');
            }
            slider.style.cssText += 'position:relative;top:0;height:100%;width:100%;' + cs.cssVendor + 'transition-duration:0;' + cs.cssVendor + 'transform:translateZ(0);' + cs.cssVendor + 'transition-timing-function:ease;padding:0;margin:0';
            this.slider = slider;

            this.element.appendChild(slider);

            this.items = [];

            if (this.options.items) {
                this.items = this.options.items;
            }
            else{
                if(this.options.itemClass){
                    this.items = slice.call(this.slider.querySelectorAll(this.options.itemClass));
                }else{
                    this.items = slice.call(this.slider.children);
                }
            }
            this.syncViewModel();

            this.__refreshSize();
            this.__checkPosition();
            this.__loadLazy();

            if(this.options.play){
                this.begin();
            }

            this.root = root;
            this.root.appendChild(this.element);

            compatibility.addEvent(global, 'resize', this);
            compatibility.addEvent(this.element, 'touchstart', this);
            compatibility.addEvent(global, 'touchend', this);
            compatibility.addEvent(global, 'touchcancel', this);
            compatibility.addEvent(global, 'touchmove', this);
            compatibility.addEvent(this.slider, 'transitionend', this);
        }
        SlideView.prototype = {

            syncViewModel: function(){
                var items, i, len;

                this.slider.innerHTML = '';
                for (items = this.items, i = 0, len = items.length; i < len; i += 1) {
                    this.__createItem(items[i], i);
                }
            },

            begin: function(){
                var me = this;

                if(!this.__playtimer){
                    this.__playtimer = setInterval(function(){
                        me.next();
                    }, this.options.interval);
                }
            },
            stop: function(){
                clearInterval(this.__playtimer);
                this.__playtimer = null;
            },
            onFlip: function(fn) {
                compatibility.addEvent(this.element, 'slideview-flip', fn);
                this.customEvents.push(['flip', fn]);
            },
            onMoveOut: function(fn) {
                compatibility.addEvent(this.element, 'slideview-moveout', fn, false);
                this.customEvents.push(['moveout', fn]);
            },
            onMoveIn: function(fn) {
                compatibility.addEvent(this.element, 'slideview-movein', fn, false);
                this.customEvents.push(['movein', fn]);
            },
            onTouchStart: function(fn) {
                compatibility.addEvent(this.element, 'slideview-touchstart', fn, false);
                this.customEvents.push(['touchstart', fn]);
            },
            destroy: function() {
                while (this.customEvents.length) {
                    compatibility.removeEvent(this.element, 'slideview-' + this.customEvents[0][0], this.customEvents[0][1], false);
                    this.customEvents.shift();
                }
                compatibility.removeEvent(global, 'resize', this);
                compatibility.removeEvent(this.element, 'touchstart', this);
                compatibility.removeEvent(this.element, 'touchmove', this);
                compatibility.removeEvent(this.element, 'touchend', this);
                compatibility.removeEvent(this.slider, 'transitionend', this);
            },
            __createItem: function(item, i) {
                item.id = 'slideview-item-' + i;
                item.style.cssText += cs.cssVendor + 'transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;' + (this.options.direction === 'h' ? 'left' : 'top') + ':' + i * 100 + '%';
                this.slider.appendChild(item);

                this.__refreshSize();
            },
            prev: function() {
                if ( !this.options.loop && !this.currentPage ) {
                    return;
                }
                this.pos += 1;
                this.isShowingNext = -1;
                this.__setAroundPage();
                this.__checkPosition();
            },
            next: function() {
                if ( !this.options.loop && this.currentPage === this.items.length - 1) {
                    return;
                }
                this.pos -= 1;
                this.isShowingNext = 1;
                this.__setAroundPage();
                this.__checkPosition();
            },
            slideTo: function(index) {
                if (this.items[index]) {
                    this.slider.style[cs.transitionDuration] = Math.min(MAX_PAGE_FLIP_TIME, Math.abs(this.currentPage - index) * this.options.duration) + 'ms';
                    this.currentPage = index;
                    this.__pos(-this.currentPage * this.pageSize);
                    this.__loadLazy();
                    this.__refreshPosition();
                }
            },
            handleEvent: function(e) {
                switch (e.type) {
                case ce.touchstart:
                    this.__start(e);
                    break;
                case ce.touchmove:
                    this.__move(e);
                    break;
                case ce.touchcancel:
                case ce.touchend:
                    this.__end(e);
                    break;
                case ce.resize:
                    this.__resize(e);
                    break;
                case ce.transitionend:
                case 'otransitionend':
                    if (e.target === this.slider) {
                        this.__transitionend(e);
                    }
                    break;
                }
            },
            /**
             * 1. 根据dom位置重新设置id为 slideview-item-{n}
             * 2. 依次重置left/top值( n * 100 )
             * @method __refreshPosition
             */
            __refreshPosition: function() {
                var item, items = this.items,
                    i = 0,
                    len = items.length;

                for (; i < len; i += 1) {
                    item = items[i];
                    item.id = 'slideview-item-' + i;
                    item.style.cssText += cs.cssVendor + 'transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;' + (this.options.direction === 'h' ? 'left' : 'top') + ':' +  i * 100 + '%';
                }
            },
            __refreshSize: function() {
                this.elementWidth = this.element.clientWidth;
                this.elementHeight = this.element.clientHeight;
                this.sliderWidth = this.slider.clientWidth;
                this.sliderHeight = this.slider.clientHeight;
                this.pageWidth = this.elementWidth;
                this.pageHeight = this.elementHeight;
                this.maxX = -this.items.length * this.pageWidth + this.elementWidth;
                this.maxY = -this.items.length * this.pageHeight + this.elementHeight;

                this.maxPos = this.options.direction === 'h' ? this.maxX : this.maxY;
                this.pageSize = this.options.direction === 'h' ? this.pageWidth : this.pageHeight;


                this.snapThreshold = this.options.snapThreshold === null ? Math.round(this.pageSize * RATE_OF_SNAPTHRESHOLD) : /%/.test(this.options.snapThreshold) ? Math.round(this.pageSize * this.options.snapThreshold.replace('%', '') / 100) : this.options.snapThreshold;
            },
            __resize: function(e) {
                this.__refreshSize();
                this.slider.style[cs.transitionDuration] = '0s';
                this.__pos(-this.currentPage * this.pageSize);
            },
            __start: function(e) {
                if (this.initiated){
                    return;
                }

                if(this.__playtimer){
                    this.stop();
                }

                var point = compatibility.hasTouch ? e.touches[0] : e;
                this.initiated = true;
                this.moved = false;

                //用于计算dist(从start到move的距离)
                this.startX = point.pageX;
                this.startY = point.pageY;

                //用于计算delta(本次move和上次move的距离)
                this.pointX = point.pageX;
                this.pointY = point.pageY;

                this.startTime = +new Date();

                this.pointTime = +new Date();

                this.stepsX = 0;
                this.stepsY = 0;
                this.isShowingNext = 0;
                this.directionLocked = false;
                this.settedAround = false;

                if (this.options.direction === 'h') {
                    this.startPos = point.pageX;
                    this.pointPos = point.pageX;
                } else {
                    this.startPos = point.pageY;
                    this.pointPos = point.pageY;
                }

                this.slider.style[cs.transitionDuration] = '0s';
                this.__event('touchstart');

            },
            __move: function(e) {
                if (!this.initiated) {
                    return;
                }

                var point = compatibility.hasTouch ? e.touches[0] : e,
                    deltaX = point.pageX - this.pointX,
                    deltaY = point.pageY - this.pointY,
                    now = +new Date(),
                    direction = this.options.direction === 'h' ? 'left' : 'top',
                    newPos = this.pos + (this.options.direction === 'h' ? deltaX : deltaY);


                this.moved = true;
                this.pointX = point.pageX;
                this.pointY = point.pageY;

                this.pointTime = now;


                //1向右 -1向左
                this.isMovingRight = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;
                //1向下 -1向上
                this.isMovingDown = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;

                this.isShowingNext = (this.options.direction === 'h' ? this.isMovingRight : this.isMovingDown) * -1;
                this.stepsX += Math.abs(deltaX);
                this.stepsY += Math.abs(deltaY);
                e.preventDefault();

                //距离上一次move的步进判断
                if (this.stepsX < 10 && this.stepsY < 10) {
                    return;
                }


                if (this.options.direction === 'h') {
                    this.pointPos = point.pageX;

                    //方向锁尚未锁定时，在horizontal方向上，y步进大于x步进了
                    //则本次touchstart开启的一系列touchmove被关闭
                    if (!this.directionLocked && this.stepsY > this.stepsX) {
                        this.initiated = false;
                        return;
                    }
                } else {
                    this.pointPos = point.pageY;
                    if (!this.directionLocked && this.stepsX > this.stepsY) {
                        this.initiated = false;
                        return;
                    }
                }
                if(this.options.loop && !this.settedAround){
                    this.__setAroundPage();
                    this.settedAround = true;
                }


                //方向锁锁定
                //之后touchmove的方向即使不符合组件方向
                //也不会关闭此次touchstart开启的touchmove事件流对slide动作的影响
                this.directionLocked = true;

                if (!this.options.loop && (newPos > 0 || newPos < this.maxPos)) {
                    //已是最终且不支持loop时，减速拖拽
                    newPos = this.pos + (this.options.direction === 'h' ? deltaX : deltaY) / SLOW_RATE_OF_DRAW_OUT;
                }


                this.__pos(newPos);

            },
            __end: function(e) {
                if (!this.initiated) {
                    return;
                }

                var point = compatibility.hasTouch ? e.changedTouches[0] : e,
                    now = +new Date(),
                    distX = Math.abs(point.pageX - this.startX),
                    distY = Math.abs(point.pageY - this.startY),
                    dist = this.options.direction === 'h' ? distX : distY,
                    velocity = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)) / (now - this.startTime),
                    //magic number 0.5: 平均每ms移动0.5px以上
                    isflick = velocity > 0.5;

                this.initiated = false;

                if (!this.moved) {
                    return;
                }

                //拖到第一个之前或末尾之后区域touchend的回弹
                if (!this.options.loop && (this.pos > 0 || this.pos < this.maxPos)) {
                    if (!this.options.noBounceEasing) {
                        this.slider.style[cs.transitionDuration] = DRAW_OUT_BOUNCE_TIME + 'ms';
                    }
                    this.__pos(this.page * this.pageSize);
                    this.__event('movein');
                    return;
                }

                //不是flick，且移动距离不够flip临界值无法触发翻页，进行回弹
                if (!isflick && dist < this.snapThreshold) {
                    if (!this.options.noBounceEasing) {
                        this.slider.style[cs.transitionDuration] = Math.floor(this.options.duration * dist / this.snapThreshold) + 'ms';
                    }
                    this.__pos(this.page * this.pageSize);
                    return;
                }

                //TODO: 移动距离超过一屏时，最多限制每次移动一屏
                //TODO:暂时修改为这样，另一种做法是在__move事件中调整prev及next元素的left值。
                if (this.pageSize < dist) {
                    this.__pos(this.page * this.pageSize - this.isShowingNext);
                }

                this.__checkPosition();

            },
            __transitionend: function() {
                this.__setAroundPage();
            },
            __loadLazy: function() {
                var item = this.items[this.currentPage],
                    nextItem = this.items[this.currentPage === this.items.length - 1 ? 0 : this.currentPage + 1],
                    lazyImgs = concat.call(slice.call(item.querySelectorAll('.'+this.options.lazy)), slice.call(nextItem.querySelectorAll('.'+this.options.lazy))),
                    i = 0,
                    len = lazyImgs.length;

                for (; i < len; i += 1) {
                    if(compatibility.hasClass(lazyImgs[i], this.options.lazy)){
                        lazyImgs[i].src = lazyImgs[i].getAttribute('dataimg');
                        lazyImgs[i].removeAttribute('dataimg');
                        compatibility.removeClass(lazyImgs[i], this.options.lazy);
                    }
                }
            },

            __event: function(type) {
                var ev = doc.createEvent('Event');
                ev.initEvent('slideview-' + type, true, true);
                this.element.dispatchEvent(ev);
            },
            __checkPosition: function() {
                var newPos, activeItem, currentPage;


                if (this.isShowingNext > 0) {
                    //>0是向右或向下，所-1.3就是取-2,外层slider的新pos会更向左取整,从而显示下一个元素
                    this.page = Math.floor(this.pos / this.pageSize);
                } else {
                    //否则是上翻
                    this.page = Math.ceil(this.pos / this.pageSize);
                }
                newPos = this.page * this.pageSize;
                this.slider.style[cs.transitionDuration] = Math.floor(500 * Math.abs(this.pos - newPos) / this.pageSize) + 'ms';

                currentPage = this.page % this.items.length;
                if (currentPage > 0 ){
                    currentPage = this.items.length - currentPage;
                }
                currentPage = Math.abs(currentPage);


                //this.__setAroundPage();
                this.__pos(newPos);

                if (this.currentPage !== currentPage) {
                    activeItem = this.items[this.currentPage];
                    if (activeItem) {
                        compatibility.removeClass(activeItem, 'slideview-active');
                    }
                    this.currentPage = currentPage;
                    this.__loadLazy();
                    this.__event('flip');
                    //console.log(this.currentPage, this.page);
                }
                activeItem = this.items[this.currentPage];
                if (activeItem) {
                    compatibility.addClass(activeItem, 'slideview-active');
                }
            },

            /**
             * 设置当前滚动到的元素的前后元素
             * @method __setAroundPage
             *
             * @desc showingPage的定义为：
             * 如果向左touchmove,即需要显示下一个数据，则以元素的右下角xy=width/height为参照坐标
             * 如向右touchmove,即需要显示上一个数据，则以元素的左上角xy=0为参照坐标
             * 参照坐标在当前视区内的元素，为showingPage
             * showingPage前面的为prevPage，后面的为nextPage
             * 在向左拖动，即将显示下一个数据时设置nextPage的left/top
             * 在向右拖动，即将显示上一个数据时设置prevPage的left/top
             *
             */
            __setAroundPage: function(){

                var showingPage, prevPage, nextPage,
                    direction = this.options.direction === 'h' ? 'left' : 'top',
                    showingIndex = this.isShowingNext === 1 ? Math.ceil : Math.floor;

                //只有1个item，不支持loop
                if(this.items.length < 2){
                    return;
                }

                if(this.pos > 0){
                    showingPage = this.items.length - showingIndex(this.pos / this.pageSize) % this.items.length;
                    if(showingPage === this.items.length){
                        showingPage = 0;
                    }
                }else{
                    showingPage = Math.abs(showingIndex(this.pos / this.pageSize) % this.items.length);
                }

                if(this.isShowingNext === 1){

                    nextPage = showingPage + 1;
                    if(nextPage === this.items.length){
                        nextPage = 0;
                    }
                    this.items[nextPage].style[direction] = parseInt(this.items[showingPage].style[direction], 10) + 100 + '%';
                    //console.log('set next:',this.pos, this.pos/this.pageSize, showingPage, nextPage);
                }else if (this.isShowingNext === -1) {

                    prevPage = showingPage - 1;
                    if(prevPage === -1){
                        prevPage = this.items.length - 1;
                    }
                    this.items[prevPage].style[direction] = parseInt(this.items[showingPage].style[direction], 10) - 100 + '%';
                    //console.log('set prev:',this.pos, this.pos/this.pageSize, showingPage, prevPage);
                }
            },
            __pos: function(pos) {
                this.pos = pos;
                if (this.options.direction === 'h') {
                    this.slider.style[cs.transform] = 'translate(' + pos + 'px,0)' + cs.translateZ;
                } else {
                    this.slider.style[cs.transform] = 'translate(0,' + pos + 'px)' + cs.translateZ;
                }
            }
        };
        return SlideView;
    }());

    ctrl.slideview = function(el, options) {
        var slideview = new SlideView(el, options);
        return slideview;
    };

    compatibility = (function() {

        var me = {},
            _plainStyle = doc.createElement('slideview').style,
            _vendor = (function() {
                var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                    transform, i = 0,
                    len = vendors.length;

                for (; i < len; i += 1) {
                    transform = vendors[i] + 'ransform';
                    if (transform in _plainStyle) {
                        return vendors[i].substr(0, vendors[i].length - 1);
                    }
                }
                return false;
            }()),
            _prefixStyle = function(style) {
                if (_vendor === false) {
                    return false;
                }
                if (_vendor === '') {
                    return style;
                }

                style = style.charAt(0).toUpperCase() + style.substr(1);

                return _vendor + style;
            },
            regEscape = function (str) {
                return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
            },
            hasTouch = 'ontouchstart' in global,
            has3d = _prefixStyle('perspective') in _plainStyle;

        me.extend = function(target, source) {
            for (var k in source) {
                if (hasOwnP.call(source, k)) {
                    target[k] = source[k];
                }
            }
        };

        me.extend(me, {

            hasTouch: hasTouch,
            has3d: has3d,
            hasTransform: !! _vendor,
            hasTransitionEnd: _prefixStyle('transition') in _plainStyle,

            styles: {
                cssVendor: _vendor ? '-' + _vendor.toLowerCase() + '-' : '',
                transform: _prefixStyle('transform'),
                transitionDuration: _prefixStyle('transitionDuration'),
                translateZ: has3d ? ' translateZ(0)' : ''
            },

            events: {
                resize: 'onorientationchange' in global ? 'orientationchange' : 'resize',
                touchstart: hasTouch ? 'touchstart' : 'mousedown',
                touchmove: hasTouch ? 'touchmove' : 'mousemove',
                touchend: hasTouch ? 'touchend' : 'mouseup',
                touchcancel: hasTouch ? 'touchcancel' : 'mouseup',

                transitionend: (function() {
                    if (_vendor === false){
                        return false;
                    }
                    var transitionEnd = {
                        '': 'transitionend',
                        'webkit': 'webkitTransitionEnd',
                        'Moz': 'transitionend',
                        'O': 'oTransitionEnd',
                        'ms': 'MSTransitionEnd'
                    };

                    return transitionEnd[_vendor];
                }())
            },
            addEvent: function(el, eventName, fn, capture) {
                el.addEventListener(this.events[eventName] || eventName, fn, !! capture);
            },
            removeEvent: function(el, eventName, fn, capture) {
                el.removeEventListener(this.events[eventName], fn, !! capture);
            },
            hasClass: function(el, className){
                return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
            },
            addClass: function(el, className){
                el.className = el.className ? el.className + ' ' + className : className;
            },
            removeClass: function(el, className){
                el.className = el.className.replace(new RegExp('(?:^|\\s)' + regEscape(className) + '(?=\\s|$)','ig'), '');
            }
        });
        return me;

    }());
    cs = compatibility.styles;
    ce = compatibility.events;

}(this, this.ctrl || (this.ctrl = {})));
