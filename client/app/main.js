'use strict';

require([
    'jquery',
    'app',
    'main/main.module',
    'admin/admin.module',
    'bootstrap'],
function ($, App) {
    $(function () {
        App.start();


        // Header animated scroll
        $('a[data-scroll]').on('click', function(event) {

            var target = $( $(this).attr('href') );

            if( target.length ) {
                event.preventDefault();

                var height = $('.header').height();

                $('html, body').animate({
                    scrollTop: target.offset().top - height
                }, 800);
            }

        });

        // Calendar scroll animation
        $('#calendarbtn').click(function() {
            var $window = $(window);
            var $calendar = $('#calendar');

            var open = $calendar.is('.in');

            $calendar.collapse('toggle');

            if (!open) {
                var windowBottom = $window.scrollTop() + $window.height();
                var calendarHeight = $calendar[0].scrollHeight;
                var calendarBottom = $calendar.offset().top + calendarHeight;

                var scrollAmount = calendarBottom - windowBottom;

                if (scrollAmount > 0) {
                    $('html, body').animate({
                        scrollTop: $window.scrollTop() + scrollAmount
                    }, 350);
                }
            }

        });

        // MENU scroll animation
        $('#menubtn').click(function() {
            var $window = $(window);
            var $menu = $('#dropmenu');

            var open = $menu.is('.in');

            $menu.collapse('toggle');

            if (!open) {
                var windowBottom = $window.scrollTop() + $window.height();
                var menuHeight = $menu[0].scrollHeight;
                var menuBottom = $menu.offset().top + menuHeight;

                var scrollAmount = menuBottom - windowBottom;

                if (scrollAmount > 0) {
                    $('html, body').animate({
                        scrollTop: $window.scrollTop() + scrollAmount
                    }, 350);
                }
            }

        });

    });


// START PARALLAX CODE


/* detect touch */
if('ontouchstart' in window){
    document.documentElement.className = document.documentElement.className + ' touch';
}
if(!$('html').hasClass('touch')){
    /* background fix */
    $('.parallax').css('background-attachment', 'fixed');
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $('.content-b').each(function(){
        if($(this).innerHeight() <= h){
            $(this).closest('.fullscreen').addClass('not-overflow');
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $('.background').each(function(){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr('data-img-width');
        var imgH = path.attr('data-img-height');
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr('data-diff'));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass('parallax') && !$('html').hasClass('touch')){
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data('resized-imgW', imgW);
        path.data('resized-imgH', imgH);
        path.css('background-size', imgW + 'px ' + imgH + 'px');
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $('.parallax').each(function(){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgH = path.data('resized-imgH');
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr('data-oriz-pos');
            orizontalPosition = orizontalPosition ? orizontalPosition : '50%';
            $(this).css('background-position', orizontalPosition + ' '  + value + 'px');
        }
    });
}
if(!$('html').hasClass('touch')){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}


// END PARALLAX CODE





});

