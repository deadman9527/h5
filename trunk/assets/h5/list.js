!function(a){var b=window.navigator.userAgent.toLowerCase();SEMURL=b.match(/MobileVecn/i)?!1:!0,Global.formatImgSrc=function(a){if(!a)return"http://h5.ve.cn/assets/img/cart_img_black_640x253.png";var b=a.match(/^http:\/\/img\.ve\.cnttp(.+)_3\.jpg/);return b?"http"+b[1]+".jpg":a},Global.formatTitleLink=function(a,b,c){var d="http://"+location.host,e=b?"&brandId="+b:"",f="detail.html?productId="+a+e,g=c?c:"",h=d+"/"+g+"goods-"+a+".html?productId="+a+e,i=SEMURL?h:f;return i};var c={init:function(){var b=new lib.httpurl(location.href),c=b.params,d=c.brandId?decodeURIComponent(c.brandId):null,e=c.title?decodeURIComponent(c.title):null;if(this.title=e,e?(document.title=e,this.topbar=new ctrl.topBar({isIndex:!1,title:e})):document.title="商品列表",new lib.goTop,this.bottombar=new ctrl.bottomBar({showBottom:!0,showApp:!1,showCircle:!1}),a("#callApp").on("click",function(){var a=location.href;a=a.replace(/test.h5/g,"h5");var b=!0,c=!0;lib.callapp.gotoPage(a,{point:c,params:b})}),this.categoryId=c.categoryId||0,this.brandId=d,!this.brandId&&!this.categoryId)return void this.renderError("param");this.categoryId?a(".main-hd").remove():a(".main-hd").show(),this.is_sort=c.is_sort||7,this.is_have=c.is_have||0,this.count=20,this.page=1,this.time=!0,lib.lazyload.init();var f=this;this.infiniteScroll=lib.infiniteScroll.init({bufferPx:150,time:200,onNear:function(){f.render()},end:function(){return f.isEnd}}),this.addEvents(),this.render(),this.showPromotion=!0,this.showTime=!0},addEvents:function(){var b=this;a(".j-sort").on("click",function(){b.sortHandler(a(this))}),a(".j-filter").on("click",function(){var c=a(this);c.toggleClass("active");var d=c.hasClass("active");b.is_have=d?1:0,b.render(!0)})},render:function(b){var c=this;if(!c.isAjax){this.isAjax=!0,b&&(this.page=1,this.infiniteScroll.remove(),a("#items").html(""),this.showTip("数据加载中..."));var d={brandGroupId:this.brandId,categoryId:this.categoryId,is_sort:this.is_sort,is_have:this.is_have,count:this.count,page:this.page};null!=this.brandId&&(d.brandId=this.brandId),lib.api.get({api:{c:"deal",a:"goodslist"},data:d,success:function(a){if(console.log(a),!c.topbar){var b=a.title||document.title;document.title=b,c.topbar=new ctrl.topBar({isIndex:!1,title:b})}if(c.showPromotion&&(c.renderPromotion(a),c.showPromotion=!1),Array.isArray(a.products)&&a.products.length?(c.renderItems(a.products),!c.infiniteScroll.started&&c.infiniteScroll.start()):1==c.page?c.renderError("empty"):(console.log(c.isEnd),c.isEnd=!0),c.time&&a.surplusTime){c.time=!1,console.log(a.surplusTime);var d=parseInt(a.surplusTime),e=Math.floor(d/86400),f=Math.floor((d-24*e*3600)/3600),g=Math.floor((d-24*e*3600-3600*f)/60),h=Math.floor(d-24*e*3600-3600*f-60*g),i=[e,f,g,h];console.log(i),c.renderTime(i)}c.page++},error:function(){c.renderError("network")},complete:function(){c.isAjax=!1}})}},checkNeedScroll:function(){return!this.is_have},renderPromotion:function(b){var c=a("#promotion"),d=a("#tpl-promotion").html();c.append(_.template(d)({data:b}))},renderTime:function(b){var c=3600*parseInt(b[0])*24+3600*parseInt(b[1])+parseInt(60*b[2])+parseInt(b[3]);if(console.log(b),c>0){{lib.countdown({endDate:"+"+c.toString(),stringFormatter:b[0]>0?"d天hh小时mm分ss秒":b[1]>0?"hh小时mm分ss秒":b[2]>0?"mm分ss秒":"ss秒",onUpdate:function(b){a(".time-end").html("还剩："+b.stringValue)},onEnd:function(){console.log("cd2 ended")}}).start()}a(".time-end").show()}else a(".time-end").remove()},renderItems:function(b){a(".info-tip").hide();var c=a("#items"),d=a("#tpl-item").html(),e=a(".list-item").length;c.append(_.template(d)({brandId:this.brandId,itemList:b,sum:e})),lib.lazyload.trigger()},renderError:function(a){switch(a){case"param":this.showTip("缺少必要参数");break;case"network":this.showTip("服务器开小差啦");break;case"empty":this.showTip("当前条件，列表为空")}},showTip:function(b){var c=a(".info-tip");c.html(b).show()},sortHandler:function(b){var c=b.hasClass("active");a(".j-sort").removeClass("active"),b.addClass("active");var d=b.attr("data-type");d?(c&&b.toggleClass("down-up"),this.is_sort=b.hasClass("down-up")?"price"==d?3:5:"price"==d?4:6):this.is_sort=7,this.render(!0)}};a(function(){c.init()})}(Zepto,window.Global||(window.Global={}));