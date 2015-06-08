(function () {
    // indicator.css
    var cssText = "" +
"[data-ctrl-name=indicator] span{display:block;overflow:hidden;width:.4rem;height:.4rem;font-size:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNqkVE1oE1EQnrdJ2liaQyKNDRVBLU3SYhpSDRqVij2Ip4InqVisWOlBhBSVKOrBXgpKoRCaSw6KJxG8F2xJQSvtpfFifxI9KGnTGJrDWk0226wzy25MYlt368DwYHa+771975uPSZIElcEYM+FixbRg1inlAiaPmcN+sbKfqwEf8Pv97VNTU125XO40Np+lzGazgcnJyeMul8uNPfYqjHoC/NAciURcg4ODRw0YsE0Ui8WtcDi8Mjw8nEBcmmpGBWyfmJhwDg0NtcEuYTKZDMFg0C0IgoSYEpJkGNUDgUBHLBbrogbQEHQSj8czv7S0tEh3YB0ZGXFoBasnGR8fP0hYIrD4fL4m0Bler9eGSyMRmCwWS71eAqvVSpg6DvYeTNVBkef5gl406iSPi0AE/MLCQlYvQTwe38DlB928kEgk9vX39zejfjitz9jb27uICv3GoRiKs7Ozq9FoNKl197GxsWXUwDrNhaxEWVGMcaIoAqqxdSdN4M4igldCoVCSMKCAy4lhx2HqxMG5mE6n+7B2kzKVSl2mGg7TMeqpxLBtxtmojHMjplkp/8Lc/Oc4V7wvq/m24+Uaa/3gxmFoe9jOrjab4UI9B4eont+Cz6t5eHv3o/Qce76U/7/WD+Z62PUTNnjE/hy9KkoS/HyXhQfdMemV6gcyAfnBh/Ns4OR+GNXyjNMZuN0zI5NkOPLAW63Q7rfBY606ONcEo5da4AhduOwHd5ysj2PQoJWAep92smtlP6AL0zsLDjN0l/0Ah9qhlwBfqOV//cBQ9gOhBGt60YUSfC37QRpFopdgLQ8z5AdEkHu2LL0kkWgFUy+pkrCyH4ST8Gl+A55oJYh9h9CbFJCkRU71g1PT0ov3Wbi320nwG6+o8LU6D1XjTJLGYXLed7MrqI0zDQbooPqmCPH1AszRsZWd/x6mvfrBbwEGAEsWX34YFVnkAAAAAElFTkSuQmCC);background-repeat:none}[data-ctrl-name=indicator] b{box-sizing:border-box;display:block;height:.5rem;line-height:.5rem;border:1px solid rgba(0,0,0,.16);background-color:rgba(255,255,255,.4);border-radius:.25rem;padding:0 .3rem;margin:0 .35rem;font-weight:400;color:#999;overflow:hidden}[data-ctrl-name=indicator] b.hide{display:none}[data-ctrl-name=indicator] b.show{display:block}[data-ctrl-name=indicator][data-dir=horizontal]{width:100%;padding-bottom:.4rem;display:-ms-flexbox;-ms-flex-align:center;-ms-flex-pack:center;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;text-align:center}[data-ctrl-name=indicator][data-dir=horizontal] span{margin:0 .15rem}[data-ctrl-name=indicator][data-dir=vertical] span{margin:.15rem 0}[data-ctrl-name=indicator][data-dir=vertical] b.hide{display:none}[data-ctrl-name=indicator][data-dir=vertical] b.show{display:none}[data-dpr=\"1\"] [data-ctrl-name=indicator] b{font-size:7px}[data-dpr=\"2\"] [data-ctrl-name=indicator] b{font-size:14px}[data-dpr=\"3\"] [data-ctrl-name=indicator] b{font-size:21px}";
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
