<template>
  <MainNavbar />
  
  <PostList :postsData="postsData" />
</template>

<script>
import MainNavbar from './components/MainNavbar.vue';
import PostList from './components/PostList.vue';
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
    PostList,
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
