import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { middleware } from './middlewares'
import config from './config/index'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: config
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  middleware(to, from, next, userStore.isAuth)
});

export default router