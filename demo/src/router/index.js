import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const index=()=>import('../pages/index.vue')
const detail=()=>import('../pages/detail.vue')
const comment=()=>import('../pages/comment.vue')
const collect=()=>import('../pages/collect.vue')
export default new Router({
  routes: [
    {
      path: '/index',
      component: index
    },
    {
        path:"*",
        redirect:'/index'
    },
    {
        path:"/detail/:id",
        component:detail
    },
    {
        path:"/comment/:id",
        component:comment
    },
    {
        path:"/collect",
        component:collect
    }
  ]
})
