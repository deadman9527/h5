!function(t,i){"use strict";function s(t){return Object.prototype.toString.call(t).slice(8,-1)}var e,n,h,o,a=.15,r=300,l=700,c=5,p=200,d=Array.prototype.slice,u=Array.prototype.concat,m=Object.prototype.hasOwnProperty,g=t.document;o=function(){function i(i,h){var a,l=0,c=+new Date+"-"+(o+=1),p=g.createDocumentFragment();this.pos=0,this.page=0,this.currentPage=0,this.customEvents=[],h=h||{},"String"===s(i)&&(i=g.querySelector(i)),i.setAttribute("data-ctrl-name","SlideView"),i.setAttribute("data-ctrl-id",c),this.element=i,this.options={direction:"h",duration:r,visible:1,play:!1,loop:!1,interval:5e3,snapThreshold:null,lazy:".lazyimg",prev:null,next:null};for(l in h)m.call(h,l)&&(this.options[l]=h[l]);"horizontal"===this.options.direction&&(this.options.direction="h"),this.options.lazy&&(this.options.lazy=this.options.lazy.replace(/^\./,"")),this.element.style.overflow="hidden",this.element.style.position="relative",a=this.element.querySelector(".ctrl-slideview")||g.createElement("ul"),e.hasClass(a,"ctrl-slideview")||e.addClass(a,"ctrl-slideview"),a.style.cssText+="position:relative;top:0;height:100%;width:100%;"+n.cssVendor+"transition-duration:0;"+n.cssVendor+"transform:translateZ(0);"+n.cssVendor+"transition-timing-function:ease;padding:0;margin:0",this.slider=a,this.element.appendChild(a),this.items=[],this.items=this.options.items?this.options.items:d.call(this.options.itemClass?this.slider.querySelectorAll(this.options.itemClass):this.slider.children),this.syncViewModel(),this.__refreshSize(),this.__checkPosition(),this.__loadLazy(),this.options.play&&this.begin(),this.root=p,this.root.appendChild(this.element),e.addEvent(t,"resize",this),e.addEvent(this.element,"touchstart",this),e.addEvent(t,"touchend",this),e.addEvent(t,"touchcancel",this),e.addEvent(t,"touchmove",this),e.addEvent(this.slider,"transitionend",this)}var o=0;return i.prototype={syncViewModel:function(){var t,i,s;for(this.slider.innerHTML="",t=this.items,i=0,s=t.length;s>i;i+=1)this.__createItem(t[i],i)},begin:function(){var t=this;this.__playtimer||(this.__playtimer=setInterval(function(){t.next()},this.options.interval))},stop:function(){clearInterval(this.__playtimer),this.__playtimer=null},onFlip:function(t){e.addEvent(this.element,"slideview-flip",t),this.customEvents.push(["flip",t])},onMoveOut:function(t){e.addEvent(this.element,"slideview-moveout",t,!1),this.customEvents.push(["moveout",t])},onMoveIn:function(t){e.addEvent(this.element,"slideview-movein",t,!1),this.customEvents.push(["movein",t])},onTouchStart:function(t){e.addEvent(this.element,"slideview-touchstart",t,!1),this.customEvents.push(["touchstart",t])},destroy:function(){for(;this.customEvents.length;)e.removeEvent(this.element,"slideview-"+this.customEvents[0][0],this.customEvents[0][1],!1),this.customEvents.shift();e.removeEvent(t,"resize",this),e.removeEvent(this.element,"touchstart",this),e.removeEvent(this.element,"touchmove",this),e.removeEvent(this.element,"touchend",this),e.removeEvent(this.slider,"transitionend",this)},__createItem:function(t,i){t.id="slideview-item-"+i,t.style.cssText+=n.cssVendor+"transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;"+("h"===this.options.direction?"left":"top")+":"+100*i+"%",this.slider.appendChild(t),this.__refreshSize()},prev:function(){(this.options.loop||this.currentPage)&&(this.pos+=1,this.isShowingNext=-1,this.__setAroundPage(),this.__checkPosition())},next:function(){(this.options.loop||this.currentPage!==this.items.length-1)&&(this.pos-=1,this.isShowingNext=1,this.__setAroundPage(),this.__checkPosition())},slideTo:function(t){this.items[t]&&(this.slider.style[n.transitionDuration]=Math.min(l,Math.abs(this.currentPage-t)*this.options.duration)+"ms",this.currentPage=t,this.__pos(-this.currentPage*this.pageSize),this.__loadLazy(),this.__refreshPosition())},handleEvent:function(t){switch(t.type){case h.touchstart:this.__start(t);break;case h.touchmove:this.__move(t);break;case h.touchcancel:case h.touchend:this.__end(t);break;case h.resize:this.__resize(t);break;case h.transitionend:case"otransitionend":t.target===this.slider&&this.__transitionend(t)}},__refreshPosition:function(){for(var t,i=this.items,s=0,e=i.length;e>s;s+=1)t=i[s],t.id="slideview-item-"+s,t.style.cssText+=n.cssVendor+"transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;"+("h"===this.options.direction?"left":"top")+":"+100*s+"%"},__refreshSize:function(){this.elementWidth=this.element.clientWidth,this.elementHeight=this.element.clientHeight,this.sliderWidth=this.slider.clientWidth,this.sliderHeight=this.slider.clientHeight,this.pageWidth=this.elementWidth,this.pageHeight=this.elementHeight,this.maxX=-this.items.length*this.pageWidth+this.elementWidth,this.maxY=-this.items.length*this.pageHeight+this.elementHeight,this.maxPos="h"===this.options.direction?this.maxX:this.maxY,this.pageSize="h"===this.options.direction?this.pageWidth:this.pageHeight,this.snapThreshold=null===this.options.snapThreshold?Math.round(this.pageSize*a):/%/.test(this.options.snapThreshold)?Math.round(this.pageSize*this.options.snapThreshold.replace("%","")/100):this.options.snapThreshold},__resize:function(){this.__refreshSize(),this.slider.style[n.transitionDuration]="0s",this.__pos(-this.currentPage*this.pageSize)},__start:function(t){if(!this.initiated){this.__playtimer&&this.stop();var i=e.hasTouch?t.touches[0]:t;this.initiated=!0,this.moved=!1,this.startX=i.pageX,this.startY=i.pageY,this.pointX=i.pageX,this.pointY=i.pageY,this.startTime=+new Date,this.pointTime=+new Date,this.stepsX=0,this.stepsY=0,this.isShowingNext=0,this.directionLocked=!1,this.settedAround=!1,"h"===this.options.direction?(this.startPos=i.pageX,this.pointPos=i.pageX):(this.startPos=i.pageY,this.pointPos=i.pageY),this.slider.style[n.transitionDuration]="0s",this.__event("touchstart")}},__move:function(t){if(this.initiated){var i=e.hasTouch?t.touches[0]:t,s=i.pageX-this.pointX,n=i.pageY-this.pointY,h=+new Date,o=("h"===this.options.direction?"left":"top",this.pos+("h"===this.options.direction?s:n));if(this.moved=!0,this.pointX=i.pageX,this.pointY=i.pageY,this.pointTime=h,this.isMovingRight=s>0?1:0>s?-1:0,this.isMovingDown=n>0?1:0>n?-1:0,this.isShowingNext=-1*("h"===this.options.direction?this.isMovingRight:this.isMovingDown),this.stepsX+=Math.abs(s),this.stepsY+=Math.abs(n),t.preventDefault(),!(this.stepsX<10&&this.stepsY<10)){if("h"===this.options.direction){if(this.pointPos=i.pageX,!this.directionLocked&&this.stepsY>this.stepsX)return void(this.initiated=!1)}else if(this.pointPos=i.pageY,!this.directionLocked&&this.stepsX>this.stepsY)return void(this.initiated=!1);this.options.loop&&!this.settedAround&&(this.__setAroundPage(),this.settedAround=!0),this.directionLocked=!0,!this.options.loop&&(o>0||o<this.maxPos)&&(o=this.pos+("h"===this.options.direction?s:n)/c),this.__pos(o)}}},__end:function(t){if(this.initiated){var i=e.hasTouch?t.changedTouches[0]:t,s=+new Date,h=Math.abs(i.pageX-this.startX),o=Math.abs(i.pageY-this.startY),a="h"===this.options.direction?h:o,r=Math.sqrt(Math.pow(h,2)+Math.pow(o,2))/(s-this.startTime),l=r>.5;if(this.initiated=!1,this.moved){if(!this.options.loop&&(this.pos>0||this.pos<this.maxPos))return this.options.noBounceEasing||(this.slider.style[n.transitionDuration]=p+"ms"),this.__pos(this.page*this.pageSize),void this.__event("movein");if(!l&&a<this.snapThreshold)return this.options.noBounceEasing||(this.slider.style[n.transitionDuration]=Math.floor(this.options.duration*a/this.snapThreshold)+"ms"),void this.__pos(this.page*this.pageSize);this.pageSize<a&&this.__pos(this.page*this.pageSize-this.isShowingNext),this.__checkPosition()}}},__transitionend:function(){this.__setAroundPage()},__loadLazy:function(){for(var t=this.items[this.currentPage],i=this.items[this.currentPage===this.items.length-1?0:this.currentPage+1],s=u.call(d.call(t.querySelectorAll("."+this.options.lazy)),d.call(i.querySelectorAll("."+this.options.lazy))),n=0,h=s.length;h>n;n+=1)e.hasClass(s[n],this.options.lazy)&&(s[n].src=s[n].getAttribute("dataimg"),s[n].removeAttribute("dataimg"),e.removeClass(s[n],this.options.lazy))},__event:function(t){var i=g.createEvent("Event");i.initEvent("slideview-"+t,!0,!0),this.element.dispatchEvent(i)},__checkPosition:function(){var t,i,s;this.page=this.isShowingNext>0?Math.floor(this.pos/this.pageSize):Math.ceil(this.pos/this.pageSize),t=this.page*this.pageSize,this.slider.style[n.transitionDuration]=Math.floor(500*Math.abs(this.pos-t)/this.pageSize)+"ms",s=this.page%this.items.length,s>0&&(s=this.items.length-s),s=Math.abs(s),this.__pos(t),this.currentPage!==s&&(i=this.items[this.currentPage],i&&e.removeClass(i,"slideview-active"),this.currentPage=s,this.__loadLazy(),this.__event("flip")),i=this.items[this.currentPage],i&&e.addClass(i,"slideview-active")},__setAroundPage:function(){var t,i,s,e="h"===this.options.direction?"left":"top",n=1===this.isShowingNext?Math.ceil:Math.floor;this.items.length<2||(this.pos>0?(t=this.items.length-n(this.pos/this.pageSize)%this.items.length,t===this.items.length&&(t=0)):t=Math.abs(n(this.pos/this.pageSize)%this.items.length),1===this.isShowingNext?(s=t+1,s===this.items.length&&(s=0),this.items[s].style[e]=parseInt(this.items[t].style[e],10)+100+"%"):-1===this.isShowingNext&&(i=t-1,-1===i&&(i=this.items.length-1),this.items[i].style[e]=parseInt(this.items[t].style[e],10)-100+"%"))},__pos:function(t){this.pos=t,this.slider.style[n.transform]="h"===this.options.direction?"translate("+t+"px,0)"+n.translateZ:"translate(0,"+t+"px)"+n.translateZ}},i}(),i.slideview=function(t,i){var s=new o(t,i);return s},e=function(){var i={},s=g.createElement("slideview").style,e=function(){for(var t,i=["t","webkitT","MozT","msT","OT"],e=0,n=i.length;n>e;e+=1)if(t=i[e]+"ransform",t in s)return i[e].substr(0,i[e].length-1);return!1}(),n=function(t){return e===!1?!1:""===e?t:(t=t.charAt(0).toUpperCase()+t.substr(1),e+t)},h=function(t){return String(t).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")},o="ontouchstart"in t,a=n("perspective")in s;return i.extend=function(t,i){for(var s in i)m.call(i,s)&&(t[s]=i[s])},i.extend(i,{hasTouch:o,has3d:a,hasTransform:!!e,hasTransitionEnd:n("transition")in s,styles:{cssVendor:e?"-"+e.toLowerCase()+"-":"",transform:n("transform"),transitionDuration:n("transitionDuration"),translateZ:a?" translateZ(0)":""},events:{resize:"onorientationchange"in t?"orientationchange":"resize",touchstart:o?"touchstart":"mousedown",touchmove:o?"touchmove":"mousemove",touchend:o?"touchend":"mouseup",touchcancel:o?"touchcancel":"mouseup",transitionend:function(){if(e===!1)return!1;var t={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"oTransitionEnd",ms:"MSTransitionEnd"};return t[e]}()},addEvent:function(t,i,s,e){t.addEventListener(this.events[i]||i,s,!!e)},removeEvent:function(t,i,s,e){t.removeEventListener(this.events[i],s,!!e)},hasClass:function(t,i){return(" "+t.className+" ").indexOf(" "+i+" ")>-1},addClass:function(t,i){t.className=t.className?t.className+" "+i:i},removeClass:function(t,i){t.className=t.className.replace(new RegExp("(?:^|\\s)"+h(i)+"(?=\\s|$)","ig"),"")}}),i}(),n=e.styles,h=e.events}(this,this.ctrl||(this.ctrl={}));