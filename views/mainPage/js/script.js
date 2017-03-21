/**
 * Created by pawan on 21/3/17.
 */

if (window.outerWidth > 992) {
    $('.buttons').css('right', ($(".stories-container-outer").width() / 10) + (0.1 * ($(".stories-container-outer").width() / 10)));
}
$(window).resize(function () {
    console.log("resizing")

    if (window.outerWidth > 992) {
        let columnWidth = $(".stories-container-outer").width() / 10;
        $('.buttons').css('right', columnWidth + (0.1 * columnWidth));
    }
    else{
        $('.buttons').css('right', 25);
    }
})