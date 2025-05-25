import { defineConfig } from '@vben/vite-config';
import http from 'node:http';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            // target: 'http://localhost:5320/api',
            target: 'http://192.168.2.78:8866/device',
            ws: false,
            agent: new http.Agent({ keepAlive: true, keepAliveMsecs: 20000 })
          },
        },
      },
    },
  };
});
