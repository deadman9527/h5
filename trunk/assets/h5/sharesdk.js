!function(a){var b={init:function(){var b=window.navigator.userAgent.toLowerCase();if(!b.match(/MobileVecn/i)){var c=location.href;c=c.replace(/test.h5/g,"h5");var d=!0,e=!0;lib.callapp.gotoPage(c,{point:e,params:d}),a("#app-download").on("click",function(){var a=location.href;a=a.replace(/test.h5/g,"h5");var b=!0,c=!0;lib.callapp.gotoPage(a,{point:c,params:b})})}}};a(function(){b.init()})}(Zepto);