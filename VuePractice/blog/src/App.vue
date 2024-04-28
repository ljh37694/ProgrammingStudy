<template>
  <MainNavbar />

  <router-view :postsData="postsData"></router-view>
</template>

<script>
import MainNavbar from './components/MainNavbar.vue';
import posts from "./assets/posts";

export default {
  name: 'App',
  data() {
    return {
      postsData: posts,
    }
  },
  components: {
    MainNavbar,
  }
}
</script>

<style>
  body {
    background-color: rgb(154, 218, 255);
  }
  div {
    box-sizing: border-box;
  }
</style>
