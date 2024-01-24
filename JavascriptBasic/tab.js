// for (let i = 0; i < $(".tab-button").length; i++) {
//     let curBtn = $(".tab-button").eq(i), curContent = $(".tab-content").eq(i);
//     console.log("hi");

//     curBtn.on("click", () => {
//         $(".tab-button").removeClass("orange");
//         $(".tab-content").removeClass("show");
//         curBtn.addClass("orange");
//         curContent.addClass("show");
//     });
// }

    $(".list").on("click", (e) => {
        let id = Number(e.target.dataset.id);

        if (e.target.classList.contains("tab-button")) {
            $(".tab-button").removeClass("orange");
            $(".tab-content").removeClass("show");
            $(".tab-button").eq(id).addClass("orange");
            $(".tab-content").eq(id).addClass("show");
        }
    });
