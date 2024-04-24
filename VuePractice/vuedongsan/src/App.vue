<template>
  <nav class="main-nav">
    <a v-for="(link, idx) in navLink" :key="idx">{{ link }}</a>
  </nav>

  <div v-for="product in products" :key="product">
    <h4 :style="redColor">{{ product }}</h4>
    <p>{{ price1 }}</p>
  </div>

</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      price1: 60,
      redColor: "color: red",
      products: ["역삼동 원룸", "천호동 원룸", "마포구 원룸"],
      navLink: ["Home", "Shop", "About"],
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
