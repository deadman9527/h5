/**
 * Created with JetBrains WebStorm.
 *
 * img lazyloaded
 *
 * - background img
 * - img
 *
 * User: 景烁
 * Date: 13-11-18
 * Time: 上午11:56
 * To change this template use File | Settings | File Templates.
 *
 * @todo 替换error图片
 */
;(function($, lib) {

    var iPhone = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
        version = iPhone && iPhone[2].split('_');
    version = version && parseFloat(version.length > 1 ? version.splice(0, 2).join(".") : version[0], 10);

    var phoneType = version && (version < 6);

    var Lazyload = {

        defaultOpts: {
            loadHidden:true,
            interval: 200,
            threshold: 5,
            errorImg: 'http://h5.ve.cn/assets/img/cart_img_black_640x253.png',
            container: null
        },

        init: function (opts) {
            this.options = $.extend(true, {}, this.defaultOpts, opts);

            this.addEvent();
            this.trigger();
        },

        addEvent: function () {
            var self = this,
                opts = this.options;

            if (phoneType) {
                var params = {},
                    timeout = null;

                $(window).on('touchstart', function (e) {
                    params = {
                        scrollY: window.scrollY,
                        time: Date.now()
                    };

                    timeout && clearTimeout(timeout);
                }).on('touchend', function (e) {
                    if (e && e.changedTouches) {
                        var dist = Math.abs(window.scrollY - params.scrollY);

                        if (dist > opts.threshold) {
                            var inter = Date.now() - params.time;

                            timeout = setTimeout(function () {
                                self.update();
                                params = {};
                                clearTimeout(timeout);
                                timeout = null;
                            }, inter > opts.interval ? 0 : 200);
                        }

                    } else {
                        self.update();
                    }
                }).on("touchcancel", function () {
                    timeout && clearTimeout(timeout);
                    params = {};
                })
            } else {
                var $container = self.options.container ? $(self.options.container) : $(window);
                $container.on('scroll', function () {
                    self.update();
                })
            }
        },

        trigger: function () {
            var self = this,
                opts = this.options,
                evtType = phoneType  && "touchend" || "scroll";

            self.prevlist && self.prevlist.each(function (index, item) {
                item && (item.onerror = item.onload = null)
            });
            self.imglist = $(".lazy");

            // copy object trick way
            self.prevlist = $.extend({}, true, self.imglist);
            $(window).trigger(evtType);
        },

        inviewport: function (item, t) {
            var offsetY = window.pageYOffset,
                pageHeight = window.pageYOffset + window.innerHeight,
                itemTop = item.offset().top;
            return itemTop >= offsetY && itemTop + (t || -100) <= pageHeight;
        },

        // update img dom
        update: function () {
            var self = this;
            var opts = this.options;

            self.imglist.each(function (index, item) {
                var hidden = !opts.loadHidden ? $(item).is(":hidden") :false;
                if (item && self.inviewport($(item)) && !hidden) {
                    var $item = $(item);
                    var src = $item.attr('dataimg');
                    var isImg = $item[0].tagName.toLowerCase() === 'img';

                    var img = new Image();
                    img.src = src;

                    img.onload = function () {
                        self.imglist[index] = null;

                        $item.removeClass('lazy').removeAttr('dataimg');
                        if (isImg) {
                            $item.attr('src', src);
                        } else {
                            $item.css('background-image', 'url(' + src + ')');
                        }
                        img.onload = img.onerror = null;
                    }

                    img.onerror = function () {
                        self.imglist[index] = null;
                        $item.removeClass('lazy').removeAttr('dataimg');
                        if (isImg) {
                            $item.attr('src', opts.errorImg);
                        } else {
                            $item.css('background-image', 'url(' + opts.errorImg + ')');
                        }
                        img.onload = img.onerror = null;
                    }

                } else {
                    return;
                }

            })
        }

    }

    // how to use
    // lib.lazyload.init();
    // if inited
    // lib.lazyload.trigger();
    lib.lazyload = Lazyload;

})(Zepto, (window.lib) ? window.lib : (window.lib = {}))