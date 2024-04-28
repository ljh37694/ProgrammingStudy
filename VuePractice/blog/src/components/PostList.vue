<template>
  <div v-for="post in postsData" :key="post.number" class="post-card">
    <h5>{{ post.title }}</h5>
    <p>{{ post.date }}</p>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    postsData: Array,
  },
}
</script>

<style>
  .post-card {
    background-color: #eee;
    padding: 1em;
    border-radius: 10px;
    margin: 20px;
  }
</style>