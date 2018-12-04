<template>
    <div>
        <div class="d-flex justify-content-center">
            <h1 class="Raleway problem-picker-label">If you had a flock of students to create solutions for you, what problems would you have them solve?</h1>
        </div>
        <flock_tag class=" container d-flex flex-col justify-content-center"
        name="Problems"
        placeholder="Enter keywords that describe problems you want students to solve"
        :keywords='challenge_keywords'
        :selected_keywords='employer_data.selected_challenge_keywords'
        />
        <finish_button
            route='employer-thankyou-modal'
            text='Save and Finish'
            :conditions=conditions
            :collection=collection
        />
        <div>
            <w_employer_tymod/>
        </div>
    </div>
</template>

<script>
import { bus } from '@/main'
import firebase from '@/firebase/init'
import tagging from '@/components/profile_builder/wizard/components/tagging.vue'
import button from '@/components/profile_builder/wizard/components/button'
import w_employer_tymod from '@/components/profile_builder/wizard/employer/w_employer_tymod'
export default {
    name:"w_flock",
    data () {
        return {
            challenge_keywords: ['Identifying Use Cases' , 'Developing Case Studies' , 'Community Engagement' , 
            'Automation' , 'Sales' , 'Training Talent' , 'Implementing Technology' , 'Technology Adoption' , 
            'Partnerships' , 'Public Relations' , 'Social Media Marketing' , 'Entrepreneurial Culture' , 
            'Women Empowerment' , 'Diversity & Inclusion'],
            employer_data:{
                selected_challenge_keywords:[]
            },
            collection:['employers']
        }
    },
    components: {
        flock_tag: tagging,
        finish_button:button,
        w_employer_tymod
    },
    computed: {
        conditions() {
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
        bus.$on('employer_finish',function () {
            $('#employer-thankyou-modal').modal('show')
        })
    }
}
</script>

<style scoped>

.problem-picker-label {
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
    margin-bottom:50px;
    margin-top:50px;
    width:850px;
    text-align: center;
}

</style>
