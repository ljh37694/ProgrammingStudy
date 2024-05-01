<template>
  <main id="vuestagram">
    <Container :postData="postData" :step="step" :imageUrl="imageUrl"/>
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
  width: 60vw;
}

#file {
  display: none;
}
</style>
