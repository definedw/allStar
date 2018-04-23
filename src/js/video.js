// $(document).ready(function(){
// })
var videoBtns = $('[data-video-url]');
var btns = [].slice.call(videoBtns);

function videoPlay() {
    console.log($('#videoPlay'));
}
videoBtns.elements.forEach(btn => {
    $(btn).on($.event.hasTouch ? 'touchstart' : 'click', function(e) {
        var videoUrl = $(this).attr('data-video-url');

        $.dialog.open({
            'url': '../tpl/test.html',
            callback: function() {
                $('#videoPlay ').html('<source src="' + videoUrl + '" type="video/mp4"></source>')
                $("#videoPlay").elements[0].load();
                $("#videoPlay").elements[0].play();
            }
        });

    });
});