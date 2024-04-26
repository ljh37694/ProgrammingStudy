<template>
  <div class="product">
    <img :src="productData.image" class="room-img">
    <h4 @click="$emit('openModal')">{{ productData.title }}</h4>
    <p>{{ productData.price }}</p>
  </div>
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