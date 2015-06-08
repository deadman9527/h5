;(function(win, ctrl) {

    var incId = 0;
    function searchBar(element, options) {
        var that = this;
        var id = Date.now() + '-' + (++incId); // 每个控件有唯一的id
        var root = document.createDocumentFragment(); // 文档片段，用于append时提高效率

        if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
            // 参数个数的兼容判断
            options = arguments[0];
            element = null;
        }
        if (!element) {
            // 如果不是从已有DOM元素创建控件，则可以新建一个元素
            element = document.createElement('div');
            root.appendChild(element);
        }
        
        options = options || {};
        element.setAttribute('data-ctrl-name', 'searchBar');
        element.setAttribute('data-ctrl-id', id);

        if(options.withIcon){
            if(options.iconNum <=3 &&options.iconNum >0){
                var num = options.iconNum;
                var icons = '';
                while(num!=0){
                    icons += '<div class="search-icons"></div>';
                    num--;
                }
                element.innerHTML = ' <div class="search-wraper"><div class="search-mid ready-wraper"><div class="search-ready search-ready-short"><i class="searchbar-iconfont">&#xe600</i><span class="placeholder">搜索宝贝、店铺</span></div>'+icons+'</div><div id="mySearch" class="search-mid" style="display:none"><img class="clear-text" src="http://img1.tbcdn.cn/tfscom/TB1TifqFVXXXXaDXXXXEDhGGXXX-32-32.png" alt=""><input type="text" class="search-text"> <div class="search-func search-submit">搜索</div><div class="search-func search-cancel">取消</div></div></div>';
            }else{
                throw new Error('If you wanna icons , iconNum should at 1~3 ');
            }      
        }else{
            element.innerHTML = '<div class="search-wraper"><div class="search-ready search-ready-long ready-wraper"><i class="searchbar-iconfont">&#xe600</i><span class="placeholder">搜索宝贝、店铺</span></div><div id="mySearch" class="search-mid" style="display:none"><img class="clear-text" src="http://img1.tbcdn.cn/tfscom/TB1TifqFVXXXXaDXXXXEDhGGXXX-32-32.png" alt=""><input type="text" class="search-text"><div class="search-func search-submit">搜索</div><div class="search-func search-cancel">取消</div></div</div>';
        }

        //-------------------------------------------------------------------------

        // 搜索条的placeholder内容
        var placeholder;
        Object.defineProperty(this, 'placeholder', {
            get: function() {
                return placeholder;
            },

            set: function(v) {
                var myPlaceholder = element.querySelector('.placeholder');
                myPlaceholder.innerHTML = v + '';
                placeholder = v;
            }
        });
        this.placeholder = options.placeholder || '搜索宝贝、店铺'; 

        // 提交按钮的内容
        var submitText;
        Object.defineProperty(this, 'submitText', {
            get: function() {
                return submitText;
            },

            set: function(v) {
                if (typeof v === 'string' && getLength(v) <=4) { 
                    var submit = element.querySelector('.search-submit');
                    submit.innerHTML = v + '';
                    submitText = v;
                } else {
                    throw new Error('Non expected value or out of 4 words');
                }
            }
        });
        this.submitText = options.submitText || '搜索'; 

        //取消按钮的内容
        var cancelText;
        Object.defineProperty(this, 'cancelText', {
            get: function() {
                return cancelText;
            },

            set: function(v) {
                if (typeof v === 'string' && getLength(v) <=4) { 
                    var cancel = element.querySelector('.search-cancel');
                    cancel.innerHTML = v + '';
                    cancelText = v;
                } else {
                    throw new Error('Non expected value or out of 4 words');
                }
            }
        });
        this.cancelText = options.cancelText || '取消'; 

        // 3个icon图片的url
        var iconUrl;
        Object.defineProperty(this, 'iconUrl', {
            get: function() {
                return iconUrl;
            },

            set: function(v) {
                if (Object.prototype.toString.call(v) === '[object Array]' && v.length <=options.iconNum) { 
                    var icons = element.querySelectorAll('.search-icons');
                    for(var i = 0;i < v.length; i++){
                        icons[i].style.background = 'url(' + v[i] + ') no-repeat';
                        icons[i].style.backgroundSize = '100% 100%';
                    }
                    iconUrl = v.slice();
                } else {
                    throw new Error('Non expected value or url out of iconNum');
                }
            }
        });
        if(options.withIcon){
            this.iconUrl = options.iconUrl || []; 
        }
        

        //-------------------------------------------------------------------------

        //init操作
        function init(){
            var searchReady = element.querySelector('.search-ready');
            var cancel = element.querySelector('.search-cancel');
            var clear = element.querySelector('.clear-text');
            var submit = element.querySelector('.search-submit');
            var search = element.querySelector('.search-text');

            cancel.addEventListener('click',hideSearch,false)
            searchReady.addEventListener('click',showSearch,false);
            clear.addEventListener('click',clearText,false);
            submit.addEventListener('click',throwSubmit,false);
            search.addEventListener('input',function(){
                if(!!search.value){
                    clear.style.display = 'inline';
                }else{
                    clear.style.display = 'none';
                }
            })
            if(options.withIcon){
                var icons = element.querySelectorAll('.search-icons');
                for(var i = 0; i < icons.length ; i++){
                    icons[i].index = i;
                    icons[i].addEventListener('click',throwIcon,false);
                }
            }
        }
        
        //显示搜索条
        function showSearch(){
            var mySearch = element.querySelector('#mySearch');
            var ready = element.querySelector('.ready-wraper');
            ready.style.display = 'none';
            mySearch.style.display = '-webkit-box';
            element.querySelector('.search-text').focus();
        }
        
        //取消显示搜索条
        function hideSearch(){
            var mySearch = element.querySelector('#mySearch');
            var ready = element.querySelector('.ready-wraper');
            mySearch.style.display = 'none';
            ready.style.display = !!options.withIcon? '-webkit-box' : 'block';
        }
        
        //清理输入栏
        function clearText(){
            var clear = element.querySelector('.clear-text');
            element.querySelector('.search-text').value='';
            clear.style.display = 'none';
        }
        
        //触发提交事件
        function throwSubmit(){
            var event = document.createEvent('HTMLEvents');
            event.initEvent("submit", false, false);
            event.submitMsg = element.querySelector('.search-text').value;
            root.dispatchEvent(event);
        }
        
        //入口点击事件
        function throwIcon(){
            var event = document.createEvent('HTMLEvents');
            event.initEvent("iconclick", false, false);
            event.iconIndex = this.index;
            root.dispatchEvent(event);
        }
        
        //计算字符串长度的辅助函数，中文为2，其他为1
        function getLength(str){
            var cnReg = /[\u4e00-\u9fa5]/;
            var realLength = 0;
            for(var i = 0; i < str.length ; i++){
                if(cnReg.test(str[i])){
                    realLength += 2;
                }else{
                    realLength += 1;
                }
            }
            return realLength;
        }

        //-------------------------------------------------------------------------

        // 事件代理
        this.addEventListener = function() {
            element.addEventListener.apply(element, arguments);
        }

        this.removeEventListener = function() {
            element.removeEventListener.apply(element, arguments);
        }

        // 移除控件元素
        this.remove = function() {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }

        init();
        this.element = element;
        this.root = root;
        //-------------------------------------------------------------------------
    }

    ctrl.searchbar = searchBar;

})(window, window['ctrl'] || (window['ctrl'] = {}));