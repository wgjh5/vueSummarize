import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
	Vue.use(VueRouter)
const routes = [{
		path: '/App',
		name: 'App',
		component: App
	},
	]
new Vue({
	VueRouter,
  render: h => h(App),
}).$mount('#app')
