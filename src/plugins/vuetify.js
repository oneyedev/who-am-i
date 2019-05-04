import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import goTo from 'vuetify/lib/components/Vuetify/goTo'

Vue.use(Vuetify, {
  iconfont: 'md'
})
export function scrollBehavior(to, from, savedPosition) {
  let scrollTo = 0
  if (to.hash) {
    scrollTo = to.hash
  } else if (savedPosition) {
    scrollTo = savedPosition.y
  }
  return goTo(scrollTo)
}
