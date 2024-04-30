<template>
  <div class="main-container">
    <Post v-for="(data, idx) in postData" :key="idx" :data="data" />
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
  name: "TheContainer",
  data() {
    
  },
  props: {
    postData: Array,
  },
  components: {
    Post,
  }
}
</script>

<style>
.main-container {
}
</style>