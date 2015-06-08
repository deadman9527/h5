!function(a,b){var c=a.Zepto||a.$,d=function(){var a="WebkitTransform"in document.documentElement.style?!0:!1;return a},e=function(){var a,b=!1,c=document.createElement("div"),a=["&#173;",'<style id="smodernizr">',"@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}","</style>"].join(""),d=document.documentElement.style;return c.id="modernizr",c.innerHTML+=a,document.body.appendChild(c),"WebkitPerspective"in d&&"webkitPerspective"in d&&(b=9===c.offsetLeft&&3===c.offsetHeight),c.parentNode.removeChild(c),b},f=e?"translate3d(":"translate(",g=e?",0)":")",h=function(a,b){return a?(b?b.container=a:b="string"==typeof a?{container:a}:a,c.extend(this,{container:".slider",wrap:null,panel:null,trigger:null,activeTriggerCls:"sel",hasTrigger:!1,steps:0,left:0,visible:1,margin:0,curIndex:0,duration:300,loop:!1,play:!1,interval:5e3,useTransform:e?!0:!1,lazy:".lazyimg",lazyIndex:1,callback:null,prev:null,next:null,activePnCls:"none"},b),void(this.findEl()&&this.init()&&this.increaseEvent())):null};c.extend(h.prototype,{reset:function(a){this.loop&&(this._oldLoop=!0),c.extend(this,a||{}),this.init()},findEl:function(){var a=this.container=c(this.container);return a.length?(this.wrap=this.wrap&&a.find(this.wrap)||a.children().first(),this.wrap.length?(this.panel=this.panel&&a.find(this.panel)||this.wrap.children().first(),this.panel.length?(this.panels=this.panel.children(),this.panels.length?(this.trigger=this.trigger&&a.find(this.trigger),this.prev=this.prev&&a.find(this.prev),this.next=this.next&&a.find(this.next),this):(this.container.hide(),null)):null):null):null},init:function(){var a=this.wrap,b=this.panel,c=this.panels,f=this.trigger,g=this.len=c.length,h=this.margin,i=0,j=this.visible,k=this.useTransform=d?this.useTransform:!1;this.steps=this.steps||a.width(),c.each(function(a,b){i+=b.offsetWidth}),h&&"number"==typeof h&&(i+=(g-1)*h,this.steps+=h),j>1&&(this.loop=!1);var l=this.left;l-=this.curIndex*this.steps,this.setCoord(b,l),k&&(e&&a.css({"-webkit-transform":"translateZ(0)"}),b.css({"-webkit-backface-visibility":"hidden"}));var m=this._pages=Math.ceil(g/j);if(this._minpage=0,this._maxpage=this._pages-1,this.loadImg(),this.updateArrow(),1>=m)return this.getImg(c[0]),f&&f.hide(),null;if(this._oldLoop){var n=b.children();n.eq(n.length-2).remove(),n.eq(n.length-1).remove()}if(this.loop){b.append(c[0].cloneNode(!0));var o=c[g-1].cloneNode(!0);b.append(o),this.getImg(o),o.style.cssText+="position:relative;left:"+-this.steps*(g+2)+"px;",i+=c[0].offsetWidth,i+=c[g-1].offsetWidth}if(b.css("width",i),f&&f.length){var p="",q=f.children();if(!q.length){for(var r=0;m>r;r++)p+="<span"+(r==this.curIndex?" class="+this.activeTriggerCls:"")+"></span>";f.html(p)}this.triggers=f.children(),this.triggerSel=this.triggers[this.curIndex]}else this.hasTrigger=!1;return this.slideTo(this.curIndex),this},increaseEvent:function(){var a=this,b=a.wrap[0],d=a.prev,e=a.next,f=a.triggers;b.addEventListener&&(b.addEventListener("touchstart",a,!1),b.addEventListener("touchmove",a,!1),b.addEventListener("touchend",a,!1),b.addEventListener("webkitTransitionEnd",a,!1),b.addEventListener("msTransitionEnd",a,!1),b.addEventListener("oTransitionEnd",a,!1),b.addEventListener("transitionend",a,!1)),a.play&&a.begin(),d&&d.length&&d.on("click",function(b){a.backward.call(a,b)}),e&&e.length&&e.on("click",function(b){a.forward.call(a,b)}),a.hasTrigger&&f&&f.each(function(b,d){c(d).on("click",function(){a.slideTo(b)})})},handleEvent:function(a){switch(a.type){case"touchstart":this.start(a);break;case"touchmove":this.move(a);break;case"touchend":case"touchcancel":this.end(a);break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"transitionend":this.transitionEnd(a)}},loadImg:function(a){a=a||0,a<this._minpage?a=this._maxpage:a>this._maxpage&&(a=this._minpage);var b=this.visible,c=this.lazyIndex-1,d=c+a;if(!(d>this._maxpage)){d+=1;var e=(a&&c+a||a)*b,f=d*b,g=this.panels;f=Math.min(g.length,f);for(var h=e;f>h;h++)this.getImg(g[h])}},getImg:function(a){if(a&&(a=c(a),!a.attr("l"))){var b=this,d=b.lazy,e="img"+d;d=d.replace(/^\.|#/g,""),a.find(e).each(function(a,b){var e=c(b);src=e.attr("dataimg"),src&&e.attr("src",src).removeAttr("dataimg").removeClass(d)}),a.attr("l","1")}},start:function(a){var b=a.touches[0];this._movestart=void 0,this._disX=0,this._coord={x:b.pageX,y:b.pageY}},move:function(a){if(!(a.touches.length>1||a.scale&&1!==a.scale)){var b,c=a.touches[0],d=this._disX=c.pageX-this._coord.x,e=this.left;"undefined"==typeof this._movestart&&(this._movestart=!!(this._movestart||Math.abs(d)<Math.abs(c.pageY-this._coord.y))),this._movestart||(a.preventDefault(),a.stopPropagation(),this.stop(),this.loop||(d/=!this.curIndex&&d>0||this.curIndex==this._maxpage&&0>d?Math.abs(d)/this.steps+1:1),b=e-this.curIndex*this.steps+d,this.setCoord(this.panel,b),this._disX=d)}},end:function(a){if(!this._movestart){var b=this._disX;-10>b?(a.preventDefault(),this.forward()):b>10&&(a.preventDefault(),this.backward()),b=null}},backward:function(a){a&&a.preventDefault&&a.preventDefault();var b=this.curIndex,c=this._minpage;b-=1,c>b&&(b=this.loop?c-1:c),this.slideTo(b),this.callback&&this.callback(Math.max(b,c),-1)},forward:function(a){a&&a.preventDefault&&a.preventDefault();var b=this.curIndex,c=this._maxpage;b+=1,b>c&&(b=this.loop?c+1:c),this.slideTo(b),this.callback&&this.callback(Math.min(b,c),1)},setCoord:function(a,b){this.useTransform&&a.css("-webkit-transform",f+b+"px,0"+g)||a.css("left",b)},slideTo:function(a,b){a=a||0,this.curIndex=a;var c=this.panel,d=c[0].style,e=this.left-a*this.steps;d.webkitTransitionDuration=d.MozTransitionDuration=d.msTransitionDuration=d.OTransitionDuration=d.transitionDuration=(b||this.duration)+"ms",this.setCoord(c,e),this.loadImg(a)},transitionEnd:function(){var a=this.panel,b=a[0].style,c=this.loop,d=this.curIndex;c&&(d>this._maxpage?this.curIndex=0:d<this._minpage&&(this.curIndex=this._maxpage),this.setCoord(a,this.left-this.curIndex*this.steps)),c||d!=this._maxpage?this.begin():(this.stop(),this.play=!1),this.update(),this.updateArrow(),b.webkitTransitionDuration=b.MozTransitionDuration=b.msTransitionDuration=b.OTransitionDuration=b.transitionDuration=0,this.onTransitionEnd&&this.onTransitionEnd.call(this)},update:function(){var a=this.triggers,b=this.activeTriggerCls,c=this.curIndex;a&&a[c]&&(this.triggerSel&&(this.triggerSel.className=""),a[c].className=b,this.triggerSel=a[c])},updateArrow:function(){var a=this.prev,b=this.next;if(a&&a.length&&b&&b.length&&!this.loop){var c=this.curIndex,d=this.activePnCls;0>=c&&a.addClass(d)||a.removeClass(d),c>=this._maxpage&&b.addClass(d)||b.removeClass(d)}},begin:function(){var a=this;a.play&&!a._playTimer&&(a.stop(),a._playTimer=setInterval(function(){a.forward()},a.interval))},stop:function(){var a=this;a.play&&a._playTimer&&(clearInterval(a._playTimer),a._playTimer=null)},destroy:function(){var a=this,b=a.wrap[0],d=a.prev,e=a.next,f=a.triggers;b.removeEventListener&&(b.removeEventListener("touchstart",a,!1),b.removeEventListener("touchmove",a,!1),b.removeEventListener("touchend",a,!1),b.removeEventListener("webkitTransitionEnd",a,!1),b.removeEventListener("msTransitionEnd",a,!1),b.removeEventListener("oTransitionEnd",a,!1),b.removeEventListener("transitionend",a,!1)),d&&d.length&&d.off("click"),e&&e.length&&e.off("click"),a.hasTrigger&&f&&f.each(function(a,b){c(b).off("click")})},attachTo:function(a,b){return a=c(a),a.each(function(a,c){c.getAttribute("l")||(c.setAttribute("l",!0),h.cache.push(new h(c,b)))})}}),h.cache=[],h.destroy=function(){var a=h.cache,b=a.length;if(!(1>b)){for(var c=0;b>c;c++)a[c].destroy();h.cache=[]}},b.Slider=h}(window,window.lib||(window.lib={}));