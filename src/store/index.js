import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {}
  },
  mutations: {
    // 设置用户信息
    setUserInfo (state, data) {
      // console.log(data)
      state.userInfo = data
    }
  },
  actions: {},
  modules: {}
})
