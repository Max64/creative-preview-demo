import Vue from 'vue'
window.Vue = Vue;

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

import {registerFA} from './fontawesome.config';
registerFA(Vue);

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Element, { locale })

new Vue({
  render: h => h(App)
}).$mount('#app')
