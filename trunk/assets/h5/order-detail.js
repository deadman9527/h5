!function(a){Global.formatImgSrc=function(a){if(!a)return"http://h5.ve.cn/assets/img/cart_img_black_640x253.png";var b=a.match(/^http:\/\/img\.ve\.cnttp(.+)_3\.jpg/);return b?"http"+b[1]+".jpg":a},Global.timeFormat=function(a){var b=new Date(1e3*a),c=b.getFullYear(b),d=b.getMonth(b)+1,e=b.getDate(b),f=b.getHours(b),g=b.getMinutes(b),h=b.getSeconds(b);return c+"-"+d+"-"+e+" "+f+":"+g+":"+h};var b={init:function(){var a=new lib.httpurl(location.href),b=a.params,c=b.title?decodeURIComponent(b.title):"订单详情";document.title=c,new ctrl.topBar({isIndex:!1,title:c}),this.orderSn=b.orderSn||0,this.fromUseless=b.fromUseless||0,lib.lazyload.init(),this.addEvents(),this.render(),new lib.goTop},addEvents:function(){a(".radio").on("click",function(){if(!a(this).hasClass("radio-active")){var b=a(this).attr("name");a(".radio[name="+b+"]").removeClass("radio-active"),a(this).addClass("radio-active")}})},addEventsAction:function(){var b=this;a(".cancel").on("click",function(){var a=lib.notification.confirm("您确定要取消这个订单吗？","",function(a,c){c&&lib.api.get({api:{c:"order",a:"cancelOrder"},needLogin:!0,data:{order_sn:b.orderSn},success:function(a){console.log(a);var b=lib.notification.alert(a.desc,function(){this.hide(),history.go(-1)});b.show()},error:function(a){var b=lib.notification.alert(a.desc,function(){this.hide()});b.show()},complete:function(){b.isAjax=!1}}),this.hide()});a.show()}),a(".delete").on("click",function(){var a=lib.notification.confirm("您确定要删除这个订单吗？","",function(a,c){c&&lib.api.get({api:{c:"order",a:"delorder"},needLogin:!0,data:{order_sn:b.orderSn},success:function(a){console.log(a);var b=lib.notification.alert(a.desc,function(){this.hide(),window.location.href="order-list.html"});b.show()},error:function(a){var b=lib.notification.alert(a.desc,function(){this.hide()});b.show()},complete:function(){b.isAjax=!1}}),this.hide()});a.show()}),a(".pay").on("click",function(){if(!b.isAjax){var a=window.navigator.userAgent.toLowerCase(),c=20,d=null;a.match(/MicroMessenger/i)?(c=25,d="http://pay.api.ve.cn"):c=20,lib.api.get({api:{c:"pay",a:"payOrder"},needLogin:!0,apiUrl:d,data:{pay_type:c,in_app:0,order_sn:b.orderSn},success:function(a){console.log(a),window.location.href=a.html_url},error:function(a){console.log(a);var b=lib.notification.alert(a.desc,function(){this.hide()});b.show()},complete:function(){b.isAjax=!1}})}}),a(".logistic").on("click",function(){window.location.href="logistics.html?order_sn="+b.orderSn})},render:function(){if(!lib.login.isLogin())return void lib.login.goLogin();var a=this;a.isAjax||(a.isAjax=!0,lib.api.get({api:{c:"order",a:"odetails"},needLogin:!0,data:{order_sn:a.orderSn},success:function(b){console.log(b),b.order?(a.renderAddress(b.order),a.renderItems(b.order),a.renderSum(b.order),a.renderOrder(b.order),a.renderAction(b.order),a.addEventsAction(),a.discount()):a.renderError("empty")},error:function(a){var b=lib.notification.alert(a.desc,function(){this.hide()},{useTap:!0});b.show()},complete:function(){a.isAjax=!1}}))},discount:function(){a(".order-discount")[0]&&a(".order-discount span").each(function(b,c){var d=parseInt(a(c).attr("data"));setInterval(function(){if(d--,0>=d)window.location.reload();else{var b=Math.floor(d/60),e=d%60;a(c).text((b>9?b:"0"+b)+"分"+(e>9?e:"0"+e)+"秒")}},1e3)})},checkNeedScroll:function(){return!this.is_have},renderAddress:function(b){var c=a("#address"),d=a("#tpl-address").html();c.prepend(_.template(d)({order:b}))},renderItems:function(b){var c=a(".goods-container"),d=a("#tpl-goods").html();c.append(_.template(d)({order:b})),lib.lazyload.trigger()},renderSum:function(b){var c=a(".goods-sum"),d=a("#tpl-sum").html();c.append(_.template(d)({order:b}))},renderOrder:function(b){var c=a(".information-content"),d=a("#tpl-order-info").html();c.prepend(_.template(d)({order:b,fromUseless:this.fromUseless}))},renderAction:function(b){var c=a(".main"),d=a("#tpl-action").html();c.append(_.template(d)({order:b}))},renderError:function(a){switch(a){case"param":this.showTip("缺少必要参数");break;case"network":this.showTip("服务器开小差啦");break;case"empty":this.showTip("当前条件，列表为空")}},showTip:function(b){var c=a(".info-tip");c.html(b).show()}};a(function(){b.init()})}(Zepto,window.Global||(window.Global={}));