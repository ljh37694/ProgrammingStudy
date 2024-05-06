<template>
  <main id="vuestagram">
    <p>{{ more[0] }}</p>
    <header class="header" v-if="step != 0">
      <ul>
        <li class="header-left-button">cancle</li>
      </ul>
      <ul class="header-right-button">
        <li v-if="step == 1" @click="step++">next</li>
        <li v-if="step == 2" @click="publishPostData(publish())">등록</li>
      </ul>
    </header>
    <Container :postData="postData" :step="step" :imageUrl="imageUrl" :selectFilter="selectFilter" @selectFilter="(filter) => selectFilter = filter " />
    <button @click="$store.dispatch('getData')">더보기</button>

    <div>
      <button v-for="i in 3" :key="i" @click="step = i - 1">필터 {{ i }}</button>
    </div>

    <footer>
      <ul>
        <input @change="upload" type="file" id="file">
        <label for="file">+</label>
      </ul>
    </footer>
  </main>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Container from './components/Container.vue';

export default {
  name: 'App',
  data() {
    return {
      moreCount: 0,
      step: 0,
      imageUrl: "",
      selectFilter: "original",
    }
  },
  computed: { // 컴포넌트 로드시 한 번 실행하고 실행 안 됨, 그냥 저장 공간
    ...mapState(['more']),
    now2() {
      return new Date();
    },
    postData() {
      return this.$store.state.postData;
    }
  },
  methods: {
    ...mapMutations({publishPostData: "publishPost"}),
    upload(e) {
      let file = e.target.files;
      console.log(file);
      this.imageUrl = URL.createObjectURL(file[0]);
      this.step = 1;

      console.log(this.imageUrl);
    },
    publish() {
      let post = {
        name: "Kim Hyun",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imageUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: document.querySelector(".write-box").value,
        filter: this.selectFilter,
      };

      this.step = 0;

      return post;
    },
    now() {
      return new Date();
    }
  },
  components: {
    Container,
  }
}
</script>

<style>
body {
  background-color: black;
  color: #fff;
}

#vuestagram {
  margin: auto;
  width: 100%;
}

#file {
  display: none;
}

.header {
  color: rgb(123, 184, 248);
  display: flex;
  justify-content: space-between;
  padding: 0.5em 3em;
  background-color: #fff;
}

.header-left-button {
  float: left;
  list-style: none;
}

.header-right-button {
  float: right;
  list-style: none;
}
</style>
