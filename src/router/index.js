import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import store from '../store';

Vue.use(Router);

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      redirect: '/index',
      children: [
        {
          path: 'movieManage',
          component: resolve => require(['@/pages/movieManage/movieManage.vue'], resolve),
          meta: {loginRequired: true}
        },
        {
          path: 'movies/:id',
          component: resolve => require(['@/pages/movieManage/movieDetail.vue'], resolve),
          meta: {loginRequired: true}
        },
        {
          path: 'categoryManage',
          component: resolve => require(['@/pages/categoryManage/categoryManage.vue'], resolve),
          meta: {loginRequired: true}
        }
      ]
    },
    {
      path: '/',
      component: resolve => require(['@/components/common/Bg.vue'], resolve),
      children: [
        {
          path: '/login',
          component: resolve => require(['@/pages/public/login.vue'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: 'movieManage'
    }
  ]
})

store.commit('getTokenAndUsername');

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (to.meta.loginRequired) {
    if (store.getters.isLogin) {
      next();
    } else {
      next('/login');
      NProgress.done()
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router
