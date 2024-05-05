import { createStore } from "vuex";
import postData from "./assets/postData";

const store = createStore({
  state() {
    return {
      postData: postData,
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
    }
  }
});

export default store;