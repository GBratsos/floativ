/**
 * floativ is a floating box at the end of the screen that contains text, among other things, which can be
 * displayed while browsing a web page. This floating box disappears when the user reaches an element with
 * a specific id.
 *
 * Version 1.0.2
 *
 */
(function ($) {

    $.fn.extend({
        floativ: function(options) {
            var defaults = {
                breakPoint: '#floativ-break', // The class where we hide our element
                height: 250, // Height of the float box
                width: 500, // Width of the float box
                heightPercentance: 0.33, // Visible height percentage of the box
                widthPercentance: 0.33, // Visible width percentage of the box
                heightExpand: 160, // Expandable height
                widthExpand: 160, // Expandable width
                animate: 'slow' // Animation method
            };

            defaults.floativHeight = $(window).height() * defaults.heightPercentance; // Calculate floativ height
            defaults.floativHeight_expand = $(window).height() - defaults.heightExpand; // Calculate floativ expand height

            var o = $.extend(defaults, options);

            // Do it for every element that matches selector
            this.each(function(){
                var $this = $(this); // Assign current element to variable
                $this.data('floativ', o); // Save settings
                $this.find('.floativ-collapse').hide(); // Hide minus-collapse sign
                $this.find('.floativ-body').slimScroll(); // Apply slimscroll on element

                floativLoad();

                function floativLoad(){
                    floativHeight = $(window).height() / (5.5);
                    $this.find('.floativ-body').css({"height": floativHeight + 'px'});
                    $this.find(".floativ-collapse").click();
                }

                function floativToggle(){
                    var settings = $this.data('floativ');
                    if ($(settings.breakPoint).offset() !== null) {
                        if ($(window).scrollTop() > (($(settings.breakPoint).offset().top - $(window).height()) + settings.floativHeight)) {
                            $this.css({"display": "none"});
                        } else {
                            $this.css({"display": "block"});
                        }
                    }
                }

                $this.find('.floativ-body').bind('mousewheel DOMMouseScroll', function (e) {
                    var delta = e.wheelDelta || -e.detail;
                    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                    e.preventDefault();
                });

                // Click expand button
                $this.find(".floativ-expand").click(function (e) {
                    // debugger;
                    e.preventDefault();
                    $this.find(".floativ-collapse").show();
                    $this.find(".floativ-expand").hide();
                    o.floativHeight_expand = $(window).height() - 160;
                    $this.find(".floativ-body").animate({
                        height: o.floativHeight_expand
                    }, o.animate, function () {
                        $this.slimScroll("update");
                    });
                    $this.find(".mCSB_scrollTools").css({"height": "92%"});
                    $this.find(".floativ-body").css({"margin": "0 25px 0 25px"});
                });

                //  Click collapse button
                $this.find(".floativ-collapse").click(function (e) {
                    e.preventDefault();
                    $this.find(".floativ-expand").show();
                    $this.find(".floativ-collapse").hide();
                    $this.find(".floativ-body").animate({
                        height: o.floativHeight
                    }, o.animate, function () {
                        $this.slimScroll("update");
                    });
                    $this.find(".mCSB_scrollTools").css({"height": "87%"});
                    $this.find(".floativ-body").css({"margin": "0 0px 0 25px"});
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
                    $("#floativ").css({"display": "none"});
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
