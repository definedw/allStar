function play() {
    var $box = $(this);
    var player = $box.find('#player');

    if (player.paused) {
        player.pause();
    } else {
        player.play()
    }
}

function mute() {
    var $box = $(this);
    var player = $box.find('#player');

    player.addEventListener('loadermetadata', function() {
        player.muted = player.muted ? false : true;
    });
}