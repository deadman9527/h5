!function(a){function b(a){var b,c,d,e="",f=0;for(b=c=d=0;f<a.length;)b=a.charCodeAt(f),128>b?(e+=String.fromCharCode(b),f++):b>191&&224>b?(d=a.charCodeAt(f+1),e+=String.fromCharCode((31&b)<<6|63&d),f+=2):(d=a.charCodeAt(f+1),c=a.charCodeAt(f+2),e+=String.fromCharCode((15&b)<<12|(63&d)<<6|63&c),f+=3);return e}function c(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(192|d>>6),b+=String.fromCharCode(128|63&d)):(b+=String.fromCharCode(224|d>>12),b+=String.fromCharCode(128|63&d>>6),b+=String.fromCharCode(128|63&d))}return b}var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a.encode||(a.encode={}),a.encode.base64_utf8={encode:function(a){var b,e,f,g,h,i,j,k="",l=0;for(a=c(a);l<a.length;)b=a.charCodeAt(l++),e=a.charCodeAt(l++),f=a.charCodeAt(l++),g=b>>2,h=(3&b)<<4|e>>4,i=(15&e)<<2|f>>6,j=63&f,isNaN(e)?i=j=64:isNaN(f)&&(j=64),k=k+d.charAt(g)+d.charAt(h)+d.charAt(i)+d.charAt(j);return k},decode:function(a){var c,e,f,g,h,i,j,k="",l=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<a.length;)g=d.indexOf(a.charAt(l++)),h=d.indexOf(a.charAt(l++)),i=d.indexOf(a.charAt(l++)),j=d.indexOf(a.charAt(l++)),c=g<<2|h>>4,e=(15&h)<<4|i>>2,f=(3&i)<<6|j,k+=String.fromCharCode(c),64!==i&&(k+=String.fromCharCode(e)),64!==j&&(k+=String.fromCharCode(f));return k=b(k)}}}(window.lib||(window.lib={}));