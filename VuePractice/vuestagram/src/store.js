import { createStore } from "vuex";
import postData from "./assets/postData";
import axios from "axios";

const store = createStore({
  state() {
    return {
      postData: postData,
      more: []
    }
  },
  mutations: {
    addPost(state, payload) {
      state.postData = [...state.postData, ...payload];
    },
    toggleLike(state, idx) {
      state.postData[idx].liked = !state.postData[idx].liked;
      state.postData[idx].likes += state.postData[idx].liked ? 1 : -1;

      let tmp = [...state.postData];
      state.postData = tmp;
    },
    publishPost(state, payload) {
      state.postData.unshift(payload);
    },
    setMore(state, data) {
      state.more.push(data);
    }
  },
  actions: {
    getData(context) {
      axios.get("https://codingapple1.github.io/vue/more0.json")
      .then(res => {
        context.commit('setMore', res.data);
        context.commit('addPost', [res.data]);
      })
      .catch(e => console.log(e));
    }
  },
});

export default store;