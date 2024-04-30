<template>
  <main id="vuestagram">
    <Container :postData="postData" />
  </main>
</template>

<script>
import Container from './components/Container.vue';
import postData from './assets/postData';

export default {
  name: 'App',
  data() {
    return {
      postData: postData,
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
