/**
 * floativ is a floating box at the end of the screen that contains text, among other things, which can be
 * displayed while browsing a web page. This floating box disappears when the user reaches an element with
 * a specific id.
 *
 * Version 1.0.4
 *
 */
(function ($) {

    $.fn.extend({
        floativ: function(options) {
            var defaults = {
                breakPoint: "#floativ-break", // The class where we hide our element
                height: 250, // Height of the float box
                width: 500, // Width of the float box
                heightPercentance: 0.33, // Visible height percentage of the box
                widthPercentance: 0.33, // Visible width percentage of the box
                heightExpand: 160, // Expandable height
                widthExpand: 160, // Expandable width
                animate: "slow" // Animation method
            };

            defaults.floativHeight = $(window).height() * defaults.heightPercentance; // Calculate floativ height
            defaults.floativHeight_expand = $(window).height() - defaults.heightExpand; // Calculate floativ expand height

            var o = $.extend(defaults, options); // Merge defaults with user inputs

            // Do it for every element that matches selector
            this.each(function(){
                var $this = $(this); // Assign current element to variable
                $this.data("floativ", o); // Save settings
                $(".floativ-collapse", $this).hide(); // Hide minus-collapse sign
                $this.mCustomScrollbar({
                    theme: "dark-3"
                }); // Apply mCustomScrollbar on element

                floativLoad();

                function floativLoad(){
                    floativHeight = $(window).height() / (5.5);
                    $this.css({"height": floativHeight + "px"});
                }

                function floativToggle(){
                    var settings = $this.data("floativ");
                    if ($(settings.breakPoint).offset() !== null) {
                        if ($(window).scrollTop() > (($(settings.breakPoint).offset().top - $(window).height()) + settings.floativHeight)) {
                            $this.css({"display": "none"});
                        } else {
                            $this.css({"display": "block"});
                        }
                    }
                }

                // Click expand button
                $(".floativ-expand", $this).click(function (e) {
                    e.preventDefault();
                    $(".floativ-collapse", $this).show();
                    $(".floativ-expand", $this).hide();
                    $this.animate({"height": o.floativHeight_expand + "px"}, o.animate, function() {
                        $this.mCustomScrollbar("update");
                    });
                });

                //  Click collapse button
                $(".floativ-collapse", $this).click(function (e) {
                    e.preventDefault();
                    $(".floativ-expand", $this).show();
                    $(".floativ-collapse", $this).hide();
                    $this.animate({"height": o.floativHeight + "px"}, o.animate, function() {
                        $this.mCustomScrollbar("update");
                    });
                });

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
                    $this.css({"display": "none"});
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
