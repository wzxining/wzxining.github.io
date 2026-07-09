import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页 - 银幕时光' }
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: () => import('@/views/MovieList.vue'),
    meta: { title: '电影库 - 银幕时光' }
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: () => import('@/views/MovieDetail.vue'),
    meta: { title: '电影详情 - 银幕时光' }
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('@/views/Play.vue'),
    meta: { title: '正在播放 - 银幕时光' }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/Favorites.vue'),
    meta: { title: '我的收藏 - 银幕时光' }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    meta: { title: '搜索 - 银幕时光' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || '银幕时光'
})

export default router
