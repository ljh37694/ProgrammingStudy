for (let i = 0; i < $(".tab-button").length; i++) {
    let curBtn = $(".tab-button").eq(i), curContent = $(".tab-content").eq(i);
    console.log("hi");

    curBtn.on("click", () => {
        $(".tab-button").removeClass("orange");
        $(".tab-content").removeClass("show");
        curBtn.addClass("orange");
        curContent.addClass("show");
    });
}