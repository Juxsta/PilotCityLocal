const getters = {
    match_ready: (rootGetters) => {
        var collection = rootGetters.collection
        return rootGetters.user_data &&
            collection &&
            (collection.selected_challenge_keywords ||
                collection.selected_skills_keywords)
            ? true
            : false;
    }
}

export default {
    getters
}