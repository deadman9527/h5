!function(a,b){"use strict";var c=function(){return document.body.classList?!0:!1}(),d={hasClass:function(a,b){if(c)return a.classList.contains(b);if(0==b.length||-1!=b.indexOf(" "))throw new Error('Invalid class name: "'+b+'".');var d=a.className;return d?d==b?!0:-1!=d.search("\\b"+b+"\\b"):!1},addClass:function(a,b){if(c)return a.classList.add(b);if(!d.hasClass(a,b)){var e=a.className;e&&" "!=e[e.length-1]&&(b=" "+b),a.className+=b}},removeClass:function(a,b){if(c)return a.classList.remove(b);if(0==b.length||-1!=b.indexOf(" "))throw new Error('Invalid class name: "'+b+'".');var e=new RegExp("\\b"+b+"\\b\\s*","g"),f=a.className;a.className=d.trim(f.replace(e,""))}};b.pagenav=b.pagenav||{},b.pagenav.utils=d}(window,window.ctrl||(window.ctrl={})),function(a,b){"use strict";function c(a,b){var c=this,f=Date.now()+"-"+ ++e,g=d.createDocumentFragment();if(b||"object"!=typeof a||(b=a,a=b.elem),a&&a.nodeType!=d.ELEMENT_NODE)throw new Error("Require a dom element.");a||(a=document.createElement("div")),g.appendChild(a),a.setAttribute("data-ctrl-name","pagenav"),a.setAttribute("data-ctrl-id",f),this.root=g,this.element=a;var h={};Object.defineProperty(this,"viewModel",{get:function(){return h},set:function(a){var b=a.index;b=+b,(isNaN(b)||0>=b)&&(b=1);var d=a.total;null!=d&&(d=+d,(isNaN(d)||0>=d)&&(d=1),b>d&&(b=d)),h.index=b,h.total=d,c.syncViewModel()}}),this.init(b||{})}var d=document,e=0,f=b.pagenav.utils,g=f.hasClass,h=f.addClass,i=f.removeClass;c.prototype={constructor:c,init:function(a){a=a||{};var b={index:a.index,total:a.total};this.viewModel=b},syncViewModel:function(){this.oldIndex=this.viewModel.index,this.createDom(),this.eventAttach(),this.renderPage()},createDom:function(){var a=this.element,b=this.viewModel.total,c=b&&'<i class="aw a-u"></i>'||"",d=b&&'<select class="c-p-select"></select>'||"",e="";if(e+='<div class="c-p-con"><a class="c-btn c-btn-aw c-p-pre"><span>上一页</span></a><div class="c-p-cur c-btn"><span><div class="c-p-arrow"><span></span>'+c+"</div>"+d+'</span></div><a class="c-btn c-btn-awr c-p-next"><span>下一页</span></a></div>',a.innerHTML=e,this.prevElem=a.querySelector(".c-p-pre"),this.nextElem=a.querySelector(".c-p-next"),this.selectElem=a.querySelector("select"),b){e="";for(var f=0;b>f;f++)e+="<option>第"+(f+1)+"页</option>";this.selectElem.innerHTML=e}},renderPage:function(a){var b=this.selectElem,c=this.viewModel.index,d=this.viewModel.total,e=this.prevElem,f=this.nextElem;d?(1==d?(h(e,"c-btn-off"),h(f,"c-btn-off")):1==c?(h(e,"c-btn-off"),d>1&&i(f,"c-btn-off")):c==d?(h(f,"c-btn-off"),d>1&&i(e,"c-btn-off")):c>1&&d>c&&(i(e,"c-btn-off"),i(f,"c-btn-off")),b&&(b.selectedIndex=c-1)):("end"==a&&(c--,h(f,"c-btn-off"),this.viewModel.total=this.viewModel.index=c),1>=c?h(e,"c-btn-off"):i(e,"c-btn-off"));{var g;this.element}g=b?c+"/"+d:"第 "+c+" 页",this.element.querySelector(".c-p-arrow span").innerText=g},eventDetach:function(){var a=this.prevElem,b=this.nextElem,c=this.selectElem;a.removeEventListener("click",this.handler,!1),b.removeEventListener("click",this.handler,!1),c&&c.removeEventListener("change",this.handler,!1)},eventAttach:function(){var a=this,b=this.prevElem,c=this.nextElem,d=this.selectElem,e=this.handler=function(b){a.triggerEvent.call(a,b)};b.addEventListener("click",e,!1),c.addEventListener("click",e,!1),d&&d.addEventListener("change",e,!1)},triggerEvent:function(a){a.preventDefault();var b,c=this,e=a.currentTarget,f=a.type,h=this.viewModel.index,i={};if("click"==f){if(g(e,"c-btn-off"))return;g(e,"c-p-pre")?(h--,b="prev"):g(e,"c-p-next")&&(h++,b="next")}else if("change"==f){if(h=e.selectedIndex+1,this.oldIndex==h)return;b="select"}this.viewModel.index=h,this.oldIndex=h,i.index=h,i.type=b,this.selectElem?this.renderPage():i.callback=function(a){c.renderPage(a)};var j=d.createEvent("HTMLEvents");j.initEvent("pagenav:switchPage",!0,!0),j.page=i,this.element.dispatchEvent(j)},addEventListener:function(){var a=this.element;a.addEventListener.apply(a,arguments)},removeEventListener:function(){var a=this.element;a.removeEventListener.apply(a,arguments)},remove:function(){this.eventDetach();var a=this.element;a.parentNode&&a.parentNode.removeChild(a)}},b.pagenav=c}(window,window.ctrl||(window.ctrl={}));