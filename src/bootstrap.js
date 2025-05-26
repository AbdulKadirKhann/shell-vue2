import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales/i18n'

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
