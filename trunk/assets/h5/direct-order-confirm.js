!function(a,b){function c(a,b){if(h[a])return void b(h[a]);var c=[{id:"",name:"我不清楚",pid:a}];lib.api.get({api:{c:"user",a:"get_area"},needLogin:!1,data:{area_id:a},success:function(c){c.data&&b(c.data),console.log(c),h[a]=c.data},error:function(d){console.error(d),b(c),h[a]=c}})}function d(a){var b={},d={},e=a.id||1,f=a.deep||4,h=a.onReady,i={4:"province",3:"city",2:"area",1:"street"};c(e,function(a){var e=i[f],j=null;d[e]=[],a.forEach(function(a,b){!g.content.address_detail[e]||-1==a.name.indexOf(g.content.address_detail[e])&&-1==g.content.address_detail[e].indexOf(a.name)||(j=b);var c={key:a.name,value:a.id,selected:b===(j||0)};d[e].push(c)}),b[e]=d[e][j||0],f--,1>f?h&&h(d):c(b[e].value,arguments.callee)})}function e(a,b){b=b||{};var c=ctrl.selectmenu;f=new c({confirmText:b.confirmText||"确定",title:b.title||"",cancelText:b.opts||"取消",trigger:b.trigger,verifyMe:function(){return!i}}),f.viewModel=a,f.addEventListener("confirm",function(){console.log(i),i||b.onConfirm(this.selectedValue)}),f.addEventListener("select",function(a){var b=this.selectedValue["val-"+a],c=this;console.log(i),i=!0,"province"==a?d({id:b,deep:3,onReady:function(a){c.linkage("city",a.city),c.linkage("area",a.area),c.linkage("street",a.street)}}):"city"==a?d({id:b,deep:2,onReady:function(a){c.linkage("area",a.area),c.linkage("street",a.street)}}):"area"==a?d({id:b,deep:1,onReady:function(a){c.linkage("street",a.street)}}):"street"==a&&(i=!1)}),document.body.appendChild(f.root)}var f,g,h={},i=!1;b.selectAddress={init:function(b){a.ajax({type:"GET",url:"http://api.map.baidu.com/location/ip?ak=7LKIOX88UcaHWrMDzN7coBub&coor=bd09ll&qt=loc&callback=?",data:{name:"Zepto",type:"JSONP"},success:function(a){g=a,d({onReady:function(a){e(a,b)}})},error:function(){console.log("Ajax error!"),d({onReady:function(a){e(a,b)}},{content:{address_detail:{province:"浙江省",city:"杭州市"}}})}})}}}(Zepto,window.app||(window.app={})),function(a){Global.formatImgSrc=function(a){if(!a)return"http://h5.ve.cn/assets/img/cart_img_black_640x253.png";var b=a.match(/^http:\/\/img\.ve\.cnttp(.+)_3\.jpg/);return b?"http"+b[1]+".jpg":a};var b={init:function(){var b=new lib.httpurl(location.href),c=b.params,d=c.title?decodeURIComponent(c.title):"确认订单";document.title=d,new ctrl.topBar({isIndex:!1,title:d}),this.proType=parseInt(c.proType)||0,this.cartId=parseInt(c.cartId)||0,this.code=c.code||0,this.id=c.id||0,this.value=c.value||0,this.duringPay=!1,this.proType&&a(".note-container a").attr("href","login.html?redirectUrl=order-confirm.html%3FproType%3D1"),lib.lazyload.init(),this.addEvents();var e=window.navigator.userAgent.toLowerCase();e.match(/MicroMessenger/i)?a(".weixinpay").css("display","block"):a(".weixinpay").hide(),new lib.goTop,this.render(),this.brandId=c.brandId||0,this.categoryId=c.categoryId||0},addEvents:function(){var b=this;a("#get-code").on("click",function(){b.getCode()}),a(".payinfo").on("click",function(){if(b.verify()){var c=20,d=null;"alipay"==a(this).attr("paytype")?c=20:"wxpay"==a(this).attr("paytype")&&(c=25,d="http://pay.api.ve.cn"),b.duringPay||(b.duringPay=!0,b.paragram={source:"h5",in_app:0,order_type:b.proType-0+1},b.paragram.pay_type=c,b.name&&(b.paragram.name=b.name),b.phone&&(b.paragram.phone=b.phone),b.code&&(b.paragram.verify_code=b.code),b.province&&(b.paragram.provice=b.province),b.city&&(b.paragram.city=b.city),b.area&&(b.paragram.area=b.area),b.street&&(b.paragram.town=b.street),b.addressDet&&(b.paragram.address=b.addressDet),b.cartId&&(b.paragram.ids=b.cartId),lib.api.get({api:{c:"FreeOrder",a:"add_User_Order"},needLogin:lib.login.isLogin(),apiUrl:d,data:b.paragram,success:function(a){console.log(a),lib.login.login(a,a.html_url)},error:function(a){var b=lib.notification.alert(a.desc,function(){this.hide()});b.show()},complete:function(){b.duringPay=!1}}))}})},getCode:function(){var a=this;1!=a.isAjaxGetcode&&this.verifyMobile("tel")&&(a.isAjaxGetcode=!0,lib.api.get({api:{c:"sms",a:"sendMsg"},data:{mobile:this.phone,status:"free_user"},success:function(b){console.log(b),lib.notification.simple("发送成功","",1e3),a.timerClock("#get-code")},error:function(a){console.log(a),alert(a&&a.desc?a.desc:"请求验证码失败")},complete:function(){setTimeout(function(){a.isAjaxGetcode=!1},1e3)}}))},timerClock:function(b){var c=this,d=60;c.verifyFlag=1,a(b).addClass("getcode-icon").html("剩余 "+d+" 秒"),a(b).off();var e=setInterval(function(){1>=d?(clearInterval(e),c.verifyFlag=0,a(b).removeClass("getcode-icon").html("获取验证码"),a(b).on("click",function(){c.getCode()})):(d--,a(b).html("剩余 "+d+" 秒"))},1e3)},render:function(){var b=this;app.selectAddress.init({confirmText:"",title:"",cancelText:"",trigger:document.getElementById("provice"),onConfirm:function(c){b.pro=c,console.log(c),a("#provice").css("color","#333"),b.province=c["val-province"],b.city=c["val-city"],b.area=c["val-area"],b.street=c["val-street"],a("#provice").html((c["key-province"]||"")+(c["key-city"]||"")+(c["key-area"]||"")+c["key-street"]||"")}}),b.isAjax||(b.isAjax=!0,lib.api.get({api:{c:"shoping",a:"get_User_Cart"},needLogin:lib.login.isLogin(),data:{accessToken:"",cart_ids:b.cartId||""},success:function(c){if(console.log(c),b.proType&&!c.is_sea_order){var d=lib.notification.alert(c.sea_limit_message,function(){this.hide(),window.location.href="cart.html?type=2"},{useTap:!0});d.show()}var e=b.proType?c.sea_products:c.products;e&&e[0]?(a(".container").show(),a(".loading").hide(),b.renderItems(c),b.renderSum(c)):window.location.href="order-list.html#status=1"},error:function(a){var b=lib.notification.alert(a.desc,function(){this.hide(),window.location.href="order-list.html"},{useTap:!0});b.show()},complete:function(){b.isAjax=!1}}))},verifyMobile:function(){return this.phone=a("#phone").val(),this.phone?/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)?!0:(lib.notification.simple("手机格式错误","",1e3),!1):(lib.notification.simple("请先填写手机号码","",1e3),!1)},verify:function(){return this.name=a("#username").val(),this.phone=a("#phone").val(),this.code=a("#code").val(),this.addressDet=a("#addressDet").val(),this.name=this.name.trim(),this.addressDet=this.addressDet.trim(),0==this.phone.length?(lib.notification.simple("手机号码不能为空","",1e3),!1):0==this.code.length?(lib.notification.simple("验证码不能为空","",1e3),!1):0==this.name.length?(lib.notification.simple("收货人不能为空","",1e3),!1):this.name.length>12?(lib.notification.simple("用户名长度不能超过12个字符","",1e3),!1):/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)?null==this.pro||""==this.pro?(lib.notification.simple("省市区不能为空","",1e3),!1):0==this.addressDet.length?(lib.notification.simple("详细地址不能为空","",1e3),!1):!0:(lib.notification.simple("手机格式错误","",1e3),!1)},checkNeedScroll:function(){return!this.is_have},renderAddress:function(b){var c=a("#address"),d=this,e=a("#tpl-address").html();c.prepend(_.template(e)({addressData:b,proType:d.proType,isLogin:lib.login.isLogin()}))},renderItems:function(b){var c=this.proType?b.sea_products:b.products;for(var d in c){var e=0;for(var f in c[d].orders)e+=c[d].orders[f].price*c[d].orders[f].num;c[d].sum=e}var g=this.proType?b.sea_total_price:b.total_price,h=a("#orders"),i=a("#tpl-goods").html();h.append(_.template(i)({products:c,proType:this.proType,total_price:g})),lib.lazyload.trigger()},renderSum:function(b){var c=a(".pay-container"),d=a("#tpl-pay").html();c.prepend(_.template(d)({data:b,value:this.value,proType:this.proType}))},renderError:function(a){switch(a){case"param":this.showTip("缺少必要参数");break;case"network":this.showTip("服务器开小差啦");break;case"empty":this.showTip("当前条件，列表为空")}},showTip:function(b){var c=a(".info-tip");c.html(b).show()}};a(function(){b.init()})}(Zepto,window.Global||(window.Global={}));