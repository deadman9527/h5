!function(){var e={diaper:{data:["花王","好奇","帮宝适","大王","安尔乐"],notNeedAll:!1},cloth:{data:["舒适百搭","潮牌爆款","可爱萌萌哒"],notNeedAll:!0},"dry-milk":{data:["牛栏","爱他美","美素佳儿","贝拉米","德国喜宝"],notNeedAll:!1}},t={style:'.single-line{                    white-space: nowrap;                    overflow: hidden;                    text-overflow: ellipsis;                }                .inject-nav-box{                    background: #f0f0f0;                    padding: 0.5rem 0.5rem 0;                }                .inject-nav{                    display: inline-block;                    width: 4.8rem;                    height: 1.8rem;                    line-height: 1.8rem;                    text-align: center;                    margin-right: 0.3rem;                    font-size: 13px;                    margin-bottom: 0.5rem;                    background: #fff;                    color: #808080;                    -webkit-border-radius: 3px;                }                [data-dpr="2"] .inject-nav{                    font-size: 26px;                }                [data-dpr="3"] .inject-nav{                    font-size: 39px;                }                .inject-nav.current{                    background: #ff4a8b;                    color: #fff;                }',add:function(){var e=document.createElement("style");document.head.appendChild(e),e.innerHTML=this.style}},n={init:function(){t.add(),this.page=this.checkPage(),this.types=e[this.page],this.notNeedAll=this.types.notNeedAll,this.renderNav(),this.addEvents()},addEvents:function(){$(".inject-nav").on("click",function(){var e=$(this);$(".inject-nav").removeClass("current"),e.addClass("current");var t=e.attr("data-type"),n=$("[hui-widget=itemlist]");"all"==t?n.show():n.each(function(e,n){e==t?$(n).show():$(n).hide()})})},checkPage:function(){var e=location.href.match(/.+\/([^\.]+)\.html/);return e[1]},renderNav:function(){var e=[];e.push('<a class="inject-nav single-line current" href="javascript:void(0)" data-type="all">全部</a>');var t=this;this.types.data.forEach(function(n,a){var i=1;i=t.notNeedAll?2:1,e.push(a==i||a%3==i?'<a class="inject-nav single-line" href="javascript:void(0)" data-type="'+a+'" style="margin-right:0px;">'+n+"</a>":'<a class="inject-nav single-line" href="javascript:void(0)" data-type="'+a+'">'+n+"</a>")});var n='<div class="inject-nav-box">'+e.join("")+"</div>",a=document.querySelector("[hui-widget=banner]");$(a).after(n)}};$(function(){n.init()})}();