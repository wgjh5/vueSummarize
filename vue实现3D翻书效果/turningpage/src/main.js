import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import particles from 'particles.js'
Vue.use(particles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
