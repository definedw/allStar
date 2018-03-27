$(function() {
  $(document).initUI();
  $.dialog.init();
  debugger
  $('.dropdown').touchwipe({

      touch: function(e) {
          var navHeader = $('.nav-dropdown'),
              layer = $('.dropdwon-layer');
          navHeader.addClass('active');
          e.stopPropagation()
      }
  })
  $('#allStar').touchwipe({
      touch: function(){
          var navHeader = $('.nav-dropdown');
          if (navHeader.hasClass('active')) {
            navHeader.removeClass('active');
          }
      }
  })
});