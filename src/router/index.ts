import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AdminView from "@/views/AdminView.vue";
import EditView from "@/views/EditView.vue";
import CreateView from "@/views/CreateView.vue";
import AboutView from "@/views/AboutView.vue"

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
    },
		{
			path: "/admin",
			component: AdminView
		},
		{
			path: "/edit/article/:id",
			component: EditView
		},
		{
			path: "/create/article",
			component: CreateView
		},
		{
			path: "/about",
			component: AboutView
		}
  ],
});

export default router;
