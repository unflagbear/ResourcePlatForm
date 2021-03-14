// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
const hide = true;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    // {path: '/',
    //   component: '../layouts/BlankLayout',
    //   routes: [

    //     {
    //       path: '/',
    //       component: '../layouts/Layout',
    //       routes: [
    //         {
    //           name: 'homepage',
    //           path: '/home/homepage  ',
    //           component: './home/homepage'
    //         },
    //         {
    //           name: 'resmall',
    //           path: '/home/resmall',
    //           compnent:'./home/resmall'
    //         },
    //         {
    //           component: '404',
    //         },
    //       ]
    //     }
    //   ]
    // }
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: '注册',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              name: '平台注册',
              icon: 'smile',
              path: '/user/platform_register',
              component: './user/platform-register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/homepage',
            },
            {
              path: '/homepage',
              name: '首页',
              icon: 'dashboard',
              component: './home/homepage',
            },
            {
              path: '/form',
              icon: 'form',
              name: '资源商城',
              hideChildrenInMenu: hide,
              routes: [
                {
                  path: '/',
                  redirect: '/form/basic-form',
                },
                {
                  name: 'basic-form',
                  icon: 'smile',
                  path: '/form/basic-form',
                  component: './form/basic-form',
                },
                {
                  name: 'step-form',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
                {
                  name: 'advanced-form',
                  icon: 'smile',
                  path: '/form/advanced-form',
                  component: './form/advanced-form',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: '服务商城',
              routes: [
                {
                  path: '/',
                  redirect: '/list/projects',
                },
                {
                  name: '服务内容展示',
                  icon: 'smile',
                  path: '/list/projects',
                  component: './list/search/projects',
                },
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  hideInMenu: hide,
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/projects',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                      hideInMenu: hide,
                    },
                    {
                      name: 'projects',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'applications',
                      icon: 'smile',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                      hideInMenu: hide,
                    },
                  ],
                },
                // {
                //   path: '/',
                //   redirect: '/list/table-list',
                // },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                  hideInMenu: hide,
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                  hideInMenu: hide,
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                  hideInMenu: hide,
                },
              ],
            },
            {
              path: '/profile',
              name: '订单',
              icon: 'profile',
              routes: [
                {
                  path: '/',
                  redirect: '/profile/advanced',
                },
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic',
                  hideInMenu: hide,
                  component: './profile/basic',
                },
                {
                  name: '订单状态',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              path: '/details',
              name: '详情页',
              icon: 'CheckCircleOutlined',
              component: './details',
            },
            {
              path: '/recommend',
              name: '推荐模型管理',
              icon: 'CheckCircleOutlined',
              component: './recommend',
            },
            {
              path: '/chatmodel',
              name: '对话模型管理',
              icon: 'CheckCircleOutlined',
              routes: [
                {
                  path: '/',
                  redirect: '/chatmodel/modelmanage',
                },
                {
                  name: '自然语言理解数据管理',
                  icon: 'smile',
                  path: '/chatmodel/datamanage',
                  component: './chatmodel/dialogdata',
                },
                {
                  name: '模型管理',
                  icon: 'smile',
                  path: '/chatmodel/modelmanage',
                  component: './chatmodel/modelmanage',
                },
              ],
            },
            {
              path: '/faqmanage',
              name: '问答模型',
              icon: 'CheckCircleOutlined',
              routes: [
                {
                  path: '/',
                  redirect: '/faqmodel/datamanage',
                },
                {
                  name: '问答模型管理',
                  icon: 'smile',
                  path: '/faqmanage/datamanage',
                  component: './faqmanage/datamanage',
                },
                // {
                //   name: '模型管理',
                //   icon: 'smile',
                //   path: '/faqmanage/modelmanage',
                //   component: './faqmanage/modelmanage',
                // },
              ],
            },
            {
              name: '新闻中心',
              icon: 'CheckCircleOutlined',
              path: '/result',
              hideChildrenInMenu: hide,
              routes: [
                {
                  path: '/',
                  redirect: '/result/success',
                },
                {
                  name: 'success',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'fail',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            // {
            //   name: 'exception',
            //   icon: 'warning',
            //   path: '/exception',
            //   routes: [
            //     {
            //       path: '/',
            //       redirect: '/exception/403',
            //     },
            //     {
            //       name: '403',
            //       icon: 'smile',
            //       path: '/exception/403',
            //       component: './exception/403',
            //     },
            //     {
            //       name: '404',
            //       icon: 'smile',
            //       path: '/exception/404',
            //       component: './exception/404',
            //     },
            //     {
            //       name: '500',
            //       icon: 'smile',
            //       path: '/exception/500',
            //       component: './exception/500',
            //     },
            //   ],
            // },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              hideInMenu: hide,
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: 'center',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              path: '/dashboard',
              name: '统计分析',
              icon: 'dashboard',
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
                {
                  name: 'analysis',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: 'monitor',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  name: 'workplace',
                  icon: 'smile',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            // {
            //   name: '统计分析',
            //   icon: 'highlight',
            //   path: '/editor',
            //   routes: [
            //     {
            //       path: '/',
            //       redirect: '/editor/flow',
            //     },
            //     {
            //       name: 'flow',
            //       icon: 'smile',
            //       path: '/editor/flow',
            //       component: './editor/flow',
            //     },
            //     {
            //       name: 'mind',
            //       icon: 'smile',
            //       path: '/editor/mind',
            //       component: './editor/mind',
            //     },
            //     {
            //       name: 'koni',
            //       icon: 'smile',
            //       path: '/editor/koni',
            //       component: './editor/koni',
            //     },
            //   ],
            // },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
});
