let products = [
    { id: 0, price: 70000, title: "Blossom Dress" },
    { id: 1, price: 50000, title: "Springfield Shirt" },
    { id: 2, price: 60000, title: "Black Monastery" },
];

let productCard = `<div class="col-sm-4">
                    <img src="https://via.placeholder.com/600" class="w-100" />
                    <h5 class="item-title"></h5>
                    <p class="item-price"></p>
                </div>`;

products.forEach(item => {
    $(".card-row").append(productCard);
    $(".item-title").eq(item.id).html(item.title);
    $(".item-price").eq(item.id).html("가격: " + item.price);
});