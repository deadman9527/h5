!function(a,b){function c(a,b){function c(){var b;switch(k){case"column":b=new Array(n+1).join('<div class="column" style="margin-right:'+o+'px;-webkit-box-flex:1;"></div>');break;case"adaptive":var c=Math.floor((a.getBoundingClientRect().width+o)/(m+o));b=new Array(c+1).join('<div class="column" style="width:'+m+"px;margin-right:"+o+'px;"></div>');break;case"fix":b=new Array(n+1).join('<div class="column" style="width:'+m+"px;margin-right:"+o+'px;"></div>')}j.innerHTML=b,j.style.height="",s=Array.prototype.slice.call(j.querySelectorAll(".column")).map(function(a){return a.height=0,a.items={},a.fragment=document.createDocumentFragment(),a})}function e(a){for(var b=s[0],c=b.height,d=1;d<s.length;d++){var e=s[d].height||0;c>e&&(b=s[d],c=e)}var f=b.fragment;a.style.webkitTransform="translateY("+b.height+"px)",f.appendChild(a),a.height||b.appendChild(f),b.height=(b.height||0)+(a.height||a.getBoundingClientRect().height)+p}function f(){for(;q<r.length;q++){var a=r[q],b=document.createElement("div");b.className="item",a.width&&(b.width=a.width,b.style.width=a.width+"px"),a.height&&(b.height=a.height,b.style.height=a.height+"px"),b.innerHTML=a.html,e(b)}for(var c=0,d=0;d<s.length;d++)s[d].fragment&&s[d].fragment.childElementCount&&s[d].appendChild(s[d].fragment),c=Math.max(c,s[d].height);j.style.height=c+"px"}var g=this,h=Date.now()+"-"+ ++d,i=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(b=arguments[0],a=null),a||(a=document.createElement("div"),i.appendChild(a)),b=b||{},a.setAttribute("data-ctrl-name","waterfall"),a.setAttribute("data-ctrl-id",h);var j=document.createElement("div");j.className="column-wrap",a.appendChild(j);var k,l=!0;Object.defineProperty(this,"mode",{get:function(){return k},set:function(a){if(["column","adaptive","fix"].indexOf(a)<0)throw new Error("Non expected value");k!==a&&(l=!0,k=a)}}),this.mode=b.mode||"column";var m;Object.defineProperty(this,"columnWidth",{get:function(){var a=j.querySelector(".column");return a?a.getBoundingClientRect().width:m||0},set:function(a){if("string"==typeof a){var b=parseInt(a);if(!b)throw new Error("Non expected value");m=b}else{if("number"!=typeof a)throw new Error("Non expected value");m=a}}}),b.columnWidth&&(this.columnWidth=b.columnWidth);var n;Object.defineProperty(this,"columnAmount",{get:function(){var a=j.querySelectorAll(".column");return a&&a.length?a.length:n||0},set:function(a){if("string"==typeof a){var b=parseInt(a);if(!b)throw new Error("Non expected value");n=b}else{if("number"!=typeof a)throw new Error("Non expected value");n=a}}}),b.columnAmount&&(this.columnAmount=b.columnAmount);var o;Object.defineProperty(this,"columnPadding",{get:function(){return o},set:function(a){if("string"==typeof a){var b=parseInt(a);if(!b)throw new Error("Non expected value");o=b}else{if("number"!=typeof a)throw new Error("Non expected value");o=a}}}),b.columnPadding&&(this.columnPadding=b.columnPadding);var p;Object.defineProperty(this,"linePadding",{get:function(){return p},set:function(a){if("string"==typeof a){var b=parseInt(a);if(!b)throw new Error("Non expected value");p=b}else{if("number"!=typeof a)throw new Error("Non expected value");p=a}}}),b.linePadding&&(this.linePadding=b.linePadding||0);var q=0,r=[];Object.defineProperty(this,"viewModel",{get:function(){return r},set:function(a){if(!(a instanceof Array))throw new Error("Non expected value");r=a,g.syncViewModel("refresh")}});var s;this.syncViewModel=function(a){a=a||"padding","refresh"===a||l?(refresh=!1,q=0,c(),f()):"padding"===a&&f()},this.addEventListener=function(){a.addEventListener.apply(a,arguments)},this.removeEventListener=function(){a.removeEventListener.apply(a,arguments)},this.remove=function(){a.parentNode&&a.parentNode.removeChild(a)},this.element=a,this.root=i,c()}var d=0;b.waterfall=c}(window,window.ctrl||(window.ctrl={}));
if (window.KISSY) {KISSY.add('mtb/ctrl-waterfall/1.2.2/waterfall.cmd',function() {return window.ctrl.waterfall;},{requries:['mtb/ctrl-waterfall/1.2.2/waterfall.css']});} else if ('undefined' !== typeof define) {define('mtb/ctrl-waterfall/1.2.2/waterfall.cmd', [], function(){require('mtb/ctrl-waterfall/1.2.2/waterfall.css');return window.ctrl.waterfall;});}