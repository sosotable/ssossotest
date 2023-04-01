import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // MARK: 인덱스 페이지
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  // MARK: 메인 페이지(테스트 선택)
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },
  /** MARK: 테스트 페이지
   * /content/:path에 의해서 각각의 페이지가 라우팅: 예시 /content/mbti => MBTIPage 라우팅
   */
  {
    path: '/content',
    component: () => import('layouts/ContentLayout.vue'),
    children: [
      { path: 'mbti', component: () => import('pages/contents/MBTIPage.vue') },
      {
        path: 'tastes',
        component: () => import('pages/contents/TastesPage.vue'),
      },
      {
        path: 'average',
        component: () => import('pages/contents/AveragePage.vue'),
      },
    ],
  },
  // MARK: 결과 페이지
  {
    path: '/result',
    component: () => import('layouts/ResultLayout.vue'),
    children: [
      {
        path: 'mbti',
        component: () => import('pages/results/MBTIResultPage.vue'),
      },
      {
        path: 'tastes',
        component: () => import('pages/results/TastesResultPage.vue'),
      },
      {
        path: 'average',
        component: () => import('pages/results/AverageResultPage.vue'),
      },
      {
        path: 'calc-average',
        component: () => import('pages/results/AverageCalcPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
