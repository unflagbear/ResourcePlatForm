# 基于Ant Design Pro的资源集合展示前端

本项目基于Ant Design Pro的前端资源展示

## 环境准备

安装`node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## 运行命令

### 启动项目

```bash
npm start
```

## 项目页面代码

由于项目还未完成，基于AntdPro的部分过于庞杂还未拆分。计划完成项目内容后进行删减

主要技术内容 react + umi + dva 

路由配置位于config/config.js routes对象部分

### 主要内容使用到的内容

```bash
├─.umi
├─assets #静态资源-图片内容
├─components #组件库，基础组件内容
│  ├─Authorized #权限组件-用来进行鉴权   
│  ├─GlobalHeader #全局组件   
│  ├─HeaderDropdown #Header组件
│  ├─HeaderSearch	#Header搜索栏
│  ├─Home #主页
│  │  │  Banner0.jsx
│  │  │  Content5.jsx
│  │  │  data.source.js
│  │  │  documentation.md
│  │  │  Feature6.jsx
│  │  │  Feature7.jsx
│  │  │  Feature8.jsx
│  │  │  Footer0.jsx
│  │  │  index.jsx #主页主要内容
│  │  │  Nav2.jsx
│  │  │  Teams2.jsx
│  │  │  utils.js
│  │  │  
│  │  └─less #主页样式文件夹
│  │          
│  ├─NoticeIcon
│  └─PageLoading #页面加载组件     
├─layouts #整体布局
│  │  BasicLayout.jsx #基础布局
│  │  BlankLayout.jsx #空白布局
│  │  SecurityLayout.jsx #带权限跳转布局
│  │  UserLayout.jsx	#用户布局
│  │  UserLayout.less	#样式
│  │  
│  └─components #布局头部/脚部内容
│      │  data.source.js
│      │  Footer.jsx
│      │  Nav.jsx
│      │  
│      └─less
│              
├─locales #国际化内容（已经去除）
├─models #数据模型-用于传递接口获取到的数据
│      global.js 	#全局数据
│      homePageData.js	#主页数据获取
│      login.js			#登录数据获取
│      resource.js		#资源商城中资源内容获取
│      server.js		#服务内容获取
│      setting.js		#基础设定内容
│      user.js			#用户信息
│      
├─pages #页面内容
│  ├─home #主页页面
│  │  ├─homepage
│  │  │      index.jsx
│  │  │      
│  │  └─resmall
│  │          index.jsx
│  │          
│  ├─list
│  │  ├─search  
│  │  │  └─projects	#资源商城页面
│  └─user
│      ├─login	#登录页面
├─services	#用于编写api
│      login.js		#登录服务内容（用于记录接口api信息）
│      pageData.js	#对应主页内容获取api
│      resource.js	#对应资源内容获取
│      server.js	#对应服务内容数据获取
│      user.js		#对应用户信息资源获取
│      
└─utils
    └─classify	#分类体系解析工具类
            classify.json
            index.css
            modify.js
            
```

