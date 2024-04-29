<template>
  <div class="post-detail-container">
    <h5>{{ postsData[$route.params.id].title }}</h5>
    <p>{{ postsData[$route.params.id].content }}</p>
  </div>
</template>

<script>
export default {
  name: "PostDetail",
  props: {
    postsData: Array,
  }
}
</script>

<style>
.post-detail-container {
  text-align: center;
  margin-top: 2em;
}
</style>