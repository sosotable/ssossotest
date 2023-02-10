import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },
  {
    path: '/content',
    component: () => import('layouts/ContentLayout.vue'),
    children: [
      { path: 'mbti', component: () => import('pages/contents/MBTIPage.vue') },
      { path: 'tastes', component: () => import('pages/contents/TastesPage.vue') },
      { path: 'average', component: () => import('pages/contents/AveragePage.vue') }
    ],
  },
  {
    path: '/result',
    component: () => import('layouts/ResultLayout.vue'),
    children: [{ path: '', component: () => import('pages/ResultPage.vue') }],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
