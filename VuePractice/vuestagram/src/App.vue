<template>
  <main id="vuestagram">
    <Container :postData="postData" />
    <button @click="more">더보기</button>
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
    }
  },
  methods: {
    more() {
      axios.get(`https://codingapple1.github.io/vue/more${this.moreCount++}.json`)
      .then(res => {
        this.postData = [...this.postData, res.data];
      })
      .catch(e => console.log(e));
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
</style>
