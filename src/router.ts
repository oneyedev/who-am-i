import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import ArticleGrid from './pages/ArticleGrid.vue'
import Article from './pages/Article.vue'
import GameGrid from './pages/GameGrid.vue'
import Game from './pages/Game.vue'

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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
