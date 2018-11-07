import Vue from 'vue';
import Vuex from 'vuex';

import App from '../src/app.vue';
import createRouter from './router';
import vueRouter from 'vue-router';
import ElementUI from 'element-ui';
import createStore from './store/store.js';


Vue.use(vueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false


/*export function createApp () {
	const router=createRouter();
	const store =createStore();
	
	router.beforeEach((to,from,next)=>{
		console.log(to.fullPath)
		next();
	})
	
	
	const app=new Vue({
		router,
		el:"#app",
		store,
	  	render: (h) => h(App)
	})
	return { app, router, store }
}*/
const router=createRouter();
const store =createStore();

router.beforeEach((to,from,next)=>{
	console.log(to.fullPath)
	next();
})


const app=new Vue({
	router,
	el:"#app",
	store,
  	render: (h) => h(App)
})