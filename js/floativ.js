$(document).ready(function () {
    'use strict';
    var winHeight = $(window).height();
    var floativHeight = winHeight * (0.33);
    var floativHeight_expand = winHeight - 160;

    $(".floativ-collapse").hide();

    $("#floativ").mCustomScrollbar({
        theme: 'dark'
    });

    // Prevent page scrolling in floativ
    $("#floativ").bind("mousewheel DOMMouseScroll", function (e) {
        var delta = e.wheelDelta || -e.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });

    // Click expand button
    $(".floativ-expand").click(function (e) {
        e.preventDefault();
        $(".floativ-collapse").show();
        $(this).hide();
        floativHeight_expand = $(window).height() - 160;
        $("#floativ").animate({
            height: floativHeight_expand
        }, "slow", function () {
            $(this).mCustomScrollbar("update");
        });
        $(".mCSB_scrollTools").css({"height": "92%"});
        $(".floativ-body").css({"margin": "0 25px 0 25px"});
    });

    //  Click collapse button
    $(".floativ-collapse").click(function (e) {
        e.preventDefault();
        $(".floativ-expand").show();
        $(this).hide();

        $("#floativ").animate({
            height: floativHeight
        }, "slow", function () {
            $(this).mCustomScrollbar("update");
        });
        $(".mCSB_scrollTools").css({"height": "87%"});
        $(".floativ-body").css({"margin": "0 0px 0 25px"});
    });

    // Load/Show the float box
    function loadFloativ() {
        floativHeight = $(window).height() / (5.5);
        $("#floativ").css({"height": floativHeight});
        $(".floativ-collapse").click();
    }

    // Toggle the visibility of the float box based on window position and the breakpoint
    function floativToggle() {
        var winHi = $(window).height() * (0.33);
        if ($("#floativ-break").offset() !== null) {
            if ($(window).scrollTop() > (($("#floativ-break").offset().top - $(window).height()) + winHi)) {
                $("#floativ").css({"display": "none"});
            } else {
                $("#floativ").css({"display": "block"});
            }
        }
    }

    // Instantiate floativ
    loadFloativ();

    $(window).resize(function () {
        loadFloativ();
        setTimeout(function () {
            floativToggle();
        }, 1000);
    });

    $(window).scroll(function () {
        floativToggle();
    });

    setTimeout(function () {
        $("#floativ").css({"display": "none"});
    }, 50);

    setTimeout(function () {
        floativToggle();
    }, 1000);
});
