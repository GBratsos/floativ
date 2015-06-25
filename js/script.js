$(window).scroll(function () {
    footerHideShow();
});

function footerHideShow() {
    var winHi = jQuery(window).height() * (0.33);

    if (jQuery("#idfloatisi1").offset() != null) {
        if (jQuery(window).scrollTop() > ((jQuery("#idfloatisi1").offset().top - jQuery(window).height()) + winHi)) {

            jQuery('#idfloatisi').css('display', 'none');
        } else {
            jQuery('#idfloatisi').css({
                'display': 'block'
            });
        }
    }

}



setTimeout(function () {
    document.getElementById("idfloatisi").style.display = "none";
}, 50);

var winHeight = jQuery(window).height();
var isiHeight = winHeight * (0.33);
var isiHeight_expand = winHeight - 160; //winHeight*(0.55);

(function ($) {
    $(document).ready(function () {

        $(".isi-head a.colapse-close").hide();
        $(".content01").mCustomScrollbar();
        $('.content01').bind('mousewheel DOMMouseScroll', function (e) {
            var delta = e.wheelDelta || -e.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        });

        $(".isi-head a.expand-open").click(function (e) {
            e.preventDefault();
            $(".isi-head a.colapse-close").show();
            $(this).hide();
            $(".scroll-for-line").hide();
            isiHeight_expand = jQuery(window).height() - 160;
            $(".content01").animate({
                height: isiHeight_expand
            }, "slow", function () {
                $(this).mCustomScrollbar("update");
            });
            $(".mCustomScrollBox > .mCSB_scrollTools").css({
                "height": "92%"
            });
            $(".float-isi .isi_wrapper").css("margin", "0 25px 0 25px");
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
            $(".mCustomScrollBox > .mCSB_scrollTools").css({
                "height": "87%"
            });
            $(".float-isi .isi_wrapper").css("margin", "0 0px 0 25px");

        });
    });

})(jQuery);



function loadISI() {
    isiHeight = jQuery(window).height() / 5.5;
    $(".content01").css("height", isiHeight);
    $(".colapse-close").click();
};

$(document).ready(function () {
    loadISI();
    setTimeout(function () {
        footerHideShow();
    }, 1000);

    $(window).resize(function () {
        loadISI();
        setTimeout(function () {
            footerHideShow();
        }, 1000);
    });

    $(".isi-head a.colapse-close").hide();
});