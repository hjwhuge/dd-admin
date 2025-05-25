import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 3,
      title: '系统设置',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'User',
        path: '/user',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '用户管理',
        },
      },
    ],
  },
];

export default routes;
