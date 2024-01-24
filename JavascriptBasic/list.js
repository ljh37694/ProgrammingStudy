let products = [
    { id: 0, price: 70000, title: "Blossom Dress" },
    { id: 1, price: 50000, title: "Springfield Shirt" },
    { id: 2, price: 60000, title: "Black Monastery" },
];

products.forEach(item => {
    $(".item-title").eq(item.id).html(item.title);
    $(".item-price").eq(item.id).html("가격: " + item.price);
});