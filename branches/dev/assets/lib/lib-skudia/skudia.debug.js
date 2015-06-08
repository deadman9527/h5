/**
 * Created by lancet on 15-2-27.
 *
 */
;(function( win, $ ) {
	this.productId = $("#sku").attr("pid");
	this.brandId = null;
	var that = this;
	lib.api.get({
		api: {
			c: 'deal',
			a: 'detail'
		},
		data: {
			productId: this.productId
		},
		success: function (data) {
			console.log(data);
			renderSku(data);
		},
		error: function (data) {
			console.log(data);
		},
		complete: function () {
			
		}
	});
	function renderSku(data){
		if(data.products.suxing && data.products.suxing[0].xxsx.length>1){
			var _that = this;
			this.evaDialog = new lib.Dialog({
				boxClass: '#sku-dialog',
				triggerClass: '.sku-trigger',
				onShow:function(){
					setTimeout(function () {
						$(".sku-dialog-box").css("-webkit-transform","translateY(0%)");
					}, 100);
					//$(".topbar").hide();
					//$("body").css("padding-top","0px");
					$(".ve-gotop").hide();
					$("body").css("overflow","hidden");
				},
				onHide:function(){
					//$(".topbar").show();
					//$("body").css("padding-top","40px");
					$(".ve-gotop").show();
					$("body").css("overflow","auto");
				}
			});
				
				
			if(data.products.suxing){
				var price_top = data.products.suxing[0].xxsx[0].is_phone_price == "1" ? data.products.suxing[0].xxsx[0].phone_price : data.products.suxing[0].xxsx[0].current_price;
			}else{
				var price_top = data.products.is_phone_price == "1" ? data.products.phone_price : data.products.current_price;
			}
			
			var html_top = '<ul id="dia-sku-top">';
				html_top += '<li>';
				html_top += '<img src="'+data.products.images[0].url+'" width="50">';
				html_top += '</li>';
				html_top += '<li class="sku-title">';
				html_top += '<h1>'+data.products.name+'</h1>';
				html_top += '<h2>';
				html_top += '<span class="price-big">￥<span id="sku-bigpri">'+price_top+'</span></span>';
				html_top += '<span class="price-small line-through">￥'+data.products.origin_price+'</span>';
				html_top += '</h2>';
				html_top += '</li>';
				html_top += '<li class="float-right pro-cancle">';
				html_top += '<img class="sku-cancel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyMEJBRURENzIwQzExRTRBREVGQjY5MjkzOEU1QzdEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyMEJBRURFNzIwQzExRTRBREVGQjY5MjkzOEU1QzdEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDIwQkFFREI3MjBDMTFFNEFERUZCNjkyOTM4RTVDN0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDIwQkFFREM3MjBDMTFFNEFERUZCNjkyOTM4RTVDN0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5pWN6tAAABBklEQVR42sTTzQ3CMAwF4PDENnSfTlMOwBIdoczT7kMsFSmEtPlxbFt6PbxcPqn2ZZ7nxTn38Nmc7dx8JvjP0+e9F5YYMrwItPqMhqgvhgwr9tIK9YOhAsGjNuoPE4M0UUMKkwJpoAizpDBHIEnUKeYMJIHKYnKgnqgiTAmoB6oYUwrioKowNaAWVDWmFlSDasK0gGLU0BPTCgpRS4RiYWiujFMOUePesTBcUIxyXAznl4kNFxTuTGqnVEHxAq89UOiEyV2fKCh32iwUOmPYKAhgWCgIYZpREMQ0oSCMqUZBAVOFghKmGAVFTBEKypgsCgaYUxSMMIcoGGKSKAJNhpgYdf8IMABOUYgZIYoSlgAAAABJRU5ErkJggg==">';
				html_top += '</li>';
				html_top += '</ul>';
			$(".pro-sku-top").html(html_top);
			$(".sku-cancel").on('click', function () {
				$(".sku-dialog-box").css("-webkit-transform","translateY(100%)");
				setTimeout(function () {
					$("#sku-dialog").hide();
					//$(".topbar").show();
					//$("body").css("padding-top","40px");
					$("body").css("overflow","auto");
				}, 300);
			});
			var sizehtml = "";
			if(data.products.suxing){
				for(var i=0;i<data.products.suxing[0].xxsx.length;i++){
					var p = data.products.suxing[0].xxsx[i].is_phone_price == "1"? data.products.suxing[0].xxsx['phone_price'] : data.products.suxing[0].xxsx[i].current_price;
					sizehtml += '<span barcode="'+data.products.suxing[0].xxsx[i].id+'" current_price="'+p+'" is_stock="'+data.products.suxing[0].xxsx[i].is_stock+'" select="false">'+data.products.suxing[0].xxsx[i].name+'</span>';
				}
			}
			var html_body = '<div class="sku-size" id="dia-sku-size"><h1>尺寸：</h1>';
			html_body += sizehtml + '</div><div class="sku-count">';
			html_body += '<span class="float-left">数量：</span><span class="float-right"><div id="J_Num1" class="num ctrl-number clearfix"><div class="minus J_Minus">-</div>            <input class="J_InputNum input-num" type="number" value="1">            <div class="add J_Add">+</div>    </div></span></div>';
			html_body += '<input id="sku-size" type="hidden" val="" value=""><input id="sku-color" type="hidden">';
			$(".pro-sku-body").html(html_body);
			var min_buy = parseInt(data.products.user_min_bought)==0 ? 1 : data.products.user_min_bought;
			var max_buy = parseInt(data.products.user_max_bought)==0 ? 999 : data.products.user_max_bought;
			this.number = new ctrl.number({
				el: '#J_Num1',
				step: 1,
				quantity: min_buy,
				min: min_buy,
				max: max_buy
			});
			if(data.products.suxing){
				if(data.products.suxing[0].xxsx.length >= 1){
					$(".sku-size span:eq(0)").attr("select","true");
					$(".sku-size span:eq(0)").css("border",parseInt($("html").attr("dataset").dpr)+"px solid #ff3862");
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
					$(".sku-size span").css("border",parseInt($("html").attr("dataset").dpr)+"px solid #333333");
					$(".sku-size span").css("color","#333333");

					$(this).attr("select","true");
					$(this).css("border",parseInt($("html").attr("dataset").dpr)+"px solid #ff3862");
					$(this).css("color","#ff3862");
					$("#sku-bigpri").html($(this).attr("current_price"));
				}else{
					$("#sku-size").val("");
					$(".sku-size span").css("border",parseInt($("html").attr("dataset").dpr)+"px solid #333333");
					$(".sku-size span").css("color","#333333");
					$(".sku-size span").attr("select","false");
				}
			});
			$(".pro-sku-foot span").click(function(){
				renderCart(data);
			});
		}else{
			$(".sku-trigger").click(function(){
				renderCart(data);
			});
		}
		
	}
	function renderCart(data){
            if(!lib.login.isLogin()){
                lib.storage.set('accessToken','');
            }
            var obj_attr ,obj_num ;
            if(data.products.suxing && data.products.suxing[0].xxsx.length>1) {
                obj_attr = $("#sku-size").val(), obj_num = $(this.number.$inputNum).attr("valueAsNumber");
            }else{
				if(data.products.suxing){
					obj_attr = data.products.suxing[0].xxsx[0].id;
					try{
						obj_num = data.products.suxing[0].xxsx[0].user_min_bought == "0" ? 1 : data.products.suxing[0].xxsx[0].user_min_bought;
						if(!obj_num){
							obj_num = data.products.user_min_bought == "0" ? 1 : data.products.user_min_bought;
						}
					}catch(e){
						obj_num = data.products.user_min_bought == "0" ? 1 : data.products.user_min_bought;
					}
				}else{
					obj_attr = '';
					obj_num = data.products.user_min_bought == "0" ? 1 : data.products.user_min_bought;
				}
                
            }


            var that = this;
			that.data = data;
            if (that.skusure_isAjax) {
                return;
            }
            that.goodsNumber = obj_num? obj_num : $(this.number.$inputNum).attr("valueAsNumber") ;
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
            console.log("["+JSON.stringify(obj)+"]");
                lib.api.get({
                    //needLogin:true,
                    api: {
                        c: 'shoping',
                        a: 'addtocart'
                    },
                    data: {
                        json: "["+JSON.stringify(obj)+"]",
                        accessToken:lib.storage.get('accessToken'),
                        buy_now:1
                    },
                    success: function (data) {
                        console.log(data);
                        //追踪放入购物车商品的数量
                        lib.h5log.log(["setCustomVariable", 4, "goodsNumber",that.goodsNumber , "page"]);
                        if(!(obj_attr==null) && obj_num){
                            if(!lib.login.isLogin()){
                                if(that.data.products.is_sea_label==0){
                                    setTimeout(function(){
                                        location.href = "http://h5.quxiu.me/direct-order-confirm.html?cartId="+data.cart_id;
                                    },50)
                                }else{
                                    setTimeout(function(){
                                        location.href="http://h5.quxiu.me/direct-order-confirm.html?proType=1&cartId="+data.cart_id; //+ that.cartType;
                                    },50)
                                }
                            }else{
                                if(that.data.products.is_sea_label==0){
									setTimeout(function(){
                                        location.href = "http://h5.quxiu.me/order-confirm.html";//+ that.cartType;
                                    },50)
                                }else{
									setTimeout(function(){
                                        location.href = "http://h5.quxiu.me/order-confirm.html?proType=1";
                                    },50)
                                }
                            }
                        }
                    },
                    error: function (data) {
                        if(data && data.desc != ""){
                            var desc = data.desc;
                        }else{
                            desc = "服务器开小差啦";
                        }
						alert(desc);
                        /*lib.notification.alert("服务器开小差啦", function() {
                            this.hide();
                        },{okText:'确定'}).show();*/
                    },
                    complete: function () {
                        that.skusure_isAjax = false;
                    }
                })
            
        }

})( this, Zepto );