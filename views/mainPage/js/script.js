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
