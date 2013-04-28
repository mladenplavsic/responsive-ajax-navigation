$(function(){
  navigation();
});

var navigation = function () {
  
  var object = {
    open: function () {
      if (!$('#blocker').length) {
        $('<div>').prop('id','blocker').on('click', object.close).appendTo('body');
      } else {
        $('#blocker').show();
      }
      $('#page, #header, #footer').stop().stop().animate({
        left: '200px'
      });
      $('aside nav').stop().stop().animate({
        left: '0'
      });
    },
    close: function () {
      $('#blocker').hide();
      $('#page, #header, #footer').stop().stop().animate({
        left: '0'
      });
      $('aside nav').stop().stop().animate({
        left: '-200px'
      });
    },
    href: function(a){
      object.close();
      $('#main').fadeOut('fast', function(){
        $('aside nav a.active').removeClass('active');
        a.addClass('active');
        $('#main').load(a.prop('href') + ' #main > *', function(){
          $(this).fadeIn();
        });
      });
    }
  }
  
  $('#header a.nav').on('click', object.open);
  
  $('aside nav a:not(.external), a.logo').click(function(e){
    e.preventDefault();
    object.href($(this));
    var href = $(this).get(0).getAttribute('href');
    window.history.pushState({href:href}, document.title, href);
  });
  
  window.addEventListener('popstate', function(e) {
    var href, state = e.state;
    if (state) {
      href = state.href;
    } else {
      href = '/';
    }
    object.href($('a[href="'+href+'"]'));
  });
 
  
}