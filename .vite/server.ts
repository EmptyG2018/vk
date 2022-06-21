import { ServerOptions } from 'vite';
const server: ServerOptions = {
  port: 8888,
  host: '0.0.0.0',
  proxy: {
    '/proxy': {
      target: 'http://47.112.102.229:9009',
      changeOrigin: true,
      rewrite: (path) => path.replace(/\/proxy/, '/'),
    },
  },
};

export default server;
