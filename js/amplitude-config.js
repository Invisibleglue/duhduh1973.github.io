/**
 * Created by Justin on 7/7/2015.
 */

Amplitude.init({
    "songs": [
        {
            "name": "Muddy Shoes",
            "url": "http://www.invisibleglue.com/audio/Muddy%20Shoes.mp3",
            "cover_art_url": "http://www.invisibleglue.com/images/muddyshoes.jpg"
        },
        {
            "name": "The Silence Got So Loud",
            "url": "http://www.invisibleglue.com/audio/The%20Silence%20Got%20So%20Loud.mp3",
            "cover_art_url": "http://www.invisibleglue.com/images/silence.jpg"
        },
        {
            "name": "Way Out Way Out",
            "url": "http://www.invisibleglue.com/audio/Way%20Out%20Way%20Out.mp3",
            "cover_art_url": "http://www.invisibleglue.com/images/wayout.jpg"
        }
    ],
    "debug": true,
    "callbacks": {
        "after_play": "active_play",
        "after_pause": "active_pause",
        "after_next": "active_next",
        "after_prev": "active_prev"

    }
});

Amplitude.registerVisualization( MichaelBromleyVisualization, {
    width: '771',
    height: '360'
} );

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
    $('.playList li').not('.amplitude-active-song-container').removeClass('activeSong');
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