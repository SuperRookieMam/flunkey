import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex) // use必须在创建store实例之前调用
const CTX = CONTEXT_PATH
export default new Store({
  namespaced: true,
  state: {
    user: {},
    error: {
      count: 0,
      message: ''
    },
    loadingCount: 0,
    url: {
      login: CTX + 'login',
      logout: CTX + 'logout'
    }
  },
  getters: {
  },
  mutations: {
    addError (state, payload) {
      let count = 1 + state.error.count
      let message = payload
      state.error = {
        count,
        message
      }
    },
    updateUser: (state, user) => {
      state.user = user
    },
    loading (state) {
      state.loadingCount++
      console.debug('after loading the loading count is ', state.loadingCount)
    },
    loadingComplete (state) {
      state.loadingCount--
      console.debug('after complete the loading count is ', state.loadingCount)
    }
  },
  actions: {
  },
  modules: {
  }
})
