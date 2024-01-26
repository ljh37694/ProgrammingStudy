let cardHeights = [1001, 1766, 2531];
let cardBoxes = $(".card-box");

$(window).scroll(() => {
    let h = $(".card-box").eq(0).outerHeight();

    for (let i = 0; i < cardBoxes.length - 1; i++) {
        let cardBox = $(".card-box").eq(i);
        let scrollPos = $(window).scrollTop();
        let opac = 1 / h * (cardHeights[i] + (9 * h / 10) - scrollPos);
        let sc = 1 / (h * 10) * (cardHeights[i] + (9 * h / 10) - scrollPos) + 0.9;

        console.log(sc);

        if (scrollPos > cardHeights + h) continue;

        cardBox.css("opacity", opac);
        cardBox.css('transform', `scale(${sc})`);
    }
});