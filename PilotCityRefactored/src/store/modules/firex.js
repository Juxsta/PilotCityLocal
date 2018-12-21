import firebase from '@/firebase/init'
const state = {
    user_data: null,
    collection: null,
    role: null,
    user:null,
};

const getters = {
    collection: state => {
        // console.log(state.collection)
        return state.collection
    },
    user_data: state => {
        return state.user_data
    }
};

const mutations =  {
    setUser: (state, user_data) => {
        state.user_data = user_data
    },
    setClassData: (state, collection) => {
        state.collection = collection
    },
    setUserType: (state, role) => {
        state.role = role
    }
}

const actions = {
    getUser: ({ commit }, user) => {
        if (user) {
            const db = firebase.firestore()
            db.collection("Users")
                .doc(user.uid).get().then(doc => {
                    commit('setUser', doc.data())
                    var user_data = doc.data();
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
                            commit('setClassData', doc.data())
                        });
                })
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}