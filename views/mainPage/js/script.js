/**
 * Created by pawan on 21/3/17.
 */

const shuffleButton = $('.shuffleButton');
const newButton = $('.newButton');
const shuffleButtonTextNode = shuffleButton.children("span:last");
const newButtonTextNode = newButton.children("span:last");

console.log(window.innerWidth);

if (window.innerWidth <= 992) {
    // $('.buttons').css('right', ($(".stories-container-outer").width() / 10) + (0.1 * ($(".stories-container-outer").width() / 10)));
    shuffleButtonTextNode.text('');
    newButtonTextNode.text('')
}

$(window).resize(function () {
    console.log("resizing")
    if (window.innerWidth >= 992) {
        // let columnWidth = $(".stories-container-outer").width() / 10;
        // $('.buttons').css('right', columnWidth + (0.1 * columnWidth));
        shuffleButtonTextNode.text(' Shuffle');
        newButtonTextNode.text(' New')
    }
    else{
        // $('.buttons').css('right', 25);
        shuffleButtonTextNode.text('');
        newButtonTextNode.text('')
    }
})


//header hiding on scroll
let didScroll = false;
let lastScrollTop = $(window).scrollTop();
let delta = 5;
let header = $('.header-outer')
let headerHeight = header.outerHeight();

$(window).scroll(function () {
    didScroll = true;
})

setInterval(function () {
    if(didScroll){
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    let st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta){
        return;
    }

    if(st > lastScrollTop && st > headerHeight){
        //scroll down
        header.removeClass('nav-down').addClass('nav-up');
    }
    else{
        //scroll up
        if(st + $(window).height() < $(document).height()){
            header.removeClass('nav-up').addClass('nav-down')
        }
    }

    lastScrollTop = st;
}

//expanding the categories div
let categoriesContainer = $('.categories-container');
let caretContainer = $('.caret-container');
let catogoriesContainerCaret = $('.categories-container-outer .caret')
let catogoriesContainerExpanded = false;

caretContainer.click(function (ev) {
    ev.stopPropagation();
    if(!catogoriesContainerExpanded){
        categoriesContainer.css('height', "15rem")
        categoriesContainer.css('overflow', "auto")
        catogoriesContainerCaret.css('border-top', '0px solid #000000');
        catogoriesContainerCaret.css('border-bottom', '10px solid #000000');
    }
    else{
        categoriesContainer.css('height', "calc(7rem - 10px)");
        categoriesContainer.css('overflow', "hidden");
        catogoriesContainerCaret.css('border-bottom', '0px solid #000000');
        catogoriesContainerCaret.css('border-top', '10px solid #000000');
    }

    catogoriesContainerExpanded = !catogoriesContainerExpanded;
})