$(document).ready(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop() > 300){
        $('.scroll_top').fadeIn(1000);
      } 
      else{
        $('.scroll_top').fadeOut(1000);
      }
    });
    $('.scrollToTop').click(function(){
      $("html, body").animate({scrollTop : 0},800);
      return false;
    });
  });