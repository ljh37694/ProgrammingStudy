<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage: `url(${data.userImage})` }"></div>
      <span class="profile-name">{{ data.name }}</span>
    </div>
    <div class="post-body" :style="{ backgroundImage: `url(${data.postImage})` }"></div>
    <div class="post-content">
      <p>{{ data.likes }} Likes</p>
      <p><strong>{{ data.name }}</strong> {{ data.content }}</p>
      <p class="date">{{ data.day }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThePost",
  props: {
    data: Object,
  }
}
</script>
<style>
.post {
  width: 100%;
  margin-bottom: 30px;
}

.profile {
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}

.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}

.post-header {
  height: 30px;
  padding: 10px;
}

.post-body {
  width: 100%;
  height: 450px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}

.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>