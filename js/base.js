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



$('.close').click(function(e) {
    $(this).parent().css('display', 'none');
})

$(function() {
    $('.jionUs').click(function(e) {
        $('.jionUs').parent().parent().parent().parent().parent().children().removeClass('Liz-absolute');
        $('.jionUs').children().children().removeClass('Liz-none');
        $('.close').addClass('Liz-none');
            if ($('.jionUs').parent().parent().parent().next().hasClass('in') && $(this).parent().parent().parent().next().hasClass('in')) {
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
