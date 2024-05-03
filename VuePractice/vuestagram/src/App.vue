<template>
  <main id="vuestagram">
    <header class="header" v-if="step != 0">
      <ul>
        <li class="header-left-button">cancle</li>
      </ul>
      <ul class="header-right-button">
        <li v-if="step == 1" @click="step++">next</li>
        <li v-if="step == 2" @click="publish">등록</li>
      </ul>
    </header>
    <Container :postData="postData" :step="step" :imageUrl="imageUrl" />
    <button @click="more">더보기</button>

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
import Container from './components/Container.vue';
import postData from './assets/postData';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      postData: postData,
      moreCount: 0,
      step: 0,
      imageUrl: "",
    }
  },
  methods: {
    more() {
      axios.get(`https://codingapple1.github.io/vue/more${this.moreCount++}.json`)
        .then(res => {
          this.postData = [...this.postData, res.data];
        })
        .catch(e => console.log(e));
    },
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
        filter: "perpetua"
      };

      this.postData.unshift(post);
      this.step = 0;
    },
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
  width: 60vw;
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
