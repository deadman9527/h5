/**
 * 加减数字控件
 *
 * @author 景烁
 *
 * @requires zepto
 * @requires underscore
 */

;(function(win, ctrl) {
	var $ = win['Zepto'];

    var tpl = '\
    <% if(isNeedHandle){ %>\
        <div class="minus J_Minus">-</div>\
    <% } %>\
        <input class="J_InputNum input-num" type="number" value="<%= quantity && quantity%>" />\
    <% if(isNeedHandle){ %>\
        <div class="add J_Add">+</div>\
    <% } %>';

    // 构造函数
    function Number(config) {

        var self = this;

        self.config = $.extend({

            // 必填，触发节点
            el: '',

            // 选填，是否需要加减操作，默认true
            isNeedHandle: true,

            // 选填, 默认输入框汇里数量
            quantity: false,

            // 选填，加减操作的步长，默认为1
            step: 1,

            // 选填，加减操作的步长，默认为1
            min: 0,

            // 选填，加减操作的步长，默认为999999999
            max: 999999999,
            cart:false,
            itemid:0

        }, config);

        self.$container = $(self.config.el);

        //如果节点存在
        if(self.$container.length > 0){

            //如果节点大于1个，则遍历后实例化
            if(self.$container.length > 1){

                $.each(self.$container,function(k,v){

                    new Number($.extend(self.config,{

                        el: v

                    }));

                });

                return;

            }

            //如果节点等于1个，则继续初始化
            else{

                this._init();

            }

        }else{

            return false;
        }

    }

    $.extend(Number.prototype, {

        /**
         * 初始化
         */
        _init: function() {

            this.addHandler = this.config.onAdd;
            this.minusHandler = this.config.onMinus;
            this.blurHandler = this.config.onBlur;

            var self = this;

            self.$container.addClass('ctrl-number clearfix')

            if(!self.config.isNeedHandle){

                self.$container.addClass('no-handle');

            }

            self.max = self.config.max;

            self.min = self.config.min;

            self.step = self.config.step;

            self.isNeedHandle = self.config.isNeedHandle;

            self.cart = self.config.cart;

            self.itemid = self.config.itemid;

            self._render(self.$container,self.config);

            self._bindEvent(self.$container);

            setTimeout(function(){

                self.$container.trigger('number:after:render',{});

            },100);

        },

        /**
         * 渲染dom
         */
        _render: function(node,data){

            var self = this;

            node.html(_.template(tpl)(data));

            self.$inputNum = node.find('.J_InputNum');
            if(node.attr("defnum")){
                node.find(".J_InputNum").val(node.attr("defnum"));
                if(node.attr("defnum")==node.attr("max")){
                    node.find(".J_Add").addClass("add-disabled");
                }
            }
            if(node.attr("itemid")){
                self.itemid = node.attr("itemid");
            }


            if(self.isNeedHandle){

                self.$add = node.find('.J_Add');

                self.$minus = node.find('.J_Minus');

            }

        },

        /**
         * 绑定事件
         */
        _bindEvent: function(node){

            var self = this,

                step = self.step;

            self.$add && self.$add.on('click',function(e){

                if($(this).hasClass('add-disabled')){

                    return;
                }

                var val = parseInt(self.$inputNum.val(),10) + step;

                self._dealInputHandle(val,node,'add',1);

            });

            self.$minus && self.$minus.on('click',function(e){

                if($(this).hasClass('minus-disabled')){

                    return;

                }

                var val = parseInt(self.$inputNum.val(),10) - step;

                self._dealInputHandle(val,node,'minus',-1);

            });


            self.$inputNum.on('blur',function(e){

                var val = self.$inputNum.val();

                // console.log('blur ' + val);

                if(isNaN(val)){

                    val = self.min;

                    self.$inputNum.val(val);

                }

                if(val != self.lastFocusVal){

                    self._dealInputHandle(val,node,'blur',parseInt(val-self.lastFocusVal));

                }

            });

            self.$inputNum.on('focus',function(e){

                var val = parseInt(self.$inputNum.val(),10);

                // console.log('focus ' + val);

                self.lastFocusVal = val;

            });

        },

        /**
         * 处理value值和操作按钮的禁用状态以及触发相应事件
         */
        _dealInputHandle: function(val,node,fireType,addNum){
            var self = this;
            if(self.cart){
                min = parseInt($(node).attr("min"));
                max = parseInt($(node).attr("max"));
                /*if(fireType=="blur"){
                    var lastNum = parseInt($(".hjNum").html()),lastNum2 = parseInt($(".jsNum").html());
                    $(".hjNum").html(lastNum+parseInt($(node).attr("price"))*addNum);
                    $(".jsNum").html(lastNum2+parseInt(parseInt($(node).attr("origin_price"))-parseInt($(node).attr("price")))*addNum);
                }*/

            }else{
                min=self.min;
                max=self.max;
            }


            if (isNaN(val) || val <= min) {

                if((val < min) && (fireType == 'blur')){

                    node.trigger('number:less:min',{lessNum:val,nowNum:min});

                }

                val = min;

                self.$add && self.$add.removeClass('add-disabled');

                self.$minus && self.$minus.addClass('minus-disabled');

                if(self.cart){
                    if(fireType=="add")
                        self.addHandler && self.addHandler();
                    if(fireType=="minus")
                        self.minusHandler && self.minusHandler();
                    if(fireType=="blur")
                        self.blurHandler && self.blurHandler();
                }

            }
            else if(val > min && val < max){

                self.$minus && self.$minus.removeClass('minus-disabled');

                self.$add && self.$add.removeClass('add-disabled');

                if(self.cart){
                    if(fireType=="add")
                        self.addHandler && self.addHandler();
                    if(fireType=="minus")
                        self.minusHandler && self.minusHandler();
                    if(fireType=="blur")
                        self.blurHandler && self.blurHandler();
                }
            }
            else if(val >= max){

                if((val > max) && (fireType == 'blur')){

                    node.trigger('number:over:max',{overNum:val,nowNum:max});

                }

                val = max;

                self.$minus && self.$minus.removeClass('minus-disabled');

                self.$add && self.$add.addClass('add-disabled');

                if(self.cart){
                    if(fireType=="add")
                        self.addHandler && self.addHandler();
                    if(fireType=="minus")
                        self.minusHandler && self.minusHandler();
                    if(fireType=="blur")
                        self.blurHandler && self.blurHandler();
                }
            }

            self.$inputNum.val(val);

            node.trigger('number:change',{nowNum:val,fireType:fireType});

        }

    });

    /*
     * 绑定到fn，使组件可链式使用，kimi推荐这样的方式
     * 如果组件和node节点无关，组件可不用绑定fn，支持默认new初始化即可
     */
    $.fn.number = function(config) {
        config = config || {};

        //node节点
        config.el = this;

        return new Number(config);
    };

    // export
    ctrl.number = Number;

})(window, window['ctrl'] || (window['ctrl'] = {}))