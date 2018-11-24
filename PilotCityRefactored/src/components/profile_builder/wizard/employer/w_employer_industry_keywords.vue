<template>
    <div class="container">
        <div class="container d-flex flex-col justify-content-center">
            <industry_tag
            name="Industry"
            :keywords="industry_keywords"
            placeholder ="Enter keywords here to describe your industry"
            :selected_keywords="employer_data.keywords"
            ></industry_tag>
        </div>
         <next_button
            route='w_employer_picker'
            :conditions="conditions"
            :collection="collection"
            />
    </div>
</template>

<script>

import { bus } from '@/main'
import { Prompter } from '@/main'
import tagging from '@/components/profile_builder/wizard/components/tagging.vue'
import button from '@/components/profile_builder/wizard/components/button'
import firebase from '@/firebase/init'

export default {
    name: "w_employers_industry_keywords",
    data () {
        return {
            employer_data: {
                keywords:[]
            },
            industry_keywords: [
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
            collection: ['employers']
        }
    },

    components:{
        industry_tag: tagging,
         next_button:button
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
