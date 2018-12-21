import Vue from 'vue';
import Vuex from 'vuex';
import firex from './modules/firex'
import matchmaking from './modules/matchmaking'
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		test:true
	},
	getters: {

	},
	mutations: {

	},
	actions: {
	
	},
	modules: {
		firex,
		matchmaking
	}
});
