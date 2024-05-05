<template>
  <div class="main-container">
    <div v-if="step == 0">
      <Post v-for="(data, idx) in postData" :key="idx" :data="data" @click="$store.commit('toggleLike', idx)" />
    </div>

    <!-- 필터선택페이지 -->
    <div v-else-if="step == 1">
      <div class="upload-image" :class="currentFilter" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="filters">
        <FilterBox v-for="(filter, idx) in filters" :key="idx" :imageUrl="imageUrl" @click="currentFilter = filter; $emit('selectFilter', currentFilter);"
          :class="filter">
          {{ filter }}
        </FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-else-if="step == 2">
      <div class="upload-image" :class="currentFilter" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="write">
        <textarea class="write-box" placeholder="Write!"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Post from './Post.vue';
import FilterBox from './FilterBox.vue';

export default {
  name: "TheContainer",
  data() {
    return {
      currentFilter: "original",
      filters: ["original", "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
        "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
        "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
    }
  },
  props: {
    postData: Array,
    step: Number,
    imageUrl: String,
    selectFilter: String,
  },
  components: {
    Post,
    FilterBox,
  }
}
</script>

<style>
.main-container {
  width: 468px;
  margin: auto;
}

.upload-image {
  width: 100%;
  height: 70vh;
  background: cornflowerblue;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.filters {
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* 인터넷익스플로러 */
  user-select: none;
}

.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}

.filters::-webkit-scrollbar {
  height: 5px;
}

.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>