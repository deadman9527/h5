!function(a,b,c){function d(){if(a.console&&a.console.debuggerMode){var b=a.console.debug||a.console.info;b.apply?b.apply(a.console,arguments):b(arguments)}}function e(){if(a.console&&a.console.debuggerMode){var b=a.console.error||a.console.info;b.apply?b.apply(a.console,arguments):b(arguments)}}function f(a,c){var d=this;this.name=a,this.async=function(a){return function(){var c=b.promise.deferred(),e=Array.prototype.slice.call(arguments);return e.push(function(){c.resolve()}),a.apply(d,e),c.promise()}},this.startup=this.async(function(a,b){b()}),this.show=this.async(function(a,b,c){c()}),this.hide=this.async(function(a,b){b()}),this.teardown=this.async(function(a,b){b()}),c&&c.call(this)}function g(a,c){function g(a){var c=h.createElement("div");c.className="view",c.setAttribute("id","view-"+a.id);var f,g=r[a.name];return f=g?b.promise.resolve(g):new b.promise(function(a){a.resolve(g)}),f.then(function(e){return d("success:load "+a.name+" page"),c.context=e,b.promise.resolve(e.startup(c))},function(){return d("failure:load "+a.name+" page"),b.promise.reject(!1)}).then(function(){return d("success:call startup on",{create:c}),b.promise.resolve(c)},function(a){return e("failure:call startup on",a.stack),b.promise.reject(c)})}function i(c,d){var e=a.getBoundingClientRect(),f=[];return c.style.width=e.width+"px",c.style.height=e.height+"px",a.appendChild(c),d?(f.push(new b.promise(function(a){c.style.display="block",c.style[j+"Transform"]="translateX("+e.width+"px) translateZ(1px)";var d=new b.animation(400,b.cubicbezier.ease,0,function(a,b){c.style[j+"Transform"]="translateX("+e.width*(1-b)+"px) translateZ(1px)"});d.onend(function(){c.style[j+"Transform"]="",a.resolve(c)}),d.play()})),f.push(new b.promise(function(a){d.style.opacity="1",d.style[j+"Transform"]="scale(1) translateZ(0)";var c=new b.animation(400,b.cubicbezier.ease,0,function(a,b){d.style[j+"Transform"]="scale("+(1-.1*b)+")",d.style.opacity=1-b+""});c.onend(function(){d.style[j+"Transform"]="",d.style.opacity="",d.style.display="none",a.resolve(d)}),c.play()}))):(c.style.display="block",f.push(b.promise.resolve(c))),b.promise.every.apply(b.promise,f)}function l(a){this.exec=function(){b.promise.every(g(a),u).then(function(a){var b=a[0],c=a[1];return d("begin:push animation for",{next:b,cur:c}),i(b,c)},function(a){return b.promise.reject(a)}).then(function(a){var c=a[0],f=a[1];q.push(c),d("end:push animation for",{next:c,cur:f});var g=f&&f.context.hide(f);u=b.promise.resolve(g).then(function(){return f&&d("success:call hide on",{cur:f}),b.promise.resolve(c.context.show(c,!1))},function(){return f&&e("failure:call hide on",{cur:f}),b.promise.reject(!1)}).then(function(){return d("success:call show on",{next:c}),b.promise.resolve(c)},function(){return e("failure:call show on",{next:c}),b.promise.reject(c)})},function(a){e("failure:when push animation",a.stack)})}}function m(c,d){c.parentNode||a.insertBefore(c,d);var e=a.getBoundingClientRect(),f=[];return f.push(new b.promise(function(a){c.style.opacity="0",c.style.display="block",c.style[j+"Transform"]="scale(0.9) translateZ(0)";var d=new b.animation(400,b.cubicbezier.ease,0,function(a,b){c.style[j+"Transform"]="scale("+(.9+.1*b)+") translateZ(0)",c.style.opacity=b+""});d.onend(function(){c.style[j+"Transform"]="",c.style.opacity="",a.resolve(c)}),d.play()})),f.push(new b.promise(function(c){d.style.display="block",d.style[j+"Transform"]="translateX(0) translateZ(1px)";var f=new b.animation(400,b.cubicbezier.ease,0,function(a,b){d.style[j+"Transform"]="translateX("+e.width*b+"px) translateZ(1px)"});f.onend(function(){d.style[j+"Transform"]="",a.removeChild(d),c.resolve(d)}),f.play()})),b.promise.every.apply(b.promise,f)}function n(a){this.exec=function(){var c;q.pop(),c=q.length?b.promise.resolve(q.pop()):g(a),b.promise.every(c,u).then(function(a){var b=a[0],c=a[1];return d("begin:pop animation for",{pre:b,cur:c}),m(b,c)},function(a){return b.promise.reject(a)}).then(function(a){var c=a[0],f=a[1];q.push(c),d("end:pop animation for",{pre:c,cur:f});var g=f&&f.context.hide(f);u=b.promise.resolve(g).then(function(){return d("success:call hide on",{cur:f}),b.promise.resolve(c.context.show(c,!1))},function(){return e("failure:call hide on",{cur:f}),b.promise.reject(!1)}).then(function(){return d("success:call show on",{pre:c}),b.promise.resolve(c)},function(){return e("failure:call show on",{pre:c}),b.promise.reject(c)})},function(a){e("failure:pop pop animation",a.stack)})}}function o(c,d){var e=a.getBoundingClientRect(),f=[];return c.style.width=e.width+"px",c.style.height=e.height+"px",a.appendChild(c),f.push(new b.promise(function(a){c.style.opacity="0",c.style.display="block",c.style[j+"Transform"]="translateZ(1px)";var d=new b.animation(400,b.cubicbezier.ease,0,function(a,b){c.style.opacity=b+""});d.onend(function(){c.style.opacity="",c.style[j+"Transform"]="",a.resolve(c)}),d.play()})),f.push(new b.promise(function(c){d.style.opacity="1",d.style[j+"Transform"]="scale(1) translateZ(0)";var e=new b.animation(400,b.cubicbezier.ease,0,function(a,b){d.style.opacity=1-b+"",d.style[j+"Transform"]="scale("+(1-.1*b)+")"});e.onend(function(){d.style.opacity="",d.style[j+"Transform"]="",a.removeChild(d),c.resolve(d)}),e.play()})),b.promise.every.apply(b.promise,f)}function p(a){this.exec=function(){q.pop(),b.promise.every(g(a),u).then(function(a){var b=a[0],c=a[1];return d("begin:replace animation for",{"new":b,cur:c}),o(b,c)},function(a){return b.promise.reject(a)}).then(function(a){var c=a[0],f=a[1];q.push(c),d("end:replace animation for",{"new":c,cur:f});var g=f&&f.context.hide(f);u=b.promise.resolve(g).then(function(){return f&&d("success:call hide on",{cur:f}),b.promise.resolve(c.context.show(c,!1))},function(){return f&&e("failure:call hide on",{cur:f}),b.promise.reject(!1)}).then(function(){return d("success:call show on",{"new":c}),b.promise.resolve(c)},function(){return e("failure:call show on",{"new":c}),b.promise.reject(c)})},function(a){e("failure:when replace animation",a.stack)})}}var q=[],r={},s=Date.now()+"-"+ ++k,t=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(c=arguments[0],a=null),a||(a=document.createElement("div"),t.appendChild(a)),c=c||{},a.setAttribute("data-ctrl-name","pageview"),a.setAttribute("data-ctrl-id",s),c.fullscreen&&(a.className="fullscreen");var u=b.promise.resolve();this.definePage=function(a,b){return r[a]=new f(a,b)},this.push=function(a,b,c){new l({name:a,args:b,id:c||Date.now()}).exec()},this.pop=function(a,b,c){new n({name:a,args:b,id:c||Date.now()}).exec()},this.replace=function(a,b,c){new p({name:a,args:b,id:c||Date.now()}).exec()},this.addEventListener=function(a,b){this.root.addEventListener(a,b,!1)},this.removeEventListener=function(a,b){this.root.removeEventListener(a,b,!1)},this.root=t,this.element=a}var h=a.document,i=a.navigator.userAgent.match(/IEMobile\/([\d\.]+)/),j=i?"ms":"webkit",k=0;c.pageview=g}(window,window.lib,window.ctrl||(window.ctrl={}));
if (window.KISSY) {KISSY.add('mtb/ctrl-pageview/0.1.6/pageview.cmd',function() {return window.ctrl.pageview;},{requries:['mtb/lib-promise','mtb/lib-navigation','mtb/lib-animation','mtb/lib-cubicbezier','mtb/ctrl-pageview/0.1.6/pageview.css']});} else if ('undefined' !== typeof define) {define('mtb/ctrl-pageview/0.1.6/pageview.cmd', [], function(require){require('mtb/lib-promise');require('mtb/lib-navigation');require('mtb/lib-animation');require('mtb/lib-cubicbezier');require('mtb/ctrl-pageview/0.1.6/pageview.css');return window.ctrl.pageview;});}