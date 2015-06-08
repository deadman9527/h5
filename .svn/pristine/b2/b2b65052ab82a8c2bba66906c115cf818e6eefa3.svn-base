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
    var local;
    var isAjax = false;

    function getArea (areaId, cb) {
        if (caches[areaId]) {
            cb(caches[areaId]);
            return;
        }

        var emptyData = [{id:'',name:'我不清楚',pid:areaId}];

        lib.api.get({
            api: {
                c: 'user',
                a: 'get_area'
            },
            needLogin: false,
            data: {
                area_id: areaId
            },
            success: function (data) {
                data.data && cb(data.data);
                console.log(data);
                caches[areaId] = data.data;

            },
            error: function (error) {
                console.error(error);
                cb(emptyData);
                caches[areaId] = emptyData;
            }
        });
    }

    function initData (opts){
        var defaultAddr = {};
        var addrData = {};
        var id = opts.id || 1;
        var deep = opts.deep || 4;
        var cb = opts.onReady;
        var deepMap = {
            4: 'province',
            3: 'city',
            2: 'area',
            1: 'street'
        };
        getArea(id, function (addrs) {
            var grade = deepMap[deep];
            var localIndex = null;
            addrData[grade] = [];
            addrs.forEach(function (data, index) {
                if(local.content.address_detail[grade] && (data.name.indexOf(local.content.address_detail[grade])!=-1||local.content.address_detail[grade].indexOf(data.name)!=-1)){
                    localIndex = index;
                }
                var addr = {
                    key: data.name,
                    value: data.id,
                    selected: index === (localIndex || 0)
                };
                addrData[grade].push(addr);


            });

            defaultAddr[grade] = addrData[grade][localIndex||0];
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
            trigger: opts.trigger,
            verifyMe:function(){
                return !isAjax;
            }
        });

        instance.viewModel = addrData;

        instance.addEventListener('confirm', function (e) {
            console.log(isAjax);
            if(!isAjax){
                opts.onConfirm(this.selectedValue);
            }
        });

        instance.addEventListener('select', function (colName) {
            var selectedId = this.selectedValue['val-' + colName];
            var that = this;
            console.log(isAjax);
            isAjax = true;
            if (colName == 'province') {
                initData({
                    id: selectedId,
                    deep: 3,
                    onReady: function (data) {
                        that.linkage('city', data.city);
                        that.linkage('area', data.area);
                        that.linkage('street', data.street);
                    }
                })
            } else if (colName == 'city') {
                initData({
                    id: selectedId,
                    deep: 2,
                    onReady: function (data) {
                        that.linkage('area', data.area);
                        that.linkage('street', data.street);
                    }
                })
            } else if (colName == 'area') {
                initData({
                    id: selectedId,
                    deep: 1,
                    onReady: function (data) {
                        that.linkage('street', data.street);
                    }
                })
            } else if(colName == 'street'){
                isAjax = false;
            }
        });

        document.body.appendChild(instance.root);
    }

    app.selectAddress = {
        init: function (opts) {

            $.ajax({
                type: 'GET',
                url: 'http://api.map.baidu.com/location/ip?ak=7LKIOX88UcaHWrMDzN7coBub&coor=bd09ll&qt=loc&callback=?',
                data: { name: 'Zepto',type:"JSONP" },
                success: function(result){
//                    local.content.address_detail.province='西藏';
//                    local.content.address_detail.city='山南';
                    local = result;
                    initData({
                        onReady: function (data) {
                            init(data, opts);
                        }
                    });
                },
                error: function(xhr, type){
                    console.log('Ajax error!');
                    initData({
                        onReady: function (data) {
                            init(data, opts);
                        }
                    },{'content':{'address_detail':{'province':'浙江省','city':'杭州市'}}});
                }
            });
        }
    };

})(Zepto,  window['app'] || (window['app'] = {}))
/**
 * Created by hellsing on 2014/12/12.
 */
;(function ($) {
    var main = {
        init: function () {
            var httpUrl = new lib.httpurl(location.href);
            var params = httpUrl.params;
            var title = params['title'] ? decodeURIComponent(params['title']) : '新增地址';
            document.title = title;
            new ctrl.topBar({
                isIndex: false,
                title: title
            });
            this.pro = null;
            this.toConfirm = parseInt(params['toConfirm']);
            this.proType = parseInt(params['proType']);
            if(params['isDirect']){
                this.isDirect = parseInt(params['isDirect']);
            }

            if(lib.storage.get('editAddressData')){
                $("#provice").css("color","#333");
                console.log(lib.storage.get('editAddressData'));

                this.id = lib.storage.get('editAddressData').id || "";
                this.username = lib.storage.get('editAddressData').name || "";
                this.phone = lib.storage.get('editAddressData').phone || "";
                this.addressDet = lib.storage.get('editAddressData').address || "";

                this.proId = lib.storage.get('editAddressData').province_id || "";
                this.cityId = lib.storage.get('editAddressData').city_id || "";
                this.areaId = lib.storage.get('editAddressData').area_id || "";
                this.streetId = lib.storage.get('editAddressData').street_id || "";

                this.pro = lib.storage.get('editAddressData').province || "";
                this.city = lib.storage.get('editAddressData').city || "";
                this.area = lib.storage.get('editAddressData').area || "";
                this.street = lib.storage.get('editAddressData').town || "";
                if(this.pro){
                    $("#provice").html(this.pro+""+this.city+""+this.area+""+this.street);
                }
                $("#username").val(this.username);
                $("#phone").val(this.phone);
                $("#addressDet").val(this.addressDet);

                lib.storage.rm('editAddressData');
                if(this.isDirect){
                    this.action = "address";
                }else{
                    this.action = "editaddress";
                }
            }else{

            }
            this.render();
            this.brandId = params['brandId'] || 0;
            this.categoryId = params['categoryId'] || 0;

        },
        render:function(){
            var that = this;
            app.selectAddress.init({
                confirmText: '',
                title: '',
                cancelText: '',
                trigger: document.getElementById('provice'),  // html element object
                onConfirm: function (selectedValue) {
                    that.pro = selectedValue;
                    console.log(that.pro);
                    console.log(that.pro['key-city']);
                    $("#provice").css("color","#333");
                    $("#provice").html((selectedValue['key-province']||"")+(selectedValue['key-city']||"")+(selectedValue['key-area']||"")+(selectedValue['key-street'])||"");

                }
            })
            var that = this;
            $(".save-btn").click(function(){
                that.submit();
            });
        },
        submit:function(){
            var that = this;
            if(!that.verify())
                return;
            if(that.isAjax){
                return;
            }
            console.log(that.pro);
            that.isAjax = true;
            lib.api.get({
                needLogin:true,
                api: {
                    c: 'user',
                    a: that.action||"address"
                },
                data: {
                    city: that.pro['val-city']||that.cityId,
                    address: that.addressDet,
                    name:that.name,
                    phone:that.phone,
                    provice:that.pro['val-province']||that.proId,
                    area:that.pro['val-area']||that.areaId,
                    town:that.pro['val-street']||that.streetId,
                    id:that.id||null
                    // cardid:"362330198809297772"
                },

                success: function (data) {
//                    lib.notification.alert('添加成功', function() {
//                        this.hide();
//                    }).show();
                    //lib.notification.simple("添加成功",'',3000);
                    lib.storage.set('addressSelectedId',data.addr_id);
                    console.log(that.toConfirm);
                    if(that.isDirect||that.toConfirm){
                        location.href = "order-confirm.html?proType="+that.proType;
                    }else{
                        history.go(-1);
                    }

                    console.log(data);
                },

                error: function (data) {
                    if (data && data.desc) {
                        console.log(data.desc);
                    }
                    console.error(data);
                },

                complete: function () {
                    that.isAjax = false;
                }
            })

        },
        verify:function(){
            this.name = $('#username').val();
            this.phone = $('#phone').val();
            this.addressDet = $('#addressDet').val();

            // 校验
            this.name = this.name.trim();
            this.addressDet = this.addressDet.trim();
            if(this.name.length == 0){
                lib.notification.simple("收货人不能为空",'',1000);
                return false;
            }
            if(this.name.length > 12){
                lib.notification.simple("用户名长度不能超过12个字符",'',1000);
                return false;
            }
            if( !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)){ //判断用户名是否是手机号码
                lib.notification.simple('手机格式错误','',1000);
                return false;
            }
            if(this.addressDet.length == 0){
                lib.notification.simple("详细地址不能为空",'',1000);
                return false;
            }
            if(this.pro == null || this.pro==""){
                lib.notification.simple("省市区不能为空",'',1000);
                return false;
            }
            return true;
        }

    };

    // run
    $(function () {
        main.init();
    })
})(Zepto, window.Global || (window.Global = {}));