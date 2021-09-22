"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
var $html = $("html");
var controller = null;

$window.on("load", function () {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
    });
    _this.trigger("resize");
    $(window).scroll(function () {
        winSc = _this.scrollTop();
    });
    layout();
    film();
});
function film() {
    // mask init
    var maskImg_w = 960,
        maskImg_h = 540;
    if($window.width() < 1600){
        maskImg_w = 800;
        maskImg_h = 450
    }
    // //mask init
    var controller = new ScrollMagic.Controller({
        tweenChanges: true
    });

    var $film = $(".film_container"),
        $maskScroll = $film.find("#filmMaskScroll"),
        $maskSVG = $maskScroll.find(".svg_wrap"),
        $maskimg = $maskScroll.find(".svg_bg"),
        $maskBgTxt = $maskimg.find(".bg_txt"),
        $filmTxt = $maskScroll.find(".txt_wrap"); 

    $maskimg.css({"top":"-" + $filmTxt.height() + "px"})

    var maskMask_1 = TweenMax.to($maskSVG, .3, {left:"42.5%", top:"50%", scale:5}),
        maskMask_2 = TweenMax.to($maskSVG, .4, {left:"-55%", top:"55%", scale:80, opacity:0, display:"none"}), // 78
        maskBgTxt = TweenMax.to($maskBgTxt, .2, {opacity:1, display:"block"}),
        maskImg = TweenMax.to($maskimg, .4, {width:maskImg_w, height:maskImg_h, top:"0"});

    var _maskTime = new TimelineMax();
    _maskTime.add(maskMask_1).add(maskMask_2)
        .add(maskImg).add(maskBgTxt);

    var sceneMask = new ScrollMagic.Scene({
        triggerElement: "#filmMaskScroll",
        duration:1000,
        triggerHook:0

    })
        .setPin("#filmMaskScroll")
        .setTween(_maskTime)
        .addTo(controller);

    var winH = window.innerHeight ,
        winSc,
        contArrH = [],
        contCount = [],
        contList = [], 
        bin = [],
        cont = [];

    $(".step_box").each(function(){
        contArrH.push($(this).offset().top - (winH / 2) - 350 );
        cont.push($(this));
        contCount.push($(this).find(".cont").length);
        contList.push($(this).find(".cont"));
    });

    function scrollAct() {
        winSc = $(document).scrollTop();
        for(var i = 0; i < contArrH.length; i++){
            if( winSc >= contArrH[i] ){
                bin = [];
                for (var temp = 0; temp < contCount[i]; temp++) {
                    bin.push(contList[i][temp]);
                }
                TweenMax.staggerTo(bin, .8, {transform:"translate3d(0,0,0)", opacity:1}, .4);
                TweenMax.to(cont[i].find(".h1_bg_width"), .5, {width:"100%", opacity:1});
                TweenMax.to(cont[i].find(".h1_bg_height"), .5, {height:"100%", opacity:1});
                TweenMax.staggerTo($(bin).find(".mask-wrap"), 1.3, {width: "100%", height: "100%", delay:.45, ease:Power4.easeOut}, .25);
            }
        }
    }

    var pageChk = $("#wrap").find(".film_container").length;
    if(pageChk > 0){
        $(window).on("scroll",function(){
            scrollAct();
        });
        scrollAct();
    }
}

function layout() {
    var $lifeWrap = $(".life_wrap");
    // life lnb
    var $lifeLnb = $(".life_lnb");
    $window.scroll(function () {
        if(winSc > 80){
            $lifeLnb.addClass("pos_fixed");
        }else{
            $lifeLnb.removeClass("pos_fixed");
        }
    })
}