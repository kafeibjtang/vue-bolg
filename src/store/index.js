import Vue from 'vue'
import Vuex from 'vuex'
import modal from "./modules/modal"
import article from "./modules/article"
import { ResLogin, ResRegister } from "@/api"
import { Message } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    nickname: sessionStorage.getItem('nickname') || undefined,
  },
  getters: {
  },
  mutations: {
    ISLOGIN(state, data) {
      state.isLogin = !state.isLogin
      state.nickname = data
    },
    LOGOUT(state) {
      sessionStorage.clear()
      state.isLogin = false
      state.nickname = ""
    }
  },
  actions: {
    async login({ commit }, data) {
      try {
        let { nickname } = await ResLogin(data)
        commit("ISLOGIN", nickname)
      } catch (error) {
        Message.error(error.response.data.message)
        return Promise.reject(error)
      }
    },
    async register({ commit }, data) {
      try {
        let { nickname } = await ResRegister(data)
        commit("ISLOGIN", nickname)
      } catch (error) {
        Message.error(error.response.data.message)
        return Promise.reject(error)
      }
    },
  },
  modules: {
    modal,
    article
  }
})
