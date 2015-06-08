!function(t,i){"use strict";function s(t){return Object.prototype.toString.call(t).slice(8,-1)}var e,n,h,o,r=.15,a=300,p=700,l=5,c=200,d=Array.prototype.slice,u=Array.prototype.concat,g=Object.prototype.hasOwnProperty,v=t.document;o=function(){function i(i,h){var o,r,p,l,c=0;this.pos=0,this.page=0,this.currentPage=0,this.customEvents=[],h=h||{},"String"===s(i)&&(i=v.querySelector(i)),this.wrapper=i,this.options={direction:"h",duration:a,visible:1,play:!1,loop:!1,interval:5e3,snapThreshold:null,lazy:".lazyimg",prev:null,next:null};for(c in h)g.call(h,c)&&(this.options[c]=h[c]);for("horizontal"===this.options.direction&&(this.options.direction="h"),this.options.lazy&&(this.options.lazy=this.options.lazy.replace(/^\./,"")),this.wrapper.style.overflow="hidden",this.wrapper.style.position="relative",r=this.wrapper.firstElementChild||v.createElement("div"),r.classList.add("slider-outer"),r.style.cssText+="width:100%;height:100%",this.outer=r,p=r.firstElementChild||v.createElement("ul"),p.classList.add("slider-wrap"),p.style.cssText+="position:relative;top:0;height:100%;width:100%;"+n.cssVendor+"transition-duration:0;"+n.cssVendor+"transform:translateZ(0);"+n.cssVendor+"transition-timing-function:ease;padding:0;margin:0",this.slider=p,r.appendChild(p),this.wrapper.appendChild(r),this.items=[],h.items||(h.items=d.call(this.slider.children)),this.slider.innerHTML="",l=h.items,c=0,o=l.length;o>c;c+=1)this.__createItem(l[c]);this.items.length<2&&(this.options.loop=!1),this.__refreshSize(),this.__checkPosition(),this.__loadLazy(),this.options.play&&this.begin(),e.addEvent(t,"resize",this),e.addEvent(this.wrapper,"touchstart",this),e.addEvent(t,"touchend",this),e.addEvent(t,"touchcancel",this),e.addEvent(t,"touchmove",this),e.addEvent(this.slider,"transitionend",this)}return i.prototype={begin:function(){var t=this;this.__playtimer||(this.__playtimer=setInterval(function(){t.next()},this.options.interval))},stop:function(){clearInterval(this.__playtimer),this.__playtimer=null},onFlip:function(t){e.addEvent(this.wrapper,"slideview-flip",t),this.customEvents.push(["flip",t])},onMoveOut:function(t){e.addEvent(this.wrapper,"slideview-moveout",t,!1),this.customEvents.push(["moveout",t])},onMoveIn:function(t){e.addEvent(this.wrapper,"slideview-movein",t,!1),this.customEvents.push(["movein",t])},onTouchStart:function(t){e.addEvent(this.wrapper,"slideview-touchstart",t,!1),this.customEvents.push(["touchstart",t])},destroy:function(){for(;this.customEvents.length;)e.removeEvent(this.wrapper,"slideview-"+this.customEvents[0][0],this.customEvents[0][1],!1),this.customEvents.shift();e.removeEvent(t,"resize",this),e.removeEvent(this.wrapper,"touchstart",this),e.removeEvent(this.wrapper,"touchmove",this),e.removeEvent(this.wrapper,"touchend",this),e.removeEvent(this.slider,"transitionend",this)},__createItem:function(t){var i=this.items.length;t.id="slideview-item-"+i,t.style.cssText+=n.cssVendor+"transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;"+("h"===this.options.direction?"left":"top")+":"+100*i+"%",this.slider.appendChild(t),this.items[i]=t,this.__refreshSize()},prev:function(){(this.options.loop||this.currentPage)&&(this.pos+=1,this.isShowingNext=-1,this.__setAroundPage(),this.__checkPosition())},next:function(){(this.options.loop||this.currentPage!==this.items.length-1)&&(this.pos-=1,this.isShowingNext=1,this.__setAroundPage(),this.__checkPosition())},slideTo:function(t){this.items[t]&&(this.slider.style[n.transitionDuration]=Math.min(p,Math.abs(this.currentPage-t)*this.options.duration)+"ms",this.currentPage=t,this.__pos(-this.currentPage*this.pageSize),this.__loadLazy(),this.__refreshPosition())},handleEvent:function(t){switch(t.type){case h.touchstart:this.__start(t);break;case h.touchmove:this.__move(t);break;case h.touchcancel:case h.touchend:this.__end(t);break;case h.resize:this.__resize(t);break;case h.transitionend:case"otransitionend":t.target===this.slider&&this.__transitionend(t)}},__refreshPosition:function(){for(var t,i=this.items,s=0,e=i.length;e>s;s+=1)t=i[s],t.id="slideview-item-"+s,t.style.cssText+=n.cssVendor+"transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;"+("h"===this.options.direction?"left":"top")+":"+100*s+"%"},__refreshSize:function(){this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.sliderWidth=this.slider.clientWidth,this.sliderHeight=this.slider.clientHeight,this.pageWidth=this.wrapperWidth,this.pageHeight=this.wrapperHeight,this.maxX=-this.items.length*this.pageWidth+this.wrapperWidth,this.maxY=-this.items.length*this.pageHeight+this.wrapperHeight,this.maxPos="h"===this.options.direction?this.maxX:this.maxY,this.pageSize="h"===this.options.direction?this.pageWidth:this.pageHeight,this.snapThreshold=null===this.options.snapThreshold?Math.round(this.pageSize*r):/%/.test(this.options.snapThreshold)?Math.round(this.pageSize*this.options.snapThreshold.replace("%","")/100):this.options.snapThreshold},__resize:function(){this.__refreshSize(),this.slider.style[n.transitionDuration]="0s",this.__pos(-this.currentPage*this.pageSize)},__start:function(t){if(!this.initiated){this.__playtimer&&this.stop();var i=e.hasTouch?t.touches[0]:t;this.initiated=!0,this.moved=!1,this.startX=i.pageX,this.startY=i.pageY,this.pointX=i.pageX,this.pointY=i.pageY,this.startTime=+new Date,this.pointTime=+new Date,this.stepsX=0,this.stepsY=0,this.isShowingNext=0,this.directionLocked=!1,this.settedAround=!1,"h"===this.options.direction?(this.startPos=i.pageX,this.pointPos=i.pageX):(this.startPos=i.pageY,this.pointPos=i.pageY),this.slider.style[n.transitionDuration]="0s",this.__event("touchstart")}},__move:function(t){if(this.initiated){var i=e.hasTouch?t.touches[0]:t,s=i.pageX-this.pointX,n=i.pageY-this.pointY,h=+new Date,o=("h"===this.options.direction?"left":"top",this.pos+("h"===this.options.direction?s:n));if(this.moved=!0,this.pointX=i.pageX,this.pointY=i.pageY,this.pointTime=h,this.isMovingRight=s>0?1:0>s?-1:0,this.isMovingDown=n>0?1:0>n?-1:0,this.isShowingNext=-1*("h"===this.options.direction?this.isMovingRight:this.isMovingDown),this.stepsX+=Math.abs(s),this.stepsY+=Math.abs(n),t.preventDefault(),!(this.stepsX<10&&this.stepsY<10)){if("h"===this.options.direction){if(this.pointPos=i.pageX,!this.directionLocked&&this.stepsY>this.stepsX)return void(this.initiated=!1)}else if(this.pointPos=i.pageY,!this.directionLocked&&this.stepsX>this.stepsY)return void(this.initiated=!1);this.options.loop&&!this.settedAround&&(this.__setAroundPage(),this.settedAround=!0),this.directionLocked=!0,!this.options.loop&&(o>0||o<this.maxPos)&&(o=this.pos+("h"===this.options.direction?s:n)/l),this.__pos(o)}}},__end:function(t){if(this.initiated){var i=e.hasTouch?t.changedTouches[0]:t,s=+new Date,h=Math.abs(i.pageX-this.startX),o=Math.abs(i.pageY-this.startY),r="h"===this.options.direction?h:o,a=Math.sqrt(Math.pow(h,2)+Math.pow(o,2))/(s-this.startTime),p=a>.5;if(this.initiated=!1,this.moved){if(!this.options.loop&&(this.pos>0||this.pos<this.maxPos))return this.options.noBounceEasing||(this.slider.style[n.transitionDuration]=c+"ms"),this.__pos(this.page*this.pageSize),void this.__event("movein");if(!p&&r<this.snapThreshold)return this.options.noBounceEasing||(this.slider.style[n.transitionDuration]=Math.floor(this.options.duration*r/this.snapThreshold)+"ms"),void this.__pos(this.page*this.pageSize);this.pageSize<r&&this.__pos(this.page*this.pageSize-this.isShowingNext),this.__checkPosition()}}},__transitionend:function(){this.__setAroundPage()},__loadLazy:function(){for(var t=this.items[this.currentPage],i=this.items[this.currentPage===this.items.length-1?0:this.currentPage+1],s=u.call(d.call(t.querySelectorAll("."+this.options.lazy)),d.call(i.querySelectorAll("."+this.options.lazy))),e=0,n=s.length;n>e;e+=1)s[e].classList.contains(this.options.lazy)&&(s[e].src=s[e].getAttribute("dataimg"),s[e].removeAttribute("dataimg"),s[e].classList.remove(this.options.lazy))},__event:function(t){var i=v.createEvent("Event");i.initEvent("slideview-"+t,!0,!0),this.wrapper.dispatchEvent(i)},__checkPosition:function(){var t,i,s;this.page=this.isShowingNext>0?Math.floor(this.pos/this.pageSize):Math.ceil(this.pos/this.pageSize),t=this.page*this.pageSize,this.slider.style[n.transitionDuration]=Math.floor(500*Math.abs(this.pos-t)/this.pageSize)+"ms",s=this.page%this.items.length,s>0&&(s=this.items.length-s),s=Math.abs(s),this.__pos(t),this.currentPage!==s&&(i=this.items[this.currentPage],i&&i.classList.remove("slideview-active"),this.currentPage=s,this.__loadLazy(),this.__event("flip")),i=this.items[this.currentPage],i&&i.classList.add("slideview-active")},__setAroundPage:function(){var t,i,s,e="h"===this.options.direction?"left":"top",n=1===this.isShowingNext?Math.ceil:Math.floor;this.items.length<2||(this.pos>0?(t=this.items.length-n(this.pos/this.pageSize)%this.items.length,t===this.items.length&&(t=0)):t=Math.abs(n(this.pos/this.pageSize)%this.items.length),1===this.isShowingNext?(s=t+1,s===this.items.length&&(s=0),this.items[s].style[e]=parseInt(this.items[t].style[e],10)+100+"%"):-1===this.isShowingNext&&(i=t-1,-1===i&&(i=this.items.length-1),this.items[i].style[e]=parseInt(this.items[t].style[e],10)-100+"%"))},__pos:function(t){this.pos=t,this.slider.style[n.transform]="h"===this.options.direction?"translate("+t+"px,0)"+n.translateZ:"translate(0,"+t+"px)"+n.translateZ}},i}(),i.slideview=function(t,i){var s=new o(t,i);return s},e=function(){var i={},s=v.createElement("slideview").style,e=function(){for(var t,i=["t","webkitT","MozT","msT","OT"],e=0,n=i.length;n>e;e+=1)if(t=i[e]+"ransform",t in s)return i[e].substr(0,i[e].length-1);return!1}(),n=function(t){return e===!1?!1:""===e?t:(t=t.charAt(0).toUpperCase()+t.substr(1),e+t)},h="ontouchstart"in t,o=n("perspective")in s;return i.extend=function(t,i){for(var s in i)g.call(i,s)&&(t[s]=i[s])},i.extend(i,{hasTouch:h,has3d:o,hasTransform:!!e,hasTransitionEnd:n("transition")in s,styles:{cssVendor:e?"-"+e.toLowerCase()+"-":"",transform:n("transform"),transitionDuration:n("transitionDuration"),translateZ:o?" translateZ(0)":""},events:{resize:"onorientationchange"in t?"orientationchange":"resize",touchstart:h?"touchstart":"mousedown",touchmove:h?"touchmove":"mousemove",touchend:h?"touchend":"mouseup",touchcancel:h?"touchcancel":"mouseup",transitionend:function(){if(e===!1)return!1;var t={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"oTransitionEnd",ms:"MSTransitionEnd"};return t[e]}()},addEvent:function(t,i,s,e){t.addEventListener(this.events[i]||i,s,!!e)},removeEvent:function(t,i,s,e){t.removeEventListener(this.events[i],s,!!e)}}),i}(),n=e.styles,h=e.events}(this,this.lib||(this.lib={}));