!function(a){var b=(document.documentElement,{init:function(){if(!lib.login.isLogin())return void lib.login.goLogin();var b=new lib.httpurl(location.href),c=b.params,d=c.title?decodeURIComponent(c.title):"设置";document.title=d,this.topbar=new ctrl.topBar({isIndex:!1,title:d}),a("#loginout").click(function(){lib.api.get({needLogin:!0,api:{c:"user",a:"logout"},data:{},success:function(a){console.log(a)},error:function(a){console.log(a)},complete:function(){console.log(data)}}),lib.login.logout("myve.html")})}});a(function(){b.init()})}(Zepto,window.Global||(window.Global={}));