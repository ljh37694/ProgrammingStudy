function appendProductCard(products) {
    products.forEach((item, idx) => {
        let productCard = `
        <div class="col-sm-4">
            <img src="https://via.placeholder.com/600" class="w-100" />
            <h5 class="item-title">${item.title}</h5>
            <p class="item-price">가격: ${item.price}</p>
            <button class="btn btn-danger purchase-btn">구매하기</button>
        </div>`;

        $(".card-row").append(productCard);
    });

    $(".purchase-btn").on("click", function() {
        let cartList = (localStorage.cart != null ? JSON.parse(localStorage.cart) : []);
        let productName = this.previousElementSibling.previousElementSibling.innerText;
        let data = { 
            name: "",
            cnt: 0,
        };
        let exist = false;

        cartList.forEach((item, idx) => {
            if (item.name === productName) {
                cartList[idx].cnt++;
                exist = true;

                return;
            }
        });

        if (!exist) {
            data.name = productName;
            data.cnt++;
            cartList.push(data);
        }

        localStorage.setItem("cart", JSON.stringify(cartList));
        console.log(localStorage.getItem("cart"));
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

$("#price-ascending").click(() => {
    products.sort((a, b) => {
        return a.price - b.price;
    });
    $(".card-row").html("");
    appendProductCard(products);
});

$("#name-descending").click(() => {
    products.sort((a, b) => {
        console.log(a.title < b.title);
        return (a.title < b.title ? 1 : -1);
    });
    $(".card-row").html("");
    appendProductCard(products);
});

$("#price-6under").click(() => {
    let filteredProducts = products.filter((data) => {
        return data.price <= 60000;
    });
    console.log(filteredProducts);
    $(".card-row").html("");
    appendProductCard(filteredProducts);
});

$("#cart").click(() => {
    location.href = './cart.html';
});