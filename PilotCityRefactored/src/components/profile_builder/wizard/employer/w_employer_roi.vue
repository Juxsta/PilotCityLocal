<template>
    <div class="container ">
        <bottom_line_tag class="d-flex flex-col justify-content-center"
            name="What's your return on investment?"
            :keywords='bottom_line_keywords'
            placeholder ="Enter keywords here to describe your bottom line"
            :selected_keywords="employer_data.selected_bottom_line_keywords"
        />
        <strategies_tag class="d-flex flex-col justify-content-center mt-5"
            name="How are you doing it now?"
            :keywords='strategies_keywords'
            placeholder ="Enter keywords here to describe your strategies and initiatives"
            :selected_keywords="employer_data.selected_strategies_keywords"
        />
        <next_button
            route='w_employer_flock'
            :conditions="conditions"
            :collection="collection"
            />
        <router-link :to="{ name: 'w_employer_industry_keywords' }" 
            class="prev_button btn btn-secondary btn-lg">
            Back
        </router-link>
    </div>
</template>

<script>
import button from '@/components/profile_builder/wizard/components/button'
import tagging from '@/components/profile_builder/wizard/components/tagging.vue'
import firebase from '@/firebase/init'
export default {
    name: "w_employer_roi",
    data () {
        return {
            employer_data:{
                selected_bottom_line_keywords: [],    
                selected_strategies_keywords:[]
            },
            bottom_line_keywords: ['Client Aquisition', 'Use Cases', 'Community Building', 'Training Talent', 'Sales', 'Marketing', 'Public Relations', 'Operations', 'Optimization', 'Innovation', 'Automation','Research & Development', 'Talent Generation', 'Citizen Engagement'],
            strategies_keywords: ['Social Media' , 'Recruitment' , 'Conferences' , 'University Partnerships' , 'Advertisement' , 'Collecting Data' , 'Automation' , 'Crowdfunding' , 'Grants' , 'Events' , 'Trial & Error'],
            collection: ['employers'],
        }
    },
    components: {
        next_button:button,
        bottom_line_tag:tagging,
        strategies_tag:tagging,
    },
    computed: {
        conditions(){
            return [this.employer_data]
        }
    },
    created(){
        var self = this
        let data = [self.employer_data]
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                const db = firebase.firestore()
                for(let i = 0;i<self.collection.length;i++)
                db.collection(self.collection[i]).doc(user.uid).get().then((doc) => {
                    let obj = doc.data()
                    for (let field in data[i]) {
                        if(obj.hasOwnProperty(field)) {
                            data[i][field]=obj[field]
                        }    
                    }
                })
            }
        })
    }
}
</script>

<style scoped>

.container {
    margin-top:50px;
}

</style>
