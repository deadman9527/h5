!function(a,b){function c(a,b){if(g={},g[a])return void b(g[a]);var c=[];if(1==a){for(var d=0;d<parseInt(endDates[0])-parseInt(startDates[0])+1;d++){var e=new Object;e.name=d+parseInt(startDates[0])+"年",e.id=d+2,c.push(e)}b(c),g[a]=c}if(a>=2&&19>=a){if(endDates[0]==startDates[0]){j=!0;for(var d=parseInt(startDates[1])-1;d<parseInt(endDates[1]);d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}else if(2==a){j=!1;for(var d=parseInt(startDates[1])-1;12>d;d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}else if(a==2+parseInt(endDates[0])-parseInt(startDates[0])){console.log("lastYear"),j=!0;for(var d=0;d<parseInt(endDates[1]);d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}else{j=!1;for(var d=0;12>d;d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}b(c),g[a]=c}if(a>=21&&32>=a){var f=30;if(22==a?f=28:(21==a||23==a||25==a||27==a||28==a||30==a||32==a)&&(f=31),endDates[0]==startDates[0])if(21==a)for(var d=parseInt(startDates[2])-1;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else if(a==21+parseInt(endDates[1])-parseInt(startDates[1]))for(var d=0;d<parseInt(endDates[2]);d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else for(var d=0;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else if(j&&a==21+parseInt(endDates[1])-parseInt(startDates[1]))for(var d=0;d<parseInt(endDates[2]);d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else if(21!=a||j)for(var d=0;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else for(var d=parseInt(startDates[2])-1;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}b(c),g[a]=c}}function d(a){var b={},d={},e=a.id||1,f=a.deep||3,g=a.onReady,j={3:"year",2:"month",1:"day"};h=a.startDate||h,i=a.endDate||i,startDates=h.split("-"),endDates=i.split("-"),c(e,function(a){var e=j[f];d[e]=[],a.forEach(function(a,c){var f={key:a.name,value:a.id,selected:0===c};d[e].push(f),0===c&&(b[e]=f)}),f--,1>f?g&&g(d):c(b[e].value,arguments.callee)})}function e(a,b){b=b||{};var c=ctrl.selectmenu;f=new c({confirmText:b.confirmText||"确定",title:b.title||"",cancelText:b.opts||"取消",trigger:b.trigger}),f.viewModel=a,f.addEventListener("confirm",function(){b.onConfirm(this.selectedValue)}),f.addEventListener("select",function(a){var b=this.selectedValue["val-"+a],c=this;"year"==a?d({id:b,deep:2,onReady:function(a){c.linkage("month",a.month),c.linkage("day",a.day)}}):"month"==a&&d({id:b,deep:1,onReady:function(a){c.linkage("day",a.day)}})}),b.appendDom?b.appendDom.appendChild(f.root):document.body.appendChild(f.root)}var f,g={},h="2010-1-1",i="2016-1-1",j=!1;b.selectAddress={init:function(a){console.log(a),d({onReady:function(b){e(b,a)},startDate:a.startDate,endDate:a.endDate})}}}(Zepto,window.app||(window.app={})),function(a,b){function c(a,b){if(g={},g[a])return void b(g[a]);var c=[];if(1==a){for(var d=0;d<parseInt(endDates[0])-parseInt(startDates[0])+1;d++){var e=new Object;e.name=d+parseInt(startDates[0])+"年",e.id=d+2,c.push(e)}b(c),g[a]=c}if(a>=2&&19>=a){if(endDates[0]==startDates[0]){j=!0;for(var d=parseInt(startDates[1])-1;d<parseInt(endDates[1]);d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}else if(2==a){j=!1;for(var d=parseInt(startDates[1])-1;12>d;d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}else if(a==2+parseInt(endDates[0])-parseInt(startDates[0])){console.log("lastYear"),j=!0;for(var d=0;d<parseInt(endDates[1]);d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}else{j=!1;for(var d=0;12>d;d++){var e=new Object;e.name=d+1+"月",e.id=d+21,c.push(e)}}b(c),g[a]=c}if(a>=21&&32>=a){var f=30;if(22==a?f=28:(21==a||23==a||25==a||27==a||28==a||30==a||32==a)&&(f=31),endDates[0]==startDates[0])if(21==a)for(var d=parseInt(startDates[2])-1;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else if(a==21+parseInt(endDates[1])-parseInt(startDates[1]))for(var d=0;d<parseInt(endDates[2]);d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else for(var d=0;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else if(j&&a==21+parseInt(endDates[1])-parseInt(startDates[1]))for(var d=0;d<parseInt(endDates[2]);d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else if(21!=a||j)for(var d=0;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}else for(var d=parseInt(startDates[2])-1;f>d;d++){var e=new Object;e.name=d+1+"日",e.id=d+41,c.push(e)}b(c),g[a]=c}}function d(a){var b={},d={},e=a.id||1,f=a.deep||3,g=a.onReady,j={3:"year",2:"month",1:"day"};h=a.startDate||h,i=a.endDate||i,startDates=h.split("-"),endDates=i.split("-"),c(e,function(a){var e=j[f];d[e]=[],a.forEach(function(a,c){var f={key:a.name,value:a.id,selected:0===c};d[e].push(f),0===c&&(b[e]=f)}),f--,1>f?g&&g(d):c(b[e].value,arguments.callee)})}function e(a,b){b=b||{};var c=ctrl.selectmenu;f=new c({confirmText:b.confirmText||"确定",title:b.title||"",cancelText:b.opts||"取消",trigger:b.trigger}),f.viewModel=a,f.addEventListener("confirm",function(){b.onConfirm(this.selectedValue)}),f.addEventListener("select",function(a){var b=this.selectedValue["val-"+a],c=this;"year"==a?d({id:b,deep:2,onReady:function(a){c.linkage("month",a.month),c.linkage("day",a.day)}}):"month"==a&&d({id:b,deep:1,onReady:function(a){c.linkage("day",a.day)}})}),b.appendDom?b.appendDom.appendChild(f.root):document.body.appendChild(f.root)}var f,g={},h="2010-1-1",i="2016-1-1",j=!1;b.selectAddress={init:function(a){console.log(a),d({onReady:function(b){e(b,a)},startDate:a.startDate,endDate:a.endDate})}}}(Zepto,window.app2||(window.app2={})),function(a){var b=new Date,c=b.getDate(),d=b.getMonth()+1,e=b.getFullYear(),f=new Date((new Date).getTime()+2592e7),g=(f.getDate(),f.getMonth()+1),h=f.getFullYear();String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};var i={init:function(){var b=new lib.httpurl(location.href),c=b.params;this.type=c.type;var d=1==this.type?"妈妈信息":"宝宝信息";document.title=d,this.babyId=c.babyId||null,this.birthday=c.birthday||null,this.sextype=c.sex||null,this.evalType=this.babyId?"update":"add",1==this.type?(a("#mother").show(),a("#baby").hide(),this.nickName=c.name||"",1==this.sextype?(a("#mother_status").html("王子"),a("#motherData").html("出生日期：")):2==this.sextype?(a("#mother_status").html("公主"),a("#motherData").html("出生日期：")):3==this.sextype&&(a("#mother_status").html("孕育中"),a("#motherData").html("预产期：")),a("#motherAge").val(this.birthday),a("#mother_username").val(this.nickName)):(a("#baby").show(),a("#mother").hide(),this.name=c.name||"",1==this.sextype?(a("#sex").val("王子"),a("#babyDate").html("出生日期：")):2==this.sextype?(a("#sex").val("公主"),a("#babyDate").html("出生日期：")):3==this.sextype&&(a("#sex").val("孕育中"),a("#babyDate").html("预产期：")),a("#username").val(this.name),this.birthday&&a("#babyAge").val(this.birthday)),new ctrl.topBar({isIndex:!1,title:d}),this.render()},render:function(){{var b=this;document.getElementById(1==this.type?"motherAge":"babyAge"),a(1==this.type?"#motherAge":"#babyAge")}if(2==b.type){var c=ctrl.selectmenu,d=document.querySelector("#sex"),e=new c({confirmText:"确定",title:"性别",cancelText:"取消",trigger:d});e.viewModel={age:[{key:"王子",value:"1"},{key:"公主",value:"2"},{key:"孕育中",value:"3"}]},e.addEventListener("confirm",function(){d.value=this.selectedValue["key-age"],b.babyType=this.selectedValue["val-age"],b.sextype=this.selectedValue["val-age"],a("#cli_dialog").remove(),a(".ctrl-selectmenu:eq(1)").remove(),b.selectTime()}),e.addEventListener("cancel",function(){}),document.body.appendChild(e.root);var b=this;a(".save-btn").click(function(){b.submit()})}else{var c=ctrl.selectmenu,d=document.querySelector("#mother_status"),e=new c({confirmText:"确定",title:"状态",cancelText:"取消",trigger:d});e.viewModel={age:[{key:"王子",value:"1"},{key:"公主",value:"2"},{key:"孕育中",value:"3"}]},e.addEventListener("confirm",function(){console.log(this.selectedValue),a("#motherData").html(3!=this.selectedValue["val-age"]?"出生日期：":"预产期："),a("#mother_status").html(this.selectedValue["key-age"]),b.babyType=this.selectedValue["val-age"],b.sextype=this.selectedValue["val-age"],a("#cli_dialog").remove(),a(".ctrl-selectmenu:eq(1)").remove(),b.selectTime()}),e.addEventListener("cancel",function(){}),document.body.appendChild(e.root);var b=this;a(".save-btn").click(function(){b.submit()})}this.selectTime()},selectTime:function(){var b=this,f=document.getElementById(1==this.type?"motherAge":"babyAge"),i=a(1==this.type?"#motherAge":"#babyAge");3==b.sextype?(a("#babyDate").html("预产期："),app.selectAddress.init({confirmText:"",title:"预产期",cancelText:"",startDate:e+"-"+d+"-"+c,endDate:h+"-"+g+"-"+c,trigger:f,onConfirm:function(a){i.css("color","#333"),i.val(parseInt(a["key-year"])+"-"+parseInt(a["key-month"])+"-"+parseInt(a["key-day"])),b.birthday=parseInt(a["key-year"])+"-"+parseInt(a["key-month"])+"-"+parseInt(a["key-day"])}})):(a("#babyDate").html("出生日期："),app.selectAddress.init({confirmText:"",title:"出生日期",cancelText:"",startDate:"2001-1-1",endDate:e+"-"+d+"-"+c,trigger:f,onConfirm:function(a){i.css("color","#333"),i.val(parseInt(a["key-year"])+"-"+parseInt(a["key-month"])+"-"+parseInt(a["key-day"])),b.birthday=parseInt(a["key-year"])+"-"+parseInt(a["key-month"])+"-"+parseInt(a["key-day"])}}))},submit:function(){var a=this;if(a.verify()&&!a.isAjax){console.log(a);var b="add"==a.evalType?"":a.babyId;if(1==a.type&&a.nickName){var c=a.nickName,d="",e="evalUserBaby";a.evalType=""}else{var c="";d=a.name;var e="evalbaby"}a.isAjax=!0,lib.api.get({needLogin:!0,api:{c:"user",a:e},data:{evalType:a.evalType,birthday:a.birthday,name:d,sex:a.sextype,babyId:b,nickName:c},success:function(b){b.data&&b.data.user&&lib.storage.set("guideFilter",parseInt(b.data.user.filter)),1==a.type&&lib.storage.set("nickName",a.nickName),location.href="personinfo.html",console.log(b)},error:function(a){a&&a.desc&&(console.log(a.desc),lib.notification.alert(a.desc,function(){this.hide()}).show()),console.error(a)},complete:function(){a.isAjax=!1}})}},verify:function(){if(1==this.type){if(this.nickName=a("#mother_username").val(),this.nickName=this.nickName.trim(),0==this.nickName.length)return lib.notification.simple("妈咪名称不能为空","",1e3),!1;if(this.nickName.length>12)return lib.notification.simple("妈咪名称不能超过12个字符","",1e3),!1}else{if(this.name=a("#username").val(),this.name=this.name.trim(),0==this.name.length)return lib.notification.simple("宝贝名称不能为空","",1e3),!1;if(this.name.length>12)return lib.notification.simple("宝贝名称不能超过12个字符","",1e3),!1}return this.sextype?this.birthday?!0:(lib.notification.simple("日期不能为空","",1e3),!1):(lib.notification.simple("性别不能为空","",1e3),!1)}};a(function(){i.init()})}(Zepto,window.Global||(window.Global={}));