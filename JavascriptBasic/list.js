function appendProductCard(products) {
    products.forEach((item, idx) => {
        let productCard = `
        <div class="col-sm-4">
            <img src="https://via.placeholder.com/600" class="w-100" />
            <h5 class="item-title">${item.title}</h5>
            <p class="item-price">가격: ${item.price}</p>
        </div>`;

        $(".card-row").append(productCard);
    });
}

let products = [
    { id: 0, price: 70000, title: "Blossom Dress" },
    { id: 1, price: 50000, title: "Springfield Shirt" },
    { id: 2, price: 60000, title: "Black Monastery" },
];

appendProductCard(products);

let showMoreCnt = 0;

$("#show-more-btn").on("click", () => {
    $.get(`https://codingapple1.github.io/js/more${++showMoreCnt}.json`)
    .done((data) => {
        products = products.concat(data);
        appendProductCard(data);
    })
    .fail(() => {
        console.log("Fail!!");
    });
});

$("#sort").click(() => {
    products.sort((a, b) => {
        return a.price - b.price;
    });
    $(".card-row").html("");
    appendProductCard(products);
});