/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
// const BASE_URL = 'http://mockjs.docway.net/mock/1bLyPJStfA9';
const BASE_URL = 'http://8.133.173.118:12581';
export default {
  
  dev: {
    '/api/': {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api/': {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
