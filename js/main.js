// Hide animation stage's placeholder image when song is started
// Un-hide animation
$('.amplitude-play-pause').on('click', function () {
    $('#defaultAnim').hide('fade',2000, 'easeOutCubic');
    $('#amplitude-visualization').show('fade', 2000);
});

/*********************************************************/
//              Footer show/hide functions               //
/*********************************************************/
var footerTimer;
// Show footer on first song click
$('.playList li').on('click', function () {
    $('.footer').animate({bottom: "0px"}, 1000);
    $('.footerTopMouseCatch').animate({bottom: "0px"}, 1000);

// Delay to auto-hide footer on inactivity
    footerTimer = setTimeout(function () {
        var $footer = $('.footer');
        var $footerTop = $('.footerTopMouseCatch');
        $footer.stop().animate({bottom: "-70px"}, 1000);
        $footerTop.stop().animate({bottom: "0"}, 10);
    }, 8000);
});

// Kill auto-hide when mouse is over footer / Reset auto-hide when mouse leaves footer
$('.footer').hover(function () {
    console.log('Mouse Enter');
    clearTimeout(footerTimer);
    }, function () {
        console.log('Mouse Leave');
        footerTimer = setTimeout(function () {
            var $footer = $('.footer');
            var $footerTop = $('.footerTopMouseCatch');
            $footer.stop().animate({bottom: "-70px"}, 1000);
            $footerTop.stop().animate({bottom: "0"}, 10);
        }, 6000);
});
// Hotspot-zone above footer to catch when mouse hovers at bottom of screen while footer is hidden
$('.footerTopMouseCatch').hover(function () {
    $('.footer').animate({bottom: "0px"}, 1000);
    $('.footerTopMouseCatch').animate({bottom: "0px"}, 10);
    }, function () {
        console.log('Mouse Leave');
        footerTimer = setTimeout(function () {
            var $footer = $('.footer');
            var $footerTop = $('.footerTopMouseCatch');
            $footer.stop().animate({bottom: "-70px"}, 1000);
            $footerTop.stop().animate({bottom: "0"}, 10);
        }, 6000);
});

// Stolen navbar-scroll function: Clicking on the footer div when other pages are focused Navigates back to Music Page
$(function () {
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    $('.footer').bind('click', function () {
        $('html, body').stop().animate({
            scrollTop: $('#music').offset().top
        }, 1500, 'easeInOutExpo');
    });

});

// Prevent click on download link from triggering play/pause
$('.playList li .hideBoxHide .download').on('click', function () {
    event.stopPropagation();
    $(this).css({'opacity': 0.2});
});

// Generate song download link
$('.download a').attr( "href", function() {
    return "http://invisibleglue.com/audio/" + this.title + ".mp3";
});


/*********************************************************/
//         Landing Page video controls/functions         //
/*********************************************************/

// Mute button
$("#videoMuteIcon").click( function (){
    $('#videoMuteIcon').toggleClass('fa-volume-up');

    if( $("video").prop('muted') ) {
        $("video").prop('muted', false);
    } else {
        $("video").prop('muted', true);
    }
});

//return a DOM object /*** Not sure if these are even needed  ***/
var video = document.getElementById('wayOutSplash'); //or
var video = $('#wayOutSplash').get(0); //or
var video = $('#wayOutSplash')[0];

//return a jQuery object /*** Me thinks this may be the one doing the work  ***/
var video = $('#wayOutSplash');

// Get video length
video.on('loadedmetadata', function() {
    $('.duration').text(video[0].duration);
});
// Get video current time
video.on('timeupdate', function() {
    $('.current').text(video[0].currentTime);
});
// Video play/pause button
$("#videoPlayPause").click(function () {
    $('#videoPpIcon').toggleClass('fa-pause', 'fa-play'); //Adds 'a', removes 'b' and vice versa
    var video = $('#wayOutSplash')[0];
        if(video.paused) {
            video.play();
        } else {
            video.pause();
        }
    return false;
});


//update HTML5 video current play time
video.on('timeupdate', function() {
    var currentPos = video[0].currentTime; //Get currenttime
    var maxduration = video[0].duration; //Get video duration
    var percentage = 100 * currentPos / maxduration; //in %
    $('.timeBar').css('width', percentage+'%');
});
// Progress bar click function
var timeDrag = false;
$('.progressBar').mousedown(function(e) {
    timeDrag = true;
    updatebar(e.pageX);
});
$(document).mouseup(function(e) {
    if(timeDrag) {
        timeDrag = false;
        updatebar(e.pageX);
    }
});
$(document).mousemove(function(e) {
    if(timeDrag) {
        updatebar(e.pageX);
    }
});

//update Progress Bar control
var updatebar = function(x) {
    var progress = $('.progressBar');
    var maxduration = video[0].duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();

    //Check within range
    if(percentage > 100) {
        percentage = 100;
    }
    if(percentage < 0) {
        percentage = 0;
    }

    //Update progress bar and video currenttime
    $('.timeBar').css('width', percentage+'%');
    video[0].currentTime = maxduration * percentage / 100;
};

//loop to get HTML5 video buffered data
var startBuffer = function() {
    var maxduration = video[0].duration;
    var currentBuffer = video[0].buffered.end(0);
    var percentage = 100 * currentBuffer / maxduration;
    $('.bufferBar').css('width', percentage+'%');

    if(currentBuffer < maxduration) {
        setTimeout(startBuffer, 500);
    }
};
setTimeout(startBuffer, 500);

// Fullscreen button
$('#fullScreen').on('click', function() {
    //For Webkit
    video[0].webkitRequestFullscreen();

    //For Firefox
    video[0].mozRequestFullScreen();

    return false;
});

// Wiggles video play button on page load (Call to action)
$(document).ready(function() {
    var wiggleButton = setInterval(function () {
        $('#videoPlayPause').toggleClass('hvr-buzz-out hvr-buzz-out-glow');
    }, 4000);

    function stopWiggle() {
        clearInterval(wiggleButton);
    };
    // Kill wiggle loop when play button clicked
    $('#videoPlayPause').click(function () {
        stopWiggle();
    });
});

// Wiggles first song in playList (let user know to click)
$(document).ready(function() {
    //console.log(Amplitude.getSongByIndex({'0': 'name'}));

    var wiggleSong = setInterval(function () {
        $('#wiggleSongID').toggleClass('hvr-icon-wobble-horizontal');
    }, 2000);

    function stopWiggleSong() {
        clearInterval(wiggleSong);
    };
    // Kill wiggle loop when play button clicked
    $('#wiggleSongID').click(function () {
        stopWiggleSong();
    });
    $('#fb-comments').animate({'opacity': '0'});
    $('#amplitude-visualization').hide();
});

$('#commentIcon').on('click', function () {
    $('#amplitude-visualization').hide('fade', 2000);
    $('#defaultAnim').hide('fade', 2000);
    $('#fb-comments').animate({'opacity': '1'});
});
$('#visualIcon').on('click', function () {
    $('#fb-comments').animate({'opacity': '0'}, 2000);
    $('#defaultAnim').hide('fade', 2000);
    $('#amplitude-visualization').show('fade',2000);
});
$('#imageIcon').on('click', function () {
    $('#amplitude-visualization').hide('fade', 2000);
    $('#fb-comments').animate({'opacity': '0'}, 2000);
    $('#defaultAnim').show('fade', 2000);

});

$(function(){
    $('.slimScrollTestDiv').slimScroll({
        height: 'auto',
        width: 'auto',
        //alwaysVisible: true,
        railVisible: true,
        railColor: '#000000',
        railOpacity: '0.2'
    });
});

/*$('#lyricIcon').on('click', function () {
    $('.amplitude-visualization').hide('fade', 2000);
    $('#defaultAnim').hide('fade', 2000, function () {
    $('.amplitude-visualization').show('fade', 2000);
    });
});*/



/*
$('#btnLight').click(function() {
    if($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('html').prepend('<div class="overlay"></div>');
        $('.overlay').animate({
            'opacity': 0.8
        }, 1200);
        $('.videoCenter').css({
            'z-index':1000
        });
        $('.buttonCenter').css({
            'z-index': 1001
        });
        $('#btnLightIcon').removeClass('fa-inverse', 1000).addClass('fa-reverse', 1000);

        /!*$('video').animate({
           'width': '60%',
            'height': '60%'
        }, 1000);
        $('.buttonCenter').animate({
            'width': '60%',
            //'height': '60%',
            'left': '50%',
            'margin-left': '-405px',
            'top': '-50px'
        }, 1000);*!/

    } else {
        $('body').click(function () {
            $('#btnLight').addClass('on');
            $('.overlay').animate({
                'opacity': 0
            }, 1200);
            $('#btnLightIcon').removeClass('fa-reverse', 1000).addClass('fa-inverse', 1000);
        });

        /!*$('video').animate({
            'width': '640px',
            'height': '360px'
        }, 1000);

        $('.buttonCenter').animate({
            'width': '640px',
            'height': '48px'
        }, 1000);*!/
    }
    return false;
});*/

