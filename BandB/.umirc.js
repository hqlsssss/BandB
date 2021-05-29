import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock:false,
  proxy:{
    '/api':{
      'target':'http://127.0.0.1:7001/',
      'changeOrigin':true
    }
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: '首页'
        },
        {
          path: '/order',
          component: './order/index',
          title: '订单',
          auth:true
        },
        {
          path: '/user',
          component: './user/index',
          title: '我的',
          auth:true
        },
        {
          path: '/user/edit',
          component: './user/edit',
          title: '设置用户',
        },
        {
          path: '/search',
          component: './search/index',
          title: '搜索',
        },
        {
          path: '/observer',
          component: './observer',
          title: 'observer',
        },
        {
          path: '/house',
          component: './house',
          title: 'house',
        },
        {
          path: '/login',
          component: './login',
          title: 'login',
        },
        {
          path: '/register',
          component: './register',
          title: 'register',
        },
        
      ]
    }
  ],
});
