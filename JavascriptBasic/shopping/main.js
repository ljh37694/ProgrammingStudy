let productsData = [];

let onDragStartCard = function(e) {
    e.dataTransfer.setData("id", e.target.id);
};

function makeProductCard(data) {
    let { id, title, brand, photo, price } = data;

    let productCard = 
    `
    <div class="col-3 product-card" id="card-${id}" draggable="true" ondragstart="onDragStartCard(event)">
        <div class="card p-3" style="width: 100%">
            <img src="${photo}" class="card-img-top" draggable="false" />
            <div class="card-body p-0 mt-3">
                <h5 class="card-title product-title">${title}</h5>
                <p class="card-text product-brand">${brand}</p>
                <p class="card-text" id="price">${price}</p>
                <button class="btn btn-dark add-btn">담기</button>
            </div>
        </div>
    </div>
    `;

    return productCard;
}

function makeCartItemCard(data) {
    let { id, title, brand, photo, price } = data;

    let card = 
    `
    <div class="col-3 cart-item" id="cart-item-${id}">
        <div class="card p-3" style="width: 100%">
            <img src="${photo}" class="card-img-top" draggable="false" />
            <div class="card-body p-0 mt-3">
                <h5 class="card-title cart-product-title">${title}</h5>
                <p class="card-text cart-product-brand">${brand}</p>
                <p class="card-text cart-product-price">${price}</p>
                <input type="text" class="cart-product-amount" value="1"/>
            </div>
        </div>
    </div>
    `;

    return card;
}

function highlightingCard(text) {
    let highlight = `<span style="background-color: yellow">${text}</span>`;
    let titles = $(".product-title"), brands = $(".product-brand");

    for (let i = 0; i < titles.length; i++) {
        let title = titles.eq(i).text(), brand = brands.eq(i).text();
        let ansTitle = title.replace(text, highlight), ansBrand = brand.replace(text, highlight);

        titles.eq(i).html(ansTitle);
        brands.eq(i).html(ansBrand);
    }
}

function addCartItem(data) {
    let cartItems = $("#cart-items");

    let exist = false;
    let cartItem = $(".cart-item");
    for (let i = 0; i < cartItem.length; i++) {
        if ($(".cart-product-title").eq(i).text() === data.title && $(".cart-product-brand").eq(i).text() === data.brand) {
            let amount = $(".cart-product-amount").eq(i).val();

            $(".cart-product-amount").eq(i).val(parseInt(amount) + 1);

            exist = true;

            break;
        }
    }

    if (!exist) {
        cartItems.append(makeCartItemCard(data));
    }

    $(".cart-product-amount").on("input", function() {
        let value = this.value;

        if (isNaN(value)) {
            this.value = 0;
        }
    });

    $(".product-card").on("dragstart", function(e) {
        e.originalEvent.dataTransfer.setData("id", e.target.id);
    });
}

// 상품 데이터 받기
$.getJSON("./store.json")
.done((data) => {
    let tmpData = data.products;

    for (let i = 0; i < tmpData.length; i++) {
        $("#product-card-container").append(makeProductCard(tmpData[i]));

        productsData.push(tmpData[i]);

        $(".add-btn").eq(i).on("click", (e) => {
            addCartItem(tmpData[i]);
        });
    }
});

// 상품명 또는 브랜드에 입력창에 입력한 단어가 있으면 하이라이팅하고 그것만 보이는 기능
$("#search").on("keypress", function(e) {
    let value = this.value;

    if (value && e.keyCode == 13) {
        $("#product-card-container").html("");

        productsData.forEach((item, idx) => {
            if (item.title.includes(value) || item.brand.includes(value)) {
                $("#product-card-container").append(makeProductCard(item));
                highlightingCard(value);
            }
        });
    }
});

// 입력창이 빈칸이면 모든 상품을 보여줌
$("#search").on("input", function(e) {
    let value = this.value;

    if (value == "") {
        $("#product-card-container").html("");
        productsData.forEach((item, idx) => {
            $("#product-card-container").append(makeProductCard(item));
        });
    }
});

$("#cart-items").on("dragover", function(e) {
    e.preventDefault();
});

$("#cart-items").on("drop", function(e) {
    e.preventDefault();

    let id = parseInt(e.originalEvent.dataTransfer.getData("id").slice(-1));

    addCartItem(productsData[id]);
});