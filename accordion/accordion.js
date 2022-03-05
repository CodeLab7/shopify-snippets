$(document).ready(function() {
    $(".accordion-container .set > a").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).siblings(".content").slideUp(200);
        $(".set > a i").text('+');
      } else {
        $(".set > a i").text('+');
        $(this).find("i").text('-');
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $(".content").slideUp(200);
        $(this).siblings(".content").slideDown(200);
      }
    });
  });