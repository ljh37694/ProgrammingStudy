let products = [
    {
        name: "모자",
        sizes: ["m", "l", "xl"],
    },
    {
        name: "셔츠",
        sizes: [260, 270, 280, 290, 300],
    },
    {
        name: "바지",
        sizes: [1, 2, 3, 4, 5],
    },
];

$(".list").on("click", (e) => {
    let id = Number(e.target.dataset.id);

    if (e.target.classList.contains("tab-button")) {
        $(".tab-button").removeClass("orange");
        $(".tab-content").removeClass("show");
        $(".tab-button").eq(id).addClass("orange");
        $(".tab-content").eq(id).addClass("show");
    }
});

products.forEach(item => {
    let tmp = document.createElement("option");
    tmp.innerHTML = item.name;

    $("#items").append(tmp);
});

$(".form-select").eq(0).on("input", (e) => {
    let value = e.currentTarget.value;
    $("#item-options").removeClass("hide");

    if (value == "셔츠") {
        products[1].sizes.forEach(size => {
            let tmp = document.createElement("option");
            tmp.innerHTML = size;
            $("#item-options").append(tmp);
        });
    }

    products.forEach(item => {
        if (item.name == value) {
            $("#item-options").html("");

            item.sizes.forEach(size => {
                let tmp = document.createElement("option");
                tmp.innerHTML = size;
                $("#item-options").append(tmp);
            })
        }
    })
});