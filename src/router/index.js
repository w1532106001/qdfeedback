import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/view/issue/detail'], resolve),
    },{
      path: '/main',
      name: 'main',
      component: resolve => require(['@/view/issue/main'], resolve),
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/view/issue/login'], resolve),
    },{
      path: '/listenScript',
      name: 'listenScript',
      component: resolve => require(['@/view/issue/listenScript'], resolve),
    }
  ]
})
