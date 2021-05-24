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
    // default: 'zh-CN',
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
              name: '供应商注册',
              icon: 'smile',
              path: '/user/company_register',
              component: './user/company-register',
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
          authority: ['admin', 'server', 'customer'],
          routes: [
            {
              path: '/',
              redirect: '/homepage',
            },
            {
              path: '/homepage',
              name: '首页',
              icon: 'BankOutlined',
              component: './home/homepage',
            },
            {
              path: '/form',
              icon: 'form',
              name: '资源商城',
              hideInMenu: hide,
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
              icon: 'DollarCircleOutlined',
              name: '商城',
              routes: [
                {
                  path: '/',
                  redirect: '/list/resource',
                },
                {
                  hideInMenu:true,
                  name: '资源内容_旧',
                  icon: 'smile',
                  path: '/list/resource',
                  component: './list/search/resource',
                }, {
                  // hideInMenu:true,
                  name: '资源内容',
                  icon: 'smile',
                  path: '/list/resource_new',
                  component: './list/search/resource_new',
                },{
                  name: '服务内容',
                  icon: 'smile',
                  path: '/list/service',
                  component: './list/search/service',
                },{
                  name: '集成服务包',
                  icon: 'smile',
                  path: '/list/serviceset',
                  component: './list/search/service_set',
                },

                {
                  authority:['admin'],
                  name: '服务平台展示',
                  icon: 'smile',
                  path: '/list/platform_list',
                  component: './platform_list',
                },
                {
                  name: '平台细节',
                  icon: 'smile',
                  path: '/list/platform_list/detail',
                  component: './platform_list/detail',
                  hideInMenu: hide,
                },

                {
                  name: '发布服务',
                  icon: 'smile',
                  path: '/list/serviceprogress',
                  component: './serviceprogress',
                },
                {
                  name: '服务细节',
                  icon: 'smile',
                  path: '/list/service_list/detail',
                  component: './service_list/detail',
                  hideInMenu: hide,
                },
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  hideInMenu: hide,
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                      hideInMenu: hide,
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
              path: '/profile_server/',
              name: '订单管理',
              icon: 'profile',
              authority: ['admin','server'],
              routes:[{
                path: '/profile_server/sOrderDone',
                name: '已完成',
                icon: 'smile',
                component: './profile/sOrderDone',
              },
              {
                path: '/profile_server/sOrderManage',
                name: '未完成',
                icon: 'smile',
                component: './profile/sOrderManage',
              },
              {
                path: '/profile_server/server/',
                icon: 'profile',
                hideInMenu: true,
                component: './profile/server',
              },
            ],
            },
            {
              path: '/profile_customer/',
              name: '订单管理',
              icon: 'profile',
              authority: ['customer'],
              routes:[{
                path: '/profile_customer/serviceSet',
                name: '集成服务',
                icon: 'smile',
                component: './profile/serviceSet',
              },
              {
                path: '/profile_customer/multiServer',
                icon: 'smile',
                hideInMenu: true,
                component: './profile/multiServer',
              },
              {
                path: '/profile_customer/oneService',
                name: '单个服务',
                icon: 'smile',
                //component: './profile',
                routes:[
                {
                  path: '/profile_customer/oneService/cOrderDone',
                  name: '已完成',
                  icon: 'smile',
                  component: './profile/cOrderDone',
                },
                {
                  path: '/profile_customer/oneService/cOrderManage',
                  name: '未完成',
                  icon: 'smile',
                  component: './profile/cOrderManage',
                },]
              },
              {
                path: '/profile_customer/customer',
                icon: 'profile',
                hideInMenu: true,
                component: './profile/customer',
              },

            ],
            },

            {
              hideInMenu:true,
              path: '/details_resource',
              name: '资源详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/resource',
            },
            {
              hideInMenu:true,
              path: '/details_patent',
              name: '专利详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/patent',
            },
            {
              hideInMenu:true,
              path: '/details_company',
              name: '企业详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/company',
            },
            {
              hideInMenu:true,
              path: '/details_service',
              name: '服务详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/service/index.jsx',
            },{
              hideInMenu:true,
              path: '/details_serviceSet',
              name: '服务详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/serviceset/index.jsx',
            },{
              hideInMenu:true,
              path: '/details_experts',
              name: '专家详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/experts/index.jsx',
            },
            {
              hideInMenu:true,
              path: '/details_platform',
              name: '平台详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/platform/index.jsx',
            },
            {
              hideInMenu:true,
              path: '/details_demand',
              name: '需求详情页面',
              icon: 'CheckCircleOutlined',
              component: './details/demand/index.jsx',
            },
            {
              // hideInMenu:true,

              path: '/manage',
              name: '模型管理工具',
              authority: ['admin'],
              icon: 'DesktopOutlined',
              routes:[
                {
                  // hideInMenu:true,

                  path: '/manage/recommend',
                  name: '推荐模型管理',
                  authority: ['admin'],
                  icon: 'CheckCircleOutlined',
                  component: './recommend',
                },
                {
                  // hideInMenu:true,

                  path: '/manage/demand',
                  name: '需求知识库管理',
                  authority: ['admin'],
                  icon: 'CheckCircleOutlined',
                  component: './demand',
                },
                {
                  // hideInMenu:true,

                  path: '/manage/chatmodel',
                  name: '对话模型管理',
                  authority: ['admin'],

                  icon: 'CheckCircleOutlined',
                  routes: [
                    {
                      path: '/',
                      redirect: '/manage/chatmodel/modelmanage',
                    },
                    {
                      name: '意图识别数据管理',
                      icon: 'smile',
                      path: '/manage/chatmodel/datamanage',
                      component: './chatmodel/dialogdata',
                    },
                    {
                      name: '模型管理',
                      icon: 'smile',
                      path: '/manage/chatmodel/modelmanage',
                      component: './chatmodel/modelmanage',
                    },
                  ],
                },
                {
                  // hideInMenu:true,

                  path: '/manage/faqmanage',
                  name: '问答模型',
                  authority: ['admin'],

                  icon: 'CheckCircleOutlined',
                  routes: [
                    {
                      path: '/',
                      redirect: '/manage/faqmodel/datamanage',
                    },
                    {
                      name: '问答模型管理',
                      icon: 'smile',
                      path: '/manage/faqmanage/datamanage',
                      component: './faqmanage/datamanage',
                    },
                    {
                      name: '问答数据管理',
                      icon: 'smile',
                      path: '/manage/faqmanage/modelmanage',
                      component: './faqmanage/modelmanage',
                    },
                  ],
                },
              ],
            },

            {
              hideInMenu:true,

              path: '/knowledgegraph',
              name: '知识图谱',
              authority: ['admin'],
              icon: 'CheckCircleOutlined',
              routes: [
                {
                  path: '/',
                  redirect: '/knowledgegraph/',
                },
                {
                  name: '知识图谱管理',
                  icon: 'smile',
                  path: '/knowledgegraph/',
                  component: './knowledge_graph/index.jsx',
                }
              ],
            },
            {
              // hideInMenu:true,

              path: '/demand',
              name: '需求中心',
              icon: 'CheckCircleOutlined',
              routes: [
                {
                  path: '/',
                  redirect: '/demand/index',
                },
                {
                  authority:['customer'],
                  name: '发布需求',
                  icon: 'smile',
                  path: '/demand/index/progress',
                  component: './demandprogress/',
                },
                {
                  authority:['admin'],
                  name: '需求展示',
                  icon: 'smile',
                  path: '/demand/index/list',
                  component: './list/search/demand/',
                },
                {
                  authority:['server'],
                  name: '发布服务',
                  icon: 'smile',
                  path: '/demand/serviceprogress',
                  component: './serviceprogress',
                },
              ],
            },
            {
              name: '新闻中心',
              icon: 'CheckCircleOutlined',
              path: '/result',
              hideInMenu: true,
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
              name: '用户',
              icon: 'user',
              path: '/account',
              hideInMenu: hide,
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: '个人中心',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: '个人设置',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              name:"服务集成工具",
              authority: ['admin'],
              icon:'AreaChartOutlined',
              target: '_blank', // 点击新窗口打开
              path:'http://182.92.217.156:8200'
            },
            {
              name:"资源构建",
              authority: ['admin'],
              icon:'AreaChartOutlined',
              routes:[
                {
                  path: 'http://10.112.14.63:7457',
                  name: '资源池管理平台',
                  target: '_blank', // 点击新窗口打开
                  authority: ['admin'],
                },
                {
                  name: '知识图谱构建结果',
                  target: '_blank', // 点击新窗口打开
                  authority: ['admin'],
                  routes:[
                    {
                      path: 'http://10.112.205.250:12134/browser/',
                      name: '专利图谱',
                      target: '_blank', // 点击新窗口打开
                      authority: ['admin'],
                    },
                    {
                      path: 'http://10.112.205.250:12234/browser/',
                      name: '专家图谱',
                      target: '_blank', // 点击新窗口打开
                      authority: ['admin'],
                    },
                    {
                      path: 'http://10.112.205.250:12334/browser/',
                      name: '设备图谱',
                      target: '_blank', // 点击新窗口打开
                      authority: ['admin'],
                    },
                  ]
                },
              ]
            },
            {
              path: '/dashboard',
              name: '资源池管理',
              icon: 'dashboard',
              hideInMenu: true,
              authority: ['admin'],
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
                {
                  hideInMenu: true,
                  name: '统计分析',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: '监控页面',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  hideInMenu:true,
                  name: '工作台',
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
