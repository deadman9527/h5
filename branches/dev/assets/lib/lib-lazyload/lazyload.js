!function(t,o){var i=navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),n=i&&i[2].split("_");n=n&&parseFloat(n.length>1?n.splice(0,2).join("."):n[0],10);var e=n&&6>n,r={defaultOpts:{loadHidden:!0,interval:200,threshold:5,errorImg:"http://h5.quxiu.me/assets/img/cart_img_black_640x253.png",container:null},init:function(o){this.options=t.extend(!0,{},this.defaultOpts,o),this.addEvent(),this.trigger()},addEvent:function(){var o=this,i=this.options;if(e){var n={},r=null;t(window).on("touchstart",function(){n={scrollY:window.scrollY,time:Date.now()},r&&clearTimeout(r)}).on("touchend",function(t){if(t&&t.changedTouches){var e=Math.abs(window.scrollY-n.scrollY);if(e>i.threshold){var a=Date.now()-n.time;r=setTimeout(function(){o.update(),n={},clearTimeout(r),r=null},a>i.interval?0:200)}}else o.update()}).on("touchcancel",function(){r&&clearTimeout(r),n={}})}else{var a=t(o.options.container?o.options.container:window);a.on("scroll",function(){o.update()})}},trigger:function(){var o=this,i=(this.options,e&&"touchend"||"scroll");o.prevlist&&o.prevlist.each(function(t,o){o&&(o.onerror=o.onload=null)}),o.imglist=t(".lazy"),o.prevlist=t.extend({},!0,o.imglist),t(window).trigger(i)},inviewport:function(t,o){var i=window.pageYOffset,n=window.pageYOffset+window.innerHeight,e=t.offset().top;return e>=i&&n>=e+(o||-100)},update:function(){var o=this,i=this.options;o.imglist.each(function(n,e){var r=i.loadHidden?!1:t(e).is(":hidden");if(e&&o.inviewport(t(e))&&!r){var a=t(e),l=a.attr("dataimg"),s="img"===a[0].tagName.toLowerCase(),c=new Image;c.src=l,c.onload=function(){o.imglist[n]=null,a.removeClass("lazy").removeAttr("dataimg"),s?a.attr("src",l):a.css("background-image","url("+l+")"),c.onload=c.onerror=null},c.onerror=function(){o.imglist[n]=null,a.removeClass("lazy").removeAttr("dataimg"),s?a.attr("src",i.errorImg):a.css("background-image","url("+i.errorImg+")"),c.onload=c.onerror=null}}})}};o.lazyload=r}(Zepto,window.lib?window.lib:window.lib={});