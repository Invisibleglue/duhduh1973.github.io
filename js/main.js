$('.playList li').on('click', function (event) {
    $('#defaultAnim').toggle('scale', function () {
        $('.playAnim').hide().load("lyrics.html #loaded").fadeIn('500');
    });
});


$('.playList li').on('click', function () {
    $('.footer').animate({bottom: "0px"}, 1000);
});



$('.playList li').on('click', function() {
    $(this).find('.hideBoxHide').show('slide',{direction: 'up'}, 'fast');
    $('.playList li').not(this).find('.hideBoxHide').hide();
});

$('.playList li .hideBoxHide .download').on('click', function () {
    event.stopPropagation();
    $(this).css({'opacity': 0.2});
});



$('.download a').attr( "href", function() {
    return "http://invisibleglue.com/audio/" + this.title + ".mp3";
});

//$('.playAnim').load('/BootSnippetTest/lyrics.html #loaded');
//$('#loaded').css({'opacity': 1});


//$('footer .amplitude-play-pause').on('click', function () {
//    $('#playIcon').toggleClass('fa-pause');
//});