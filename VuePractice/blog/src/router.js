import { createWebHistory, createRouter } from "vue-router";
import PostList from "./components/PostList.vue";
import PostDetail from "./components/PostDetail.vue";
import Author from "./components/Author.vue";
import Comment from "./components/Comment.vue";

const routes = [
  {
   path: "/detail/:id",
   component: PostDetail,
   children: [
    {
      path: "author",
      component: Author
    },
    {
      path: "comment",
      component: Comment,
    }
   ],
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