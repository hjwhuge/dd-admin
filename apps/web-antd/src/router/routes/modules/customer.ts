import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '客户管理',
    },
    name: 'Customer',
    path: '/customer',
    children: [
      {
        name: 'Manage',
        path: '/manage',
        component: () => import('#/views/customer/manage/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '客户资料',
        },
      },
    ],
  },
];

export default routes;
