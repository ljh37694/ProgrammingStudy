import { createWebHistory, createRouter } from "vue-router";
import PostList from "./components/PostList.vue";
import PostDetail from "./components/PostDetail.vue";

const routes = [
  {
   path: "/detail/:id",
   component: PostDetail,
  },
  {
    path: "/post-list",
    component: PostList,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 