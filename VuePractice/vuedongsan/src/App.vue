<template>
  <div class="black-bg" v-if="activeModal == true">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>내용</p>
      <button @click="activeModal = false">닫기</button>
    </div>
  </div>

  <nav class="main-nav">
    <a v-for="(link, idx) in navLink" :key="idx">{{ link }}</a>
  </nav>

  <div v-for="(product, idx) in products" :key="product" class="product">
    <img :src="product.image" class="room-img">
    <h4 :style="redColor" @click="activeModal = true">{{ product.title }}</h4>
    <p>{{ product.price }}</p>
    <button v-on:click="increase(idx)">허위 매물 신고</button>
    <span>신고수 : {{ reportCount[idx] }}</span>
  </div>
</template>

<script>
import oneRoomData from "./assets/oneRoom";

export default {
  name: 'App',
  data() {
    return {
      activeModal: false,
      reportCount: new Array(6).fill(0),
      price1: 60,
      redColor: "color: red",
      products: oneRoomData,
      navLink: ["Home", "Shop", "About"],
    }
  },
  methods: {
    increase(idx) {
      this.reportCount[idx]++;
    }
  },
  components: {
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

.main-nav > a {
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
