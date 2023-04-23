import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Dialog, Card, Tabs, TabPane, Menu, MenuItem, Form, FormItem, Button, Input, Message, Backtop, Checkbox, Radio, RadioGroup, Upload } from "element-ui"

Vue.use(Dialog)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Backtop)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.prototype.$message = Message


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
