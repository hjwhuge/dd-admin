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
        path: '/system/user',
        component: () => import('#/views/system/user/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '用户管理',
          authority: ['super'],
        },
      },
      {
        name: 'Logs',
        path: '/system/log',
        component: () => import('#/views/system/userLogs/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '日志列表',
        },
      },
      {
        name: 'Logs',
        path: '/system/analytics',
        component: () => import('#/views/system/analytics/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '分析页',
        },
      },
    ],
  },
];

export default routes;
