(function () {
    // flexible.css
    var cssText = "" +
"@charset \"utf-8\"; html{overflow-y:scroll}html,body{font-family:sans-serif}.clearfix:before,.clearfix:after{content:\" \";display:table}.clearfix:after{clear:both}.fn-hide{display:none}html{color:#000;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,q:after{content:''}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}ins,a{text-decoration:none}.grid{box-sizing:content-box;padding-left:.3rem;padding-right:.3rem;margin-left:-.2rem}.grid:before,.grid:after{content:\" \";display:table}.grid:after{clear:both}.grid [class^=col-]{margin-left:.2rem;float:left}.grid .col-1{width:1.1rem}.grid .col-2{width:2.4rem}.grid .col-3{width:3.7rem}.grid .col-4{width:5rem}.grid .col-5{width:6.3rem}.grid .col-6{width:7.6000000000000005rem}.grid .col-7{width:8.900000000000002rem}.grid .col-8{width:10.200000000000001rem}.grid .col-9{width:11.500000000000002rem}.grid .col-10{width:12.8rem}.grid .col-11{width:14.100000000000001rem}.grid .col-12{width:15.400000000000002rem}.grid-thin{box-sizing:content-box;padding-left:.4rem;padding-right:.4rem;margin-left:-.4rem}.grid-thin:before,.grid-thin:after{content:\" \";display:table}.grid-thin:after{clear:both}.grid-thin [class^=col-]{margin-left:.4rem;float:left}.grid-thin .col-1{width:.9rem}.grid-thin .col-2{width:2.2rem}.grid-thin .col-3{width:3.5000000000000004rem}.grid-thin .col-4{width:4.8rem}.grid-thin .col-5{width:6.1rem}.grid-thin .col-6{width:7.4rem}.grid-thin .col-7{width:8.7rem}.grid-thin .col-8{width:10rem}.grid-thin .col-9{width:11.299999999999999rem}.grid-thin .col-10{width:12.6rem}.grid-thin .col-11{width:13.9rem}.grid-thin .col-12{width:15.200000000000001rem}.grid-fat{box-sizing:content-box;padding-left:.2rem;padding-right:.2rem;margin-left:0rem}.grid-fat:before,.grid-fat:after{content:\" \";display:table}.grid-fat:after{clear:both}.grid-fat [class^=col-]{margin-left:0rem;float:left}.grid-fat .col-1{width:1.3rem}.grid-fat .col-2{width:2.6rem}.grid-fat .col-3{width:3.9000000000000004rem}.grid-fat .col-4{width:5.2rem}.grid-fat .col-5{width:6.5rem}.grid-fat .col-6{width:7.800000000000001rem}.grid-fat .col-7{width:9.1rem}.grid-fat .col-8{width:10.4rem}.grid-fat .col-9{width:11.700000000000001rem}.grid-fat .col-10{width:13rem}.grid-fat .col-11{width:14.3rem}.grid-fat .col-12{width:15.600000000000001rem}";
    // cssText end

    var styleEl = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText
        } catch(e) {
            styleEl.innerText = cssText;
        }
    }
}());
