    $(".panel-heading").click( function () {
        if ($(this).hasClass("mainbgColor")) {
            $(this).toggleClass("mainbgColor");
        }else{
            $(".panel-heading").removeClass("mainbgColor");
            $(this).addClass("mainbgColor");
        }
 });