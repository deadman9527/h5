!function(a){var o={init:function(){var o=window.navigator.userAgent.toLowerCase();if(!o.match(/MobileVecn/i)){var t=location.href;t=t.replace(/test.h5/g,"h5");var i=!0,n=!0;lib.callapp.gotoPage(t,{point:n,params:i}),a("#app-download").on("click",function(){var a=location.href;a=a.replace(/test.h5/g,"h5");var o=!0,t=!0;lib.callapp.gotoPage(a,{point:t,params:o})})}}};a(function(){o.init()})}(Zepto);