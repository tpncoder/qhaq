import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"
import ArticleView from "@/views/ArticleView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*{
      path: '/xyz',
      component: xyz
    }*/
    {
      path: "/",
      component: HomeView
    },
    {
      path: "/article/:article",
      component: ArticleView
    }
  ],
});

export default router;