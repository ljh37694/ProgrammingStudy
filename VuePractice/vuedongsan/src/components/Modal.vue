<template>
  <div class="black-bg" v-if="activeModal == true">
    <div class="white-bg">
      <h4>{{ productsData[clickedIdx].title }}</h4>
      <p>{{ productsData[clickedIdx].content }}</p>
      <input v-model="month">
      <p>{{ month }}개월: {{ productsData[clickedIdx].price * month }}</p>
      
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      month: 1,
    }
  },
  watch: {
    month(after, before) {
      if (isNaN(after)) {
        this.month = 1;
        alert("문자를 입력했습니다.");
      }
    }
  },
  props: {
    productsData: Array,
    clickedIdx: Number,
    activeModal: Boolean,
  }
}
</script>

<style></style>