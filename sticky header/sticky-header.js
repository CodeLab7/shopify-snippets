$(window).scroll(function(){
    var sticky = $('.header--sticky'),
        scroll = $(window).scrollTop();
  
    if (scroll >= 40) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });