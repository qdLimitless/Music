import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: '/fullplayer/:id',
        name: 'fullplayer',
        component: () => import('COMPONENTS/common/FullPlayer')
    },
    {
        path: '/singer',
        name: 'singer',
        component: () => import('COMPONENTS/singer/Singer')
    },
    {
        path: '/singer/:id',
        name: 'singerDetail',
        component: () => import('COMPONENTS/singer/singerDetail')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('COMPONENTS/search/Search')
    }
  ]}
)
