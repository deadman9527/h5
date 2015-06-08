//sticky组件

/**
 * Created by 景烁 on 14-4-21.
 *
 * borrowed from https://github.com/filamentgroup/fixed-sticky
 *
 * 改造: 支持 zepto
 *
 * update by hellsing on 15-1-27
 *
 * 支持下拉菜单&sticky
 *
 */

/**
 *
 * 检验浏览器是否支持 position fixed
 * borrowed from @scottjehl
 *
 * */
;(function( w, undefined ){

    var htmlclass = "fixed-supported",
        el = w.document.createElement( "div" ),
        ua = w.navigator.userAgent,
        docEl = w.document.documentElement;

    // fix the test element
    el.style.position = "fixed";
    el.style.top = 0;

    // support test
    function checkFixed(){

        var scroll = "scrollTop" in w.document.body ? w.document.body.scrollTop : docEl.scrollTop;

        // only run test if there's a scroll we can compare
        if( scroll !== undefined && scroll > 0 && w.document.body ){

            w.document.body.insertBefore( el, w.document.body.firstChild );

            if( !el.getBoundingClientRect || el.getBoundingClientRect().top !== 0 ){
                // Fixed is not working or can't be tested
                docEl.className = docEl.className.replace( htmlclass, "" );
            }

            // remove the test element
            w.document.body.removeChild( el );

            // unbind the handlers
            if( w.removeEventListener ){
                w.removeEventListener( "scroll", checkFixed, false );
            }
            else{
                w.detachEvent( "onscroll", checkFixed );
            }
        }
    }

    // if a particular UA is known to return false results with this feature test, try and avoid that UA here.
    if(
    // Android 2.1, 2.2, 2.5, and 2.6 Webkit
        !( ua.match( /Android 2\.[1256]/ ) && ua.indexOf( "AppleWebKit") > -1 ) ||
        // Opera Mobile less than version 11.0 (7458)
        !( ua.match( /Opera Mobi\/([0-9]+)/ ) && RegExp.$1 < 7458 ) ||
        // Opera Mini
        !( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
        // Firefox Mobile less than version 6
        !( ua.match( /Fennec\/([0-9]+)/ ) && RegExp.$1 < 6 )
    // If necessary, add the other untestable browsers here...
        ){
        //add the HTML class for now.
        docEl.className += " " + htmlclass;

        // bind to scroll event so we can test and potentially degrade
        if( w.addEventListener ){
            w.addEventListener( "scroll", checkFixed, false );
        }
        else{
            w.attachEvent( "onscroll", checkFixed );
        }
    }

    w.FixedFixed = checkFixed;
}( this ));

;(function( win, $ ) {

    function featureTest( property, value, noPrefixes ) {
        // Thanks Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
        var prop = property + ':',
            el = document.createElement( 'test' ),
            mStyle = el.style;

        if( !noPrefixes ) {
            mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
        } else {
            mStyle.cssText = prop + value;
        }
        return mStyle[ property ].indexOf( value ) !== -1;
    }

    function getPx( unit ) {
        return parseInt( unit, 10 ) || 0;
    }

    var S = {
        classes: {
            plugin: 'fixedsticky',
            active: 'fixedsticky-on',
            inactive: 'fixedsticky-off',
            clone: 'fixedsticky-dummy',
            withoutFixedFixed: 'fixedsticky-withoutfixedfixed'
        },
        keys: {
            offset: 'data-fixedStickyOffset',
            position: 'data-fixedStickyPosition'
        },
        tests: {
            sticky: featureTest( 'position', 'sticky' ),
            fixed: featureTest( 'position', 'fixed', true )
        },
        // Thanks jQuery!
        getScrollTop: function() {
            var prop = 'pageYOffset',
                method = 'scrollTop';
            return win ? (prop in win) ? win[ prop ] :
                win.document.documentElement[ method ] :
                win.document.body[ method ];
        },

        // 特殊情况，如 fallback 的操作
        bypass: function() {
            // Check native sticky, check fixed and if fixed-fixed is also included on the page and is supported
            return ( S.tests.sticky ) ||
                !S.tests.fixed ||
                win.FixedFixed && !$( win.document.documentElement ).hasClass( 'fixed-supported' );
        },

        update: function( el ) {
            if( !el.offsetWidth ) { return; }
            var $el = $( el ),
            // 来源文件 jquery 采用 outerHeight()
                height = $el.height(),
                initialOffset = Number($el.attr( S.keys.offset )),
                scroll = S.getScrollTop(),
                isAlreadyOn = $el.is( '.' + S.classes.active ),
                toggle = function( turnOn ) {
                    $el[ turnOn ? 'addClass' : 'removeClass' ]( S.classes.active )
                        [ !turnOn ? 'addClass' : 'removeClass' ]( S.classes.inactive );
                },
                viewportHeight = $( window ).height(),
                position = JSON.parse($el.attr( S.keys.position)),
                skipSettingToFixed,
                elTop,
                elBottom,
                $parent = $el.parent(),
                parentOffset = $parent.offset().top,
            // 来源文件 jquery 采用 outerHeight()
                parentHeight = $parent.height();

            if( !initialOffset ) {
                initialOffset = $el.offset().top;
                $el.attr( S.keys.offset, initialOffset );
                $el.after( $( '<div>' ).addClass( S.classes.clone ).height( height ) );
            }

            if( !position ) {
                // Some browsers require fixed/absolute to report accurate top/left values.
                skipSettingToFixed = $el.css( 'top' ) !== 'auto' || $el.css( 'bottom' ) !== 'auto';

                if( !skipSettingToFixed ) {
                    $el.css( 'position', 'fixed' );
                }

                position = {
                    top: $el.css( 'top' ) !== 'auto',
                    bottom: $el.css( 'bottom' ) !== 'auto'
                };

                if( !skipSettingToFixed ) {
                    $el.css( 'position', '' );
                }

                $el.attr( S.keys.position, JSON.stringify(position) );
            }

            // 判断是否设置了 top 值
            function isFixedToTop() {
                var offsetTop = scroll + elTop;

                // Initial Offset Top
                return initialOffset < offsetTop &&
                    // Container Bottom
                    offsetTop + height <= parentOffset + parentHeight;
            }

            // 是否设置的是 bottom
            function isFixedToBottom() {
                // Initial Offset Top + Height
                return initialOffset + ( height || 0 ) > scroll + viewportHeight - elBottom &&
                    // Container Top
                    scroll + viewportHeight - elBottom >= parentOffset + ( height || 0 );
            }
            elTop = getPx( $el.css( 'top' ) );
            elBottom = getPx( $el.css( 'bottom' ) );
            if( (position.top && isFixedToTop()) || (position.bottom && isFixedToBottom()) ) {
                if( !isAlreadyOn ) {
                    toggle( true );
                }
            } else {
                if( isAlreadyOn ) {
                    toggle( false );
                }
            }
        },
        destroy: function( el ) {
            var $el = $( el );
            if (S.bypass()) {
                return;
            }

            // 干掉事件监听
            // zepto 支持命名空间的事件监听
            $( win ).off( '.fixedsticky' );

            return $el.each(function() {
                $( this )
                    .removeClass( S.classes.active )
                    .removeClass( S.classes.inactive )
                    .next( '.' + S.classes.clone ).remove();

                // JQUERY 可以采用
                //.removeData( [ S.keys.offset, S.keys.position ] )
                this.removeAttribute(S.keys.offset);
                this.removeAttribute(S.keys.position);
            });
        },
        init: function( el ) {
            var $el = $( el );

            if( S.bypass() ) {
                return;
            }

            return $el.each(function() {
                var _this = this;
                $( win ).on( 'scroll.fixedsticky', function() {
                    S.update( _this );
                });

                S.update( this );

                $( win ).on( 'resize.fixedsticky', function() {
                    if( $el.is( '.' + S.classes.active ) ) {
                        S.update( _this );
                    }
                });
            });
        }
    };

    win.FixedSticky = S;

    // Plugin
    $.fn.fixedsticky = function( method ) {
        if ( typeof S[ method ] === 'function') {
            return S[ method ].call( S, this);
        } else if ( typeof method === 'object' || ! method ) {
            return S.init.call( S, this );
        } else {
            throw new Error( 'Method `' +  method + '` does not exist on jQuery.fixedsticky' );
        }
    };

})( this, Zepto );






;(function(win, ctrl) {

    var incId = 0;
    function Tabheader(element, options) {
        var that = this;
        var id = Date.now() + '-' + (++incId);
        var root = document.createDocumentFragment();
        var container = document.createElement('div');
        container.className = 'head-container';
        var menus = document.createElement('div');
        menus.className = 'menus';
        if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
            options = arguments[0];
            element = null;
        }

        if (!element) {
            element = document.createElement('div');
        }

        options = options || {};

        container.setAttribute('data-ctrl-name', 'tabheader');
        element.setAttribute('data-ctrl-id', id);
        element.className = 'tab-header';
        menus.appendChild(element);
        container.appendChild(menus);
        root.appendChild(container);


        var content = document.createElement("div");
        content.className = 'content';
        element.appendChild(content);

        var moreContainerElement;

        var selectionIndicator;

        var scroll = lib.scroll(content, {
            direction: 'x'
        });

        this.renderSelected = function(){
            selectionIndicator = document.createElement("div");
            content.appendChild(selectionIndicator)
            selectionIndicator.className = "indicator";
            this.updateSelected();
        }

        this.updateSelected = function(d){
            var selectedItem = content.childNodes[selected];
            document.getElementsByClassName('tabheader-selected')[0] && (document.getElementsByClassName('tabheader-selected')[0].className = '');
            selectedItem.className = 'tabheader-selected';
//            var id = selectedItem.getAttribute('data-id');
            this.active = selected;
            var selectedRect = selectedItem.getBoundingClientRect().width;
            selectionIndicator.style.width = selectedItem.getBoundingClientRect().width-20 + "px";
            selectionIndicator.style.left = selectedItem.offsetLeft + "px";
            selectionIndicator.style.position = "absolute";
            selectionIndicator.style.bottom = "0";
            selectionIndicator.style.webkitTransitionDuration = Math.abs(0.1*d).toFixed(1)+ "s";
            scroll.scrollToElement(selectedItem,true);
        } ;


        //定义属性，使用一个局部变量和defineProperty
        //左右滑动菜单
        var selected = 0;
        Object.defineProperty(this,"selected",{
            get:function(){
                return selected;
            },
            set:function(v){
                //自定义属性改变的时候，可以做相应操作使之生效，比如派发事件、更改DOM
                if(selected == v) {
                    return;
                }
                var event = document.createEvent('HTMLEvents');
                event.initEvent("select", true, true);
                event.selected = viewModel.content[v];
                event.selectIndex = v;
                root.dispatchEvent(event);
                var d = selected - v;
                selected = v;

                this.updateSelected(d);
                return selected;
            }
        });
        //下拉列表
        var active;
        Object.defineProperty(this,"active",{
            get:function(){
                return active;
            },
            set:function(v){
                //自定义属性改变的时候，可以做相应操作使之生效，比如派发事件、更改DOM
                if(active == v || !moreContainerElement) {
                    return;
                }
                var activeItem = moreContainerElement.childNodes[v];
                document.getElementsByClassName('tabheader-active')[0] && (document.getElementsByClassName('tabheader-active')[0].className = '');
                activeItem.className = 'tabheader-active';
                active = v;
                return active;
            }
        });

        //定义数据，名为viewModel
        var viewModel = null;
        Object.defineProperty(this,"viewModel",{
            get:function(){
                return viewModel;
            },
            set:function(v){
                var self = this;
                content.innerHTML = "";
                if(v.hasMore){
                    var moreIconElement = document.createElement('div');
                    moreIconElement.className = 'more-icon';
                    var arrowElement = document.createElement('div');
                    arrowElement.className = 'arrow';
                    var titleElement = document.createElement('div');
                    titleElement.className = 'tabheader-title';
                    titleElement.innerText = '分类列表';
                    moreContainerElement = document.createElement('div');
                    moreContainerElement.className = 'more-container';
                    container.appendChild(titleElement);
                    moreIconElement.appendChild(arrowElement);
                    container.appendChild(moreIconElement);
                    container.appendChild(moreContainerElement);
                    moreIconElement.addEventListener('click',function(){
                        if($(this).hasClass('tabheader-arrow-up')){
                            $(moreContainerElement).hide();
                            $(this).removeClass('tabheader-arrow-up');
                            $(menus).css({position:'static',visibility:'visible'});
                            $(titleElement).hide();
                        }else{
                            $(this).addClass('tabheader-arrow-up');
                            $(moreContainerElement).show();
                            $(menus).css({position:'absolute',visibility:'hidden'});
                            $(titleElement).show();
                        }
                    });
                    for(var i = 0; i < v.content.length; i++) {
                        var item = document.createElement("div");
                        item.innerText = v.content[i].name;
                        v.colNumber && $(item).css({width: 100/v.colNumber+'%'});
                        (v.itemBorder==false) && $(item).css({border: 'none'});
                        v.itemFontsize && $(item).css({fontSize: v.itemFontsize});
                        moreContainerElement.appendChild(item);
                        item.addEventListener("click",function(i){
                            return function(){
                                self.active = i;
                                self.selected = i;
                                $(moreContainerElement).hide();
                                $(moreIconElement).removeClass('tabheader-arrow-up');
                                $(menus).css({position:'static',visibility:'visible'});
                                $(titleElement).hide();
                            }
                        }(i),false);
                        self.active = 0;
                    }
                }



                for(var i = 0; i < v.content.length; i++) {
                    var item = document.createElement("span");
                    v.menuPadding && $(item).css({padding:'0 '+v.menuPadding/2+'px'});
                    item.innerText = v.content[i].name;
//                    item.setAttribute('data-id', v.content[i].id);
                    content.appendChild(item);
                    item.addEventListener("click",function(i){
                        return function(){
                            self.selected = i;
                        }
                    }(i),false);
                }
                this.renderSelected();
                var range = document.createRange();
                range.setStartBefore(content);
                range.setEndAfter(content);
                content.style.width = range.getBoundingClientRect().width + "px";
                scroll.init();
                scroll.refresh();

                var bottombar;
                if(v.bottom){
                    bottombar = 0;
                    ctrl.bottomBar && ctrl.bottomBar.getInfo && (bottombar = parseInt(ctrl.bottomBar.getInfo()['height']));
                    $(container).parent().css({'bottom':bottombar+'px'});
                }
                var topbar;
                if(v.top){
                    topbar = 0;
                    ctrl.topBar && ctrl.topBar.getInfo && (topbar = parseInt(ctrl.topBar.getInfo()['height']));
                }
                $(container).parent().addClass('fixedsticky');
                $(container).parent().fixedsticky();
                function control(el,fixedTop,fixedBottom){
                    var height = el.offsetHeight;
                    var winHeight = document.documentElement.clientHeight;
                    var scrollTop = document.body.scrollTop;
                    var top = Number($(el).offset().top);
                    var isTop = $(el).css('top')=='auto'?false:true;
                    if(isTop){
                        if(top+height+fixedBottom>scrollTop+winHeight){
                            FixedSticky.destroy($(el));
                            $(el).css({'top':'auto','bottom':fixedBottom==undefined?'auto':fixedBottom+'px'});
                            $(el).fixedsticky();
                        }
                    }else{
                        if(top<scrollTop+fixedTop){
                            FixedSticky.destroy($(el));
                            $(el).css({'bottom':'auto','top':fixedTop==undefined?'auto':fixedTop+'px'});
                            $(el).fixedsticky();
                        }
                    }
                }
                $(window).on('scroll',function(){control($(container).parent()[0],topbar,bottombar)});
                window.onload = function(){
                    console.log('loaded');
                    FixedSticky.destroy($(container).parent());
                    $(container).parent().fixedsticky();
                }



                return viewModel = v;
            }
        })


        //可以直接把addEventListener转发到root，也可以自己处理。
        this.addEventListener = function addEventListener(){
            root.addEventListener.apply(root,arguments);
        }
        this.removeEventListener = function removeEventListener(){
            root.removeEventListener.apply(root,arguments);
        }

        this.remove = function() {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

        this.root = root;
        this.element = element;


    }

    ctrl.tabheader = Tabheader

})(window, window['ctrl'] || (window['ctrl'] = {}));




