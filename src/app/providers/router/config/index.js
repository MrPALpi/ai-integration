import { layouts } from '../ui';
import { middlewareTypes } from '../middlewares'


export default [
  {
    path: '/',
    name: 'Chat',
    component: () => import('@/pages/chat/Index.vue'),
    meta: {
      layout: layouts.DEFAULT,
      middleware: middlewareTypes.LOGIN,
      transition: 'slide-left'
    },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/pages/history/Index.vue'),
    meta: {
      layout: layouts.DEFAULT,
      middleware: middlewareTypes.LOGIN,
      transition: 'slide-right'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Index.vue'),
    meta: {
      layout: layouts.LOGIN,
      middleware: middlewareTypes.ENTERED,
      transition: 'slide-left'
    },
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/pages/sign-up/Index.vue'),
    meta: {
      layout: layouts.LOGIN,
      middleware: middlewareTypes.ENTERED,
      transition: 'slide-right'
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import('@/pages/error/Error.vue'),
    meta: {
      layout: layouts.ERROR
    }
  }
];