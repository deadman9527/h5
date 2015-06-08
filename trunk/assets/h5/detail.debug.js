/**
 * h5.ve.cn 之详情页
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MobileVecn/i) ){
        SEMURL = false;
    }else{
        SEMURL = true;
    }
    // fix: http://img.ve.cnttp://s1.ve.cn/public/attachment/201411/17/23/20141117234717151_3.jpg
    Global.formatImgSrc = function (src) {
        var match = src.match(/^http:\/\/img\.ve\.cnttp(.+)_3\.jpg/);
        if (match) {
            return 'http' + match[1] + '.jpg';
        } else {
            return src;
        }
    };
    Global.formatTitleLink = function (productid, brandId , alias) {
        var host = 'http://' + location.host;
        var brandurl = brandId ? "&brandId="+brandId : "";

        var oldUrl = "detail.html?productId="+productid + brandurl;
        var alias_url = alias ? alias : "" , newUrl = host + "/" + alias_url + "goods-" + productid + ".html?productId="+ productid + brandurl , reUrl = SEMURL ? newUrl : oldUrl;
        return reUrl;
    };
    Global.formatLink = function ( brandId,alias ) {
        var host = 'http://' + location.host;
        var brandurl = brandId ? "?brandId="+brandId : "";

        var oldUrl = "list.html?brandId="+brandId;
        var alias_url = alias ? alias : "" , newUrl = host + "/" + alias_url + "brandcate-" + brandId + ".html"+ brandurl , reUrl = SEMURL ? newUrl : oldUrl;
        return reUrl;
    };

    function getTime(startDate, endDate) {
        var mmSec = (endDate.getTime() - startDate.getTime()); //得到时间戳相减 得到以毫秒为单位的差
        var d = Math.floor(mmSec / 3600000 / 24);
        var h = Math.floor((mmSec - d*24*3600000)/3600000);
        var m = Math.floor((mmSec - d*24*3600000 - h*3600000)/60000);
        var s = (mmSec - d*24*3600000 - h*60*60000 - m*60000)/1000
        //console.log(d,'-',h,'-',m,'-',s);
        return {d:d,h:h,m:m,s:s}; //单位转换为天并返回
    };
    var docEl = document.documentElement;
    var winW;
    var main = {
        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;


            var title = params['title'] ? decodeURIComponent(params['title']) : '商品详情';
            winW = docEl.getBoundingClientRect().width;
            this.productId = params.productId;
            this.brandId = params.brandId || null;
            this.isBuy = false;//是否立即购买
            this.nosuxing = false;
            //this.turnOff = false;

            //追踪浏览商品的ID
            lib.h5log.log(["setCustomVariable", 3, "productId", params.productId, "page"]);
            if(params.act=="goods_detail"){
                this.renderContent(2);
                // 初始化lazyload
                lib.lazyload.init();
                $("body").show();
                return;
            }
            if(params.attr && params.cartNum){
                this.attr = params.attr;
                this.cartNum = params.cartNum;
                this.cartType = params.type || null;
                this.renderCart();
            }
            //this.checkUrl();
            /*if(!lib.storage.get('ve_new_version')){
             location.replace('http://m.ve.cn/?ctl=goods&id=' + params['productId']);
             return;
             }*/

            document.title = title;
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title,
                topHome:true
            });
            this.render();
            this.getTurnOff();

            this.addEvent();
            // 初始化lazyload
            lib.lazyload.init({loadHidden:false});
            // gotop
            new lib.goTop({position:{bottom:65}});
        },
        checkUrl:function(){
            if(SEMURL && location.href.indexOf("/goods-")<0){
                var that = this;
                if (that.urlAjax) {
                    return;
                }
                that.urlAjax = true;
                lib.api.get({
                    api: {
                        c: 'alias',
                        a: ''
                    },
                    data: {
                        productId: this.productId,
                        brandId:this.brandId
                    },
                    success: function (data) {
                        var host = 'http://' + location.host;
                        var brandurl = that.brandId ? "?brandId="+that.brandId : "";
                        location.href = host + "/" + data.alias + "goods-" + that.productId + ".html" + brandurl;
                        //console.log(2,data,host + "/" + data.alias + "goods-" + that.productId + ".html" + brandurl);

                    },
                    error: function (data) {
                        console.log(data);
                    },
                    complete: function () {
                        that.urlAjax = false;
                    }
                })
            }
        },
        addEvent : function(){
            var triggerImg = false;
            $(".middle-top li").on("click",function(){
                if($(this).find("span").attr("po")=="2"){
                    $(".pro-love").show();
                    $(".pro-detail").hide();
                    if(!triggerImg){
                        lib.lazyload.trigger();
                    }
                    triggerImg = true;
                }else{
                    $(".pro-detail").show();
                    $(".pro-love").hide();
                }
                $(".middle-top span").removeClass("hover");
                $(this).find("span").addClass("hover");
            })
        },
        getTurnOff:function(){
            var that = this;
            $.getJSON('http://act.ve.cn/data/switch.json', function(data){
                that.turnOff = data.turnoff;
                //console.log(that.turnOff);
            })
        },
        renderLove:function(){
            try{
                var that = this;
                var $target = $('#love-items');
                var tpl = $('#tpl-loveitems').html();
                //console.log(1,that.data.brand.data);
                $target.append(_.template(tpl)({
                    itemList: that.data.brand.data,
                    brandId:that.brandId,
                    alias:that.data.alias ? that.data.alias : ""
                }));

                lib.lazyload.trigger();
            }catch(e){}
        },
        render: function (needReset) {
            var that = this;
            if (that.isAjax) {
                return;
            }
            that.isAjax = true;
            lib.api.get({
                api: {
                    c: 'deal',
                    a: 'detail'
                },
                data: {
                    productId: this.productId,
                    brandId:this.brandId
                },
                success: function (data) {
                    $("body").show();

                    if(data.products.is_sea_label){
                        that.cartType = data.products.is_sea_label;
                    }

                    //console.log(data);
                    that.data = data;
                    that.renderContent(1);
                    that.renderSlide(data.products.images);
                    that.renderItems([data]);
                    var d = data.products.comment_lists?data.products.comment_lists:null;
                    if(d!=null){
                        that.renderMask(d);
                    }
                    that.renderAct(data);
                    that.renderTime(data);
                    try{
                        if(data.products.brief.length<1){
                            $(".recom").hide();
                        }
                    }catch(e){
                        console.log("no brief");
                    }
                    if(data.brand){
                        if(!data.brand.data){
                            $(".middle-top").remove();
                        }else{
                            that.renderLove();
                        }

                        $(".middle-top").fixedsticky();
                        var ua = window.navigator.userAgent.toLowerCase();
                        //if(ua.match(/MicroMessenger/i)  || ua.match(/MobileVecn/i) || ua.match(/qq\//i) ){
                        if(ua.match(/MobileVecn/i) ){
                            $(".middle-top").css("top","0px");
                        }
                        that.renderBrands();

                    }else{
                        $(".pro-love").remove();
                        $(".middle-top").remove();
                        $("#brands").remove();
                    }

                    if(parseInt(data.products.end_time) < parseInt(Date.parse(new Date())/1000) || parseInt(data.products.begin_time) > parseInt(Date.parse(new Date())/1000) || data.products.is_stock<=0){
                        $(".main").prepend('<p class="no-item">宝贝已被抢光</p>');
                        $("#buy-now").html(' 加入购物车');
                        $("#buy-now").addClass("pro-nobuy");
                        $("#buy").html(' 立即购买');
                        $("#buy").addClass("pro-nobuy");
                        return;
                    }

                    if(!that.turnOff){
                        if(data.products){
                            if(data.products.is_sea_label==1){
                                $("#buy").hide();
                                $("#buy-now").removeClass('pro-buy').addClass('pro-buy-red');
                                if(data.products.suxing[0].xxsx.length ==1){
                                    $(".pro-buy").removeClass('sku-trigger');
                                    //if(data.products.user_min_bought == '0'){
                                    that.cartNum = 1;
                                    //}else{
                                    //    that.cartNum = Number(data.products.user_min_bought);
                                    //}

                                    $("#sku-size").val(data.products.suxing[0].xxsx[0].id);
                                    that.attr = $("#sku-size").val();
                                    $("#buy-now").on('click',function(){
                                        if(!$(this).hasClass("pro-nobuy")){
                                            that.renderCart();
                                        }
                                    });
                                }else{
                                    that.renderSku(data);
                                }
                            }else{
                                if(data.products.suxing&&data.products.suxing[0]){
                                    if(data.products.suxing[0].xxsx.length ==1){
                                        $(".pro-buy").removeClass('sku-trigger');
                                        //if(data.products.user_min_bought == '0'){
                                        that.cartNum = 1;
                                        //}else{
                                        //    that.cartNum = Number(data.products.user_min_bought);
                                        //}
                                        //that.cartNum = 1;
                                        $("#sku-size").val(data.products.suxing[0].xxsx[0].id);
                                        that.attr = $("#sku-size").val();
                                        $("#buy").on('click',function(){
                                            that.isBuy = true;
                                            if(!$(this).hasClass("pro-nobuy")){
                                                that.renderCart();
                                            }
                                        });
                                        $("#buy-now").on('click',function(){
                                            if(!$(this).hasClass("pro-nobuy")){
                                                that.renderCart();
                                            }
                                        });
                                    }else{
                                        var rensku = true;
                                        if(!$("#buy").hasClass("pro-nobuy")){
                                            rensku = true;
                                        }else{
                                            rensku = false;
                                        }
                                        if(!$("#buy-now").hasClass("pro-nobuy")){
                                            rensku = true;
                                        }else{
                                            rensku = false;
                                        }
                                        $("#buy").on('click',function() {
                                            that.isBuy = true;
                                        });
                                        $("#buy-now").on('click',function() {
                                            that.isBuy = false;
                                        });
                                        if(rensku){
                                            that.renderSku(data);
                                        }


                                    }
                                }else if(!data.products.suxing){
                                    $(".pro-buy").removeClass('sku-trigger');
                                    //that.cartNum = 1;
                                    //if(data.products.user_min_bought == '0'){
                                    that.cartNum = 1;
                                    //}else{
                                    //    that.cartNum = Number(data.products.user_min_bought);
                                    //}
                                    that.nosuxing = true;
                                    //that.attr = '';
                                    $("#buy").on('click',function(){
                                        that.isBuy = true;
                                        if(!$(this).hasClass("pro-nobuy")){
                                            that.renderCart();
                                        }
                                    });
                                    $("#buy-now").on('click',function() {
                                        if(!$(this).hasClass("pro-nobuy")){
                                            that.renderCart();
                                        }
                                    });
                                }
                            }

                        }
                    }else{
                        $("#buy").hide();
                        $("#buy-now").removeClass('pro-buy').addClass('pro-buy-red');
                        that.renderSku(data);
                    }
                    lib.lazyload.trigger();
                },
                error: function (data) {
                    $("body").show();
                    $(".container").css("height","100%");
                    $(".container").css("margin-top","0px");
                    $(".container").css("padding-top","40px");
                    $(".container").html("<p class='no-product no-img'></p><p class='no-product'><span>该商品不存在</span><br /><span class='backIndex'><a href=\"index.html\">回到首页</a></span></p>");
                    console.log(data);
                },
                complete: function () {
                    that.isAjax = false;
                }

                // mock 先
                //mock: {
                //   path: 'data/detail.json',
                //   error: 1
                //}
            })
        },
        renderBrands:function(){
            var that = this;
            var $target = $('#brands');
            var tpl = $('#tpl-brands').html();
            $target.append(_.template(tpl)({
                itemList: [that.data.brand],
                alias:that.data.alias ? that.data.alias : ""
            }));
        },
        renderTime:function(data){

            if(parseInt(data.products.end_time) > parseInt(Date.parse(new Date())/1000)){
                //var t = getTime(new Date(parseInt(data.products.begin_time) * 1000), new Date(parseInt(data.products.end_time) * 1000));
                //console.log(parseInt(data.products.end_time),parseInt(Date.parse(new Date())/1000));
                var cd2 = lib.countdown({
                    endDate: "+"+((parseInt(data.products.end_time)-parseInt(Date.parse(new Date())/1000))).toString(),
                    stringFormatter: 'd天 hh小时mm分ss秒',
                    onUpdate: function(data){
                        $(".timeover").html('还剩'+ data.stringValue);
                    },
                    onEnd: function(){
                        console.log('cd2 ended');
                    }
                }).start();
                // $(".timeover").html('还剩'+ t.d+'天'+ t.h+'时'+ t.m+'分'+ t.s+'秒');
                $(".timeover").show();
            }else{
                $(".timeover").remove();
            }
        },
        renderAct : function(data){
            if(data.products.free_ship == "1"){
                $(".payoffall").show();
                $("#by").append('<p><span class="by">包邮</span> <span class="active-desc">该商品包邮</span></p>');
            }else{
                $("#by").hide();
            }
            if(typeof (data.promotions)!="undefined"){
                var p = data.promotions,mjtext = "",mztext = "";
                var html_gift = "";
                if(p.length>0){
                    $(".payoffall").show();
                    for(var i=0;i<p.length;i++){
                        if(p[i].type == "discount"){
                            mjtext = p[i].title + "，";
                        }
                        if(p[i].type == "gift"){
                            mztext += p[i].title + "，";
                            if(p[i].goods_gift){
                                html_gift += "<ul>";
                                $(p[i].goods_gift).each(function(){
                                    html_gift += '<li><p><img width="50" src="'+this.gift_minpic+'" /><a href="detail.html?productId='+this.goods_id+'">'+this.goods_name+'</a></p> </li>'
                                });
                                html_gift += "</ul>";
                            }
                        }
                    }
                    mjtext = mjtext.substring(0,mjtext.length-1);
                    mztext = mztext.substring(0,mztext.length-1);
                    if(mjtext!=""){
                        $("#mj").append('<p><span class="mj">满减</span> '+'<span class="active-desc">'+mjtext+'</span></p>');
                    }else{
                        $("#mj").hide();
                    }
                    if(mztext!=""){
                        $("#mz").append('<p><span class="mz">满赠</span> '+'<span class="active-desc">'+mztext+'</span></p>');
                    }else{
                        $("#mz").hide();
                    }
                    if(html_gift){
                        $("#gift").html(html_gift);
                    }else{
                        $("#gift").hide();
                    }

                }else if(data.products.free_ship == "0"){
                    $(".payoffall").hide();
                }



            }else if(data.products.free_ship == "0"){
                $(".payoffall").remove();
            }
        },
        renderContent : function(type){
            var that = this;
            if (that.con_isAjax) {
                return;
            }
            that.con_isAjax = true;
            lib.api.get({
                api: {
                    c: 'deal',
                    a: 'detail_content'
                },
                data: {
                    productId: this.productId
                },
                success: function (data) {
                    //console.log(data);
                    var des =  data.data.description?data.data.description:"";
                    des = des.replace(/src=".\/public/g, "src=\"http://img.ve.cn/public");
                    des = des.replace(/http:\/\/img.ve.chttp/g, "http:");
                    des = des.replace(/src/g, 'class="lazy" src="http://h5.ve.cn/assets/img/cart_img_black_640x253.png" dataimg');
                    if(type==1){
                        if(that.data && (that.data.brand && !that.data.brand.data)){
                            $(".pro-detail").prepend('<h1>图文详情</h1>' + des);
                            $(".pro-detail").css("margin-top","5px");
                        }else{
                            $(".pro-detail").prepend(des);
                        }
                    }else if(type==2){
                        $("body").html('<div class="c-detail">'+des+'</div>');
                    }
                    setTimeout(function(){
                        lib.lazyload.trigger();
                    },400)

                },
                error: function () {
                    if(type==2) {
                        $("body").html("暂时没有描述");
                    }
                    that.renderError('network');
                },
                complete: function () {
                    that.con_isAjax = false;
                }
            })
        },
        renderSku :function(data){
            var _that = this;
            this.evaDialog = new lib.Dialog({
                boxClass: '#sku-dialog',
                triggerClass: '.sku-trigger',
                onShow:function(){
                    setTimeout(function () {
                        $(".sku-dialog-box").css("-webkit-transform","translateY(0%)");
                    }, 100);
                    $(".topbar").hide();
                    $("body").css("padding-top","0px");
                    //$("body").css("overflow","hidden");
                    $(".ve-gotop").hide();
                },
                onHide:function(){
                    $(".topbar").show();
                    $("body").css("padding-top","40px");
                    //$("body").css("overflow","auto");
                    $(".ve-gotop").show();
                }
            });
            $(".sku-cancel").on('click', function () {
                $(".sku-dialog-box").css("-webkit-transform","translateY(100%)");
                setTimeout(function () {
                    $("#sku-dialog").hide();
                    $(".topbar").show();
                    //$("body").css("overflow","auto");
                    $("body").css("padding-top","40px");
                }, 300);
            })
            var $target_top = $('#dia-sku-top');
            var tpl_top = $('#tpl-dia-sku-top').html();
            $target_top.prepend(_.template(tpl_top)({
                itemList: [data.products]
            }));
            var min_buy = parseInt(data.products.user_min_bought)==0 ? 1 : data.products.user_min_bought;
            var max_buy = parseInt(data.products.user_max_bought)==0 ? 999 : data.products.user_max_bought;
            _that.number = new ctrl.number({
                el: '#J_Num1',
                step: 1,
                quantity: min_buy,
                min: min_buy,
                max: max_buy
            });
            //console.log(_that.number);
            if(data.products.suxing != null){
                var $target = $('#dia-sku-size');
                var tpl = $('#tpl-dia-sku-size').html();
                $target.html(_.template(tpl)({
                    itemList: data.products.suxing[0].xxsx
                }));
                if(data.products.suxing[0].xxsx.length >= 1){
                    $(".sku-size span:eq(0)").attr("select","true");
                    $(".sku-size span:eq(0)").css("border","1px solid #ff3862");
                    $(".sku-size span:eq(0)").css("color","#ff3862");
                    $("#sku-size").val(data.products.suxing[0].xxsx[0].id);
                    //_that.number.max = data.products.suxing[0].xxsx[0].is_stock;
                }
            }
            $(".sku-size span").click(function(){
                if($(this).attr("select")=="false"){
                    // _that.number.max = $(this).attr("is_stock");
                    $("#sku-size").val($(this).attr("barcode"));
                    $(".sku-size span").attr("select","false");
                    $(".sku-size span").css("border","1px solid #333333");
                    $(".sku-size span").css("color","#333333");

                    $(this).attr("select","true");
                    $(this).css("border","1px solid #ff3862");
                    $(this).css("color","#ff3862");
                    $("#sku-bigpri").html(parseFloat($(this).attr("current_price")));
                }else{
                    $("#sku-size").val("");
                    $(".sku-size span").css("border","1px solid #333333");
                    $(".sku-size span").css("color","#333333");
                    $(".sku-size span").attr("select","false");
                }
            });

            $(".pro-sku-foot span").click(function(){
                _that.renderCart();
            });
        },
        renderMask : function(data){
            var _that = this;
            this.evaDialog = new lib.Dialog({
                boxClass: '#dialog',
                triggerClass: '.evaimg-trigger',
                hideClass: '#sliderDiv',
                onShow:function(){
                    _that.maskSlider(this.obj,data);
                }
            });
        },
        maskSlider:function(obj,data){
            this.maskslider = null;
            if (!this.maskslider) {
                $(".slider-box2").html('<div class="slider-outer"><div id="slides2" class="slider-wrap"> </div></div><div class="slider-status2"></div>');
                $(".dialog-box").css("width",winW*0.9+"px");
                var $target = $('#slides2');
                var tpl = $('#tpl-masklides').html();
                $target.html(_.template(tpl)({
                    itemList: data[$(obj).attr("itemid")].imgurl,
                    w:winW*0.9
                }));
                this.maskslider = new lib.Slider('.slider-box2',{
                    trigger : '.slider-status2'
                    //curIndex:parseInt( $(obj).attr("i") )
                });
            }
            this.maskslider.slideTo($(obj).attr("i"));
            lib.lazyload.trigger();
        },

        renderItems: function (itemList) {
            var $target = $('#items');
            var tpl = $('#tpl-item').html();
            $target.append(_.template(tpl)({
                itemList: itemList
            }));
            var $target_recom = $('#recom-content');
            var tpl_recom = $('#tpl-recom-content').html();
            $target_recom.html(_.template(tpl_recom)({
                itemList: itemList
            }));
        },
        renderSlide: function (data) {
            //var data = [{
            //    targetUrl:"http://h5.ve.cn/app/app-1120/oversea.html",
            //    imageUrl:"http://img.ve.cn/public/attachment/201411/22/03/546f25f7aa8d1.jpg"
            //},{
            //    targetUrl:"http://h5.ve.cn/app/app-1120/oversea.html",
            //    imageUrl:"http://img.ve.cn/public/attachment/201411/22/04/546f2a7f6c24a.jpg"
            //}];
            var $target = $('#slides');
            var tpl = $('#tpl-slides').html();
            $target.append(_.template(tpl)({
                itemList: data,
                w:winW
            }));

            // slide show
            this.slider = new lib.Slider('.slider-box',{
                loop : true,
                play : true,
                trigger : '.slider-status'
            });
            $(".slider-box").append('<div class="timeover"></div>');
            if(this.data && this.data.supplier!=""){
                if(this.data.supplier.indexOf("保税") >= 0){
                    $(".slider-box").append('<div class="supplier">'+ this.data.supplier +'</div>');
                }else{
                    $(".slider-box").append('<div class="supplier2">'+ this.data.supplier +'</div>');
                }

            }
        },

        renderCart:function(){
            /* if(!lib.login.isLogin()){
             lib.login.goLogin();
             return;
             }*/

            if(!lib.login.isLogin()){
                /*if(this.data.products.is_sea_label==0){
                 lib.login.goLogin(location.href + "&attr="+$("#sku-size").val()+"&cartNum="+$(this.number.$inputNum).attr("valueAsNumber"));
                 }else{
                 lib.login.goLogin(location.href + "&attr="+$("#sku-size").val()+"&cartNum="+$(this.number.$inputNum).attr("valueAsNumber") + "&type=2");
                 }
                 return;*/
                lib.storage.set('accessToken','');
            }
            var obj_attr ,obj_num ;
            if(!this.nosuxing) {
                if (this.attr && this.cartNum) {
                    obj_attr = this.attr;
                    obj_num = this.cartNum;
                } else {
                    if (this.data.products.attr != null && $("#sku-size").val() == "") {
                        //alert("请选择尺寸");
                        lib.notification.alert('请选择尺寸', function () {
                            this.hide();
                        }).show();
                        return;
                    }
                    obj_attr = $("#sku-size").val(), obj_num = $(this.number.$inputNum).attr("valueAsNumber");
                    //console.log(this.data.products);
                }
            }else{
                obj_attr = '';
                obj_num = this.cartNum;
            }


            var that = this;
            if (that.skusure_isAjax) {
                return;
            }
            that.goodsNumber = this.cartNum? this.cartNum : $(this.number.$inputNum).attr("valueAsNumber") ;
            that.skusure_isAjax = true;
            var obj={
                attr :obj_attr,
                user_min_bought:null,
                free_ship:null,
                user_max_bought:null,
                img:null,
                imgurl:null,
                isSelect: true,
                suxing:null,
                itemid:null,
                nofree_ship_info:null,
                sourceId:null,
                source:null,
                settle:null,
                promotions:null,
                product_name:null,
                productid: this.productId,
                price: 0.0,
                origin_price: 0.0,
                position: 0,
                num: obj_num,
                is_stock: 0,
                gift:false,
                decrease:false

            };
            //console.log("["+JSON.stringify(obj)+"]");

            if(!this.isBuy){
                lib.api.get({
                    //needLogin:true,
                    api: {
                        c: 'shoping',
                        a: 'addtocart'
                    },
                    data: {
                        json: "["+JSON.stringify(obj)+"]",
                        accessToken:lib.storage.get('accessToken'),
                        buy_now:0
                    },
                    success: function (data) {
                        //console.log(data);
                        //追踪放入购物车商品的数量
                        lib.h5log.log(["setCustomVariable", 3, "productId", that.productId, "page"],["setCustomVariable", 4, "goodsNumber",that.goodsNumber , "page"]);
                        if(obj.attr || obj.num){
                        ////    if(that.data.products.is_sea_label==0){
                        ////        window.location="cart.html";
                        ////    }else{
                        ////        window.location = "cart.html?type=2";
                        ////    }
                        //}else{
                            $(".sku-dialog-box").css("-webkit-transform","translateY(100%)");
                            setTimeout(function () {
                                $("#sku-dialog").css("display","none");
                            }, 400);
                            $(".topbar").show();
                            $("body").css("padding-top","40px");
                            var isconfirm = false;
                            var pop = lib.notification.confirm('已成功加入购物车，是否去结算？','', function(e, isConfirm) {
                                if (isConfirm) {
                                    if(that.data.products.is_sea_label==0){
                                        window.location="cart.html";
                                    }else{
                                        window.location="cart.html?type=2";
                                    }
                                }else{
									if(that.data.brand && that.data.alias){
                                        window.location=Global.formatLink(that.data.brand.brandId,that.data.alias);
                                    }else{
										window.location="index.html";
									}
                                }
                                this.hide();
                            }, {
                                okText: '去结算',
                                noText: '继续逛'
                            });
                            pop.show();
                        }
                    },
                    error: function (data) {
                        if(data && data.desc != ""){
                            var desc = data.desc;
                        }else{
                            desc = "服务器开小差啦";
                        }
                        lib.notification.alert(desc, function() {
                            this.hide();
                        },{okText:'确定'}).show();
                    },
                    complete: function () {
                        that.skusure_isAjax = false;
                    }
                })
            }else{
                lib.api.get({
                    //needLogin:true,
                    api: {
                        c: 'shoping',
                        a: 'addtocart'
                    },
                    data: {
                        json: "["+JSON.stringify(obj)+"]",
                        buy_now:1,
                        accessToken:lib.storage.get('accessToken')
                    },
                    success: function (data) {
                        //console.log(data);
                        //追踪放入购物车商品的数量
                        lib.h5log.log(["setCustomVariable", 3, "productId", that.productId, "page"],["setCustomVariable", 4, "goodsNumber",that.goodsNumber , "page"]);
                        if(!(obj_attr==null) && obj_num){
                            if(!lib.login.isLogin()){
                                if(that.data.products.is_sea_label==0){
                                    setTimeout(function(){
                                        location.href = "direct-order-confirm.html?cartId="+data.cart_id;
                                    },50)
                                }else{
                                    setTimeout(function(){
                                        location.href="direct-order-confirm.html?proType=1&cartId="+data.cart_id; //+ that.cartType;
                                    },50)
                                }
                            }else{
                                if(that.data.products.is_sea_label==0){
                                    location.href = "order-confirm.html";//+ that.cartType;
                                }else{
                                    location.href = "order-confirm.html?proType=1";
                                }
                            }
                        }
                    },
                    error: function (data) {
                        if(data && data.desc != ""){
                            var desc = data.desc;
                            alert(desc);
                        }else{
                            desc = "服务器开小差啦";
                        }

                    },
                    complete: function () {
                        that.skusure_isAjax = false;
                    }
                })
            }
        },
        // type: empty, param, network
        renderError: function (type) {
            switch (type) {
                case 'param':
                    this.showTip('参数请求错误');
                    break;
                case 'network':
                    this.showTip('服务器开小差啦');
                    break;
                case 'empty':
                    this.showTip('当前条件，数据为空');
                    break;
            }
        },
        showTip: function (txt) {
            var $errorBox = $('#info-tip');
            $errorBox.html(txt).show();
        },

        hideTip: function (txt) {
            var $errorBox = $('#info-tip');

            if (txt) {
                $errorBox.html('加载已完毕').show();
                setTimeout(function () {
                    $errorBox.hide();
                }, 5000)
            } else {
                $errorBox.hide();
            }
        }
    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));