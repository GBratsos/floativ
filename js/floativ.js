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
                height: 'auto', // Height of the float box
                width: 'auto', // Width of the float box
                heightPercentance: 0.33, // Visible height percentage of the box
                widthPercentance: 0.33, // Visible width percentage of the box
                heightExpand: 160, // Expandable height
                widthExpand: 160, // Expandable width
                animate: 'slow' // Animation method
            };

            var o = $.extend(defaults, options);

            // Do it for every element that matches selector
            this.each(function(){
                var $this = $(this); // Assign current element to variable
                var wind = $(window);
                var winHeight = wind.height(); // Get window height
                var floativHeight = winHeight * parseInt(o.heightPercentance); // Calculate floativ height
                var floativHeight_expand = winHeight - parseInt(o.heightExpand); // Calculate floativ expand height
                $this.data('floativ', o); // Save settings
                $($this).find('.floativ-collapse').hide(); // Hide minus-collapse sign
                $this.find('.floativ-body').slimScroll(); // Apply slimscroll on element

                floativLoad(winHeight);

                function floativLoad(winHeight){
                    floativHeight = winHeight / (5.5);
                    $this.find('.floativ-body').css({"height": floativHeight});
                    $this.find(".floativ-collapse").click();
                }

                function floativToggle(floativHeight, wind){
                    var settings = $this.data('floativ');
                    if ($("#floativ-break").offset() !== null) {
                        if (wind.scrollTop() > ((settings.breakPoint.offset().top - wind.height()) + floativHeight)) {
                            $this.css({"display": "none"});
                        } else {
                            $this.css({"display": "block"});
                        }
                    }
                }
            });

            // Maintain chainablitiy
            return this;
        }
    });

    $.fn.extend({
        floativ: $.fn.floativ
    });

})(jQuery);

//     // Click expand button
//     $(".floativ-expand").click(function (e) {
//         e.preventDefault();
//         $(".floativ-collapse").show();
//         $(this).hide();
//         floativHeight_expand = $(window).height() - 160;
//         $(".floativ-body").animate({
//             height: floativHeight_expand
//         }, "slow", function () {
//             $(this).slimScroll("update");
//         });
//         $(".mCSB_scrollTools").css({"height": "92%"});
//         $(".floativ-body").css({"margin": "0 25px 0 25px"});
//     });

//     //  Click collapse button
//     $(".floativ-collapse").click(function (e) {
//         e.preventDefault();
//         $(".floativ-expand").show();
//         $(this).hide();

//         $(".floativ-body").animate({
//             height: floativHeight
//         }, "slow", function () {
//             $(this).slimScroll("update");
//         });
//         $(".mCSB_scrollTools").css({"height": "87%"});
//         $(".floativ-body").css({"margin": "0 0px 0 25px"});
//     });

//     $(window).resize(function () {
//         loadFloativ();
//         setTimeout(function () {
//             floativToggle();
//         }, 1000);
//     });

//     $(window).scroll(function () {
//         floativToggle();
//     });

//     setTimeout(function () {
//         $("#floativ").css({"display": "none"});
//     }, 50);

//     setTimeout(function () {
//         floativToggle();
//     }, 1000);
