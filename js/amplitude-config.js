/**
 * Created by Justin on 7/7/2015.
 */

Amplitude.init({
    "songs": [{
        "name": "Muddy Shoes",
        "url": "http://invisibleglue.com/audio/Muddy%20Shoes.mp3",
        "cover_art_url": "http://www.invisibleglue.com/images/muddyshoes.jpg"
    }, {
        "name": "The Silence Got So Loud",
        "url": "http://invisibleglue.com/audio/The%20Silence%20Got%20So%20Loud.mp3",
        "cover_art_url": "http://www.invisibleglue.com/images/silence.jpg"
    }, {
        "name": "Way Out Way Out",
        "url": "http://invisibleglue.com/audio/Way%20Out%20Way%20Out.mp3",
        "cover_art_url": "http://www.invisibleglue.com/images/wayout.jpg"
    }, {
        "name": "Illusion Denied",
        "url": "http://invisibleglue.com/audio/Illusion%20Denied.mp3"
    }, {
        "name": "Dissatisfaction Guaranteed",
        "url": "http://invisibleglue.com/audio/Dissatisfaction%20Guaranteed.mp3"
    }, {
        "name": "Take My Hand",
        "url": "http://invisibleglue.com/audio/Take%20My%20Hand.mp3"
    }, {
        "name": "Delusion Campaign",
        "url": "http://invisibleglue.com/audio/Delusion%20Campaign.mp3"
    }, {
        "name": "Breathe It In",
        "url": "http://invisibleglue.com/audio/Breathe%20It%20In.mp3"
    }, {
        "name": "Burn or Be Burned",
        "url": "http://invisibleglue.com/audio/Burn%20Or%20Be%20Burned.mp3"
    }, {
        "name": "Shadow Shapes",
        "url": "http://invisibleglue.com/audio/Shadow%20Shapes.mp3"
    }],
    "default_album_art": "$../images/landingPoster.jpg",
    "visualization_backup": "album-art",
    "debug": true,
    "callbacks": {
        "after_play": "active_play",
        "after_pause": "active_pause",
        "after_next": "active_next",
        "after_prev": "active_prev",
        "after_song_ended": "after_end"
    }
});

Amplitude.registerVisualization( MichaelBromleyVisualization, {
    width: '771',
    height: '360'
} );

function after_end (){
    var $ = jQuery;
    $('.footer').stop().animate({bottom: "0px"}, 1000);

    footerTimer = setTimeout(function () {
        var $footer = $('.footer');
        var $footerTop = $('.footerTopMouseCatch');
        $footer.stop().animate({bottom: "-70px"}, 1000);
        $footerTop.stop().animate({bottom: "0"}, 10);
    }, 6000);
}

function active_play (){
    var $ = jQuery;
    $('#playIcon').removeClass('fa-play').addClass('fa-pause');
    $('.amplitude-active-song-container').fadeTo(200, 1).addClass('activeSong', 200, "easeInOutQuad");
    $('.playList li').not('.amplitude-active-song-container').fadeTo(200, 0.8).removeClass('activeSong', 200, "easeInOutQuad");
    $('.amplitude-song-time-visualization').css('background-color', '#222').animate({ width: '100%' }, 3000, "easeInQuad");
    console.log(Amplitude.getActiveSongMetadata());
}
function active_pause (){
    var $ = jQuery;
    $('#playIcon').removeClass('fa-pause').addClass('fa-play');
    //noinspection JSJQueryEfficiency
    $('.playList li').not('.amplitude-active-song-container').removeClass('activeSong');
    //noinspection JSJQueryEfficiency
    $('.playList li').fadeTo(200, 1);
    console.log('PAUSED');
}
function active_next (){
    var $ = jQuery;
    $('.songButt').not('.amplitude-active-song-container').removeClass('activeSong');

    console.log('NEXT');
}
function active_prev (){
    var $ = jQuery;
    $('.songButt').not('.amplitude-active-song-container').removeClass('activeSong');
    console.log('PREVIOUS');
}