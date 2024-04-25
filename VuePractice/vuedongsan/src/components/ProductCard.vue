<template>
  <img :src="productData.image" class="room-img">
    <h4 @click="activeModal = true; clickedIdx = idx">{{ productData.title }}</h4>
    <p>{{ productData.price }}</p>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    productData: Object,
    clickedIdx: Number,
    activeModal: Boolean,
  }
}
</script>

<style></style>