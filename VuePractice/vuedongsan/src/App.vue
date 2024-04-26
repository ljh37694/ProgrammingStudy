<template>
  <Modal :productsData="productsData" :clickedIdx="clickedIdx" :activeModal="activeModal" @closeModal="activeModal = false"/>
  <Discount :productsData="productsData" />

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
      productsData: oneRoomData,
      navLink: ["Home", "Shop", "About"],
    }
  },
  methods: {
    increase(idx) {
      this.reportCount[idx]++;
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
</style>
