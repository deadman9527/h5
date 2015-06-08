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
 * 物流详情页
 *
 * Created by dingqianqian on 14-12-9.
 *
 * @author qianqian
 * @time 2014-12-13
 */
;(function ($) {

    var main = {
        init: function () {
            var title = "唯一优品，为妈妈全球精挑细选！";
            new ctrl.topBar({
                isIndex: false,
                title: title
            });

            this.isClick = false;
            this.os = lib.env.os;
            this.ua = window.navigator.userAgent.toLowerCase();
            if(!this.ua.match(/MobileVecn/i)){
                $('.download').show();
            }
            this.winW = $(".banner").width();
            if(this.os.isAndroid && (this.ua.match(/MobileVecn/i) || this.ua.match(/sogoumobilebrowser/i))){
                //$(".videoModule").hide();
            }else{
                //var vHeight = this.winW*0.5639;
                //this.veVideo = document.getElementById("veVideo");
                //this.veVideoH5 = document.getElementById("veVideo_html5_api");
                //this.video = document.getElementsByTagName('video');
                //$(this.veVideo).css({'height':vHeight+'px!important','width':this.winW+'px!important'});
                //$(this.veVideoH5).css({'height':vHeight+'px!important','width':this.winW+'px!important'});
                $(".videoModule").show();
            }

            this.addEvents();
        },

        addEvents: function () {
            var that = this;
            //this.vHeight = this.winW*0.5639;

            $(".btn").on("click",function(){
                var schema = "http://h5.ve.cn/index.html";
                schema = schema.replace(/test.h5/g, "h5");//线上不需要
                var params = true;
                var point = true;
                lib.callapp.gotoPage(schema, {point: point, params: params});
            });

            $("#play").on('click',function(){
                if(!(that.isClick)){
                    $("#play").css('display','none');
                    that.isClick = true;
                }

                if(that.os.isAndroid && (that.ua.match(/MobileVecn/i) || that.ua.match(/sogoumobilebrowser/i))){
                }else{
                    that.myPlayer = videojs('veVideo');

                    $(".img").css('display','none');
                    //$(".video").css('display','block');
                    //that.veVideo = document.getElementById("veVideo");
                    //that.veVideoH5 = document.getElementById("veVideo_html5_api");
                    //$(that.veVideo).css({'height':vHeight+'px!important','width':that.winW+'px!important'});
                    //$(that.veVideoH5).css({'height':vHeight+'px!important','width':that.winW+'px!important'});
                    //$(that.video).css({'height':vHeight+'px!important','width':that.winW+'px!important'});

                    that.myPlayer.play();
                }
            });

            $(window).on('resize',function(){
                var winW = $(".banner").width();
                var vHeight = winW*0.5639;
                //if(that.os.isAndroid){
                if(that.os.isAndroid && (that.ua.match(/MobileVecn/i) || that.ua.match(/sogoumobilebrowser/i))){
                //    vHeight = ($(window).width())*0.6057;
                //    $(this.youkuplayer).css({'height':vHeight+'px!important','width':'100%!important'});
                }else{
                    //vHeight = (winW)*0.5639;
                    $(that.veVideo).css({'height':vHeight+'px!important','width':winW+'px!important'});

                    //$(that.veVideoH5).css({'height':vHeight+'px!important','width':winW+'px!important'});
                    //$(that.video).css({'height':vHeight+'px!important','width':winW+'px!important'});
                    //$(".vjs-control-bar").css('bottom','0!important');
                }
            });

            //if(that.os.isAndroid){
            if(that.os.isAndroid && (that.ua.match(/MobileVecn/i) || that.ua.match(/sogoumobilebrowser/i))){
            //    $(that.youkuplayer).on('onPlayerComplete',function(){
            //        $(".img").css('display','block');
            //        $(".videoForYouku").css('display','none');
            //        $("#play").css('display','block');
            //    });
            }else{
                $(that.veVideoH5).on('ended',function(){
                    $(".img").css('display','block');
                    $("#play").css('display','block');
                });
            }
        }
    };

    $(function () {
        main.init();
    })
})(Zepto);