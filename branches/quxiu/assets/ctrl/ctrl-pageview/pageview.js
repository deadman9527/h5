!function(e,n,t){function r(){if(e.console&&e.console.debuggerMode){var n=e.console.debug||e.console.info;n.apply?n.apply(e.console,arguments):n(arguments)}}function o(){if(e.console&&e.console.debuggerMode){var n=e.console.error||e.console.info;n.apply?n.apply(e.console,arguments):n(arguments)}}function i(e,t){var r=this;this.name=e,this.async=function(e){return function(){var t=n.promise.deferred(),o=Array.prototype.slice.call(arguments);return o.push(function(){t.resolve()}),e.apply(r,o),t.promise()}},this.startup=this.async(function(e,n){n()}),this.show=this.async(function(e,n,t){t()}),this.hide=this.async(function(e,n){n()}),this.teardown=this.async(function(e,n){n()}),t&&t.call(this)}function s(e,t){function s(e){var t=a.createElement("div");t.className="view",t.setAttribute("id","view-"+e.id);var i,s=v[e.name];return i=s?n.promise.resolve(s):new n.promise(function(e){e.resolve(s)}),i.then(function(o){return r("success:load "+e.name+" page"),t.context=o,n.promise.resolve(o.startup(t))},function(){return r("failure:load "+e.name+" page"),n.promise.reject(!1)}).then(function(){return r("success:call startup on",{create:t}),n.promise.resolve(t)},function(e){return o("failure:call startup on",e.stack),n.promise.reject(t)})}function c(t,r){var o=e.getBoundingClientRect(),i=[];return t.style.width=o.width+"px",t.style.height=o.height+"px",e.appendChild(t),r?(i.push(new n.promise(function(e){t.style.display="block",t.style[l+"Transform"]="translateX("+o.width+"px) translateZ(1px)";var r=new n.animation(400,n.cubicbezier.ease,0,function(e,n){t.style[l+"Transform"]="translateX("+o.width*(1-n)+"px) translateZ(1px)"});r.onend(function(){t.style[l+"Transform"]="",e.resolve(t)}),r.play()})),i.push(new n.promise(function(e){r.style.opacity="1",r.style[l+"Transform"]="scale(1) translateZ(0)";var t=new n.animation(400,n.cubicbezier.ease,0,function(e,n){r.style[l+"Transform"]="scale("+(1-.1*n)+")",r.style.opacity=1-n+""});t.onend(function(){r.style[l+"Transform"]="",r.style.opacity="",r.style.display="none",e.resolve(r)}),t.play()}))):(t.style.display="block",i.push(n.promise.resolve(t))),n.promise.every.apply(n.promise,i)}function p(e){this.exec=function(){n.promise.every(s(e),b).then(function(e){var n=e[0],t=e[1];return r("begin:push animation for",{next:n,cur:t}),c(n,t)},function(e){return n.promise.reject(e)}).then(function(e){var t=e[0],i=e[1];d.push(t),r("end:push animation for",{next:t,cur:i});var s=i&&i.context.hide(i);b=n.promise.resolve(s).then(function(){return i&&r("success:call hide on",{cur:i}),n.promise.resolve(t.context.show(t,!1))},function(){return i&&o("failure:call hide on",{cur:i}),n.promise.reject(!1)}).then(function(){return r("success:call show on",{next:t}),n.promise.resolve(t)},function(){return o("failure:call show on",{next:t}),n.promise.reject(t)})},function(e){o("failure:when push animation",e.stack)})}}function f(t,r){t.parentNode||e.insertBefore(t,r);var o=e.getBoundingClientRect(),i=[];return i.push(new n.promise(function(e){t.style.opacity="0",t.style.display="block",t.style[l+"Transform"]="scale(0.9) translateZ(0)";var r=new n.animation(400,n.cubicbezier.ease,0,function(e,n){t.style[l+"Transform"]="scale("+(.9+.1*n)+") translateZ(0)",t.style.opacity=n+""});r.onend(function(){t.style[l+"Transform"]="",t.style.opacity="",e.resolve(t)}),r.play()})),i.push(new n.promise(function(t){r.style.display="block",r.style[l+"Transform"]="translateX(0) translateZ(1px)";var i=new n.animation(400,n.cubicbezier.ease,0,function(e,n){r.style[l+"Transform"]="translateX("+o.width*n+"px) translateZ(1px)"});i.onend(function(){r.style[l+"Transform"]="",e.removeChild(r),t.resolve(r)}),i.play()})),n.promise.every.apply(n.promise,i)}function m(e){this.exec=function(){var t;d.pop(),t=d.length?n.promise.resolve(d.pop()):s(e),n.promise.every(t,b).then(function(e){var n=e[0],t=e[1];return r("begin:pop animation for",{pre:n,cur:t}),f(n,t)},function(e){return n.promise.reject(e)}).then(function(e){var t=e[0],i=e[1];d.push(t),r("end:pop animation for",{pre:t,cur:i});var s=i&&i.context.hide(i);b=n.promise.resolve(s).then(function(){return r("success:call hide on",{cur:i}),n.promise.resolve(t.context.show(t,!1))},function(){return o("failure:call hide on",{cur:i}),n.promise.reject(!1)}).then(function(){return r("success:call show on",{pre:t}),n.promise.resolve(t)},function(){return o("failure:call show on",{pre:t}),n.promise.reject(t)})},function(e){o("failure:pop pop animation",e.stack)})}}function h(t,r){var o=e.getBoundingClientRect(),i=[];return t.style.width=o.width+"px",t.style.height=o.height+"px",e.appendChild(t),i.push(new n.promise(function(e){t.style.opacity="0",t.style.display="block",t.style[l+"Transform"]="translateZ(1px)";var r=new n.animation(400,n.cubicbezier.ease,0,function(e,n){t.style.opacity=n+""});r.onend(function(){t.style.opacity="",t.style[l+"Transform"]="",e.resolve(t)}),r.play()})),i.push(new n.promise(function(t){r.style.opacity="1",r.style[l+"Transform"]="scale(1) translateZ(0)";var o=new n.animation(400,n.cubicbezier.ease,0,function(e,n){r.style.opacity=1-n+"",r.style[l+"Transform"]="scale("+(1-.1*n)+")"});o.onend(function(){r.style.opacity="",r.style[l+"Transform"]="",e.removeChild(r),t.resolve(r)}),o.play()})),n.promise.every.apply(n.promise,i)}function y(e){this.exec=function(){d.pop(),n.promise.every(s(e),b).then(function(e){var n=e[0],t=e[1];return r("begin:replace animation for",{"new":n,cur:t}),h(n,t)},function(e){return n.promise.reject(e)}).then(function(e){var t=e[0],i=e[1];d.push(t),r("end:replace animation for",{"new":t,cur:i});var s=i&&i.context.hide(i);b=n.promise.resolve(s).then(function(){return i&&r("success:call hide on",{cur:i}),n.promise.resolve(t.context.show(t,!1))},function(){return i&&o("failure:call hide on",{cur:i}),n.promise.reject(!1)}).then(function(){return r("success:call show on",{"new":t}),n.promise.resolve(t)},function(){return o("failure:call show on",{"new":t}),n.promise.reject(t)})},function(e){o("failure:when replace animation",e.stack)})}}var d=[],v={},w=Date.now()+"-"+ ++u,g=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(t=arguments[0],e=null),e||(e=document.createElement("div"),g.appendChild(e)),t=t||{},e.setAttribute("data-ctrl-name","pageview"),e.setAttribute("data-ctrl-id",w),t.fullscreen&&(e.className="fullscreen");var b=n.promise.resolve();this.definePage=function(e,n){return v[e]=new i(e,n)},this.push=function(e,n,t){new p({name:e,args:n,id:t||Date.now()}).exec()},this.pop=function(e,n,t){new m({name:e,args:n,id:t||Date.now()}).exec()},this.replace=function(e,n,t){new y({name:e,args:n,id:t||Date.now()}).exec()},this.addEventListener=function(e,n){this.root.addEventListener(e,n,!1)},this.removeEventListener=function(e,n){this.root.removeEventListener(e,n,!1)},this.root=g,this.element=e}var a=e.document,c=e.navigator.userAgent.match(/IEMobile\/([\d\.]+)/),l=c?"ms":"webkit",u=0;t.pageview=s}(window,window.lib,window.ctrl||(window.ctrl={}));