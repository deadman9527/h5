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
 * Created by linshitan on 2015/1/26.
 */
;(function ($) {
    var today=new Date(), d=today.getDate(),m=today.getMonth()+1,y=today.getFullYear();
    var nextDate = new Date(new Date().getTime()+30*24*3600*1000*10);//十个月后时间
    var nd=nextDate.getDate(),nm=nextDate.getMonth()+ 1,ny=nextDate.getFullYear();
    String.prototype.trim = function()
    {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    var main = {
        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            this.type = params['type'];
            var title = this.type==1 ? '妈妈信息' : '宝宝信息';
            document.title = title;

            this.babyId = params['babyId'] || null;
            this.birthday = params['birthday'] || null;
            this.sextype = params['sex'] || null;
            if(this.babyId){
                this.evalType="update";
            }else{
                this.evalType="add";
            }
            if(this.type==1){//妈妈档案
                $("#mother").show();
                $("#baby").hide();
                this.nickName = params['name'] || "";
                if(this.sextype==1){
                    $("#mother_status").html("王子");
                    $("#motherData").html("出生日期：");
                }else if(this.sextype==2){
                    $("#mother_status").html("公主");
                    $("#motherData").html("出生日期：");
                }else if(this.sextype==3){
                    $("#mother_status").html("孕育中");
                    $("#motherData").html("预产期：");
                }
                $("#motherAge").val(this.birthday);
                $("#mother_username").val(this.nickName);
            }else{//宝宝信息
                $("#baby").show();
                $("#mother").hide();
                this.name = params['name'] || "";
                if(this.sextype==1){
                    $("#sex").val("王子");
                    $("#babyDate").html("出生日期：");
                }else if(this.sextype==2){
                    $("#sex").val("公主");
                    $("#babyDate").html("出生日期：");
                }else if(this.sextype==3){
                    $("#sex").val("孕育中");
                    $("#babyDate").html("预产期：");
                }
                $("#username").val(this.name);
                if(this.birthday){
                    $("#babyAge").val(this.birthday);
                }

            }
            new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.render();

        },
        render:function(){
            var that = this;
            var triggerId = this.type==1 ? document.getElementById('motherAge') : document.getElementById('babyAge');
            var htmlVal = this.type==1 ? $("#motherAge") : $("#babyAge");

            if(that.type==2){
                var SelectMenu = ctrl.selectmenu;
                var trigger2 = document.querySelector('#sex');
                var instance2 = new SelectMenu({
                    confirmText: '确定',
                    title: '性别',
                    cancelText: '取消',
                    trigger: trigger2
                });
                instance2.viewModel = {
                    age: [
                        {
                            key: '王子',
                            value: '1'
                        },
                        {
                            key: '公主',
                            value: '2'
                        },
                        {
                            key: '孕育中',
                            value: '3'
                        }
                    ]
                };
                instance2.addEventListener('confirm', function (e) {
                    trigger2.value = this.selectedValue['key-age'];
                    that.babyType = this.selectedValue['val-age'];
                    that.sextype = this.selectedValue['val-age'];

                    $("#cli_dialog").remove();
                    $(".ctrl-selectmenu:eq(1)").remove();
                    that.selectTime();

                });
                instance2.addEventListener('cancel', function (e) {
                    //alert('您已取消操作');
                });

                // add dom
                document.body.appendChild(instance2.root);
                var that = this;
                $(".save-btn").click(function(){
                    that.submit();
                });
            }else{
                var SelectMenu = ctrl.selectmenu;
                var trigger2 = document.querySelector('#mother_status');
                var instance2 = new SelectMenu({
                    confirmText: '确定',
                    title: '状态',
                    cancelText: '取消',
                    trigger: trigger2
                });
                instance2.viewModel = {
                    age: [
                        {
                            key: '王子',
                            value: '1'
                        },
                        {
                            key: '公主',
                            value: '2'
                        },
                        {
                            key: '孕育中',
                            value: '3'
                        }
                    ]
                };
                instance2.addEventListener('confirm', function (e) {
                    console.log(this.selectedValue);
                    if(this.selectedValue['val-age']!=3){
                        $("#motherData").html("出生日期：");
                    }else{
                        $("#motherData").html("预产期：");
                    }
                    $("#mother_status").html(this.selectedValue['key-age']);
                    that.babyType = this.selectedValue['val-age'];
                    that.sextype = this.selectedValue['val-age'];
                    $("#cli_dialog").remove();
                    $(".ctrl-selectmenu:eq(1)").remove();
                    that.selectTime();
                });
                instance2.addEventListener('cancel', function (e) {
                    //alert('您已取消操作');
                });
                // add dom
                document.body.appendChild(instance2.root);
                var that = this;
                $(".save-btn").click(function(){
                    that.submit();
                });
            }
            this.selectTime();

        },
        selectTime:function(){
            var that = this;
            var triggerId = this.type==1 ? document.getElementById('motherAge') : document.getElementById('babyAge');
            var htmlVal = this.type==1 ? $("#motherAge") : $("#babyAge");
            if(that.sextype==3){
                $("#babyDate").html("预产期：");
                app.selectAddress.init({
                    confirmText: '',
                    title: '预产期',
                    cancelText: '',
                    startDate:y+'-'+m+'-'+d,
                    endDate:ny+'-'+nm+'-'+d,
                    trigger: triggerId,  // html element object
                    onConfirm: function (selectedValue) {
                        htmlVal.css("color","#333");
                        htmlVal.val(parseInt(selectedValue['key-year'])+"-"+parseInt(selectedValue['key-month'])+"-"+parseInt(selectedValue['key-day']));
                        that.birthday = parseInt(selectedValue['key-year'])+"-"+parseInt(selectedValue['key-month'])+"-"+parseInt(selectedValue['key-day']);
                    }
                });
            }else{
                $("#babyDate").html("出生日期：");
                app.selectAddress.init({
                    confirmText: '',
                    title: '出生日期',
                    cancelText: '',
                    startDate:'2001-1-1',
                    endDate:y+'-'+m+'-'+d,
                    trigger: triggerId,  // html element object
                    onConfirm: function (selectedValue) {
                        htmlVal.css("color","#333");
                        htmlVal.val(parseInt(selectedValue['key-year'])+"-"+parseInt(selectedValue['key-month'])+"-"+parseInt(selectedValue['key-day']));
                        that.birthday = parseInt(selectedValue['key-year'])+"-"+parseInt(selectedValue['key-month'])+"-"+parseInt(selectedValue['key-day']);
                    }
                });
            }
        },
        submit:function(){
            var that = this;
            if(!that.verify())
                return;
            if(that.isAjax){
                return;
            }
            console.log(that);
            var bid = that.evalType == "add" ? "" : that.babyId;
            if(that.type==1 && that.nickName){
                var nickName = that.nickName;
                var name = "";
                var apiName = "evalUserBaby";
                that.evalType = "";
            }else{
                var nickName = "";
                name = that.name;
                var apiName = "evalbaby";
            }
            that.isAjax = true;
            lib.api.get({
                needLogin:true,
                api: {
                    c: 'user',
                    a: apiName
                },
                data: {
                    evalType : that.evalType,
                    birthday: that.birthday,
                    name:name,
                    sex:that.sextype,
                    babyId:bid,
                    nickName:nickName
                },

                success: function (data) {
                    /*lib.notification.alert('添加成功', function() {
                        this.hide();
                    }).show();*/
                    //lib.notification.simple("添加成功",'',3000);
                    if(data.data && data.data.user){
                        lib.storage.set("guideFilter",parseInt(data.data.user.filter));
                    }
                    if(that.type==1){
                        lib.storage.set('nickName', that.nickName);
                    }
                    location.href = "personinfo.html";
                    console.log(data);
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
                    that.isAjax = false;
                }
            })

        },
        verify:function(){
            if(this.type==1){
                this.nickName = $('#mother_username').val();
                this.nickName = this.nickName.trim();
                if(this.nickName.length == 0){
                    lib.notification.simple("妈咪名称不能为空",'',1000);
                    return false;
                }
                if(this.nickName.length>12){
                    lib.notification.simple("妈咪名称不能超过12个字符",'',1000);
                    return false;
                }
            }else{//宝宝
                this.name = $('#username').val();
                this.name = this.name.trim();
                if( this.name.length == 0){
                    lib.notification.simple("宝贝名称不能为空",'',1000);
                    return false;
                }
                if( this.name.length>12){
                    lib.notification.simple("宝贝名称不能超过12个字符",'',1000);
                    return false;
                }
            }
            if(!this.sextype){
                lib.notification.simple("性别不能为空",'',1000);
                return false;
            }
            if(!this.birthday){
                lib.notification.simple("日期不能为空",'',1000);
                return false;
            }

            // 校验

            return true;
        }

    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));