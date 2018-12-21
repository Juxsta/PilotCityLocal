import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/firebase/init'
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		user_data: null,
		class_data: null,
		user_type: null,
	},
	getters: {
		match_ready: state => {
			return state.user_data &&
				state.class_data &&
				(state.class_data.selected_challenge_keywords ||
					state.class_data.selected_skills_keywords)
				? true
				: false;
		},
		class_data: state => {
			return state.class_data
		},
		user_data: state => {
			return state.user_data
		}
	},
	mutations: {
		setUser: (state, user_data) => {
			state.user_data = user_data
		},
		setClassData: (state, class_data) => {
			state.class_data = class_data
		},
		setUserType: (state, user_type) => {
			state.user_type = user_type
		}
	},
	actions: {
		getUser: ({ commit }, user) => {
			if (user) {
				const db = firebase.firestore()
				db.collection("Users")
					.doc(user.uid).get().then(doc => {
						commit('setUser', doc.data())
						var user_data = doc.data();
						console.log(user_data)
						var class_type = user_data.isEmployer
							? "employers"
							: user_data.isTeacher
								? "teachers"
								: "students";
						commit('setUserType', class_type)
						db.collection(class_type)
							.doc(user.uid)
							.get()
							.then(doc => {
								console.log(doc)
								commit('setClassData', doc.data())
							});
					})
			}
		}
	}
});
