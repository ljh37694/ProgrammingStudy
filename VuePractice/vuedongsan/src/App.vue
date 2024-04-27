<template>
  <Modal :productsData="productsData" :clickedIdx="clickedIdx" :activeModal="activeModal"
    @closeModal="activeModal = false" />
  <Discount :productsData="productsData" />

  <div class="sort-button-container">
    <button @click="priceAscendingSort">낮은 가격순 정렬</button>
    <button @click="priceDescendingSort">높은 가격순 정렬</button>
    <button @click="nameSort">이름순 정렬</button>
    <button @click="sortBack">되돌리기</button>
    <button @click="priceFilter">50만원 이하 상품 보기</button>
  </div>


  <nav class="main-nav">
    <a v-for="(link, idx) in navLink" :key="idx">{{ link }}</a>
  </nav>

  <div v-for="(productData, idx) in productsData" :key="idx">
    <ProductCard :productData="productData" @openModal="activeModal = true; clickedIdx = idx" />
  </div>
</template>

<script>
import oneRoomData from "./assets/oneRoom";
import Discount from "./components/Discount.vue";
import Modal from "./components/Modal.vue";
import ProductCard from "./components/ProductCard.vue";

export default {
  name: 'App',
  data() {
    return {
      clickedIdx: 0,
      activeModal: false,
      reportCount: new Array(6).fill(0),
      productsData: [...oneRoomData],
      navLink: ["Home", "Shop", "About"],
    }
  },
  methods: {
    increase(idx) {
      this.reportCount[idx]++;
    },
    priceAscendingSort() {
      this.productsData.sort((a, b) => {
        return a.price - b.price;
      });
    },
    priceDescendingSort() {
      this.productsData.sort((a, b) => {
        return b.price - a.price;
      });
    },
    sortBack() {
      this.productsData = [...oneRoomData];
    },
    nameSort() {
      this.productsData.sort((a, b) => {
        if (a.title < b.title) return -1;
        else return 1;
      });
    },
    priceFilter() {
      this.productsData = this.productsData.filter(data => {
        return data.price <= 500000;
      });
    }
  },
  components: {
    Discount,
    Modal,
    ProductCard,
  }
}
</script>

<style>
body {
  margin: 0;
}

div {
  box-sizing: border-box;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: skyblue;
  border-radius: 10px;
}

.main-nav>a {
  font-size: 20px;
  color: #fff;
  padding: 20px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}

.black-bg {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  position: fixed;
  padding: 20px;
}

.white-bg {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  font-size: 20px;
  width: 100%;
  text-align: center;
}

.product {
  text-align: center;
}

.sort-button-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.sort-button-container > button {
  margin: 0px 10px;
}
</style>
