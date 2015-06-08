//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);

// gotop
;(function ($, lib){
    var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(c) { setTimeout(c, 1/60 * 1000); };

    function addStyle (style) {
        var csStyle = document.createElement('style');
        document.head.appendChild(csStyle);
        csStyle.innerHTML = style;
    }

    // 默认配置
	var defoptions = {

		// 触发 go top 的 trigger
		trigger: null,

		// 位置
		position: null,

        // 点击时的自定义处理函数
        onClick: function(){},
        
        style: '.ve-gotop {\
            position: fixed;\
            right: 0.4rem;\
            bottom: 0.4rem;\
            z-index: 10000;\
            opacity: 0;\
            pointer-events: none;\
            -webkit-transition: opacity 0.15s linear;\
            transition: opacity 0.15s linear;\
            width: 33px;\
            height: 33px;\
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAD2klEQVR42u2cTUsbQRjHLWQphR6UHGrB9JP01MbmC9RGe/eY72M2viu+NBgqvq0bFFFEUQ8eNCAa4kEfRBEUBd8ufR67A6Gx3d3svGymK/xAJ9nNzC+bmf9OZmyS8ZPL5QwkgXxGMkgWsZESAkgF2UQKzmMZ57kJxBBVL1mNb0Y6kHkEAjLvnKu5URofQz4hNgKCsJ3XiIVRgIF8Qw4RkMSh85pGGAS8Qr4gFQQUUUFSVBdVElrZRyAk2EirbAlpBEJKWlZnmEUg5GSRmCgJrxELgQbBojrzlvDWCTzQYGxS3XlJeIPsINCg7FAbeOSDVQQanNVAfQbrGDUhW6+ETgQ0o8uvhHcIaEqrn9hsaSzC8hTHnXsH0JyUl1GiorsIp42Gt3sI/Un/6z7iUHUFTdMMRM6NnFk9nxF7SUS7ioaPjY3B+Pi4ChFEskaEigQ5NTUFd3d3zywsLKgQYf0pIS5bwuTkJNze3sLi4iLMzs7Cw8MDFItFDuc2Xag5pqVaRIdMCSMjI3B9fQ3r6+us7FnG4+MjLC8vyxbRUS1iXpaEoaEhuLi4gK2trZrHSMbT0xOsra3JFGFVZweQQW9vL5yenkKpVGJlf5WxsbEhSwRhkIiELBHlcplwfd7MzMyzjO3tbVkiPpCIpAQJdBXQ1UBXBf3tWcbu7q4MEUkSkREsgd5Z6heof2BlvmTs7++LFpEhET0CJdDIQCMEjRSsrC4ZBwcHIkVkSURRlATbtikrUGZgZYFkHB0dQV9fn4i6LpGIPRES5ubmKDFSemRlXGQcHx9Df38/7/qWmgRGZ5LByrjKODk5gYGBAa7nbhIYnVmZEBlnZ2cwODjIVcSewOgsVMb5+TkMDw9z+2gUBUVnKTIuLy9hdHSUS2fZIyA6S5VxdXVF8xrBvvOgMME5OiuRcXNzAxMTE3WdgwWqJMforFQGddL5fN738SxiJwJEZ+qwqqOzchk0bBcKBV/Hspsug290Vi/j/v4epqen/RxrsDkJy+PsMovO9Jl0ic5KZdBsF/3u5Rjbz1QdE0GN9x6d1fcZNVes21Rd3McVwYaqMEOdptfk2VIzne9RhE7Y3r7g0V9E0u9XfiQhCGEUWUZi7l8C6y8iHS0LcFkWwGSk/vuFItHSoZdX3oOmvPe7sq5LQwnf611raWokwYyWIP9ugxEtSsc2RNsUsO7RxhWsc7SVSca+UBqGwjxERtsdsU4qN8CmdNsAGzRvdCrYEt2JGGHdJN+OrAgUsIK0e+8M1UuJI1+RPIfG/3DOFQ9eM/VXShvyEelGskjxhX+k8dN5rNt5bpusd/4XjtUkOQ5Pct4AAAAASUVORK5CYII=) no-repeat;\
            background-size: contain;\
        }\
            .ve-gotop-active {\
            opacity: 1;\
            pointer-events: auto;\
        }'
	};
	
	// constructor
	function GoTop(options) {

		this.options = {};

		$.extend(this.options, defoptions, options || {});

		this._init();

	}

	$.extend(GoTop.prototype, {
		// 初始化
		_init: function() {
            addStyle(this.options.style);

			var host = this,
				ops = host.options;

			if (!ops.trigger) {
				ops.trigger = $('<div class="ve-gotop"></div>').appendTo('body');
			}

            // 有配置才设置，否则用样式默认
            if (ops.position) {
                $(ops.trigger).css({
                    bottom: ops.position.bottom,
                    right: ops.position.right
                });
            }

            // 绑定click而不是tap，防止fixed定位的穿透bug
			$(ops.trigger).on('click', function(ev) {
				ev.preventDefault();
				window.scrollTo(0, 0);
                ops.onClick && ops.onClick.call(host, ev);
			});

			host._EventHandler = $(window).on('scroll touchend', function() {

				host._check();
				
			});

		},

		// 检测是否出现 gotop
		_check: function() {

			var host = this;

            RAF(function() {

                var st = $('body').scrollTop(),
                    vh = window.innerHeight;

                if (st > vh) {
                    host.show();
                } else {
                    host.hide();
                }

            });

//			if (!host._timer) {
//
//				host._timer = setTimeout(function() {
//
//					host._timer = null;
//
//					var st = $('body').scrollTop(),
//						vh = window.innerHeight;
//
//					if (st > vh) {
//						host.show();
//					} else {
//						host.hide();
//					}
//
//				}, 250);
//
//			}

		},

		// 销毁
		destroy: function() {

			$(window).off({ type: this._EventHandler });
			$(this.trigger).remove();

		},

		show: function() {

			$(this.options.trigger).addClass('ve-gotop-active');

		},

		hide: function() {

			$(this.options.trigger).removeClass('ve-gotop-active');

		}
		
	});

	// node
	$.fn.gotop = function(options) {

		if (!options) {
			options = {};
		}

		options.trigger = this;

		return new GoTop(options);

	};

	lib.goTop = GoTop;
	
})(Zepto, window.lib || (window.lib={}))

/**
 * Created with JetBrains WebStorm.
 *
 * img lazyloaded as background img
 *
 * User: 景烁
 * Date: 13-11-18
 * Time: 上午11:56
 * To change this template use File | Settings | File Templates.
 */
;(function($, lib) {
	
	var iPhone = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
		version = iPhone && iPhone[2].split('_');
		version = version && parseFloat(version.length > 1 ? version.splice(0, 2).join(".") : version[0], 10);
		
	var phoneType = version && (version < 6);
	
	var Lazyload = {
		
		defaultOpts: {
			interval: 200,
			threshold: 5,
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

			self.imglist.each(function (index, item) {
				if (item && self.inviewport($(item))) {
					var $item = $(item);
					var src = $item.attr('dataimg');
					
					var img = new Image();
					img.src = src;
					
					img.onload = function () {
						self.imglist[index] = null;
						$item.removeClass('lazy').removeAttr('dataimg').css('background-image', 'url(' + src + ')');
						img.onload = img.onerror = null;
					}
				
					img.onerror = function () {
						self.imglist[index] = null;
						$item.removeClass('lazy').removeAttr('dataimg').css('background-image', "url(http://h5.quxiu.me/assets/img/cart_img_black_640x253.png)");
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
!function(a,b){function c(a,b){return[[(a/3+(a+b)/3-a)/(b-a),(a*a/3+a*b*2/3-a*a)/(b*b-a*a)],[(b/3+(a+b)/3-a)/(b-a),(b*b/3+a*b*2/3-a*a)/(b*b-a*a)]]}function d(a){if(this.v=a.v||0,this.a=a.a||0,"undefined"!=typeof a.t&&(this.t=a.t),"undefined"!=typeof a.s&&(this.s=a.s),"undefined"==typeof this.t)if("undefined"==typeof this.s)this.t=-this.v/this.a;else{var b=(Math.sqrt(this.v*this.v+2*this.a*this.s)-this.v)/this.a,c=(-Math.sqrt(this.v*this.v+2*this.a*this.s)-this.v)/this.a;this.t=Math.min(b,c)}"undefined"==typeof this.s&&(this.s=this.a*this.t*this.t/2+this.v*this.t)}d.prototype.generateCubicBezier=function(){return c(this.v/this.a,this.t+this.v/this.a)},b.motion=d}(window,window.lib||(window.lib={}));!function(a){"use strict";function b(a,b){for(var c=a;c;){if(c.contains(b)||c==b)return c;c=c.parentNode}return null}function c(a,b,c){var d=i.createEvent("HTMLEvents");if(d.initEvent(b,!0,!0),"object"==typeof c)for(var e in c)d[e]=c[e];a.dispatchEvent(d)}function d(a,b,c,d,e,f,g,h){var i=Math.atan2(h-f,g-e)-Math.atan2(d-b,c-a),j=Math.sqrt((Math.pow(h-f,2)+Math.pow(g-e,2))/(Math.pow(d-b,2)+Math.pow(c-a,2))),k=[e-j*a*Math.cos(i)+j*b*Math.sin(i),f-j*b*Math.cos(i)-j*a*Math.sin(i)];return{rotate:i,scale:j,translate:k,matrix:[[j*Math.cos(i),-j*Math.sin(i),k[0]],[j*Math.sin(i),j*Math.cos(i),k[1]],[0,0,1]]}}function e(a){0===Object.keys(l).length&&(j.addEventListener("touchmove",f,!1),j.addEventListener("touchend",g,!1),j.addEventListener("touchcancel",h,!1));for(var d=0;d<a.changedTouches.length;d++){var e=a.changedTouches[d],i={};for(var m in e)i[m]=e[m];var n={startTouch:i,startTime:Date.now(),status:"tapping",element:a.srcElement,pressingHandler:setTimeout(function(b){return function(){"tapping"===n.status&&(n.status="pressing",c(b,"press",{touchEvent:a})),clearTimeout(n.pressingHandler),n.pressingHandler=null}}(a.srcElement),500)};l[e.identifier]=n}if(2==Object.keys(l).length){var o=[];for(var m in l)o.push(l[m].element);c(b(o[0],o[1]),"dualtouchstart",{touches:k.call(a.touches),touchEvent:a})}}function f(a){for(var e=0;e<a.changedTouches.length;e++){var f=a.changedTouches[e],g=l[f.identifier];if(!g)return;g.lastTouch||(g.lastTouch=g.startTouch),g.lastTime||(g.lastTime=g.startTime),g.velocityX||(g.velocityX=0),g.velocityY||(g.velocityY=0),g.duration||(g.duration=0);var h=Date.now()-g.lastTime,i=(f.clientX-g.lastTouch.clientX)/h,j=(f.clientY-g.lastTouch.clientY)/h,k=70;h>k&&(h=k),g.duration+h>k&&(g.duration=k-h),g.velocityX=(g.velocityX*g.duration+i*h)/(g.duration+h),g.velocityY=(g.velocityY*g.duration+j*h)/(g.duration+h),g.duration+=h,g.lastTouch={};for(var m in f)g.lastTouch[m]=f[m];g.lastTime=Date.now();var n=f.clientX-g.startTouch.clientX,o=f.clientY-g.startTouch.clientY,p=Math.sqrt(Math.pow(n,2)+Math.pow(o,2));("tapping"===g.status||"pressing"===g.status)&&p>10&&(g.status="panning",g.isVertical=!(Math.abs(n)>Math.abs(o)),c(g.element,"panstart",{touch:f,touchEvent:a,isVertical:g.isVertical}),c(g.element,(g.isVertical?"vertical":"horizontal")+"panstart",{touch:f,touchEvent:a})),"panning"===g.status&&(g.panTime=Date.now(),c(g.element,"pan",{displacementX:n,displacementY:o,touch:f,touchEvent:a,isVertical:g.isVertical}),g.isVertical?c(g.element,"verticalpan",{displacementY:o,touch:f,touchEvent:a}):c(g.element,"horizontalpan",{displacementX:n,touch:f,touchEvent:a}))}if(2==Object.keys(l).length){for(var q,r=[],s=[],t=[],e=0;e<a.touches.length;e++){var f=a.touches[e],g=l[f.identifier];r.push([g.startTouch.clientX,g.startTouch.clientY]),s.push([f.clientX,f.clientY])}for(var m in l)t.push(l[m].element);q=d(r[0][0],r[0][1],r[1][0],r[1][1],s[0][0],s[0][1],s[1][0],s[1][1]),c(b(t[0],t[1]),"dualtouch",{transform:q,touches:a.touches,touchEvent:a})}}function g(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var n=a.changedTouches[i],o=n.identifier,p=l[o];if(p){if(p.pressingHandler&&(clearTimeout(p.pressingHandler),p.pressingHandler=null),"tapping"===p.status&&(p.timestamp=Date.now(),c(p.element,"tap",{touch:n,touchEvent:a}),m&&p.timestamp-m.timestamp<300&&c(p.element,"doubletap",{touch:n,touchEvent:a}),m=p),"panning"===p.status){var q=Date.now(),r=q-p.startTime,s=((n.clientX-p.startTouch.clientX)/r,(n.clientY-p.startTouch.clientY)/r,n.clientX-p.startTouch.clientX),t=n.clientY-p.startTouch.clientY,u=Math.sqrt(p.velocityY*p.velocityY+p.velocityX*p.velocityX),v=u>.5&&q-p.lastTime<100,w={duration:r,isflick:v,velocityX:p.velocityX,velocityY:p.velocityY,displacementX:s,displacementY:t,touch:n,touchEvent:a,isVertical:p.isVertical};c(p.element,"panend",w),v&&(c(p.element,"flick",w),p.isVertical?c(p.element,"verticalflick",w):c(p.element,"horizontalflick",w))}"pressing"===p.status&&c(p.element,"pressend",{touch:n,touchEvent:a}),delete l[o]}}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}function h(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var m=a.changedTouches[i],n=m.identifier,o=l[n];o&&(o.pressingHandler&&(clearTimeout(o.pressingHandler),o.pressingHandler=null),"panning"===o.status&&c(o.element,"panend",{touch:m,touchEvent:a}),"pressing"===o.status&&c(o.element,"pressend",{touch:m,touchEvent:a}),delete l[n])}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}var i=a.document,j=i.documentElement,k=Array.prototype.slice,l={},m=null;j.addEventListener("touchstart",e,!1)}(window,window.lib||(window.lib={}));!function(a,b){function c(a,b,c,d){function e(a){return(3*k*a+2*l)*a+m}function f(a){return((k*a+l)*a+m)*a}function g(a){return((n*a+o)*a+p)*a}function h(a){for(var b,c,d=a,g=0;8>g;g++){if(c=f(d)-a,Math.abs(c)<j)return d;if(b=e(d),Math.abs(b)<j)break;d-=c/b}var h=1,i=0;for(d=a;h>i;){if(c=f(d)-a,Math.abs(c)<j)return d;c>0?h=d:i=d,d=(h+i)/2}return d}function i(a){return g(h(a))}var j=1e-6,k=3*a-3*c+1,l=3*c-6*a,m=3*a,n=3*b-3*d+1,o=3*d-6*b,p=3*b;return i}b.cubicbezier=c,b.cubicbezier.liner=c(0,0,1,1),b.cubicbezier.ease=c(.25,.1,.25,1),b.cubicbezier.easeIn=c(.42,0,1,1),b.cubicbezier.easeOut=c(0,0,.58,1),b.cubicbezier.easeInOut=c(.42,0,.58,1)}(window,window.lib||(window.lib={}));!function(a,b){function c(b){function d(){e=!0,i&&i.forEach(function(a){a&&a()})}var e=!1;Object.defineProperty(this,"isRequested",{get:function(){return e}});var f,i=[],j=!1;this.request=function(){if(!e){var c=arguments;return j=!1,f=g(function(){j||(b.apply(a,c),d())}),this}},this.cancel=function(){f&&(j=!0,h(f))},this.then=function(a){return e?a&&a():i.push(a),this},this.clone=function(){return new c(b)}}function d(a,d,e,g){"function"==typeof g&&(g={0:g});for(var h=a/f,i=1/h,j=[],k=Object.keys(g).map(function(a){return parseInt(a)}),l=0;h>l;l++){var m=k[0],n=i*l;if(null!=m&&100*n>=m){var o=g[""+m];o instanceof c||(o=new c(o)),j.push(o),k.shift()}else j.length&&j.push(j[j.length-1].clone())}var p;"string"==typeof d||d instanceof Array?b.cubicbezier?"string"==typeof d?b.cubicbezier[d]&&(p=b.cubicbezier[d]):d instanceof Array&&4===d.length&&(p=b.cubicbezier.apply(b.cubicbezier,d)):console.error("require lib.cubicbezier"):"function"==typeof d&&(p=d),p||console.error("unexcept timing function");var q,r=!1,s=0,t=0;this.play=function(){function a(){r=!1,u&&u()}function b(){var a=i*(t+1).toFixed(10);q=j[t],q.request(a.toFixed(10),d(a).toFixed(10)),q.then(function(){t++,c()})}function c(){r&&(t===j.length?a():b())}if(!r)return r=!0,s=setTimeout(function(){s=0,c()},!t&&e||0),this},this.stop=function(){return r?(r=!1,s&&(clearTimeout(s),s=0),q&&q.cancel(),this):void 0};var u;this.onend=function(a){u=a}}var e=60,f=1e3/e,g=window.requestAnimationFrame||window.msRequestAnimationFrame||window.webkitRequestAnimationFrame||window.mozkitRequestAnimationFrame||function(a){return setTimeout(a,f)},h=window.cancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||function(a){clearTimeout(a)};b.animation=d,b.animation.Frame=c,b.animation.requestFrame=function(a){var b=new c(a);return b.request(),b}}(window,window.lib||(window.lib={}));
!function(a,b){function c(){b.scroll.outputDebugLog&&console.debug.apply(console,arguments)}function d(a){var b=a.getBoundingClientRect();if(!b){b={},b.width=a.offsetWidth,b.height=a.offsetHeight,b.left=a.offsetLeft,b.top=a.offsetTop;for(var c=a.offsetParent;c;)b.left+=c.offsetLeft,b.top+=c.offsetTop,c=c.offsetParent;b.right=b.left+b.width,b.bottom=b.top+b.height}return b}function e(a){return 0-a.options[a.axis+"Padding1"]}function f(a){var b=d(a.element),c=d(a.viewport),f=e(a);if("y"===a.axis)var g=0-b.height+c.height;else var g=0-b.width+c.width;return Math.min(g+a.options[a.axis+"Padding2"],f)}function g(a,b){return b>a.minScrollOffset?b-a.minScrollOffset:b<a.maxScrollOffset?b-a.maxScrollOffset:void 0}function h(a,b){return b>a.minScrollOffset?b=a.minScrollOffset:b<a.maxScrollOffset&&(b=a.maxScrollOffset),b}function i(a,b,d){c(a.element.scrollId,b,d);var e=m.createEvent("HTMLEvents");if(e.initEvent(b,!1,!0),e.scrollObj=a,d)for(var f in d)e[f]=d[f];a.element.dispatchEvent(e),a.viewport.dispatchEvent(e)}function j(a){var b,c={x:0,y:0},d=getComputedStyle(a.element).webkitTransform;return"none"!==d&&(b=d.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/)||d.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/))&&(c.x=parseFloat(b[1])||0,c.y=parseFloat(b[2])||0),c}function k(a,b){return a=parseFloat(a),b=parseFloat(b),0!=a&&(a+="px"),0!=b&&(b+="px"),q?"translate3d("+a+", "+b+", 0)":"translate("+a+", "+b+")"}function l(a,l){function m(a){return B||H?(a.preventDefault(),a.stopPropagation(),!1):!0}function q(a){B||H||setTimeout(function(){var b=document.createEvent("HTMLEvents");b.initEvent("niceclick",!0,!0),a.target.dispatchEvent(b)},300)}function s(a,c){E=null,clearTimeout(F),F=setTimeout(function(){E&&(E=null,b.animation.requestFrame(a))},c||400),E=a}function t(){if(A.enabled)if(H&&z(),l.useFrameAnimation)D&&D.stop(),D=null;else{var b=j(A);a.style.webkitTransform=k(b.x,b.y),a.style.webkitTransition="",E=null,clearTimeout(F)}}function u(){if(A.enabled){var c=j(A)[A.axis],d=g(A,c);if(d){var e=h(A,c);if(d>0?i(A,"y"===A.axis?"pulldownend":"pullrightend"):0>d&&i(A,"y"===A.axis?"pullupend":"pullleftend"),l.useFrameAnimation){var f=e-c;D=new b.animation(400,b.cubicbezier.ease,0,function(b,d){var e=(c+f*d).toFixed(2);a.style.webkitTransform="y"===A.axis?k(0,e):k(e,0),i(A,"scrolling")}),D.onend(z),D.play()}else{a.style.webkitTransition="-webkit-transform 0.4s ease 0";var m=e.toFixed(0);a.style.webkitTransform="y"===A.axis?k(0,m):k(m,0),s(z,400),b.animation.requestFrame(function(){H&&A.enabled&&(i(A,"scrolling"),b.animation.requestFrame(arguments.callee))})}}else H&&z()}}function v(a){A.enabled&&("y"!==A.axis&&a.isVertical||"x"===A.axis&&a.isVertical||(A.transformOffset=j(A),A.minScrollOffset=e(A),A.maxScrollOffset=f(A),G=2.5,J=!0,H=!0,I=!1,i(A,"scrollstart"),K=a["displacement"+A.axis.toUpperCase()]))}function w(b){if(A.enabled&&("y"===A.axis&&b.isVertical||"x"===A.axis&&!b.isVertical)){b.stopPropagation();var c=b["displacement"+A.axis.toUpperCase()];if(Math.abs(c-K)<5)return b.stopPropagation(),void 0;K=c;var d=A.transformOffset[A.axis]+c;d>A.minScrollOffset?(d=A.minScrollOffset+(d-A.minScrollOffset)/G,G*=1.003):d<A.maxScrollOffset&&(d=A.maxScrollOffset-(A.maxScrollOffset-d)/G,G*=1.003),G>4&&(G=4);var e=g(A,d);e&&(i(A,e>0?"y"===A.axis?"pulldown":"pullright":"y"===A.axis?"pullup":"pullleft",{boundaryOffset:Math.abs(e)}),A.options.noBounce&&(d=h(A,d))),a.style.webkitTransform="y"===A.axis?k(0,d.toFixed(2)):k(d.toFixed(2),0),i(A,"scrolling")}}function x(a){A.enabled&&("y"===A.axis&&a.isVertical||"x"===A.axis&&!a.isVertical)&&(a.stopPropagation(),a.isflick&&y(a))}function y(d){J=!0;var e,f,h,m,n,o,q,r,t,u,v,w,x,y,B,C,E;m=j(A)[A.axis];var F=g(A,m);if(!F){e=d["velocity"+A.axis.toUpperCase()];var G=2,K=.0015;l.inertia&&p[l.inertia]&&(G=p[l.inertia][0],K=p[l.inertia][1]),e>G&&(e=G),-G>e&&(e=-G),f=K*(e/Math.abs(e)),o=new b.motion({v:e,a:-f}),h=o.t,n=m+o.s;var L=g(A,n);if(L){c("惯性计算超出了边缘",L),q=e,r=f,L>0?(u=A.minScrollOffset,w=1):(u=A.maxScrollOffset,w=-1),v=new b.motion({v:w*q,a:-w*r,s:Math.abs(u-m)}),t=v.t;var M=v.generateCubicBezier();x=q-r*t,y=.03*(x/Math.abs(x)),E=new b.motion({v:x,a:-y}),B=E.t,C=u+E.s;{E.generateCubicBezier()}if(l.noBounce)if(c("没有回弹效果"),m!==u)if(l.useFrameAnimation){var N=u-m,O=b.cubicbezier(M[0][0],M[0][1],M[1][0],M[1][1]);D=new b.animation(t.toFixed(0),O,0,function(b,c){i(A,"scrolling",{afterFlick:!0});var d=m+N*c;a.style.webkitTransform="y"===A.axis?k(0,d.toFixed(2)):k(d.toFixed(2),0)}),D.onend(z),D.play()}else{a.style.webkitTransition="-webkit-transform "+(t/1e3).toFixed(2)+"s cubic-bezier("+M+") 0";var P=u.toFixed(0);a.style.webkitTransform="y"===A.axis?k(0,P):k(P,0),s(z,1e3*(t/1e3).toFixed(2))}else z();else if(m!==C)if(c("惯性滚动","s="+C.toFixed(0),"t="+((t+B)/1e3).toFixed(2)),l.useFrameAnimation){var N=C-m,O=b.cubicbezier.easeOut;D=new b.animation((t+B).toFixed(0),O,0,function(b,c){i(A,"scrolling",{afterFlick:!0});var d=m+N*c;a.style.webkitTransform="y"===A.axis?k(0,d.toFixed(2)):k(d.toFixed(2),0)}),D.onend(function(){if(A.enabled){var c=u-C,d=b.cubicbezier.ease;D=new b.animation(400,d,0,function(b,d){i(A,"scrolling",{afterFlick:!0});var e=C+c*d;a.style.webkitTransform="y"===A.axis?k(0,e.toFixed(2)):k(e.toFixed(2),0)}),D.onend(z),D.play()}}),D.play()}else{a.style.webkitTransition="-webkit-transform "+((t+B)/1e3).toFixed(2)+"s ease-out 0";var P=C.toFixed(0);a.style.webkitTransform="y"===A.axis?k(0,P):k(P,0),s(function(){if(A.enabled)if(c("惯性回弹","s="+u.toFixed(0),"t=400"),C!==u){a.style.webkitTransition="-webkit-transform 0.4s ease 0";var b=u.toFixed(0);a.style.webkitTransform="y"===A.axis?k(0,b):k(b,0),s(z,400)}else z()},1e3*((t+B)/1e3).toFixed(2))}else z()}else{c("惯性计算没有超出边缘");var Q=o.generateCubicBezier();if(l.useFrameAnimation){var N=n-m,O=b.cubicbezier(Q[0][0],Q[0][1],Q[1][0],Q[1][1]);D=new b.animation(h.toFixed(0),O,0,function(b,c){i(A,"scrolling",{afterFlick:!0});var d=(m+N*c).toFixed(2);a.style.webkitTransform="y"===A.axis?k(0,d):k(d,0)}),D.onend(z),D.play()}else{a.style.webkitTransition="-webkit-transform "+(h/1e3).toFixed(2)+"s cubic-bezier("+Q+") 0";var P=n.toFixed(0);a.style.webkitTransform="y"===A.axis?k(0,P):k(P,0),s(z,1e3*(h/1e3).toFixed(2))}}I=!0,l.useFrameAnimation||b.animation.requestFrame(function(){H&&I&&A.enabled&&(i(A,"scrolling",{afterFlick:!0}),b.animation.requestFrame(arguments.callee))})}}function z(){A.enabled&&(J=!1,setTimeout(function(){!J&&H&&(H=!1,I=!1,l.useFrameAnimation?(D&&D.stop(),D=null):a.style.webkitTransition="",i(A,"scrollend"))},50))}var A=this;if(l=l||{},l.noBounce=!!l.noBounce,l.padding=l.padding||{},l.isPrevent=null==l.isPrevent?!0:!!l.isPrevent,l.isFixScrollendClick=null==l.isFixScrollendClick?!0:!!l.isFixScrollendClick,l.padding?(l.yPadding1=-l.padding.top||0,l.yPadding2=-l.padding.bottom||0,l.xPadding1=-l.padding.left||0,l.xPadding2=-l.padding.right||0):(l.yPadding1=0,l.yPadding2=0,l.xPadding1=0,l.xPadding2=0),l.margin?(l.yMargin1=-l.margin.top||0,l.yMargin2=-l.margin.bottom||0,l.xMargin1=-l.margin.left||0,l.xMargin2=-l.margin.right||0):(l.yMargin1=0,l.yMargin2=0,l.xMargin1=0,l.xMargin2=0),l.direction=l.direction||"y",l.inertia=l.inertia||"normal",this.options=l,A.axis=l.direction,this.element=a,this.viewport=a.parentNode,this.plugins={},this.viewport.addEventListener("touchstart",t,!1),this.viewport.addEventListener("touchend",u,!1),this.viewport.addEventListener("touchcancel",u,!1),this.viewport.addEventListener("panstart",v,!1),this.viewport.addEventListener("pan",w,!1),this.viewport.addEventListener("panend",x,!1),this.element.scrollId=setTimeout(function(){n[A.element.scrollId+""]=A},1),l.isPrevent&&(this.viewport.addEventListener("touchstart",function(){r=!0},!1),A.viewport.addEventListener("touchend",function(){r=!1},!1)),l.isFixScrollendClick){var B,C;this.viewport.addEventListener("scrolling",function(){B=!0,C&&clearTimeout(C),C=setTimeout(function(){B=!1},400)},!1),this.viewport.addEventListener("click",m,!1),this.viewport.addEventListener("tap",q,!1)}if(l.useFrameAnimation){var D;Object.defineProperty(this,"animation",{get:function(){return D}})}else{var E,F=0;a.addEventListener("webkitTransitionEnd",function(a){if(E){var c=E;E=null,clearTimeout(F),b.animation.requestFrame(function(){c(a)})}},!1)}var G,H,I,J;Object.defineProperty(this,"isScrolling",{get:function(){return!!H}});var K,L={init:function(){return this.enable(),this.refresh(),this.scrollTo(0),this},enable:function(){return this.enabled=!0,this},disable:function(){var a=this.element;return this.enabled=!1,this.options.useFrameAnimation?this.animation&&this.animation.stop():b.animation.requestFrame(function(){a.style.webkitTransform=getComputedStyle(a).webkitTransform}),this},getScrollWidth:function(){return d(this.element).width},getScrollHeight:function(){return d(this.element).height},getScrollLeft:function(){return-j(this).x-this.options.xPadding1},getScrollTop:function(){return-j(this).y-this.options.yPadding1},getMaxScrollLeft:function(){return-A.maxScrollOffset-this.options.xPadding1},getMaxScrollTop:function(){return-A.maxScrollOffset-this.options.yPadding1},getBoundaryOffset:function(){return Math.abs(g(this,j(this)[this.axis])||0)},refresh:function(){var a=this.element,b="y"===this.axis,c=b?"height":"width";if(null!=this.options[c])a.style[c]=this.options[c]+"px";else if(a.childElementCount>0){var g,h,k=a.firstElementChild,l=a.lastElementChild;if(document.createRange&&(g=document.createRange(),g.selectNodeContents(a),h=d(g)),h)a.style[c]=h[c]+"px";else if(k&&l){for(;k&&0===d(k)[c]&&k.nextElementSibling;)k=k.nextElementSibling;for(;l&&l!==k&&0===d(l)[c]&&l.previousElementSibling;)l=l.previousElementSibling;a.style[c]=d(l)[b?"bottom":"right"]-d(k)[b?"top":"left"]+"px"}else a.style[c]="0"}else a.style[c]="auto",a.style[c]=d(a)[c]+"px";return this.transformOffset=j(this),this.minScrollOffset=e(this),this.maxScrollOffset=f(this),this.scrollTo(-this.transformOffset[this.axis]-this.options[this.axis+"Padding1"]),i(this,"contentrefresh"),this},offset:function(a){var b=d(this.element),c=d(a);if("y"===this.axis){var e={top:c.top-b.top-this.options.yPadding1,left:c.left-b.left,right:b.right-c.right,width:c.width,height:c.height};e.bottom=e.top+e.height}else{var e={top:c.top-b.top,bottom:b.bottom-c.bottom,left:c.left-b.left-this.options.xPadding1,width:c.width,height:c.height};e.right=e.left+e.width}return e},getRect:function(a){var b=d(this.viewport),c=d(a);if("y"===this.axis){var e={top:c.top-b.top,left:c.left-b.left,right:b.right-c.right,width:c.width,height:c.height};e.bottom=e.top+e.height}else{var e={top:c.top-b.top,bottom:b.bottom-c.bottom,left:c.left-b.left,width:c.width,height:c.height};e.right=e.left+e.width}return e},isInView:function(a){var b=d(this.viewport),c=this.getRect(a);return"y"===this.axis?b.top<c.bottom&&b.bottom>c.top:b.left<c.right&&b.right>c.left},scrollTo:function(a,c){var d=this,e=this.element;return a=-a-this.options[this.axis+"Padding1"],a=h(this,a),H=!0,c===!0?(e.style.webkitTransition="-webkit-transform 0.4s ease 0",s(z,400),b.animation.requestFrame(function(){H&&d.enabled&&(i(d,"scrolling"),b.animation.requestFrame(arguments.callee))})):(e.style.webkitTransition="",s(z,1)),e.style.webkitTransform="y"===this.axis?k(j(this).x,a):k(a,j(this).y),this},scrollToElement:function(a,b){var c=this.offset(a);return c=c["y"===this.axis?"top":"left"],this.scrollTo(c,b)},getViewWidth:function(){return d(this.viewport).width},getViewHeight:function(){return d(this.viewport).height},addPulldownHandler:function(a){var b=this;return this.element.addEventListener("pulldownend",function(c){b.disable(),a(c,function(){b.scrollTo(0,!0),b.enable()})},!1),this},addPullupHandler:function(a){var b=this;return this.element.addEventListener("pullupend",function(c){b.disable(),a(c,function(){b.scrollTo(b.getScrollHeight(),!0),b.enable()})},!1),this},addScrollstartHandler:function(a){return this.element.addEventListener("scrollstart",function(b){a(b)},!1),this},addScrollingHandler:function(a){return this.element.addEventListener("scrolling",function(b){a(b)},!1),this},addScrollendHandler:function(a){return this.element.addEventListener("scrollend",function(b){a(b)},!1),this},addEventListener:function(){this.element.addEventListener.apply(this.element,arguments)},removeEventListener:function(){this.element.removeEventListener.apply(this.element,arguments)},enablePlugin:function(a,b){var c=o[a];return c&&!this.plugins[a]&&(this.plugins[a]=!0,b=b||{},c.call(this,a,b)),this}};for(var M in L)this[M]=L[M];delete L}var m=a.document,n={},o={},p={normal:[2,.0015],slow:[1.5,.003],veryslow:[1.5,.005]},q="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,r=!1;m.addEventListener("touchmove",function(a){return r?(a.preventDefault(),!1):!0},!1),b.scroll=function(a,b){if(1===arguments.length&&!(arguments[0]instanceof HTMLElement))if(b=arguments[0],b.scrollElement)a=b.scrollElement;else{if(!b.scrollWrap)throw new Error("no scroll element");a=b.scrollWrap.firstElementChild}if(!a.parentNode)throw new Error("wrong dom tree");if(b&&b.direction&&["x","y"].indexOf(b.direction)<0)throw new Error("wrong direction");var c;return c=a.scrollId?n[a.scrollId]:new l(a,b)},b.scroll.plugin=function(a,b){return b?(a=a.split(","),a.forEach(function(a){o[a]=b}),void 0):o[a]}}(window,window.lib||(window.lib={}));
!function(a,b){var c={open:function(a,b){if(a){var c=a.firstChild;a.style.opacity=1,a.style.visibility="visible",setTimeout(function(){c.style.webkitTransform="translateY(0)",b&&b()},0)}},close:function(a,b){if(a){var c=a.firstChild;c.style.webkitTransform="translateY(100%)",setTimeout(function(){a.style.opacity=0,a.style.visibility="hidden",b&&b()},200)}}},d=0,e={container:"ctrl-selectmenu",innerBox:"ctrl-selectmenu-picker",header:"ctrl-selectmenu-header",confirm:"ctrl-selectmenu-btn-confirm",cancel:"ctrl-selectmenu-btn-cancel",col:"ctrl-selectmenu-col",option:"ctrl-selectmenu-option",wrapper:"ctrl-selectmenu-wrapper"},f=function(a,b){var f=this,g=Date.now()+"-"+ ++d,h=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(b=arguments[0],a=null),a||(a=document.createElement("div")),h.appendChild(a),a.setAttribute("data-ctrl-name","selectmenu"),a.setAttribute("data-ctrl-id",g),a.className=e.container,this.options=b;var i=b.title||"";Object.defineProperty(this,"title",{get:function(){return i},set:function(b){if(!b)throw new Error("Non expected value");i=b,a.querySelector(".tip").innerHTML=b}});var j=b.confirmText||"确定";Object.defineProperty(this,"confirmText",{get:function(){return j},set:function(b){if(!b)throw new Error("Non expected value");j=b,a.querySelector("."+e.confirm).innerHTML=b}});var k=b.cancelText||"取消";Object.defineProperty(this,"cancelText",{get:function(){return k},set:function(b){if(!b)throw new Error("Non expected value");k=b,a.querySelector("."+e.cancel).innerHTML=b}});var l;Object.defineProperty(this,"viewModel",{get:function(){return l},set:function(a){if(!a)throw new Error("Non expected value");l=a,f.syncViewModel()}}),this.syncViewModel=function(){var a=this;this.render(),setTimeout(function(){a.addEvents()},100)},this._events={},this.addEventListener=function(a,b){this._events[a]||(this._events[a]=[]),this._events[a].push(b)},this.removeEventListener=function(a,b){if(this._events[a]){var c=this._events[a].indexOf(b);c>-1&&this._events[a].splice(c,1)}},this.execEvent=function(a){if(this._events[a]){var b=0,c=this._events[a].length;if(c)for(;c>b;b++)this._events[a][b].apply(this,[].slice.call(arguments,1))}},this.remove=function(){a.parentNode&&a.parentNode.removeChild(a)},this.element=a,this.root=h;var m={},n={},o={};this.render=function(){var a=l,b=['<div class="'+e.header+'">','<a href="javascript:void(0);" class="'+e.cancel+'">'+k+"</a>",'<span class="tip">'+i+"</span>",'<a href="javascript:void(0);" class="'+e.confirm+'">'+j+"</a>","</div>"].join(""),c='<div class="'+e.wrapper+'"></div>';this.element.innerHTML='<div class="'+e.innerBox+'">'+b+c+"</div>";for(var d in a)this.renderColumn(d,a[d]);this.refresh()},this.selectedIndex={},this.renderColumn=function(a,b){var c=this;if(!Array.isArray(b))throw"select项数据列表必须是数组";var d=[];c.selectedIndex[a]=0,b.forEach(function(b,f){b.selected&&(c.selectedIndex[a]=f),d.push('<div class="'+e.option+'" data-value="'+b.value+'">'+b.key+"</div>")});var f=d.join(""),g=c.element.querySelector("."+e.wrapper),h=g.querySelector("[data-type="+a+"]");if(h)h.firstChild.innerHTML=f;else{var i='<div class="scroller">'+f+"</div>",j=document.createElement("div");j.className=e.col,j.setAttribute("data-type",a),j.innerHTML=i,g.appendChild(j)}},this.setScroll=function(){var a=this,b=[].slice.call(this.element.querySelectorAll("."+e.col));b.forEach(function(b){var c=b.querySelector(".scroller"),d=lib.scroll({scrollElement:c,inertia:"slow"}).init();c.addEventListener("click",function(a){var b=a.target;0===b.className.indexOf(e.option)&&d.scrollToElement(b,!0)},!1),d.addScrollendHandler(function(){a.scrollEndHandler(d,b)});var f=b.getAttribute("data-type");a.scrollToNthChild(d,a.selectedIndex[f]),d.handler=!0,m[f]=d}),this.selects=b,this.scrolls=m},this.currentColName="",this.scrollEndHandler=function(a,b){if(!a.handler)return void(a.handler=!0);var c=a.getScrollTop(),d=Math.round(c/this.height);a.handler=!1,this.scrollToNthChild(a,d,!1);var e=b.getAttribute("data-type");this.currentColName=e,this.setSelectedStatus(e,Math.abs(d)),this.execEvent("select",e)},this.setSelectedStatus=function(a,b){var c=this.scrolls[a].element,d=c.querySelectorAll("."+e.option);n[a]=c.querySelector(".current"),n[a]&&(n[a].className=e.option),n[a]=d[b],n[a].className=e.option+" current",o["val-"+a]=n[a].getAttribute("data-value"),o["key-"+a]=n[a].innerHTML,this.selectedValue=o,this.selectedIndex[a]=b},this.resetScrollPos=function(){var a=this;this.selects&&this.selects.forEach(function(b){var c=b.getAttribute("data-type"),d=a.scrolls[c];a.scrollToNthChild(d,a.selectedIndex[c])})},this.scrollToNthChild=function(a,b,c){var d=a.element,e=d.querySelector(":nth-child("+(1+b)+")"),f="undefined"!=typeof c?c:!0;a.scrollToElement(e,f)};var p=!1,q=!1;this.addEvents=function(){function a(){c.refresh()}var b=this.options,c=this;if(!q){var d;if(window.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(a,310)},!1),b.trigger){var f=b.trigger.length>1?[].slice.call(b.trigger):[b.trigger];f.forEach(function(a){a.addEventListener("click",function(){c.trigger=a,c.show()})})}q=!0}this.element.querySelector("."+e.confirm).addEventListener("click",function(){if(b.verifyMe){if(!b.verifyMe(c.selectedValue))return;c.hide()}else c.hide();c.execEvent("confirm",c.trigger)},!1),this.element.querySelector("."+e.cancel).addEventListener("click",function(){c.execEvent("cancel",c.trigger),c.hide()},!1)},this.show=function(){var a=this;this.execEvent("beforeShow",a.trigger),c.open(this.element),setTimeout(function(){p||(a.setScroll(),p=!0)},100),this.execEvent("show")},this.hide=function(){c.close(this.element),this.execEvent("hide")},this.refresh=function(){this.element.style.height=window.innerHeight+"px";var a=this,b=setInterval(function(){var c="."+e.option,d=document.querySelector(c);d&&d.clientHeight&&(a.height=d.clientHeight,a.resetScrollPos(),clearInterval(b),b=null)},100)},this.linkage=function(a,b){this.viewModel[a]=b,this.renderColumn(a,b);var c=this.scrolls[a],d=this.selectedIndex[a];c.refresh(),this.scrollToNthChild(c,d)},this.scrollToIndex=function(a,b){var c=this.scrolls[a];this.scrollToNthChild(c,b),this.setSelectedStatus(a,b)}};b.selectmenu=f}(window,window.ctrl||(window.ctrl={}));
/**
 * Created by 景烁 on 2014/11/20.
 *
 * todo 时间选择部分，先写死 向前
 *
 *
 */
;(function ($) {
    function log (obj) {
        var str = typeof obj == 'object' ? JSON.stringify(obj) : obj;
        alert(str);
    }

     window.Helper = {
        compareWithNow: function (time) {
            // 获取的是本地时间戳
            var now = new Date();
            var from = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            var toData = time.split('-');
            var to = new Date(Number(toData[0]), Number(toData[1]) -1, Number(toData[2]));

            // 毫秒级别的差值
            var diffMs = to.getTime() - from.getTime();
            // 天级别的差值
            var diffDays = Math.ceil(diffMs / (24 * 60 * 60 * 1000));

            return diffDays;
        }
    };

    var Dialog = {
        init: function (opts) {
            this.box = $(opts.boxClass);
            this.boxChild = this.box.children().first();
            this.trigger = $(opts.triggerClass);
            this.hideTrigger = $(opts.hideClass);
            this.showHandler = opts.onShow;
            this.hideHandler = opts.onHide;

            this.addEvent();
        },

        addEvent: function () {
            var that = this;
            this.trigger.on('click', function () {
                that.show();
            });

            this.box.on('click', function (e) {
                that.hide();
            });

            this.boxChild.on('click', function (e) {
                e.stopPropagation();
                return false;
            })

            this.hideTrigger.on('click', function () {
                that.hide();
            })
        },

        show: function () {
            this.box.show();
            this.showHandler && this.showHandler();
        },

        hide: function () {
            this.box.hide();
            this.hideHandler && this.hideHandler();
        }
    };

    // 数据存储
    var DB =  {
        isLocalStorageOk: false,
        data: {},
        init: function () {
            this.checkLocalStorage();

            return this;
        },
        checkLocalStorage: function () {
            if ('localStorage' in window && window['localStorage'] !== null) {
                // ios7 暂时存在问题
                try{
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');

                    this.isLocalStorageOk = true;
                } catch (e) {
                    console.error(e);
                }
            }
        },

        set: function (key, value) {
            this.data[key] = value;

            if (this.isLocalStorageOk) {
                window.localStorage.setItem('recommend_' + key, value);
            }
        },

        get: function (key) {
            var d = this.data[key];

            if (typeof d == 'undefined' && this.isLocalStorageOk) {
                d = window.localStorage.getItem('recommend_' + key);
            }
            return d;
        }
    };

    // 表单验证
    var Form = {
        data: {
            name: '',
            gender: '',
            birthday: ''
        },
        validate: function () {

            if (!this.data.birthday) {
                alert('请输入您宝宝的生日或预产期哦');
                return false;
            }

            var diffDays = Helper.compareWithNow(this.data.birthday);
            var isBorn = diffDays < 0;
            if (isBorn) {
                if (!this.data.gender) {
                    alert('还不知道您宝宝是男宝还是女宝呢');
                    return false;
                }
            }

            return true;
        },

        submit: function (yesFn, noFn) {
            if (this.validate()) {
                yesFn.call(this);
            } else {
                noFn.call(this);
            }
        }
    };

    var dateSelector = {
        date: {
            init: function () {
                var now = new Date();

                this.today = {
                    y: now.getFullYear(),
                    m: now.getMonth() + 1,
                    d: now.getDate()
                }

                return this;
            },

            // 给定年月获取当月天数
            getMDays: function (y, m) {
                var mday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                //判断是否是闰月
                if ((y % 40 == 0 && y % 100 != 0) || y % 400 == 0){
                    mday[1] = 29;
                }
                return mday[m - 1];
            }
        },

        init: function (opts) {
            var date = this.date.init();
            var today = date.today;

            var minY = today.y - 14;
            var maxY = today.y + 1;

            var viewModelItemFactory = this.viewModelItemFactory;
            this.viewModel = {
                year: viewModelItemFactory(minY, maxY, today.y),
                month: viewModelItemFactory(1, 12, today.m),
                day: this.getDayViewData(today.y, today.m, today.d)
            };
            this.date = date;
            this.opts = opts;

            this.setSelectMenu();
        },

        viewModelItemFactory: function (min, max, current) {
            var item = [];
            for (var i = min; i <= max; i++) {
                var formated = i < 10 ? '0' + i : i;

                item.push({
                    key: formated,
                    value: formated,
                    selected: i == current
                })
            }

            return item;
        },

        getDayViewData: function (y, m, current) {
            return this.viewModelItemFactory(1, this.date.getMDays(y, m), current)
        },

        setSelectMenu: function () {
            var that = this;
            var SelectMenu = ctrl.selectmenu;
            var trigger = document.querySelector('.j-select');
            var instance = new SelectMenu({
                confirmText: '确定',
                title: '',
                cancelText: '取消',
                trigger: trigger
            });

            instance.viewModel = this.viewModel;
            instance.addEventListener('confirm', function (e) {
                console.log(this.selectedValue);
                that.opts.onConfirm && that.opts.onConfirm.call(this);
            });

            instance.addEventListener('select', function (colName) {
                var year = this.selectedValue['val-year'];
                var month = this.selectedValue['val-month'];
                var day = this.selectedValue['val-day'];

                if (colName !== 'day' && year && month && day) {
                    this.linkage('day', that.getDayViewData(year, month, 1));
                }
            });

            document.body.appendChild(instance.root);
        }
    };

    var main = {
        init: function () {
            this.db = DB.init();

            this.render();
            this.initDialog();

            // set img lazyLoad
            lib.lazyload.init();

            // gotop
            new lib.goTop();

            // 日期选择器
            var that = this;
            dateSelector.init({
                onConfirm: function () {
                    var selectedValue = this.selectedValue;
                    var date = [selectedValue['val-year'], selectedValue['val-month'], selectedValue['val-day']].join('-');
                    that.renderBithday(date);
                }
            });

            this.addEvent();
        },

        initDialog: function () {
            var db = this.db.get('data');
            var storedData = db && JSON.parse(db) || {
                gender: '',
                name: '',
                birthday: ''
            };

            var tpl = $('#tpl-dialog').html();
            $('#dialog').html(_.template(tpl)(storedData));

            Dialog.init({
                boxClass: '#dialog',
                triggerClass: '.j-trigger',
                hideClass: '.j-cancel'
            });

            this.renderBithday(storedData.birthday);
        },

        render: function () {
            this.renderTopInfo();

            var json = './data/' + (this.data || 'common.json');
            $.getJSON(json, function(data){
                console.log(data);

                var $target = $('#items');
                var tpl = $('#tpl-item').html();
                $target.html(_.template(tpl)({
                    data: data.category
                }));

                lib.lazyload.trigger();
            })
        },

        renderTopInfo: function () {
            var db = this.db.get('data');
            var storedData = db && JSON.parse(db);

            // 编辑
            if (storedData) {
                Form.data = storedData;

                // edit
                var age = this.getAgeText(storedData);
                var name = storedData.name ? storedData.name + '小朋友' : '宝宝';

                $('.main-hd').addClass('edit');
//                $('#input-info .age').html(age);
//                $('#input-info .name').html(name);

                var html = [
                    //'<div class="edit-tip">',
                        '<span class="name">' + name + '</span> <br> <span class="age">' + age + '</span>',
                    //'</div>'
                ].join('');

                $('.j-tip').html(html);

            // 增加
            } else {
                $('.main-hd').removeClass('edit');
                // add
                $('.j-tip').html('<span>添加宝宝档案，<br>打造您和宝宝的专属优品！</span>');

                //$('.main-hd').addClass('loaded').removeClass('edit').show();
            }
        },

        getAgeText:function (data) {
            var birthday = data.birthday;
            var gender = data.gender;

            if (!birthday) {
                return;
            }
            var diffDays = Helper.compareWithNow(birthday);

            var isBorn = diffDays < 0;
            var ageText = '';

            if (isBorn) {
                diffDays = Math.abs(diffDays);
                var years = Math.floor(diffDays/365);
                var months = Math.floor((diffDays - years * 365)/30);
                var days = diffDays - years*365 - months*30;

                if (years) {
                    ageText = '已经' + years + '岁' + (months ? months + '个月' : '') + '啦';
                } else {
                    ageText = '已经' + (months ? months + '个月' : '') + (days ? days + '天' : '') + '啦';
                }

                // 定义数据源
                var totalMonths = Math.min(years * 12 + months, 12);
                this.getDataSrc(totalMonths, gender, true);
            } else {
                if (diffDays) {
                    var weeks = Math.floor(diffDays/7);
                    var days = diffDays - weeks*7;

                    ageText = '离预产期还有' + (weeks ? weeks + '周' : '') + (days ? days + '天' : '');
                } else {
                    ageText = '今天就要出生啦';
                }

                // 定义数据源
                var totalMonths = Math.floor(diffDays/30);
                this.getDataSrc(totalMonths, gender, false);
            }

            return ageText;
        },

        getDataSrc: function (month, gender, isBorn) {
            var data = [];
            if (isBorn) {
                if (month <= 6) {
                    data.push('0_6');
                } else if(month > 6 && month <12) {
                    data.push('6_12');
                } else if (month >= 12) {
                    data.push('12');
                }
                data.push(gender);
            } else {
                month = Math.max(10 - month, 0);
                if (month <= 3) {
                    data.push('0_3');
                } else if(month > 3 && month <=7) {
                    data.push('3_7');
                } else if (month > 7) {
                    data.push('7_10');
                }
            }

            this.data = data.join('_') + '.json';
        },

        addEvent: function () {
            var that = this;

            $('.j-radiobox').on('click', function () {
                $('.radio-icon').removeClass('active');
                $(this).find('.radio-icon').addClass('active');
                var gender = $(this).attr('data-gender');

                Form.data.gender = gender;
            })

            $('.j-confirm').on('click', function () {
                Form.data.name = $('#nickname').val();
                Form.data.birthday = $('#birthday').val();

                if (Form.validate()) {
                    Dialog.hide();
                    // 写入数据
                    that.db.set('data', JSON.stringify(Form.data));

                    that.render();
                }
            })
        },

        renderBithday: function (date) {
            if (date) {
                $('#birthday').val(date);
                $('.j-select').html(date).removeClass('placeholder');
            } else {
                $('#birthday').val('');
                $('.j-select').html('点击输入').addClass('placeholder');
            }
        }
    };

    // run
    $(function () {
        main.init();
    })

})(Zepto)
