;(function(win, lib) {
	var $ = win['Zepto'];
	win._paq = win._paq || [];
	var h5log = function() {
		this.init();
	};

    /*** 生成uuid开始
     *
     * @returns {*}
     */
    function UUID(){
        this.id = this.createUUID();
    }

// When asked what this Object is, lie and return it's value
    UUID.prototype.valueOf = function(){ return this.id; };
    UUID.prototype.toString = function(){ return this.id; };

//
// INSTANCE SPECIFIC METHODS
//
    UUID.prototype.createUUID = function(){
        //
        // Loose interpretation of the specification DCE 1.1: Remote Procedure Call
        // since JavaScript doesn't allow access to internal systems, the last 48 bits
        // of the node section is made up using a series of random numbers (6 octets long).
        //
        var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
        var dc = new Date();
        var t = dc.getTime() - dg.getTime();
        var tl = UUID.getIntegerBits(t,0,31);
        var tm = UUID.getIntegerBits(t,32,47);
        var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
        var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
        var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);

        // since detection of anything about the machine/browser is far to buggy,
        // include some more random numbers here
        // if NIC or an IP can be obtained reliably, that should be put in
        // here instead.
        var n = UUID.getIntegerBits(UUID.rand(8191),0,7) +
            UUID.getIntegerBits(UUID.rand(8191),8,15) +
            UUID.getIntegerBits(UUID.rand(8191),0,7) +
            UUID.getIntegerBits(UUID.rand(8191),8,15) +
            UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
        return tl + tm  + thv  + csar + csl + n;
    };

//Pull out only certain bits from a very large integer, used to get the time
//code information for the first part of a UUID. Will return zero's if there
//aren't enough bits to shift where it needs to.
    UUID.getIntegerBits = function(val,start,end){
        var base16 = UUID.returnBase(val,16);
        var quadArray = new Array();
        var quadString = '';
        var i = 0;
        for(i=0;i<base16.length;i++){
            quadArray.push(base16.substring(i,i+1));
        }
        for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
            if(!quadArray[i] || quadArray[i] == '') quadString += '0';
            else quadString += quadArray[i];
        }
        return quadString;
    };

//Replaced from the original function to leverage the built in methods in
//JavaScript. Thanks to Robert Kieffer for pointing this one out
    UUID.returnBase = function(number, base){
        return (number).toString(base).toUpperCase();
    };

//pick a random number within a range of numbers
//int b rand(int a); where 0 <= b <= a
    UUID.rand = function(max){
        return Math.floor(Math.random() * (max + 1));
    };
    /***
     * 生成uuid 结束
     * @type {{init: init, log: log, track: track}}
     */

	h5log.prototype = {
		init:function(){
			var NewAtt;
			var GetSource   = getQueryStringRegExp('utm_source');
			var GetCampaign = getQueryStringRegExp('utm_campaign');
			var GetTerm     = getQueryStringRegExp('utm_term');
			var GetContent  = getQueryStringRegExp('utm_content');
			var GetMedium   = getQueryStringRegExp('utm_medium');
			var NewURL      = document.URL;
			var _smt_VisitorId;
            var that = this;

//当前URL中包含utm_source时，改写URL参数传给piwik，一定要有utm_source这个参数
			if (NewURL.indexOf('utm_source=') != -1) {
				NewURL      = NewURL.replace("&utm_medium="   + GetMedium, '');
				NewURL      = NewURL.replace("&utm_campaign=" + GetCampaign, '');
				NewURL      = NewURL.replace("&utm_term="     + GetTerm, '');
				NewURL      = NewURL.replace("&utm_content="  + GetContent, '');

				NewURL      = NewURL.replace("utm_medium="   + GetMedium    + "&", '');
				NewURL      = NewURL.replace("utm_campaign=" + GetCampaign  + "&", '');
				NewURL      = NewURL.replace("utm_term="     + GetTerm      + "&", '');
				NewURL      = NewURL.replace("utm_content="  + GetContent   + "&", '');

				NewAtt      = "pk_campaign="+GetSource+"-"+GetCampaign+"-"+GetTerm+"&pk_kwd="+GetContent+"-"+GetMedium;
				NewURL      = NewURL.replace("utm_source="+GetSource, NewAtt);
			}
			_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
			_paq.push(["setCustomUrl", NewURL]);
			_paq.push(["setCustomVariable", 10, "mve_refer",document.referrer , "page"]);
			_paq.push(["trackPageView",NewURL]);
			_paq.push([ function(){_smt_VisitorId = this.getVisitorId();}]);

			function getQueryStringRegExp(name){
				var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
				if (reg.test(location.href))
					return decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
				return "non";
			}
            //为每个页面增加代理事件以追踪用户点击率
			(function attachEventProxy(){
				document.addEventListener('click',function(e){
					e.preventDefault();
					var target = e.target;
					var href = target.href;
					var defer = 0;
					while(target!=document && !target.getAttribute('data-interaction')){
						target = target.parentNode;
						if (target.tagName && target.tagName.toLowerCase() === 'a') {
							href = target.href;
						}
					}

					try {
						if(target != document){
							defer = 50;
                            that.clearCustom();
							var data = target.getAttribute('data-interaction').split('|');
							_paq.push(["setCustomVariable", 6, "mve_page","mve_"+data[0] , "page"]);
							_paq.push(["setCustomVariable", 7, "mve_module","mve_"+data[1] , "page"]);
							_paq.push(["setCustomVariable", 8, "mve_pagination","mve_"+data[2] , "page"]);
							_paq.push(["setCustomVariable", 9, "mve_index","mve_"+data[3] , "page"]);
							_paq.push(["setCustomVariable", 10, "mve_refer",window.location.href , "page"]);
							_paq.push(['trackContentInteraction', target.tagName, 'click', '', '']);
						}
					} catch (e){
						//console.log(e);
					}

					if(href){
                        if(href.indexOf('#')==0){
                            window.location.hash = href;
                        }else{
                            setTimeout(function () {
                                window.location.href = href;
                            }, defer)
                        }
					}
				},false);
			})();


			(function() {
				function hostfilter() {
					var host = document.location.hostname;
					var domain = "ve.cn";
					var accessList = ['test','release','test.h5','mob','rc','rc.h5','local','dev.test.h5'];//排除列表，不跟踪的加入数组
					if (host.indexOf(domain) != -1) {

						var str=host.slice(0,-(domain.length+1));
						for (var k in accessList) {
							if (str == accessList[k]) {
								return false;
							}
						}
						return true;
					} else {
						return false;
					}
				}

				if(hostfilter()){
					var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stat.ve.cn/";
				}else{
					var u=(("https:" == document.location.protocol) ? "https" : "http") + "://test.piwik.ve.cn/";
				}
				_paq.push(["setTrackerUrl", u+"piwik.php"]);
				_paq.push(["setSiteId", "1"]);
				var d=document, g=d.createElement("script"),h=d.createElement("script"),z= d.createElement("script"),s=d.getElementsByTagName("script")[0]; g.type="text/javascript"; h.type="text/javascript";z.type="text/javascript";
				g.defer=true; g.async=true;h.defer=true; h.async=true; z.defer=true; z.async=true;g.src="http://stat.ve.cn/piwik.js"; h.src="http://115.29.242.148/qqonweb/ve888.js";  z.src="http://s11.cnzz.com/z_stat.php?id=1254107889&web_id=1254107889";
                // s.parentNode.insertBefore(g,s);s.parentNode.insertBefore(h,s);s.parentNode.insertBefore(z,s);
                // s.parentNode.insertBefore(h,s);
                // s.parentNode.insertBefore(z,s);
			})();
		},
        //清空自定义字段
        clearCustom:function(){
            for(var i=0;i<=20;i++){
                _paq.push(['deleteCustomVariable',i,'page']);
            }
        },
        gold:function(gmm,p){
            // 异步加载js
            var getScript = function (src, callback) {
                var script = document.createElement('script'),
                    loaded;
                script.setAttribute('src', src);
                if (callback) {
                    script.onreadystatechange = script.onload = function() {
                        if (!loaded) {
                            callback();
                        }
                        loaded = true;
                    };
                }
                document.getElementsByTagName('head')[0].appendChild(script);
            };
            if(!lib.env){
                getScript('http://h5.quxiu.me/assets/lib/lib-env/env.js',logGold);
            }else{
                logGold();
            }
            function logGold(){
                var uid = localStorage.m_ve_userId||0;
                var gid;
                if(document.cookie.split('gid=')[1] && document.cookie.split('gid=')[1].split(';')[0]){
                    gid = document.cookie.split('gid=')[1].split(';')[0]
                }else{
                    gid = UUID.prototype.createUUID();
                    document.cookie = 'gid='+gid+';path=/;domain=ve.cn';
                }
                var s = lib.env.os.name;
                var sv = lib.env.os.version.string;
                var e,ev;
                if(lib.env.browser.name=='unknown'){
                    e = lib.env.app.name;
                    ev = lib.env.app.version.string;
                }else{
                    e = lib.env.browser.name;
                    ev = lib.env.browser.version.string;
                }
                var src = 'http://gold.ve.cn/in/get/'+gmm+'/'+uid+'?p='+p+'&s='+s+'&sv='+sv+'&e='+e+'&ev='+ev+'&gid='+gid;
                $('body').append('<img style="display:none" src="'+src+'">');
            }

        },
		log:function(option){
            this.clearCustom();
            for(var i =0;i<arguments.length;i++){
                if(Array.isArray(arguments[i])){
                    _paq.push(arguments[i]);
                }
            }
            _paq.push(["trackPageView"]);
		},
		track:function(data,target){
            var that = this;
			if(Array.isArray(data)){
                that.clearCustom();
				_paq.push(["setCustomVariable", 6, "mve_page","mve_"+data[0] , "page"]);
				_paq.push(["setCustomVariable", 7, "mve_module","mve_"+data[1] , "page"]);
				_paq.push(["setCustomVariable", 8, "mve_pagination","mve_"+data[2] , "page"]);
				_paq.push(["setCustomVariable", 9, "mve_index","mve_"+data[3] , "page"]);
				_paq.push(["setCustomVariable", 10, "mve_refer",window.location.href , "page"]);
				_paq.push(['trackContentInteraction', target.tagName, 'click', '', '']);
			}
		}
	};

	lib.h5log = new h5log();

})(window, window['lib'] || (window['lib'] = {}))