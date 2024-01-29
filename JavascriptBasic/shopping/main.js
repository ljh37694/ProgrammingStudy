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

        $(".cart-product-amount").on("input", function(e) {
            let value = this.value;
    
            if (isNaN(value)) {
                this.value = 0;
            }
        });
    
        $(".cart-product-amount").on("change", (e) => {
            $(".total-price").text(sumTotalPrice());
        });
    }

    let sum = parseInt($(".total-price").text()) + parseInt(data.price);
    $(".total-price").text(sum);
}

// 장바구니 최종가격
function sumTotalPrice() {
    let cartItem = $(".cart-item");
    let sum = 0;

    for (let i = 0; i < cartItem.length; i++) {
        sum += parseInt($(".cart-product-price").eq(i).text()) * parseInt($(".cart-product-amount").eq(i).val());
    }

    return sum;
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

        $(".product-card").eq(i).on("dragstart", function(e) {
            e.originalEvent.dataTransfer.setData("id", e.target.id);
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

// 드래드앤드롭
$("#cart-items").on("dragover", function(e) {
    e.preventDefault();
});

$("#cart-items").on("drop", function(e) {
    e.preventDefault();

    let id = parseInt(e.originalEvent.dataTransfer.getData("id").slice(-1));

    addCartItem(productsData[id]);
});

$(".purchase-btn").click(() => {
    $(".modal-container").addClass("show-purchase-modal");
});

$("#close-btn").click(() => {
    $(".modal-container").removeClass("show-purchase-modal");
});

$("#submit-btn").click(() => {
    $(".modal-container").removeClass("show-purchase-modal");
    $(".receipt-container").addClass("show-canvas");

    writeReceipt();
});

$(".receipt-close-btn").click(() => {
    $(".receipt-container").removeClass("show-canvas");
});

function writeReceipt() {
    let canvas = document.getElementById("canvas");
    let cv = canvas.getContext("2d");
    let today = new Date();

    cv.clearRect(0, 0, canvas.width, canvas.height);
    
    cv.font = 'bold 30px dotum';
    cv.fillText("영수증", 0, 30);

    cv.font = '16px dotum';
    cv.fillText(today.toLocaleString(), 0, 60);

    let cartItems = $(".cart-item"), sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let startPoint = 100 + 80 * i;
        let title = $(".cart-product-title").eq(i).text();
        let brand = $(".cart-product-brand").eq(i).text();
        let price = $(".cart-product-price").eq(i).text();
        let amount = $(".cart-product-amount").eq(i).val();

        cv.fillText(`${title}(${brand})`, 0, startPoint);
        cv.fillText(`가격: ${price}`, 0, startPoint + 15);
        cv.fillText(`수량: ${amount}`, 0, startPoint + 15 * 2);
        cv.fillText(`합계: ${parseInt(price) * parseInt(amount)}`, 0, startPoint + 15 * 3);
        sum += parseInt(price) * parseInt(amount);
    }

    cv.fillText(`총 합계: ${sum}`, 0, 200 + 80 * cartItems.length);
}