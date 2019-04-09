import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Article from './pages/Article.vue'
import ArticleGrid from './pages/ArticleGrid.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleGrid
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    { path: '*', component: () => import('@/pages/NotFound.vue') }
  ]
})
