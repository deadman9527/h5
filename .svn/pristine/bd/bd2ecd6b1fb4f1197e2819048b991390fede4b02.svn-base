/**
 * 选择省市区
 *
 * @requires
 * js:  ../../shares/ctrl/ctrl-selectmenu/build/selectmenu.js
 * css: @import "../../../shares/ctrl/ctrl-selectmenu/build/selectmenu.css";
 *
 * @use
 *
 app.selectAddress.init({
        confirmText: '',
        title: '',
        cancelText: '',
        trigger: '',  // html element object
        onConfirm: function (selectedValue) {}
      })
 *
 * @author 景烁
 *
 */
;(function ($, app) {

    var instance;
    var caches = {};
    var startDate = '2010-1-1',endDate = '2016-1-1',lastYear=false,lastMonth=false;
    function getArea (areaId, cb) {
        caches = {};
        if (caches[areaId]) {
            cb(caches[areaId]);
            return;
        }
        var data = [];
        if(areaId == 1){
            for(var i=0;i<(parseInt(endDates[0])-parseInt(startDates[0]) + 1);i++){
                var obj = new Object();
                obj.name = (i+parseInt(startDates[0]))+"年";
                obj.id = i+2;
                data.push(obj);
            }
            //data = [{id:2,name:"1年"},{id:3,name:"2年"}];
            cb(data);
            caches[areaId] = data;
        }
        if(areaId >= 2 && areaId <= 19){
            if(endDates[0] == startDates[0]){
                lastYear = true;
                for(var i=(parseInt(startDates[1])-1);i<parseInt(endDates[1]);i++){
                    var obj = new Object();
                    obj.name = i+1+"月";
                    obj.id = i+21;
                    data.push(obj);
                }
            }else{
                if(areaId == 2){
                    lastYear = false;
                    for(var i=(parseInt(startDates[1])-1);i<12;i++){
                        var obj = new Object();
                        obj.name = i+1+"月";
                        obj.id = i+21;
                        data.push(obj);
                    }
                }else{
                    if(areaId == (2 + parseInt(endDates[0])-parseInt(startDates[0])) ){
                        console.log("lastYear");
                        lastYear = true;
                        for(var i=0;i<parseInt(endDates[1]);i++){
                            var obj = new Object();
                            obj.name = i+1+"月";
                            obj.id = i+21;
                            data.push(obj);
                        }
                    }else{
                        lastYear = false;
                        for(var i=0;i<12;i++){
                            var obj = new Object();
                            obj.name = i+1+"月";
                            obj.id = i+21;
                            data.push(obj);
                        }
                    }

                }
            }

            //data = [{id:21,name:"1月"},{id:22,name:"2月"}];
            cb(data);
            caches[areaId] = data;
        }
        if(areaId >= 21 && areaId <= 32){
            var allday = 30;
            var monday = [21,23,25,27,28,30,32];
            if(areaId == 22){
                allday = 28;
            }else if(areaId == 21 || areaId == 23 || areaId == 25 || areaId == 27 || areaId == 28 || areaId == 30 || areaId == 32){
                allday = 31;
            }
            if(endDates[0] == startDates[0]){
                if(areaId == 21){
                    for(var i=(parseInt(startDates[2])-1);i<allday;i++){
                        var obj = new Object();
                        obj.name = i+1+"日";
                        obj.id = i+41;
                        data.push(obj);
                    }
                }else{
                    if(areaId == 21 + parseInt(endDates[1])-parseInt(startDates[1])){
                        for(var i=0;i<parseInt(endDates[2]);i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }else{
                        for(var i=0;i<allday;i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }

                }
            }
            else{
                if(lastYear && areaId == 21 + parseInt(endDates[1])-parseInt(startDates[1])){
                    for(var i=0;i<parseInt(endDates[2]);i++){
                        var obj = new Object();
                        obj.name = i+1+"日";
                        obj.id = i+41;
                        data.push(obj);
                    }
                }else{
                    if(areaId == 21 && !lastYear){
                        for(var i=(parseInt(startDates[2])-1);i<allday;i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }else{
                        //if(areaId == 21 + )
                        for(var i=0;i<allday;i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }
                }
            }
            //data = [{id:41,name:"1r"},{id:42,name:"2r"}];
            cb(data);
            caches[areaId] = data;
        }
    }

    function initData (opts){
        var defaultAddr = {};
        var addrData = {};
        var id = opts.id || 1;
        var deep = opts.deep || 3;
        var cb = opts.onReady;
        var deepMap = {
            3: 'year',
            2: 'month',
            1: 'day'
        };

        startDate = opts.startDate || startDate,endDate = opts.endDate || endDate;
        startDates = startDate.split("-"),endDates = endDate.split("-");

        getArea(id, function (addrs) {
            var grade = deepMap[deep];

            addrData[grade] = [];
            addrs.forEach(function (data, index) {
                var addr = {
                    key: data.name,
                    value: data.id,
                    selected: index === 0
                };
                addrData[grade].push(addr);

                if (index === 0) {
                    defaultAddr[grade] = addr;
                }
            });

            deep--;
            if (deep < 1) {
                cb && cb(addrData);
            } else {
                getArea(defaultAddr[grade].value, arguments.callee);
            }
        })
    }

    function init(addrData, opts){
        opts = opts || {};


        var SelectMenu = ctrl.selectmenu;
        instance = new SelectMenu({
            confirmText: opts.confirmText || '确定',
            title: opts.title || '',
            cancelText: opts.opts || '取消',
            trigger: opts.trigger
        });

        instance.viewModel = addrData;

        instance.addEventListener('confirm', function (e) {
            opts.onConfirm(this.selectedValue);
        });

        instance.addEventListener('select', function (colName) {
            var selectedId = this.selectedValue['val-' + colName];
            //console.log(selectedId);
            var that = this;

            if (colName == 'year') {
                initData({
                    id: selectedId,
                    deep: 2,
                    onReady: function (data) {
                        that.linkage('month', data.month);
                        that.linkage('day', data.day);
                    }
                })
            } else if (colName == 'month') {
                initData({
                    id: selectedId,
                    deep: 1,
                    onReady: function (data) {
                        that.linkage('day', data.day);
                    }
                })
            }
        });

        if(opts.appendDom){
            opts.appendDom.appendChild(instance.root);
        }else{
            document.body.appendChild(instance.root);
        }
    }

    app.selectAddress = {
        init: function (opts) {
            console.log(opts);
            initData({
                onReady: function (data) {
                    init(data, opts);
                },
                startDate:opts.startDate,
                endDate:opts.endDate
            });

        }
    };

})(Zepto,  window['app'] || (window['app'] = {}))
;(function ($, app2) {

    var instance;
    var caches = {};
    var startDate = '2010-1-1',endDate = '2016-1-1',lastYear=false,lastMonth=false;
    function getArea (areaId, cb) {
        caches = {};
        if (caches[areaId]) {
            cb(caches[areaId]);
            return;
        }
        var data = [];
        if(areaId == 1){
            for(var i=0;i<(parseInt(endDates[0])-parseInt(startDates[0]) + 1);i++){
                var obj = new Object();
                obj.name = (i+parseInt(startDates[0]))+"年";
                obj.id = i+2;
                data.push(obj);
            }
            //data = [{id:2,name:"1年"},{id:3,name:"2年"}];
            cb(data);
            caches[areaId] = data;
        }
        if(areaId >= 2 && areaId <= 19){
            if(endDates[0] == startDates[0]){
                lastYear = true;
                for(var i=(parseInt(startDates[1])-1);i<parseInt(endDates[1]);i++){
                    var obj = new Object();
                    obj.name = i+1+"月";
                    obj.id = i+21;
                    data.push(obj);
                }
            }else{
                if(areaId == 2){
                    lastYear = false;
                    for(var i=(parseInt(startDates[1])-1);i<12;i++){
                        var obj = new Object();
                        obj.name = i+1+"月";
                        obj.id = i+21;
                        data.push(obj);
                    }
                }else{
                    if(areaId == (2 + parseInt(endDates[0])-parseInt(startDates[0])) ){
                        console.log("lastYear");
                        lastYear = true;
                        for(var i=0;i<parseInt(endDates[1]);i++){
                            var obj = new Object();
                            obj.name = i+1+"月";
                            obj.id = i+21;
                            data.push(obj);
                        }
                    }else{
                        lastYear = false;
                        for(var i=0;i<12;i++){
                            var obj = new Object();
                            obj.name = i+1+"月";
                            obj.id = i+21;
                            data.push(obj);
                        }
                    }

                }
            }

            //data = [{id:21,name:"1月"},{id:22,name:"2月"}];
            cb(data);
            caches[areaId] = data;
        }
        if(areaId >= 21 && areaId <= 32){
            var allday = 30;
            var monday = [21,23,25,27,28,30,32];
            if(areaId == 22){
                allday = 28;
            }else if(areaId == 21 || areaId == 23 || areaId == 25 || areaId == 27 || areaId == 28 || areaId == 30 || areaId == 32){
                allday = 31;
            }
            if(endDates[0] == startDates[0]){
                if(areaId == 21){
                    for(var i=(parseInt(startDates[2])-1);i<allday;i++){
                        var obj = new Object();
                        obj.name = i+1+"日";
                        obj.id = i+41;
                        data.push(obj);
                    }
                }else{
                    if(areaId == 21 + parseInt(endDates[1])-parseInt(startDates[1])){
                        for(var i=0;i<parseInt(endDates[2]);i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }else{
                        for(var i=0;i<allday;i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }

                }
            }
            else{
                if(lastYear && areaId == 21 + parseInt(endDates[1])-parseInt(startDates[1])){
                    for(var i=0;i<parseInt(endDates[2]);i++){
                        var obj = new Object();
                        obj.name = i+1+"日";
                        obj.id = i+41;
                        data.push(obj);
                    }
                }else{
                    if(areaId == 21 && !lastYear){
                        for(var i=(parseInt(startDates[2])-1);i<allday;i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }else{
                        //if(areaId == 21 + )
                        for(var i=0;i<allday;i++){
                            var obj = new Object();
                            obj.name = i+1+"日";
                            obj.id = i+41;
                            data.push(obj);
                        }
                    }
                }
            }
            //data = [{id:41,name:"1r"},{id:42,name:"2r"}];
            cb(data);
            caches[areaId] = data;
        }
    }

    function initData (opts){
        var defaultAddr = {};
        var addrData = {};
        var id = opts.id || 1;
        var deep = opts.deep || 3;
        var cb = opts.onReady;
        var deepMap = {
            3: 'year',
            2: 'month',
            1: 'day'
        };

        startDate = opts.startDate || startDate,endDate = opts.endDate || endDate;
        startDates = startDate.split("-"),endDates = endDate.split("-");

        getArea(id, function (addrs) {
            var grade = deepMap[deep];

            addrData[grade] = [];
            addrs.forEach(function (data, index) {
                var addr = {
                    key: data.name,
                    value: data.id,
                    selected: index === 0
                };
                addrData[grade].push(addr);

                if (index === 0) {
                    defaultAddr[grade] = addr;
                }
            });

            deep--;
            if (deep < 1) {
                cb && cb(addrData);
            } else {
                getArea(defaultAddr[grade].value, arguments.callee);
            }
        })
    }

    function init(addrData, opts){
        opts = opts || {};


        var SelectMenu = ctrl.selectmenu;
        instance = new SelectMenu({
            confirmText: opts.confirmText || '确定',
            title: opts.title || '',
            cancelText: opts.opts || '取消',
            trigger: opts.trigger
        });

        instance.viewModel = addrData;

        instance.addEventListener('confirm', function (e) {
            opts.onConfirm(this.selectedValue);
        });

        instance.addEventListener('select', function (colName) {
            var selectedId = this.selectedValue['val-' + colName];
            //console.log(selectedId);
            var that = this;

            if (colName == 'year') {
                initData({
                    id: selectedId,
                    deep: 2,
                    onReady: function (data) {
                        that.linkage('month', data.month);
                        that.linkage('day', data.day);
                    }
                })
            } else if (colName == 'month') {
                initData({
                    id: selectedId,
                    deep: 1,
                    onReady: function (data) {
                        that.linkage('day', data.day);
                    }
                })
            }
        });

        if(opts.appendDom){
            opts.appendDom.appendChild(instance.root);
        }else{
            document.body.appendChild(instance.root);
        }
    }

    app2.selectAddress = {
        init: function (opts) {
            console.log(opts);
            initData({
                onReady: function (data) {
                    init(data, opts);
                },
                startDate:opts.startDate,
                endDate:opts.endDate
            });

        }
    };

})(Zepto,  window['app2'] || (window['app2'] = {}))
/**
 * h5.ve.cn 之首页
 *
 * @author 景烁
 *
 * */
;(function ($, Global) {
    var today=new Date(), d=today.getDate(),m=today.getMonth()+1,y=today.getFullYear();
    var nextDate = new Date(new Date().getTime()+30*24*3600*1000*10);//十个月后时间
    var nd=nextDate.getDate(),nm=nextDate.getMonth()+ 1,ny=nextDate.getFullYear();
    var ua = window.navigator.userAgent.toLowerCase();
    //alert(ua);
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
    Global.formatTitleLink = function (link, title,alias) {
        /*if (!title) {
         link = link.replace('http://h5.ve.cn/', '');
         return link;
         }*/
        var url = new lib.httpurl(link);
        url.params.title = title ? title : "";
        var oldUrl = url.toString().replace('http://h5.ve.cn/', '');

        var host = 'http://' + location.host;
        var alias_url = alias ? alias : "" ;
        var nUrl = new lib.httpurl(host + "/" + alias_url + "brandcate-" + url.params.brandId + ".html");
        nUrl.params.brandId = url.params.brandId;
        nUrl.params.title = title? title : "";
        var newUrl = nUrl.toString();
        var reUrl = SEMURL ? newUrl : oldUrl;
        return reUrl;
    };
    function comptime(beginTime,endTime) {
        var beginTime =beginTime || "2015-03-21 00:00:00";
        var endTime = endTime;

        var newstr = beginTime.replace(/-/g,'/');
        var date =  new Date(newstr);
        var time_str = date.getTime().toString();

        var beginTimes = beginTime.substring(0, 10).split('-');

        beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
        var a = (endTime - time_str) / 3600 / 1000;
        if (a < 0) {
            return false;
        } else if (a > 0) {
            return true;
        } else if (a == 0) {
            return false;
        } else {
            return false;
        }
    }

    var docEl = document.documentElement;
    var winW;
    var main = {
        init: function (opts) {
            if(register_r){
                lib.storage.set('register_r',register_r);
            }else{
                lib.storage.set('register_r',null);
            }

            if(!lib.storage.get("register_real")){
                //alert(1);
                winW = $(document).width();
                $('.realPropagation').show();
                lib.storage.set('register_real',true);
                //var pro = setTimeout(function(){
                //    $('.realPropagation').hide();
                //},5000);

                var target = $('.realPropagation')[0];
                target.addEventListener('click',function(){
                    $('.realPropagation').hide();
                });
            }else{
                this.renderFlash();
            }

            var url = new lib.httpurl(location.href);
            var pid = url.params.pid ? url.params.pid : "";
            lib.storage.set('pid',pid);

            // gotop
            new lib.goTop();
            this.topbar = new ctrl.topBar({
                isIndex: true
            });
            $("body").prepend('<div class="bottomdown"><span class="close-down"></span><img id="downapp" src="http://img01.ve.cn/party/f07a403d1f73dd32709bdd40113da56d.jpg" /></div>');
            $(".topbar").css("position","relative");
            $("body").css("padding-top","0px");
            $(".close-down").click(function(){
                $(".bottomdown").remove();
            });
            $('#downapp').on('click', function(e) {
                var schema = "http://h5.ve.cn/index.html";
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });

            console.log(ctrl.topBar.getInfo().height);
            if(ctrl.topBar && ctrl.topBar.getInfo){
                $('#target-fix')[0].style.top = -ctrl.topBar.getInfo().height||0+'px';
            }

            this.opts = opts;

            winW = docEl.getBoundingClientRect().width;
            this.page = 1;
            this.guideId='';
            this.cd = [];

            // 初始化lazyload
            lib.lazyload.init();

            // 初始化scroll load
            var that = this;
            this.infiniteScroll = lib.infiniteScroll.init({
                bufferPx: 200, // 距离低端px就触发onNear事件
                time: 100, // 设置延迟触发onNear
                onNear: function () {
                    that.loadBrands();
                },
                end: function () {
                    return that.isEnd;
                },
                onEnd: function () {
                    that.hideTip('加载已完成!');
                },
                onScroll: function () {
                    that.showTip('努力加载中...');
                }
            });


            //this.addEvents();
            /*imgdom = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANVJREFUeNpiYKAQMKIL/P//3wBI5QOxAprUAyCeyMjIeAGnAUDNAUBqPVTxBiD+iCQdDzU0EGjIBqzOARpwH4j343IuUG49SA0DHgUg4IBH3gGqxgAmxoJF3X6gAkJhJ4DPgAVAnADEjWji9Uhy+L3wH4sTkOWQvclEaToYNWAwGIAtrokBeNMBKLdhBUA5R0IuOA/FAljkBKByeHOjARC/x5aloVn5PXJOJJRl+5HEGqBiAcQGZgFUQwIUg0ABKbEB8u98pFCfT260rodiAQZaAYAAAwDBeO25t6tIxQAAAABJRU5ErkJggg==" />';
            if(lib.storage.get("guideFilter")){
                this.filter = lib.storage.get("guideFilter");
                this.render(this.filter);
                switch (this.filter) {
                    case 0:
                        this.topbar.setIndexName(imgdom+'全部');
                        break;
                    case 1:
                        this.topbar.setIndexName(imgdom+"婴幼儿");
                        break;
                    case 2:
                        this.topbar.setIndexName(imgdom+"孕妇");
                        break;
                    case 3:
                        this.topbar.setIndexName(imgdom+"小童");
                        break;
                    case 4:
                        this.topbar.setIndexName(imgdom+"男童");
                        break;
                    case 5:
                        this.topbar.setIndexName(imgdom+"女童");
                        break;
                }
                that.renderBottomBar();
                this.render(this.filter);
             }else{
                if(!lib.storage.get("guideOver")){
                    $("#guide").show();
                    this.renderAge();
                }else{
                    that.renderBottomBar();
                    this.render(0);
                    this.topbar.setIndexName(imgdom+"我的定制");
                }
            }*/
            that.renderBottomBar();
            this.render(0);
        },
        renderFlash:function(){
            var myDate = new Date();
            comptime(null,myDate.getTime());//若返回true，则说明当前时间大
            $.ajax({
                url: "http://act.ve.cn/data/indexflash.json",
                data: {},
                dataType: 'json',
                //jsonpCallback: 'jsonp',
                success: function (data) {
                    var data = data.data;
                    if(!lib.storage.get("indexFlash")){
                        lib.storage.set("indexFlash",[]);
                    }
                    var indexFlash = lib.storage.get("indexFlash"),isSync=false;
                    if(data.length > 0){
                        for(var i=0;i<data.length;i++){
                            if(indexFlash.length > 0){
                                for(var val in indexFlash){
                                    if( data[i].id == indexFlash[val]){
                                        isSync = true;
                                        break;
                                    }
                                }
                            }else{
                                //if( 1 ){
                                if( comptime(data[i].startDate,myDate.getTime()) && !comptime(data[i].endDate,myDate.getTime())){
                                    $("body").append('<div class="flashbg"></div>');
                                    indexFlash.push(data[i].id);
                                    lib.storage.set("indexFlash",indexFlash);
                                    if(data[i].color){
                                        $(".flashbg").css("background","#"+data[i].color);
                                    }else{
                                        $(".flashbg").css("background","#ff3862");
                                    }
                                    $(".flashbg").html('<span class="close" id="flash-close" ></span><a href="'+data[i].targetUrl+'"><div class="flash lazy" id="flash" dataimg="'+data[i].img+'" > </div></a>');
                                    isSync=false;
                                    break;
                                }else{
                                    isSync=true;
                                }
                            }
                            if(isSync){
                                break;
                            }
                        }
                        if(!isSync){
                            $(".flashbg").show();
                            $("body").css("overflow","hidden");
                            $("#flash-close").on("click",function(){
                                $(".flashbg").hide();
                                $("body").css("overflow","auto");
                            });
                            lib.lazyload.trigger();
                            setTimeout(function () {
                                $(".flashbg").remove();
                            }, 5000);
                        }else{
                            $(".flashbg").hide();
                            $("body").css("overflow","auto");
                        }
                        //console.log(22,data);
                    }
                },
                error: function (xhr, errorType, error) {
                },
                complete: function (xhr, status) {
                    //opts.complete && opts.complete();
                }
            })
        },
        renderBottomBar:function(){
            //if(lib.storage.get('ve_new_version')){
            this.bottombar = new ctrl.bottomBar({
                hoverIndex:0,
                showBottom:true,
                showApp:false,
                showCircle:false
            });
            //}

            $('#callApp').on('click', function(e) {
                //window.location = "vecn://h5.ve.cn/index.html";
                //lib.callapp.applink();
                var schema = "http://h5.ve.cn/index.html";
                //schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });
        },
        renderAge:function(){
            var that = this;
            $(".guide-status span").on("click",function(){
                $("#guide").hide();
                lib.storage.set("guideOver",1);
                that.renderBottomBar();
                that.render(0);
                that.topbar.setIndexName(imgdom+"我的定制");
            });
            $(".guide-main a").on("click",function(){
                that.guideType = parseInt($(this).attr("guideType"));
                //lib.storage.set("guideType",parseInt($(this).attr("guideType")));
            });
            this.renderGuide();
        },
        renderGuide:function(){
            var that = this;
            app.selectAddress.init({
                confirmText: '',
                title: '出生日期',
                cancelText: '',
                startDate:'2001-1-1',
                endDate:y+'-'+m+'-'+d,
                trigger: document.getElementsByClassName('guideA'),  // html element object
                appendDom:document.getElementById('guide'),
                onConfirm: function (selectedValue) {
                    var od=parseInt(selectedValue['key-day']),om=parseInt(selectedValue['key-month']),oy=parseInt(selectedValue['key-year']);
                    var babyType = that.guideType || 1;//babyType=3;孕妈,babyType=1;王子,babyType=2;公主
                    var birthday = oy+"-"+om+"-"+od, old = 0;
                    if(d >= od){
                        if(m >= om){
                            old = y - oy;
                        }else{
                            old = y - oy - 1;
                        }
                    }else{
                        old = y - oy - 1;
                    }
                    that.selectTime(birthday,babyType,old);
                }
            });
            app2.selectAddress.init({
                confirmText: '',
                title: '预产期',
                cancelText: '',
                startDate:y+'-'+m+'-'+d,
                endDate:ny+'-'+nm+'-'+d,
                trigger: document.querySelector('#guideB'),  // html element object
                appendDom:document.getElementById('guide'),
                onConfirm: function (selectedValue) {
                    var od=parseInt(selectedValue['key-day']),om=parseInt(selectedValue['key-month']),oy=parseInt(selectedValue['key-year']);
                    var babyType = that.guideType || 1;//babyType=3;孕妈,babyType=1;王子,babyType=2;公主
                    var birthday = oy+"-"+om+"-"+od, old = 0;
                    if(d >= od){
                        if(m >= om){
                            old = y - oy;
                        }else{
                            old = y - oy - 1;
                        }
                    }else{
                        old = y - oy - 1;
                    }
                    that.selectTime(birthday,babyType,old);
                }
            });
        },
        selectTime:function(birthday,babyType,old){
            if(!lib.login.isLogin()){
                //登录后同步，并删除
                lib.storage.set("guideBirthday",birthday);
                lib.storage.set("guideBabytype",babyType);
                this.renderGuideOld(old);
            }else{
                lib.api.get({
                    needLogin:true,
                    api: {
                        c: 'user',
                        a: 'loadbaby'
                    },
                    data: {
                        sex:babyType,
                        birthday:birthday
                    },
                    success: function (data) {
                        lib.storage.set("guideFilter",parseInt(data.data.filter));
                        //console.log(data);
                        location.reload();
                    },
                    error: function () {
                        if (data && data.desc) {
                            console.log(data.desc);
                            lib.notification.alert(data.desc, function() {
                                this.hide();
                            }).show();
                        }
                    },
                    complete: function () {
                    }
                });
            }

        },
        renderGuideOld:function(old){
            var that = this;
            if(that.guideType == 3){//孕妈
                that.filter = 2;
            }else if(that.guideType == 2){//公主
                if(old > 6){
                    that.filter = 5;
                }else if(old >= 3 && old <= 6){
                    that.filter = 3;
                }else{
                    that.filter = 1;
                }
            }else{//王子
                if(old > 6){
                    that.filter = 4;
                }else if(old >= 3 && old <= 6){
                    that.filter = 3;
                }else{
                    that.filter = 1;
                }
            }
            lib.storage.set("guideFilter",that.filter);
            location.reload();
        },

        addEvents: function () {
            var that = this;
            $(".top-back").on("click",function(){
                location.href = "agefilter.html";
            });
            if(!lib.login.isLogin()){
                $(".agefilter a").on("click",function(){
                    $(".agefilter").hide();
                    that.topbar.setIndexName($(this).attr("name"));
                   // $(".top-back").html($(this).attr("name"));
                    that.render($(this).attr("filter"));
                });
            }else{
                $(".agefilter a").on("click",function(){
                    $(".agefilter").hide();
                    that.topbar.setIndexName($(this).attr("name"));
                    that.render($(this).attr("filter"));
                });
            }
        },

        render: function (filter) {
            this.renderMain(filter);
            this.renderRush();
        },

        renderMain: function (filter) {
            var that = this;
            if (that.isAjax) {
                return;
            }

            that.isAjax = true;
            lib.api.get({
                api: {
                    c: 'main',
                    a: ''
                },
                data: {
                    filter:filter
                },
                success: function (data) {
                    //console.log(data);
                    if (!data.data) {
                        that.renderError('network');
                        return;
                    }

                    var data = data.data;

                    // 支持手动增加
                    var banners = data.banner || [];
                    banners = that.opts.banner ? banners.concat(that.opts.banner) : banners;
                    data.banner && that.renderSlide(banners);

                    data.icon && that.renderNav(data.icon);
                    data.adv && that.renderCard(data.adv);
                    data.hot && that.renderRush(data.hot);
                    data.guide && that.renderTabheader(data.guide);

                    lib.lazyload.trigger();

                },
                error: function () {
                    that.renderError('network');
                },
                complete: function () {
                    that.isAjax = false;
                }

//                // mock 先
//                mock: {
//                    path: 'data/main.json',
////                   error: 1
//                }
            });
        },

        renderTabheader:function(data){
            var that = this;
            //tabheader控件初始化
            that.guideId = data[0].guideId;
            this.loadBrands();
            var tabheader = new ctrl.tabheader();
            document.getElementsByClassName('brand-menus')[0].appendChild(tabheader.root);
            tabheader.viewModel = {
                'content':data,
                bottom:false,        //是否开启底部粘性
                top:true,           //是否开启顶部粘性
                hasMore:true,       //是否开启下拉
                colNumber:3        //每行多少列
//        itemBorder:false,   //下拉元素是否有边框
//        itemFontsize:'40px', //下拉元素的字号
//        menuPadding:96     //左右滑动菜单间距，单位px
            };
            tabheader.addEventListener("select",function(e){
                for(var i=0;i<that.cd.length;i++){
                    that.cd[i].stop();
                }
//                console.log(e.selected.guideId);
//                console.log(e.selectIndex);
                that.guideId = e.selected.guideId;
                that.loadBrands(true);
            },true);
            $(".brand-menus").css("top","0px");
        },

        renderSlide: function (data) {
            var $target = $('#slides');
            var tpl = $('#tpl-slides').html();
            $target.html(_.template(tpl)({
                itemList: data,
                w: winW
            }));

            // slide show
            this.slider = new lib.Slider('.slider-box',{
                loop : true,
                play : true,
                trigger : '.slider-status'
            });
        },

        renderNav: function (data) {
            var $target = $('#cate-navs');
            var tpl = $('#tpl-cate-navs').html();
            $target.html(_.template(tpl)({
                itemList: data
            }));
        },

        renderRush: function (data) {
            var $target = $('#rush');
            var tpl = $('#tpl-rush').html();
            $target.html(_.template(tpl)({
                itemList: data
            }));
        },

        renderCard: function (data) {
            //console.log(data);
            var $target = $('#cards');
            var tpl = $('#tpl-cards').html();
            $target.html(_.template(tpl)({
                itemList: data
            }));
        },

        loadBrands: function (reset) {
            var that = this;
            if(reset){
                that.page = 1;
            }else{

                if (that.isAjaxBrands) {
                    return;
                }
            }
            that.isAjaxBrands = true;
            lib.api.get({
                api: {
                    c: 'brand',
                    a: '',
                    guideId:that.guideId||''
                },
                data: {
                    page: this.page
                },
                success: function (data) {
                    //console.log(1,data);

                    if (!data.data) {
                        //that.renderError('network');
                        return;
                    }

                    var data = data.data;

                    if (that.page>=data.total_page) {
                        that.infiniteScroll.triggerEnd();
                    } else {
                        that.page++;
                        !that.infiniteScroll.started && that.infiniteScroll.start();
                    }

                    data.brand && that.renderBrands(data.brand,reset);

                    if(reset){
                        $('#target-fix')[0].scrollIntoView();
                    }
                },
                error: function () {
                    //that.renderError('network');
                },
                complete: function () {
                    that.isAjaxBrands = false;
                },

                // mock 先
//                mock: {
//                    path: 'data/brand.json',
////                   error: 1
//                }
            })
        },

        renderBrands: function (itemList,reset) {
            var that = this;
            var existNumber = $('.item').length;
            if(reset){
                that.existTimeNumber = 0;
            }else{
                that.existTimeNumber = existNumber;
            }

            $('.info-tip').hide();
            var $target = $('#items');
            var tpl = $('#tpl-items').html();
            $target[reset?'html':'append'](_.template(tpl)({
                itemList: itemList,
                existNumber:existNumber
            }));

            var brand = itemList;

            for(var i=0;i<brand.length;i++){
                if(brand[i] && brand[i].time_end){
                    //that.time = false;
                    //console.log(brand[i].time_end);
                    var time = parseInt(brand[i].surplusTime);

                    var day = Math.floor(time/(24*3600));
                    var hour = Math.floor((time-day*24*3600)/(3600));
                    var minute = Math.floor((time-day*24*3600-hour*3600)/60);
                    var second = Math.floor(time-day*24*3600-hour*3600-minute*60);

                    //var time = Date.parse(brand[i].time_end.replace(/-/g, '/')) - Date.now();
                    var brandId = Number((((brand[i].targetUrl).match(/brandId=\d+/)[0]).match(/\d+/))[0]);
                    //console.log(time);

                    //var day = Math.floor(time/(24*3600*1000));
                    //var hour = Math.floor((time-day*24*3600*1000)/(3600*1000));
                    //var minute = Math.floor((time-day*24*3600*1000-hour*3600*1000)/(60*1000));
                    //var second = Number((time-day*24*3600*1000-hour*3600*1000-minute*60*1000)/1000).toFixed(1);

                    var count = [day,hour,minute,second];
                    //console.log(count);

                    that.renderTime(count,i,brandId);
                }
            }

            lib.lazyload.trigger();
        },

        renderTime:function(count,index,brandId){
            var that = this;
            var last_seconds = parseInt(count[0])*3600*24 + parseInt(count[1])*3600 + parseInt(count[2]*60) + parseInt(count[3]*10)/10;
            //console.log(count[0],count[1],count[2],count[3],last_seconds);
            if( last_seconds > 0){
                //var t = getTime(new Date(parseInt(data.products.begin_time) * 1000), new Date(parseInt(data.products.end_time) * 1000));
                //console.log(parseInt(data.products.end_time),parseInt(Date.parse(new Date())/1000));
                that.cd[index+(that.existTimeNumber)] = lib.countdown({
                    endDate: "+"+last_seconds.toString(),
                    stringFormatter: count[0]>0?'d天hh小时mm分ss秒':count[1]>0?'hh小时mm分ss秒':count[2]>0?'mm分ss秒':'ss秒',
                    interval: 1000,
                    onUpdate: function(data){
                        $(".b_"+brandId).html('还剩：'+ data.stringValue);
                    },
                    onEnd: function(){
                        console.log('cd['+index+'] ended');
                    }
                }).start();
                // $(".timeover").html('还剩'+ t.d+'天'+ t.h+'时'+ t.m+'分'+ t.s+'秒');
                $(".time-end").show();

            }else{
                $(".time-end").remove();
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
        main.init({
            banner: [
//                {
//                    "imageUrl": "http://img.ve.cn/public/attachment/201411/27/02/5475aba0e5db1.jpg",
//                    "targetUrl": "http://h5.ve.cn/list.html?brandId=1354"
//                }
            ]
        });
    })
})(Zepto, window.Global || (window.Global = {}));