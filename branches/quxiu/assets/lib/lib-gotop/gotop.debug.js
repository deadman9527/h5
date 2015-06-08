// gotop
;(function ($, lib){
    var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(c) { setTimeout(c, 1/60 * 1000); };

    function addStyle (style) {
        var csStyle = document.createElement('style');
        document.head.appendChild(csStyle);
        csStyle.innerHTML = style;
    }

    // 默认配置
    var defoptions = {

        // 触发 go top 的 trigger
        trigger: null,

        // 位置
        position: null,

        // 点击时的自定义处理函数
        onClick: function(){},

        style: '.ve-gotop {\
            position: fixed;\
            right: 8px;\
            bottom: 20px;\
            z-index: 10000;\
            opacity: 0;\
            pointer-events: none;\
            -webkit-transition: opacity 0.15s linear;\
            transition: opacity 0.15s linear;\
            width: 33px;\
            height: 33px;\
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAD2klEQVR42u2cTUsbQRjHLWQphR6UHGrB9JP01MbmC9RGe/eY72M2viu+NBgqvq0bFFFEUQ8eNCAa4kEfRBEUBd8ufR67A6Gx3d3svGymK/xAJ9nNzC+bmf9OZmyS8ZPL5QwkgXxGMkgWsZESAkgF2UQKzmMZ57kJxBBVL1mNb0Y6kHkEAjLvnKu5URofQz4hNgKCsJ3XiIVRgIF8Qw4RkMSh85pGGAS8Qr4gFQQUUUFSVBdVElrZRyAk2EirbAlpBEJKWlZnmEUg5GSRmCgJrxELgQbBojrzlvDWCTzQYGxS3XlJeIPsINCg7FAbeOSDVQQanNVAfQbrGDUhW6+ETgQ0o8uvhHcIaEqrn9hsaSzC8hTHnXsH0JyUl1GiorsIp42Gt3sI/Un/6z7iUHUFTdMMRM6NnFk9nxF7SUS7ioaPjY3B+Pi4ChFEskaEigQ5NTUFd3d3zywsLKgQYf0pIS5bwuTkJNze3sLi4iLMzs7Cw8MDFItFDuc2Xag5pqVaRIdMCSMjI3B9fQ3r6+us7FnG4+MjLC8vyxbRUS1iXpaEoaEhuLi4gK2trZrHSMbT0xOsra3JFGFVZweQQW9vL5yenkKpVGJlf5WxsbEhSwRhkIiELBHlcplwfd7MzMyzjO3tbVkiPpCIpAQJdBXQ1UBXBf3tWcbu7q4MEUkSkREsgd5Z6heof2BlvmTs7++LFpEhET0CJdDIQCMEjRSsrC4ZBwcHIkVkSURRlATbtikrUGZgZYFkHB0dQV9fn4i6LpGIPRES5ubmKDFSemRlXGQcHx9Df38/7/qWmgRGZ5LByrjKODk5gYGBAa7nbhIYnVmZEBlnZ2cwODjIVcSewOgsVMb5+TkMDw9z+2gUBUVnKTIuLy9hdHSUS2fZIyA6S5VxdXVF8xrBvvOgMME5OiuRcXNzAxMTE3WdgwWqJMforFQGddL5fN738SxiJwJEZ+qwqqOzchk0bBcKBV/Hspsug290Vi/j/v4epqen/RxrsDkJy+PsMovO9Jl0ic5KZdBsF/3u5Rjbz1QdE0GN9x6d1fcZNVes21Rd3McVwYaqMEOdptfk2VIzne9RhE7Y3r7g0V9E0u9XfiQhCGEUWUZi7l8C6y8iHS0LcFkWwGSk/vuFItHSoZdX3oOmvPe7sq5LQwnf611raWokwYyWIP9ugxEtSsc2RNsUsO7RxhWsc7SVSca+UBqGwjxERtsdsU4qN8CmdNsAGzRvdCrYEt2JGGHdJN+OrAgUsIK0e+8M1UuJI1+RPIfG/3DOFQ9eM/VXShvyEelGskjxhX+k8dN5rNt5bpusd/4XjtUkOQ5Pct4AAAAASUVORK5CYII=) no-repeat;\
            background-size: contain;\
        }\
        [data-dpr] .ve-gotop{\
            right: 0.4rem;\
            bottom: 1rem;\
            width: 1.65rem;\
            height: 1.65rem;\
        }\
            .ve-gotop-active {\
            opacity: 1;\
            pointer-events: auto;\
        }'
    };

    // constructor
    function GoTop(options) {

        this.options = {};

        $.extend(this.options, defoptions, options || {});

        this._init();

    }

    $.extend(GoTop.prototype, {
        // 初始化
        _init: function() {
            addStyle(this.options.style);

            var host = this,
                ops = host.options;

            if (!ops.trigger) {
                ops.trigger = $('<div class="ve-gotop"></div>').appendTo('body');
            }

            // 有配置才设置，否则用样式默认
            if (ops.position) {
                $(ops.trigger).css({
                    bottom: ops.position.bottom,
                    right: ops.position.right
                });
            }

            // 绑定click而不是tap，防止fixed定位的穿透bug
            $(ops.trigger).on('click', function(ev) {
                ev.preventDefault();
                window.scrollTo(0, 0);
                ops.onClick && ops.onClick.call(host, ev);
            });

            host._EventHandler = $(window).on('scroll touchend', function() {

                host._check();

            });

        },

        // 检测是否出现 gotop
        _check: function() {

            var host = this;

            RAF(function() {

                var st = $('body').scrollTop(),
                    vh = window.innerHeight;

                if (st > vh) {
                    host.show();
                } else {
                    host.hide();
                }

            });

//			if (!host._timer) {
//
//				host._timer = setTimeout(function() {
//
//					host._timer = null;
//
//					var st = $('body').scrollTop(),
//						vh = window.innerHeight;
//
//					if (st > vh) {
//						host.show();
//					} else {
//						host.hide();
//					}
//
//				}, 250);
//
//			}

        },

        // 销毁
        destroy: function() {

            $(window).off({ type: this._EventHandler });
            $(this.trigger).remove();

        },

        show: function() {

            $(this.options.trigger).addClass('ve-gotop-active');

        },

        hide: function() {

            $(this.options.trigger).removeClass('ve-gotop-active');

        }

    });

    // node
    $.fn.gotop = function(options) {

        if (!options) {
            options = {};
        }

        options.trigger = this;

        return new GoTop(options);

    };

    lib.goTop = GoTop;

})(Zepto, window.lib || (window.lib={}))
