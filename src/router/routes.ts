import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/SplashLayout.vue'),
    children: [{ path: '', component: () => import('pages/SplashPage.vue') }],
  },
  {
    path: '/signup',
    component: () => import('layouts/SplashLayout.vue'),
    children: [{ path: '', component: () => import('pages/SignupPage.vue') }],
  },
  {
    path: '/signin',
    component: () => import('layouts/SplashLayout.vue'),
    children: [{ path: '', component: () => import('pages/SigninPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
