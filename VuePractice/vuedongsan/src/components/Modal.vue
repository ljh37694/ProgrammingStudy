<template>
  <div class="black-bg" v-if="activeModal == true">
    <div class="white-bg">
      <h4>{{ productsData[clickedIdx].title }}</h4>
      <p>{{ productsData[clickedIdx].content }}</p>
      <button @click="activeModal = false">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    productsData: Array,
    activeModal: Boolean,
    clickedIdx: Number,
  }
}
</script>

<style></style>