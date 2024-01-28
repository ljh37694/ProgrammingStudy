let productsData = [];

function makeCard(data) {
    let { id, title, brand, photo, price } = data;

    let productCard = 
    `
    <div class="col-3" draggable="true">
        <div class="card p-3" style="width: 100%">
            <img src="${photo}" class="card-img-top" draggable="false" />
            <div class="card-body p-0 mt-3">
                <h5 class="card-title product-title">${title}</h5>
                <p class="card-text product-brand">${brand}</p>
                <p class="card-text" id="price">${price}</p>
                <button class="btn btn-dark add-btn" id="${id}">담기</button>
            </div>
        </div>
    </div>
    `;

    return productCard;
}

function highlighting(text) {
    let highlight = `<span style="background-color: yellow">${text}</span>`;

    let titles = $(".product-title"), brands = $(".product-brand");
    for (let i = 0; i < titles.length; i++) {
        let title = titles.eq(i).text(), brand = brands.eq(i).text();
        let ansTitle = title.replace(text, highlight), ansBrand = brand.replace(text, highlight);

        titles.eq(i).html(ansTitle);
        brands.eq(i).html(ansBrand);
    }
}

function addCartItem() {
    $(".add-btn").on("click", function(e) {
        let idx = this.id;
        let { id, title, brand, photo, price } = productsData[idx];

        let cartItem = 
        `
        <div class="col-3" draggable="true">
            <div class="card p-3" style="width: 100%">
                <img src="${photo}" class="card-img-top" draggable="false" />
                <div class="card-body p-0 mt-3">
                    <h5 class="card-title product-title">${title}</h5>
                    <p class="card-text product-brand">${brand}</p>
                    <p class="card-text" id="price">${price}</p>
                    <input type="text" class="product-amount w-80"/>
                </div>
            </div>
        </div>
        `;

        $("#cart-items").append(cartItem);
        $(".product-amount").on("input", function() {
            let value = this.value;
            console.log(value);
    
            if (isNaN(value)) {
                this.value = 0;
            }
        });
    });
}

$.getJSON("./store.json")
.done((data) => {
    let tmpData = data.products;

    for (let i = 0; i < tmpData.length; i++) {
        $("#product-card-container").append(makeCard(tmpData[i]));

        productsData.push(tmpData[i]);
    }
    addCartItem();
});

// 상품명 또는 브랜드에 입력창에 입력한 단어가 있으면 하이라이팅하고 그것만 보이는 기능
$("#search").on("keypress", function(e) {
    let value = this.value;

    if (value && e.keyCode == 13) {
        $("#product-card-container").html("");

        productsData.forEach((item, idx) => {
            if (item.title.includes(value) || item.brand.includes(value)) {
                $("#product-card-container").append(makeCard(item));
                highlighting(value);
            }
        });
        
        addCartItem();
    }
});

// 입력창이 빈칸이면 모든 상품을 보여줌
$("#search").on("input", function(e) {
    let value = this.value;

    if (value == "") {
        $("#product-card-container").html("");
        productsData.forEach((item, idx) => {
            $("#product-card-container").append(makeCard(item));
        });

        addCartItem();
    }
});