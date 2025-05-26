import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 2,
      title: '订单管理',
    },
    name: 'Order',
    path: '/order',
    children: [
      {
        name: 'Enter',
        path: '/order/enter',
        component: () => import('#/views/order/enter/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '入货管理',
        },
      },
      {
        name: 'Out',
        path: '/order/out',
        component: () => import('#/views/order/out/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '出货管理',
        },
      },
      {
        name: 'Statistics',
        path: '/order/statistics',
        component: () => import('#/views/order/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '订单统计',
        },
      },
    ],
  },
];

export default routes;
