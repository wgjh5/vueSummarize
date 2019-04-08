import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
	Vue.use(VueRouter)
const routes = [{
		path: '/App',
		name: 'app',
		component: App
	},{
		path: '/',
		redirect: 'app'
	} //  碰到#/重定向到#/home
	]
	const router = new VueRouter({
	routes
})
new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
