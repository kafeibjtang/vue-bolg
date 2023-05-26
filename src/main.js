import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message } from "element-ui"

import "@/util/element"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

router.beforeEach((to, from, next) => {
  if (to.path === "/compiler") {
    let token = sessionStorage.getItem("token")
    if (!token) {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if (flag) {
        next(from.path);
        return false
      }
      Message.warning("登录后才能发表文章哦~")
    }
  }
  next()
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
