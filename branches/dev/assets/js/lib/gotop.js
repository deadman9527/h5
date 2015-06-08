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
            right: 0.4rem;\
            bottom: 0.4rem;\
            z-index: 10000;\
            opacity: 0;\
            pointer-events: none;\
            -webkit-transition: opacity 0.15s linear;\
            transition: opacity 0.15s linear;\
            width: 40px;\
            height: 40px;\
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABXRJREFUeNrsnU9MFFccx9+OuNrYQ/GANC3tAokHJbGxFw6e2jS9QU81JtaEiGhbtIlE2aNH0GDSSv8hG1MupD2phyY90JMH0lNN0CYmFQI1Imng0qaK6Pb3hd9uht1ld97Mm3kz7O+bfOOwf96fj799782bN29S+XxeicypodYHUgMTUZWjidzKfo+8k9/7iPwqH/9DvsnHz8m/kmfZS+Q10wXLj5wwCzQk7SC/Qf6A3Evu9Pg9gD3u+run5P1p8jh5irxAfhG7CDWoFEdfH3kwpDw6S/5zhsljHMGRtG1OBHmkySfJj8l/hgizkgY5z8dchnSSge4mf05+xj/DfRb7in1chmdcpt1JAupwNPxHHo1hRzzKZTsZRv1NJ3iQPMfREHeNc1kPxhFoAzf+M+SWBA0bW7jMY6Y6aBNAm8kPyacSPB4/xXVotg20i3vQFpV8tXBdumwBxZDk1jY8e7wVZGjnBygG6F+Sh7bxKfkQ1zEVNlBkMEk+VwfzHKjjZGpgIhUm0Cvko6p+hLpe0Zkg0gGKdmXASm/x2h71VuMeW1BR50GvUL0C7bLVZgLkJ++2qeOH22xCHfLa+3sB2myrN0dkAmS6wVk3jvGard6forQ5EFBKAGcPd2zBRGQCZEE4xmsWod5hJvpAuc3AKVm7TZi/P1ouvo5jy1DBYqxae+rUmOjosQ3z5sxC8T0cxwBqT7UJFWeL6EzZaDerwdwKqqWOCu2poxOhn0X9U/cCsxJUS70/2HzqCSiRx2z2aFxhxgjqKLOqGaGnoyzVzh2OOvpORgtmJagfH8qspxWxTlcFSsRxEetylCV6/uKl+ununPpt/m8tmG6o+C7SQFoR6zIzK6p0THVMRXBlsFTzK/+u269+/uORrXFpmpn9UBah3LNfVSJdXXXPSDklPdde4aOtve4RkRvoGWHjW2c2taF8fnrWdC6XPjzk73u/3I1F+ho6Swyz+ZETa4UIfdNGZ7SNlGaGxV7+/TBzCyEifKXrN6I9CgxzhQjtlSALrHWGDrefncIjsDrBEhHaJCyMqQlAW4WDMbUCaIdwMKYOAD0gHIzpAIDuFw7GtB9AM8LBmDIA2igcjKnREQZmBaArgsGYVgB0TjgY0xyAPhAOxvQAQO8LB2O6D6AzwsGYZgB0VjgY0yym7pbiXsqwJqhD0JKD6yBq4z5zUTBNu68pjQuPwBovDOyhKeERWFNuoH+RV4WJb60yww2g3I5eEy6+dY0Zblo58p1w8a0iOzdQ7M2xLGy0tczsNgOlkMWuMeeFj7bOM7uyCIUmpXPS7owm3S9sAkqk8YGLwsmzLjIztVWEQt8LJ88qY1UGlIg/pX/6hVVN9TMrVStCoW/cPZeoTGDzbaU3KgLlXqtbuG2pbmL00jNQ1j3yDWFXphvMRmkB5X0z++SnX/ZT76u2p2jVe79xfpoamDiiNvYz8q2QVw5HqSOFc3btCHVpUdrTYru5WOtDXvd7u03OKs19RxJ06aKWssygpnSW4mC32JE6jEzUedjrXsy6a5sukH+sI5io6wWdja11gWJ8iptFv6oDmKjjMfdMUhhAC1C/4HZluyrLddTeCDvIcsbhbdr7d3PdfCno+lD0fK+rjT3jk64FrsvtIImYWHCLsVkb+XqCYV7nOiwGTcjUCuY1Pk3tSFi0LnCZ+5Shx16YXhKOSYOMSsa9o71c1nsmEw1jjT2mtXLkV1Q8J6r7uWw5LquKO9CCMJv9NXkXR8MTixCfcBl2cZmehpVRFHeBrHI0oAdtDzIk8Tm0a+e8cyqCK7pR3laDQfJDHjRjUuZtjhqTSymnOc1WziPLeUb2FC5bz1PCc47mOWpyKsYPqNJVSh6hZlb/CzAAW/SHC4Kp8GwAAAAASUVORK5CYII=) no-repeat;\
            background-size: contain;\
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
