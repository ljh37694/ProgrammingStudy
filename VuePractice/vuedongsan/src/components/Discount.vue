<template>
  <div class="discount">
    <p>지금 결제하면 {{ discountRate }}% 할인</p>
  </div>
</template>

<script>
export default {
  name: "Discount",
  props: {
    discountRate: Number,
  },
}
</script>

<style>
.discount {
  text-align: center;
  border-radius: 8px;
  background-color: #eee;
  padding: 10px;
  font-size: 30px;
}
</style>