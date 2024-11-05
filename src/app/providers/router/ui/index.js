export const layouts = {
  DEFAULT: { name: 'DEFAULT', component: () => import('./layouts/Default.vue') },
  LOGIN: { name: 'LOGIN', component: () => import('./layouts/Login.vue') },
  ERROR: { name: 'ERROR', component: () => import('./layouts/Error.vue') }
};