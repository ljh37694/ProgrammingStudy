<template>
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input placeholder="🔍" />
    <div class="post-header" v-for="follower in followers" :key="follower.id">
      <div class="profile" :style="{ backgroundImage: `url(${follower.image})`}"></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: "MyPage",
  setup() {
    let followers = ref([]);

    onMounted(() => {
      axios.get("/followers.json")
        .then(res => {
          followers.value = res.data;
        });
    });

    return { followers };
  }
}
</script>