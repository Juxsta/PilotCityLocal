import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user:null
	},
	getters: {
		
	},
	mutations: {
		
	},
	actions: {
		getUser: context => {
			context.commit()
		}
	}
});