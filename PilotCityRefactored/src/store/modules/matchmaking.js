const getters = {
    match_ready: state => {
        console.log(state.collection)
        return state.collection
        // return state.user_data &&
        //     state.collection &&
        //     (state.collection.selected_challenge_keywords ||
        //         state.collection.selected_skills_keywords)
        //     ? true
        //     : false;
    }
}

export default {
    getters
}