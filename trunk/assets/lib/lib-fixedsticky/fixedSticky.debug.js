/**
 * Created by 景烁 on 14-4-21.
 *
 * borrowed from https://github.com/filamentgroup/fixed-sticky
 *
 * 改造: 支持 zepto
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

/**
 *
 *  实现 position 中 sticky 模式
 *
 *  @use
 *
 *  .selector {
 *      top: 0; // 定义top
 *      top: 32px;
 *
 *      bottom: 0; // 或者是定义 bottom
 *      bottom: 20px;
 *  }
 *
 *  $( '.selector' ).fixedsticky();
 *
 *  @note
 *
 *  依赖 css
 *
    .fixedsticky {
        position: -webkit-      ;
        position: -moz-sticky;
        position: -ms-sticky;
        position: -o-sticky;
        position: sticky;
    }
    // When position: sticky is supported but native behavior is ignored
    .fixedsticky-withoutfixedfixed .fixedsticky-off,
    .fixed-supported .fixedsticky-off {
        position: static;
    }
    .fixedsticky-withoutfixedfixed .fixedsticky-on,
    .fixed-supported .fixedsticky-on {
        position: fixed;
    }
    .fixedsticky-dummy {
        display: none;
    }
    .fixedsticky-on + .fixedsticky-dummy {
        display: block;
    }
 *
 *
 * */
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
                initialOffset = $el.attr( S.keys.offset ),
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

            if( position.top && isFixedToTop() || position.bottom && isFixedToBottom() ) {
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