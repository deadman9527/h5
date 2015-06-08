/**
 * h5.ve.cn 之购物车
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    var docEl = document.documentElement;
    var winW;
    var winH = $(window).height();
    console.log(winH);
    var percent = (winH<500)?0.45:0.5625;

    var main = {
        init: function () {
            if(!lib.login.isLogin()){
                /*lib.login.goLogin();
                return;*/
                lib.storage.set('accessToken','');
            }
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '购物车';

            document.title = title;
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.bottombar = new ctrl.bottomBar({
                hoverIndex:2,
                showBottom:true
            });
            this.proType = 1;//普通商品，0为海外购
            this.render();
            this.choose = params.type==2 ? 2 : null;

            this.renderContent();
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)  || ua.match(/MobileVecn/i) ){
                $(".container").css("padding","0");
                return;
            }

            // gotop
            new lib.goTop({position:{bottom:60}});
        },
        //立即购买开关
        switch:function(){
            var that = this;
            $.get('http://act.ve.cn/data/switch.json',function(data){
                that.switch = data;
                if((data.turnoff)||(lib.login.isLogin())){
                    $('#products .cart-bottom .cart-t a').attr('href','order-confirm.html');
                }
            })
        },
        addEvent : function(){
            var that = this;
            $("#btn-pro").click(function(){
                $("#btn-sea").removeClass("hover");
                $(this).addClass("hover");
                that.proType = 1;
                $("#products").show();
                $("#sea_products").hide();
                if($("#products .cart-item").length<1){
                    $(".container").removeClass("heiauto");
                }else{
                    $(".container").addClass("heiauto");
                }
            });
            $("#btn-sea").click(function(){
                $("#btn-pro").removeClass("hover");
                $(this).addClass("hover");
                that.proType = 0;
                $("#products").hide();
                $("#sea_products").show();
                if($("#sea_products .cart-item").length<1){
                    $(".container").removeClass("heiauto");
                }else{
                    $(".container").addClass("heiauto");
                }
            });
        },
        render: function(){

        },
        renderContent:function(){
            var that = this;
            if (that.cart_isAjax) {
                return;
            }
            that.cart_isAjax = true;
            lib.api.get({
                //needLogin:true,
                api: {
                    c: 'shoping',
                    a: 'get_User_Cart'
                },
                data: {
                    accessToken:lib.storage.get('accessToken')
                },
                success: function (data) {
                    console.log(data);

                    if(data.products && data.products[0]){
                        for(var i = data.products.length-1;i>=0;i--){
                            if(data.products[i].orders && data.products[i].orders[0]){
                            }else{
                                data.products.splice(i,1);
                            }
                        }
                    }

                    that.editData = data;
                    var $target = $('#mainItem');
                    var tpl = $('#tpl-mainItem').html();
                    $target.prepend(_.template(tpl)({
                        itemList: [data]
                    }));
                    new ctrl.number({
                        el: '.J_Num1',
                        step: 1,
                        quantity: 1,
                        min: 0,
                        max: 3,
                        cart:true,
                        onAdd:function(){
                            that.renderDel(this,"add");
                        },
                        onMinus:function(){
                            that.renderDel(this,"minus");
                        },
                        onBlur:function(){
                            that.renderDel(this,"blur");
                        }

                    });
                    //$(".J_Num1 input").attr("readonly","false");
                    $(".delete-cart").click(function(){
                        that.renderDel(this,"del");
                    });
                    that.addEvent();
                    if(data.products || data.sea_products){
                        if(!data.products || data.products.length<1){
                            winW = docEl.getBoundingClientRect().width;
                            $(".container").removeClass("heiauto");
                            $("#products").html('<div class="cart-outer"><div class="cart-inner" style="width:'+winW*percent+'px;height:'+1.7*winW*percent+'px"><a class="go-index" href="http://h5.ve.cn"></a></div></div>');

                        }else if(!data.sea_products || data.sea_products.length<1){
                            winW = docEl.getBoundingClientRect().width;
                            $(".container").removeClass("heiauto");
                            $("#sea_products").html('<div class="cart-outer"><div class="cart-inner" style="width:'+winW*percent+'px;height:'+1.7*winW*percent+'px"><a class="go-index" href="http://h5.ve.cn"></a></div></div>');

                        }

                        if(that.proType == 1 && (!data.products || data.products.length <= 0) && (data.sea_products && data.sea_products.length > 0)){
                            $("#btn-pro").removeClass("hover");
                            $("#btn-sea").addClass("hover");
                            that.proType = 0;
                            $("#products").hide();
                            $("#sea_products").show();
                        }
                        if(that.proType==1 && (!data.products || data.products.length>0)){
                            $(".container").addClass("heiauto");
                        }
                        if(that.proType==0 && (data.sea_products && data.sea_products.length>0)){
                            $(".container").addClass("heiauto");
                        }
                        $("#cart-sea").click(function(){
                            if(that.editData && !that.editData.is_sea_order){
                                lib.notification.alert(that.editData.sea_limit_message, function() {
                                    this.hide();
                                }).show();
                            }else{
                                if(that.switch.turnoff){
                                    window.location.href = "order-confirm.html?proType=1";
                                }else{
                                    window.location.href = lib.login.isLogin()?"order-confirm.html?proType=1":"direct-order-confirm.html?proType=1";
                                }
                            }
                        });
                    }else{
                        winW = docEl.getBoundingClientRect().width;
                        $(".container").removeClass("heiauto");
                        $("#mainItem").html('<div class="cart-outer"><div class="cart-inner" style="width:'+winW*percent+'px;height:'+1.7*winW*percent+'px"><a class="go-index" href="http://h5.ve.cn"></a></div></div>');
                    }
                    if(that.choose==2){
                        $("#btn-pro").removeClass("hover");
                        $("#btn-sea").addClass("hover");
                        that.proType = 0;
                        $("#products").hide();
                        $("#sea_products").show();
                        if($("#sea_products .cart-item").length<1){
                            $(".container").removeClass("heiauto");
                        }else{
                            $(".container").addClass("heiauto");
                        }
                    }

                    that.switch();
//                    if(!lib.login.isLogin()){
//                        /*lib.login.goLogin();
//                         return;*/
//                        lib.storage.set('accessToken','');
//                        $(".cart-bottom2").show();
//                        $(".cart-bottom").hide();
//                    }else{
//                        $(".cart-bottom2").hide();
//                        $(".cart-bottom").show();
//                    }
                },
                error: function (data) {
                    winW = docEl.getBoundingClientRect().width;
                    $(".container").removeClass("heiauto");
                    $("#mainItem").html('<div class="cart-outer"><div class="cart-inner" style="width:'+winW*percent+'px;height:'+1.7*winW*percent+'px"><a class="go-index" href="http://h5.ve.cn"></a></div></div>');
                    console.log(data,data.desc);
                },
                complete: function () {
                    that.cart_isAjax = false;
                }
            })
        },
        renderDel:function(obj,type){
            var that = this;
            var num = 0,itemid = 0;
            if(type=="del"){
                num = 0;
                itemid = $(obj).attr("itemid");
            }else if(type=="add"){
                num = $(obj.$inputNum).attr("valueAsNumber")+1;
                itemid = obj.itemid;
            }else if(type=="minus"){
                num = $(obj.$inputNum).attr("valueAsNumber")-1;
                if(num>0)
                    itemid = obj.itemid;
            }else if(type=="blur"){
                num = $(obj.$inputNum).attr("valueAsNumber") ;
                itemid = obj.itemid;
            }
            var min_buy = ($(obj.$container).attr("min")-1) || 0;
            if( num <= min_buy){
                var isconfirm = false;
                var pop = lib.notification.confirm('确认删除',
                    '',
                    function(e, isConfirm) {
                        if (isConfirm) {
                            if(type=="minus"){
                                itemid = obj.itemid;
                            }
                            that.renderConDel(type,itemid,0,obj);
                        }else{
                            if(type == "minus"){
                                if( parseInt($(obj.$inputNum).val())==0){
                                    $(obj.$inputNum).val($(obj.$inputNum).attr("valueAsNumber")+1);
                                }else{

                                }

                            }
                            else{
                                $(obj.$inputNum).val( obj.lastFocusVal);
                            }
                            // $(obj.$inputNum).attr("valueAsNumber",$(obj.$inputNum).attr("valueAsNumber")+1) ;
                        }
                        this.hide();
                    },'{background:#fff}');
                pop.show();
            }else{
                that.renderConDel(type,itemid,num,obj);
            }

        },
        renderConDel:function(type,itemid,num,obj){
            var addNum = 1;
            if(type == "add" || type == "minus"){
                obj.$add.addClass("add-disabled");
                obj.$minus.addClass("minus-disabled")
                if(type == "add"){
                    addNum = 1;
                }else{
                    addNum = -1;
                }
            }else if(type == "blur"){
                if($(obj.$inputNum).attr("valueAsNumber") >= parseInt($(obj.$container).attr("max"))){
                    num = parseInt($(obj.$container).attr("max"));
                }
                if($(obj.$inputNum).attr("valueAsNumber") <= parseInt($(obj.$container).attr("min"))){
                    num = parseInt($(obj.$container).attr("min"));
                }
            }
            var delobj={
                num:num,
                v:"1.6",
                itemid:itemid
            };
            var that = this;
            if (that.del_isAjax) {
                return;
            }
            that.del_isAjax = true;
            lib.api.get({
                //needLogin:true,
                api: {
                    c: 'shoping',
                    a: 'cart_edit_new'
                },
                data: {
                    json:"["+JSON.stringify(delobj)+"]",
                    accessToken:lib.storage.get('accessToken')
                },
                success: function (data) {
                    that.editData = data;
                    var lastNum;
                    //删除节点
                    if(type=="del"){
                        var delDom = $($(obj).closest(".recom"));
                        var delPrice = delDom.find(".J_Num1 input").attr("valueAsNumber")*(parseFloat(delDom.find(".J_Num1").attr("origin_price"))-parseFloat(delDom.find(".J_Num1").attr("price")));
                        if($(obj).closest(".cart-item").find(".recom").length == 1){
                            $(obj).closest(".cart-item").remove();
                        }else{
                            $(obj).closest(".recom").remove();
                        }

                        if(that.proType==1){
                            $(".hjNum").html(data.total_price.toFixed(2));
                            lastNum = parseFloat($(".jsNum").html());
                            $(".jsNum").html((lastNum - delPrice.toFixed(2)).toFixed(2));
                        }else{
                            $(".hjNum0").html(data.sea_total_price.toFixed(2));
                            lastNum = parseFloat($(".jsNum0").html());
                            $(".jsNum0").html((lastNum - delPrice.toFixed(2)).toFixed(2));
                        }
                    }else if(type == "add" || type == "minus"){
                        if($(obj.$inputNum).attr("valueAsNumber") < parseInt($(obj.$container).attr("max"))){
                            obj.$add.removeClass("add-disabled");
                        }
                        if($(obj.$inputNum).attr("valueAsNumber") > parseInt($(obj.$container).attr("min"))){
                            obj.$minus.removeClass("minus-disabled");
                        }
                        if(that.proType==1){
                            lastNum = parseFloat($(".jsNum").html());
                            $(".hjNum").html(data.total_price.toFixed(2));
                            $(".jsNum").html((lastNum+parseFloat(parseFloat(obj.$container.attr("origin_price"))-parseFloat(obj.$container.attr("price"))).toFixed(2)*addNum).toFixed(2));
                        }else{
                            lastNum = parseFloat($(".jsNum0").html());
                            $(".hjNum0").html(data.sea_total_price.toFixed(2));
                            $(".jsNum0").html((lastNum+parseFloat(parseFloat(obj.$container.attr("origin_price"))-parseFloat(obj.$container.attr("price"))).toFixed(2)*addNum).toFixed(2));
                        }
                        if(num == 0){
                            if($(obj.$container).closest(".cart-item").find(".recom").length == 1){
                                $(obj.$container).closest(".cart-item").remove();
                            }else{
                                $(obj.$container).closest(".recom").remove();
                            }
                        }

                    }else if(type == "blur"){
                        addNum = $(obj.$inputNum).attr("valueAsNumber") - obj.lastFocusVal;
                        if(that.proType==1){
                            lastNum = parseFloat($(".jsNum").html());
                            $(".hjNum").html(data.total_price.toFixed(2));
                            $(".jsNum").html((lastNum+parseFloat(parseFloat(obj.$container.attr("origin_price"))-parseFloat(obj.$container.attr("price")))*addNum).toFixed(2));
                        }else{
                            lastNum = parseFloat($(".jsNum0").html());
                            $(".hjNum0").html(data.sea_total_price.toFixed(2));
                            $(".jsNum0").html((lastNum+parseFloat(parseFloat(obj.$container.attr("origin_price"))-parseFloat(obj.$container.attr("price")))*addNum).toFixed(2));
                        }
                        if(num == 0){
                            if($(obj.$container).closest(".cart-item").find(".recom").length == 1){
                                $(obj.$container).closest(".cart-item").remove();
                            }else{
                                $(obj.$container).closest(".recom").remove();
                            }
                        }
                    }

                    if(that.proType==1 && $("#products .recom").length<1){
                        winW = docEl.getBoundingClientRect().width;
                        $(".container").removeClass("heiauto");
                        $("#products").html('<div class="cart-outer"><div class="cart-inner" style="width:'+winW*percent+'px;height:'+1.7*winW*percent+'px"><a class="go-index" href="http://h5.ve.cn"></a></div></div>');

                    }else if(that.proType==0 && $("#sea_products .recom").length<1){
                        winW = docEl.getBoundingClientRect().width;
                        $(".container").removeClass("heiauto");
                        $("#sea_products").html('<div class="cart-outer"><div class="cart-inner" style="width:'+winW*percent+'px;height:'+1.7*winW*percent+'px"><a class="go-index" href="http://h5.ve.cn"></a></div></div>');
                    }
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                    if(data.desc == "库存不足"){
                        $(obj.$inputNum).val( ($(obj.$inputNum).attr("valueAsNumber")-1) );
                        obj.$minus.removeClass("minus-disabled");
                        obj.$add.addClass("add-disabled");
                        lib.notification.alert(data.desc, function() {
                            this.hide();
                        }).show();
                    }
                    //var pop = lib.notification.simple(data.desc,'',3000);
                },
                complete: function () {
                    that.del_isAjax = false;
                }
            })
        }
    };
    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));