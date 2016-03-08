/* ------------------------------------------------------------
 * 返回顶部
 * ------------------------------------------------------------ */
smoothScroll('.go-header', '#headerTab');

function smoothScroll(btn, target) {
    var animationTime = 500;
    $(document).on('click', btn, function() {
        var position = $(target).offset().top;
        $('html, body').animate({scrollTop: position}, animationTime);
    })
}
/* ------------------------------------------------------------
 * 滚动轮
 * ------------------------------------------------------------ */
$(function () {
     var owl = $("#carousel-wrap");
        owl.owlCarousel({
        autoPlay: 5000,
        items : 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsTabletSmall: false,
        itemsMobile: false,
        pagination: false,
        });
        $('.arr-left').click(function () {
            owl.trigger('owl.prev');
        })
        $('.arr-right').click(function () {
            owl.trigger('owl.next');
        })
})
/* ------------------------------------------------------------
 * 自动切换
 * ------------------------------------------------------------ 
*/