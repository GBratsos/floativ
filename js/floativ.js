$(document).ready(function () {
    'use strict';
    var winHeight = $(window).height();
    var isiHeight = winHeight * (0.33);
    var isiHeight_expand = winHeight - 160; // winHeight * (0.55);

    $(".isi-head a.colapse-close").hide();
    $(".isi-head a.colapse-close").hide();
    $(".content01").mCustomScrollbar();

    $(".content01").bind("mousewheel DOMMouseScroll", function (e) {
        var delta = e.wheelDelta || -e.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });

    $(".isi-head a.expand-open").click(function (e) {
        e.preventDefault();
        $(".isi-head a.colapse-close").show();
        $(this).hide();
        $(".scroll-for-line").hide();
        isiHeight_expand = $(window).height() - 160;
        $(".content01").animate({
            height: isiHeight_expand
        }, "slow", function () {
            $(this).mCustomScrollbar("update");
        });
        $(".mCustomScrollBox > .mCSB_scrollTools").css({ "height": "92%" });
        $(".float-isi .isi_wrapper").css({ "margin": "0 25px 0 25px" });
    });

    $(".isi-head a.colapse-close").click(function (e) {
        e.preventDefault();
        $(".isi-head a.expand-open, .scroll-for-line").show();
        $(this).hide();

        $(".content01").animate({
            height: isiHeight
        }, "slow", function () {
            $(this).mCustomScrollbar("update");
        });
        $(".mCustomScrollBox > .mCSB_scrollTools").css({ "height": "87%" });
        $(".float-isi .isi_wrapper").css({ "margin": "0 0px 0 25px" });
    });

    function loadISI() {
        isiHeight = $(window).height() / (5.5);
        $(".content01").css({ "height": isiHeight });
        $(".colapse-close").click();
    }

    function footerHideShow() {
        var winHi = $(window).height() * (0.33);
        if ($("#idfloatisi1").offset() !== null) {
            if ($(window).scrollTop() > (($("#idfloatisi1").offset().top - $(window).height()) + winHi)) {
                $("#idfloatisi").css({ "display": "none" });
            } else {
                $("#idfloatisi").css({ "display": "block" });
            }
        }
    }

    loadISI();

    $(window).resize(function () {
        loadISI();
        setTimeout(function () {
            footerHideShow();
        }, 1000);
    });

    $(window).scroll(function () {
        footerHideShow();
    });

    setTimeout(function () {
        $("idfloatisi").css({ "display": "none" });
    }, 50);

    setTimeout(function () {
        footerHideShow();
    }, 1000);
});
