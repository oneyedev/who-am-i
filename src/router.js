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
      path: '/articles/:src',
      name: 'article',
      component: Article,
      props: true
    },
    {
      path: '/articles',
      name: 'article-grid',
      component: ArticleGrid
    },
    { path: '*', component: () => import('@/pages/NotFound.vue') }
  ]
})
