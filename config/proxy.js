/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy http://10.112.205.250:8453/nlu_api
 */
export default {
  dev: {
    '/api': {
      target: 'http://localhost:9870',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/resource',
      },
    },
    '/nlu_api': {
      target: 'http://10.112.205.250:8453',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/faq_api': {
      target: 'http://10.112.205.250:9900',
      changeOrigin: true,
      pathRewrite: {
        '^/faq_api': '',
      },
    },
    '/knowledge_graph':{
      target:'http://10.112.205.250:10088',
      changeOrigin: true,
      pathRewrite:{
        '^/knowledge_graph': '',
      }
    }
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
