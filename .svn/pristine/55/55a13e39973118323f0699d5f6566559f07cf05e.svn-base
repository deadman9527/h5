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
 * h5.quxiu.me personinfo
 *
 * @todo
 *
 * @author linshitan
 *
 * */
;(function ($) {
    var today=new Date(), d=today.getDate(),m=today.getMonth()+1,y=today.getFullYear();
    var nextDate = new Date(new Date().getTime()+30*24*3600*1000*10);//十个月后时间
    var nd=nextDate.getDate(),nm=nextDate.getMonth()+ 1,ny=nextDate.getFullYear();
    var main = {
        init: function () {
            if(!lib.login.isLogin()){
                lib.login.goLogin();
                return;
            }
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '妈妈档案';
            document.title = title;
            // gotop
            new lib.goTop({position:{bottom:60}});
            this.topbar = new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.renderInfo();
        },
        renderInfo:function(){
            var that = this;
            lib.api.get({
                needLogin:true,
                api: {
                    c: 'user',
                    a: 'userbaby'
                },
                success: function (data) {
                    try{
                        console.log(data);
                        if(data.data.userBaby){
                            if(!lib.storage.get("guideSync")){
                                lib.storage.set("guideSync",[]);
                            }
                            var gSync = lib.storage.get("guideSync"),isSync=false;
                            for(var val in gSync){
                                if(lib.storage.get("userId") == gSync[val]){
                                    isSync = true;
                                    break;
                                }
                            }
                            if(!isSync){
                                var gB = lib.storage.get("guideBirthday"), gT = lib.storage.get("guideBabytype");
                                //lib.storage.rm("guideBirthday");不清除，换个帐号登录，继续同步
                                //lib.storage.rm("guideBabytype");
                                var gSyncs = lib.storage.get("guideSync");
                                gSyncs.push(lib.storage.get("userId"));
                                lib.storage.set("guideSync",gSyncs);//同步一次不再同步
                            }
                            //lib.storage.set("guideType",parseInt(data.data.user.babyType));
                            data.data.user.babyId = data.data.userBaby[0].babyId;
                            data.data.user.birthday = data.data.userBaby[0].birthday;
                            data.data.user.sex = data.data.userBaby[0].sex;

                            var $target = $('#userBaby');
                            var tpl = $('#tpl-userBaby').html();
                            $target.html(_.template(tpl)({
                                itemList: data.data.userBaby,
                                userList:[data.data.user]
                            }));

                            $(".babyDel").on("click",function(){
                                that.del($(this).attr("delid"),$(this).closest(".item-list"));
                            });
                            that.guideType = data.data.user.babyType;
                            if(data.data.user.nickName){
                                $("#username").html(data.data.user.nickName);
                            }else{
                                $("#username").html(lib.login.getUserName());
                            }

                            lib.storage.set("guideFilter",data.data.user.filter);

                            if(data.data.userBaby.length>=10){
                                $("#addbaby").html('<a href="javascript:alert(\'宝宝不能超过10个\');">+添加宝贝档案</a>');
                            }else{
                                $("#addbaby").html('<a href="babyinfo.html?type=2">+添加宝贝档案</a>');
                            }
                            that.render(1);
                        }else{
                            if(!lib.storage.get("guideSync")){
                                var gB = lib.storage.get("guideBirthday"), gT = lib.storage.get("guideBabytype");
                                //lib.storage.rm("guideBirthday");不清除，换个帐号登录，继续同步
                                //lib.storage.rm("guideBabytype");
                                lib.storage.set("guideSync",[]);
                                var gSync = lib.storage.get("guideSync");
                                gSync.push(lib.storage.get("userId"));
                                lib.storage.set("guideSync",gSync);//同步一次不再同步
                                that.selectTime(gB,gT);
                                that.render(1);
                            }else{
                                var gSync = lib.storage.get("guideSync"),isSync=false;
                                for(var val in gSync){
                                    if(lib.storage.get("userId") == gSync[val]){
                                        that.render(2);
                                        isSync = true;
                                        break;
                                    }
                                }
                                if(!isSync){
                                    var gB = lib.storage.get("guideBirthday"), gT = lib.storage.get("guideBabytype");
                                    //lib.storage.rm("guideBirthday");不清除，换个帐号登录，继续同步
                                    //lib.storage.rm("guideBabytype");
                                    var gSyncs = lib.storage.get("guideSync");
                                    gSyncs.push(lib.storage.get("userId"));
                                    lib.storage.set("guideSync",gSyncs);//同步一次不再同步
                                    that.selectTime(gB,gT);
                                    that.render(1);
                                }

                            }

                        }

                    }catch(e){

                    }
                    //获取guideFilter，进入render()判断是否初次登录

                    //console.log(data);
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
        },
        render:function(type){
            var that = this;
            if(type==1){
                $("#guide").hide();
                if(that.guideType==3){
                    $("#username").append("<br /><span>加油！马上要做妈咪了！</span>")
                }else{
                    $("#username").append("<br /><span>恭喜你当妈咪啦！</span>")
                }
            }else{//初次登录
                $("#guide").show();
                this.renderGuide();
                $(".guide-main a").on("click",function(){
                    that.guideType = parseInt($(this).attr("guideType"));
                });
            }
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
                    var birthday = oy+"-"+om+"-"+od;
                    that.selectTime(birthday,babyType);
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
                    var birthday = oy+"-"+om+"-"+od;
                    that.selectTime(birthday,babyType);
                }
            });
        },
        selectTime:function(birthday,babyType){
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
        },
        del:function(bid,deldom){
            var isconfirm = false;
            var pop = lib.notification.confirm('确认删除',
                '',
                function(e, isConfirm) {
                    if (isConfirm) {
                        lib.api.get({
                            needLogin:true,
                            api: {
                                c: 'user',
                                a: "evalbaby"
                            },
                            data: {
                                evalType : "delete",
                                babyId:bid
                            },
                            success: function (data) {

                                //console.log(data);
                                if(!data.data.userBaby){
                                    $(".personal-image").css("background-image","url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQzlCNzA2RjlFRDUxMUU0QUM2M0U0MkU1REJFMzkzMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQzlCNzA3MDlFRDUxMUU0QUM2M0U0MkU1REJFMzkzMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNDOUI3MDZEOUVENTExRTRBQzYzRTQyRTVEQkUzOTMwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDOUI3MDZFOUVENTExRTRBQzYzRTQyRTVEQkUzOTMwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K2LVqwAAFOBJREFUeNrsnVuQ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)");
                                }
                                deldom.remove();

                            },

                            error: function (data) {
                                if (data && data.desc) {
                                    console.log(data.desc);
                                    lib.notification.alert(data.desc, function() {
                                        this.hide();
                                    }).show();
                                }
                                console.error(data);
                            },

                            complete: function () {
                            }
                        });
                    }
                    this.hide();
                },'{background:#fff}');
            pop.show();

        }
    };
    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));