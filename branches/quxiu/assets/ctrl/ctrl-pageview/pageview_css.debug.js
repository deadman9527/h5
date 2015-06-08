(function () {
    // pageview.css
    var cssText = "" +
"[data-ctrl-name=pageview]{position:relative}[data-ctrl-name=pageview].fullscreen{width:100%;height:100%;overflow:hidden}[data-ctrl-name=pageview]>.view{position:absolute}[data-ctrl-name=pageview].fullscreen>.view{width:100%;height:100%;overflow:hidden}";
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
