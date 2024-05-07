<template>
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input placeholder="🔍" id="follower-input" @input="followerSearch" />
    <div class="post-header" v-for="follower in followers" :key="follower.id">
      <div class="profile" :style="{ backgroundImage: `url(${follower.image})`}"></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, reactive, toRef, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "MyPage",
  setup(props) {
    let followers = ref([]);
    let copyFollowers = [];
    let test = reactive({ name: "Lee" });

    let { one } = toRef(props);
    let result = computed(() => { return 10 });

    function followerSearch() {
      let text = document.querySelector("#follower-input").value;

      console.log(text);

      if (text == "") {
        followers.value = copyFollowers;
      } else {
        followers.value = [...copyFollowers.filter(follower => follower.name.includes(text))];
        console.log(copyFollowers.filter(follower => follower.name.includes(text)));
      }
    }

    console.log(result.value);

    onMounted(() => {
      axios.get("/followers.json")
        .then(res => {
          followers.value = res.data;
          copyFollowers = res.data;
          console.log(test);
        });
    });

    watch(one, () => {
      console.log(one);
    });

    let store = useStore();
    console.log(store.state.more);

    return { followers, followerSearch };
  }
}
</script>