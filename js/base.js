/* ------------------------------------------------------------
 * 返回顶部
 * ------------------------------------------------------------ */
smoothScroll('.go-header', '#headerTab');

$('.picSlider').height($(window).height()+'px');

function smoothScroll(btn, target) {
    var animationTime = 500;
    $(document).on('click', btn, function() {
        var position = $(target).offset().top;
        $('html, body').animate({ scrollTop: position }, animationTime);
    })
}

$('.navbar-header').children().first().click(function(e) {
    var current = $(this).children().attr('src');
    var menu='images/header/menu.png';
    var close='images/nav/close.png';
    if (current==menu) {
        $(this).children().attr('src',close);
    }else{
        $(this).children().attr('src',menu);
    }
})

$('.navbar-header').next().children().children().children().filter('.dropdown-menu').children().click(function(e) {
    var menu='images/header/menu.png';
        $('.navbar-header').children().first().children().attr('src',menu);
})



$('.nav').height($(window).height()+'px');

$('.close').click(function(e) {
    $(this).addClass('Liz-none');
    $(this).next().children().first().children().first().children().children().children().click();
})
$('#paytab').click(function(e) {
    $('body').css('display', 'none');
})
$('.item').click(function(e) {
    window.location.href="./newsDetail.html";  
})
$(function() {
    $('.jionUs').click(function(e) {
        $('.jionUs').parent().parent().parent().parent().parent().children().removeClass('Liz-absolute');
        $('.jionUs').children().children().removeClass('Liz-none');
        $('.jionUs').addClass('Liz-none');
        $(this).removeClass('Liz-none').addClass('Liz-block');
        $('.close').addClass('Liz-none');
            if ($('.jionUs').parent().parent().parent().next().hasClass('in') && $(this).parent().parent().parent().next().hasClass('in')) {
                $('.jionUs').removeClass('Liz-none').addClass('Liz-block');
                $('.jionUs').parent().parent().parent().parent().parent().children().addClass('Liz-absolute');
                $('.jionUs').children().children().addClass('Liz-none');
                $('.close').removeClass('Liz-none');
            }
    })
})
    /* ------------------------------------------------------------
     * 滚动轮
     * ------------------------------------------------------------ */
$(function() {
        var owl = $("#carousel-wrap");
        owl.owlCarousel({
            autoPlay: 5000,
            items: 1,
            itemsDesktop: false,
            itemsDesktopSmall: false,
            itemsTablet: false,
            itemsTabletSmall: false,
            itemsMobile: false,
            pagination: false,
        });
        $('.arr-left').click(function() {
            owl.trigger('owl.prev');
        })
        $('.arr-right').click(function() {
            owl.trigger('owl.next');
        })
    })
  /* ------------------------------------------------------------
     * 自动切换
     * ------------------------------------------------------------ 
     */
  
$(function(){
	ChainClick();
})

$('.JU').click(function (argument) {
	if ($('.jionUs').parent().parent().parent().next().hasClass('in')) {
	$('.jionUs').parent().parent().parent().next().filter('.in').parent().children().first().children().children().children().click();
	};
	var href = $(this).children().attr('href');
	var chain = href.substr(href.length-7);
	chain= '#'+chain;
	$(chain).click();
})
function ChainClick(argument) {
	var href = window.location.href;
	var chain = href.substr(href.length-7);
	chain= '#'+chain;
	$(chain).click();
}