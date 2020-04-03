import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Article from './pages/Article.vue'
import ArticleGrid from './pages/ArticleGrid.vue'
import Game from './pages/Game.vue'
import GameGrid from './pages/GameGrid.vue'
import { scrollBehavior } from './plugins/vuetify'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: scrollBehavior,
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
    {
      path: '/games',
      name: 'games',
      component: GameGrid
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    { path: '*', component: () => import('@/pages/NotFound.vue') }
  ]
})
export default router
