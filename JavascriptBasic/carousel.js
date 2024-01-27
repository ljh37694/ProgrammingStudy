let cnt = 0;
let width = 33.333333;
let slideContainer = $(".slide-container"), slideBtns = $(".slide-btn");
let positions = [];

for (let i = 0; i < slideBtns.length; i++) {
    positions[i] = i * -width;

    slideBtns.eq(i).click(() => {
        slideContainer.css("transform", `translateX(${positions[i]}%)`);
        cnt = i;
    });
}

$("#prev-btn").on("click", () => {
    cnt = (cnt + positions.length - 1) % positions.length;
    slideContainer.css("transform", `translateX(${positions[cnt]}%)`);
});

$("#next-btn").on("click", () => {
    cnt = (cnt + 1) % positions.length;
    slideContainer.css("transform", `translateX(${positions[cnt]}%)`);
});

// mouse event
let mouseDown = false;
let mouseDownPoint = 0;

slideContainer.on("mousedown", (e) => {
    mouseDownPoint = e.clientX;
    mouseDown = true;
    slideContainer.removeClass("transition-all");
});

let move = false;
slideContainer.on("mousemove", (e) => {
    if (mouseDown) {
        let mouseMoveDist = mouseDownPoint - e.clientX;

        if (mouseMoveDist >= 300 && !move) {
            cnt += (cnt + 1 > positions.length - 1 ? 0 : 1);
            slideContainer.css("transform", `translateX(${positions[cnt]}%)`);
            slideContainer.addClass("transition-all");
            move = true;
        }
        
        else if (mouseMoveDist <= -300 && !move) {
            cnt += (cnt - 1 < 0 ? 0 : -1);
            slideContainer.css("transform", `translateX(${positions[cnt]}%)`);
            slideContainer.addClass("transition-all");
            move = true;
        }

        else {
            slideContainer.css("transform", `translateX(calc(${-mouseMoveDist}px + ${positions[cnt]}%))`);
        }
    }
    else {
        move = false;
        slideContainer.addClass("transition-all");
    }
});

slideContainer.on("mouseup", (e) => {
    mouseDown = false;
    slideContainer.css("transform", `translateX(${positions[cnt]}%)`);
    slideContainer.addClass("transition-all"); 
});

slideContainer.on("mouseover", (e) => {
    mouseDown = false;
    slideContainer.css("transform", `translateX(${positions[cnt]}%)`);
    slideContainer.addClass("transition-all");
});