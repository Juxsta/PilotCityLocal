<template>
   <div class="mt-5 d-flex justify-content-center">
       <skills_tagging
            name="Skills"
            placeholder="What tools, technologies, and skills are you currently teaching?"
            :keywords="skill_keywords"
            :selected_keywords="teacher_data.selected_skills_keywords"
       />
       <finish_button
            route='teacher-thankyou-modal'
            text="Save and Finish"
            :conditions=conditions
            :collection=collection
        />
        <div>
            <w_tymod/>
        </div>
        <router-link :to="{ name: 'w_teacher_industry_keywords' }" 
            class="prev_button btn btn-secondary btn-lg" tag='prev_button'>
            Back
        </router-link>
   </div>
</template>

<script>

import { bus } from '@/main'
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
import tagging from '@/components/profile_builder/wizard/components/tagging.vue'
import button from '@/components/profile_builder/wizard/components/button'
import w_tymod from '@/components/profile_builder/wizard/teacher/w_tymod'
export default {
    name: "w_teacher_skills_keywords",
    data () {
        return {
            skill_keywords: [
                '3D Printing','Electronics','Virtual Reality','Robotics','Mixed Reality','Space','Autonomous Technology','Drones','Cloud Networking','Warehousing','Metal Fabrication','Game Design','Vinyl Cutting','Energy Management','Data Software','Sensors','Internet of Things','Economic Development'
                ],
            teacher_data: {
                selected_skills_keywords:[]
            },
            collection: ["teachers"]
        }
    },
    components: {
        skills_tagging:tagging,
        finish_button:button,
        w_tymod
    },
    computed: {
        conditions () {
            return [this.teacher_data]
        }
    },
    created(){
            var self = this
            let data = [self.teacher_data]
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
        bus.$on('teacher_finish',function () {
            $('#teacher-thankyou-modal').modal('show')
        })
    }
}
</script>