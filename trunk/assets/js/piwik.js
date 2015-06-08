var _paq = _paq || [];
var NewAtt;
var GetSource   = getQueryStringRegExp('utm_source');
var GetCampaign = getQueryStringRegExp('utm_campaign');
var GetTerm     = getQueryStringRegExp('utm_term');
var GetContent  = getQueryStringRegExp('utm_content');
var GetMedium   = getQueryStringRegExp('utm_medium');
var NewURL      = document.URL;
var _smt_VisitorId;
var user_id=lib.storage && lib.storage.get('userId');
var product_id=getQueryStringRegExp('productId');
var orderid=getQueryStringRegExp('orderSn');
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
if(user_id!=''){
    _paq.push(["setCustomVariable", 1, "userid", user_id, "visit"]);
}
if(product_id!=''){
    _paq.push(['setEcommerceView',""]);
}

if(orderid!=''){
    _paq.push(["setCustomVariable", 2, "orderid", orderid, "visit"]);
    _paq.push(['setEcommerceView',"","",orderid]);
}

_paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
_paq.push(["setCustomUrl", NewURL]);
_paq.push(["trackPageView",NewURL]);
_paq.push([ function(){_smt_VisitorId = this.getVisitorId();}]);

function getQueryStringRegExp(name){
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href))
        return decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
    return "non";
}

(function() {
    function hostfilter() {
        var host = document.location.hostname;
        var domain = "ve.cn";
        var accessList = ['test','release','test.h5','mob','rc','rc.h5','local'];//排除列表，不跟踪的加入数组
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
    var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
    g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();

