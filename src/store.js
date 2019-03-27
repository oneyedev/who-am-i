import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navOn: false
  },
  getters: {
    isNavOn(state) {
      return state.navOn
    }
  },
  mutations: {
    navSwitch(state, value) {
      if (typeof value === 'boolean') {
        state.navOn = value
      } else {
        state.navOn = !state.navOn
      }
    }
  },
  actions: {}
})
