/**
 * floativ is a floating box at the end of the screen that contains text, among other things, which can be
 * displayed while browsing a web page. This floating box disappears when the user reaches an element with
 * a specific id.
 *
 * Version 1.1.0
 *
 */
(function ($) {

    $.fn.extend({
        floativ: function(options) {
            var defaults = {
                breakPoint: "#floativ-break", // The class where we hide our element
                height: "100px", // Height of the float box
                width: "auto", // Width of the float box
                offsetPercentage: 0.33, // Adds offset to the breaking point
                heightExpand: "160px", // Expandable height
                widthExpand: "160px", // Expandable width
                animate: "slow", // Animation method
                customClass: null, // Extra class for the parent object
                scrollbar: { // mCustomScrollbar (default) options
                    alwaysShowScrollbar: 1,
                    theme: "dark-3"
                }
            };

            var o = $.extend(defaults, options); // Merge defaults with user inputs

            // Calculate offsets and expands
            o.floativOffsetpercentage = $(window).height() * o.offsetPercentage;
            o.floativHeight_expand = (parseInt(o.height) + parseInt(o.heightExpand)) + "px";
            o.floativWidth_expand = (o.width !== "auto") ? parseInt(o.width) + parseInt(o.widthExpand) : "auto" ;

            // Do it for every element that matches selector
            this.each(function(){
                var $this = $(this); // Assign current element to variable
                $this.data("floativ", o); // Save settings
                $(".floativ-collapse", $this).hide(); // Hide minus-collapse sign
                $(".floativ-wrapper", $this).css({height: o.height, width: o.width}).mCustomScrollbar(o.scrollbar); // Apply mCustomScrollbar on element

                floativLoad(); // Start the plugin

                function floativLoad(){
                    $this.css({height: o.height, width: o.width})
                    if (o.customClass !== null) $this.addClass(o.customClass);
                }

                function floativToggle(){
                    if ($(o.breakPoint).offset() !== null) {
                        // Calculate at which point should the float box hide
                        if ($(window).scrollTop() > ($(o.breakPoint).offset().top - $(window).height() + o.floativOffsetpercentage)) {
                            $this.css({display: "none"});
                        } else {
                            $this.css({display: "block"});
                        }
                    }
                }

                $('.floativ-body', $this).bind('mousewheel DOMMouseScroll', function (e) {
                    var delta = e.wheelDelta || -e.detail;
                    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                    e.preventDefault();
                });

                // Click expand button
                $(".floativ-expand", $this).click(function (e) {
                    e.preventDefault();
                    $(".floativ-collapse", $this).show();
                    $(".floativ-expand", $this).hide();
                    $this.animate({height: o.floativHeight_expand, width: o.floativWidth_expand}, o.animate);
                    $(".floativ-wrapper", $this).animate({height: o.floativHeight_expand, width: o.floativWidth_expand}, o.animate, function() {
                        $(".floativ-wrapper", $this).mCustomScrollbar("update");
                    });
                });

                //  Click collapse button
                $(".floativ-collapse", $this).click(function (e) {
                    e.preventDefault();
                    $(".floativ-expand", $this).show();
                    $(".floativ-collapse", $this).hide();
                    $this.animate({height: o.height, width: o.width}, o.animate);
                    $(".floativ-wrapper", $this).animate({height: o.height, width: o.width}, o.animate, function() {
                        $(".floativ-wrapper", $this).mCustomScrollbar("update");
                    });
                });

                $(window).resize(function () {
                    floativLoad();
                    setTimeout(function () {
                        floativToggle();
                    }, 1000);
                });

                $(window).scroll(function () {
                    floativToggle();
                });

                setTimeout(function () {
                    $this.css({display: "none"});
                }, 50);

                setTimeout(function () {
                    floativToggle();
                }, 1000);
            });

            // Maintain chainablitiy
            return this;
        }
    });

    $.fn.extend({
        floativ: $.fn.floativ
    });

})(jQuery);
