$(".list").on("click", (e) => {
    let id = Number(e.target.dataset.id);

    if (e.target.classList.contains("tab-button")) {
        $(".tab-button").removeClass("orange");
        $(".tab-content").removeClass("show");
        $(".tab-button").eq(id).addClass("orange");
        $(".tab-content").eq(id).addClass("show");
    }
});

let products = [
    {
        name: "모자",
        size: ["m", "l", "xl"],
    },
    {
        name: "신발",
        size: [260, 270, 280, 290],
    },
];

$(".form-select").eq(0).on("input", (e) => {
    let value = e.currentTarget.value;

    if (value == "셔츠") {
        $("#item-options").removeClass("hide");
    }

    else if (value == "모자") {
        $("#item-options").addClass("hide");
    }
});