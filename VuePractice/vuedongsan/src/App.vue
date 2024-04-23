<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <h4 :style="redColor">{{ products[0] }}</h4>
    <p>{{ price1 }}</p>
  </div>
    <div>
    <h4 :style="redColor">{{ products[1] }}</h4>
    <p>{{ price1 }}</p>
  </div>
    <div>
    <h4 :style="redColor">{{ products[2] }}</h4>
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
  margin-top: 60px;
}
</style>
