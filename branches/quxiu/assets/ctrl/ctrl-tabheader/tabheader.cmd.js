!function(a,b){function c(){var f="scrollTop"in a.document.body?a.document.body.scrollTop:g.scrollTop;f!==b&&f>0&&a.document.body&&(a.document.body.insertBefore(e,a.document.body.firstChild),e.getBoundingClientRect&&0===e.getBoundingClientRect().top||(g.className=g.className.replace(d,"")),a.document.body.removeChild(e),a.removeEventListener?a.removeEventListener("scroll",c,!1):a.detachEvent("onscroll",c))}var d="fixed-supported",e=a.document.createElement("div"),f=a.navigator.userAgent,g=a.document.documentElement;e.style.position="fixed",e.style.top=0,f.match(/Android 2\.[1256]/)&&f.indexOf("AppleWebKit")>-1&&f.match(/Opera Mobi\/([0-9]+)/)&&RegExp.$1<7458&&a.operamini&&"[object OperaMini]"==={}.toString.call(a.operamini)&&f.match(/Fennec\/([0-9]+)/)&&RegExp.$1<6||(g.className+=" "+d,a.addEventListener?a.addEventListener("scroll",c,!1):a.attachEvent("onscroll",c)),a.FixedFixed=c}(this),function(a,b){function c(a,b,c){var d=a+":",e=document.createElement("test"),f=e.style;return f.cssText=c?d+b:d+["-webkit-","-moz-","-ms-","-o-",""].join(b+";"+d)+b+";",-1!==f[a].indexOf(b)}function d(a){return parseInt(a,10)||0}var e={classes:{plugin:"fixedsticky",active:"fixedsticky-on",inactive:"fixedsticky-off",clone:"fixedsticky-dummy",withoutFixedFixed:"fixedsticky-withoutfixedfixed"},keys:{offset:"data-fixedStickyOffset",position:"data-fixedStickyPosition"},tests:{sticky:c("position","sticky"),fixed:c("position","fixed",!0)},getScrollTop:function(){var b="pageYOffset",c="scrollTop";return a?b in a?a[b]:a.document.documentElement[c]:a.document.body[c]},bypass:function(){return e.tests.sticky||!e.tests.fixed||a.FixedFixed&&!b(a.document.documentElement).hasClass("fixed-supported")},update:function(a){function c(){var a=m+h;return a>l&&s+t>=a+k}function f(){return l+(k||0)>m+p-i&&m+p-i>=s+(k||0)}if(a.offsetWidth){var g,h,i,j=b(a),k=j.height(),l=Number(j.attr(e.keys.offset)),m=e.getScrollTop(),n=j.is("."+e.classes.active),o=function(a){j[a?"addClass":"removeClass"](e.classes.active)[a?"removeClass":"addClass"](e.classes.inactive)},p=b(window).height(),q=JSON.parse(j.attr(e.keys.position)),r=j.parent(),s=r.offset().top,t=r.height();l||(l=j.offset().top,j.attr(e.keys.offset,l),j.after(b("<div>").addClass(e.classes.clone).height(k))),q||(g="auto"!==j.css("top")||"auto"!==j.css("bottom"),g||j.css("position","fixed"),q={top:"auto"!==j.css("top"),bottom:"auto"!==j.css("bottom")},g||j.css("position",""),j.attr(e.keys.position,JSON.stringify(q))),h=d(j.css("top")),i=d(j.css("bottom")),q.top&&c()||q.bottom&&f()?n||o(!0):n&&o(!1)}},destroy:function(c){var d=b(c);if(!e.bypass())return b(a).off(".fixedsticky"),d.each(function(){b(this).removeClass(e.classes.active).removeClass(e.classes.inactive).next("."+e.classes.clone).remove(),this.removeAttribute(e.keys.offset),this.removeAttribute(e.keys.position)})},init:function(c){var d=b(c);if(!e.bypass())return d.each(function(){var c=this;b(a).on("scroll.fixedsticky",function(){e.update(c)}),e.update(this),b(a).on("resize.fixedsticky",function(){d.is("."+e.classes.active)&&e.update(c)})})}};a.FixedSticky=e,b.fn.fixedsticky=function(a){if("function"==typeof e[a])return e[a].call(e,this);if("object"!=typeof a&&a)throw new Error("Method `"+a+"` does not exist on jQuery.fixedsticky");return e.init.call(e,this)}}(this,Zepto),function(a,b){function c(a,c){var e=Date.now()+"-"+ ++d,f=document.createDocumentFragment(),g=document.createElement("div");g.className="head-container fixedsticky";var h=document.createElement("div");h.className="menus",1!==arguments.length||arguments[0]instanceof HTMLElement||(c=arguments[0],a=null),a||(a=document.createElement("div")),c=c||{},g.setAttribute("data-ctrl-name","tabheader"),a.setAttribute("data-ctrl-id",e),a.className="tab-header",h.appendChild(a),g.appendChild(h),f.appendChild(g);var i=document.createElement("div");i.className="content",a.appendChild(i);var j,k,l=lib.scroll(i,{direction:"x"});this.renderSelected=function(){k=document.createElement("div"),i.appendChild(k),k.className="indicator",this.updateSelected()},this.updateSelected=function(a){var b=i.childNodes[m];document.getElementsByClassName("tabheader-selected")[0]&&(document.getElementsByClassName("tabheader-selected")[0].className=""),b.className="tabheader-selected",this.active=m;b.getBoundingClientRect().width;k.style.width=b.getBoundingClientRect().width-20+"px",k.style.left=b.offsetLeft+"px",k.style.position="absolute",k.style.bottom="0",k.style.webkitTransitionDuration=Math.abs(.1*a).toFixed(1)+"s",l.scrollToElement(b,!0)};var m=0;Object.defineProperty(this,"selected",{get:function(){return m},set:function(a){if(m!=a){var b=document.createEvent("HTMLEvents");b.initEvent("select",!0,!0),b.selected=o.content[a],b.selectIndex=a,f.dispatchEvent(b);var c=m-a;return m=a,this.updateSelected(c),m}}});var n;Object.defineProperty(this,"active",{get:function(){return n},set:function(a){if(n!=a&&j){var b=j.childNodes[a];return document.getElementsByClassName("tabheader-active")[0]&&(document.getElementsByClassName("tabheader-active")[0].className=""),b.className="tabheader-active",n=a}}});var o=null;Object.defineProperty(this,"viewModel",{get:function(){return o},set:function(a){function c(a,b,c){var d=a.offsetHeight,e=document.documentElement.clientHeight,f=document.body.scrollTop,g=Number($(a).offset().top),h="auto"==$(a).css("top")?!1:!0;h?g+d+c>f+e&&(FixedSticky.destroy($(a)),$(a).css({top:"auto",bottom:void 0==c?"auto":c+"px"}),$(a).fixedsticky()):f+b>g&&(FixedSticky.destroy($(a)),$(a).css({bottom:"auto",top:void 0==b?"auto":b+"px"}),$(a).fixedsticky())}var d=this;if(i.innerHTML="",a.hasMore){var e=document.createElement("div");e.className="more-icon";var f=document.createElement("div");f.className="arrow";var k=document.createElement("div");k.className="tabheader-title",k.innerText="分类列表",j=document.createElement("div"),j.className="more-container",g.appendChild(k),e.appendChild(f),g.appendChild(e),g.appendChild(j),e.addEventListener("click",function(){$(this).hasClass("tabheader-arrow-up")?($(j).hide(),$(this).removeClass("tabheader-arrow-up"),$(h).css({position:"static",visibility:"visible"}),$(k).hide()):($(this).addClass("tabheader-arrow-up"),$(j).show(),$(h).css({position:"absolute",visibility:"hidden"}),$(k).show())});for(var m=0;m<a.content.length;m++){var n=document.createElement("div");n.innerText=a.content[m].name,a.colNumber&&$(n).css({width:100/a.colNumber+"%"}),0==a.itemBorder&&$(n).css({border:"none"}),a.itemFontsize&&$(n).css({fontSize:a.itemFontsize}),j.appendChild(n),n.addEventListener("click",function(a){return function(){d.active=a,d.selected=a,$(j).hide(),$(e).removeClass("tabheader-arrow-up"),$(h).css({position:"static",visibility:"visible"}),$(k).hide()}}(m),!1),d.active=0}}for(var m=0;m<a.content.length;m++){var n=document.createElement("span");a.menuPadding&&$(n).css({padding:"0 "+a.menuPadding/2+"px"}),n.innerText=a.content[m].name,i.appendChild(n),n.addEventListener("click",function(a){return function(){d.selected=a}}(m),!1)}this.renderSelected();var p=document.createRange();p.setStartBefore(i),p.setEndAfter(i),i.style.width=p.getBoundingClientRect().width+"px",l.init(),l.refresh();var q;a.bottom&&(q=0,b.bottomBar&&b.bottomBar.getInfo&&(q=parseInt(b.bottomBar.getInfo().height)),$(g).parent().css({bottom:q+"px"}));var r;return a.top&&(r=0,b.topBar&&b.topBar.getInfo&&(r=parseInt(b.topBar.getInfo().height))),$(g).parent().fixedsticky(),$(window).on("scroll",function(){c($(g).parent()[0],r,q)}),window.onload=function(){console.log("loaded"),FixedSticky.destroy($(g).parent()),$(g).parent().fixedsticky()},o=a}}),this.addEventListener=function(){f.addEventListener.apply(f,arguments)},this.removeEventListener=function(){f.removeEventListener.apply(f,arguments)},this.remove=function(){a.parentNode&&a.parentNode.removeChild(a)},this.root=f,this.element=a}var d=0;b.tabheader=c}(window,window.ctrl||(window.ctrl={}));
if (window.KISSY) {KISSY.add('mtb/ctrl-tabheader/0.4.10/tabheader.cmd',function() {return window.ctrl.tabheader;},{requries:['mtb/lib-scroll','mtb/lib-motion','mtb/ctrl-tabheader/0.4.10/tabheader.css']});} else if ('undefined' !== typeof define) {define('mtb/ctrl-tabheader/0.4.10/tabheader.cmd', [], function(require){require('mtb/lib-scroll');require('mtb/lib-motion');require('mtb/ctrl-tabheader/0.4.10/tabheader.css');return window.ctrl.tabheader;});}