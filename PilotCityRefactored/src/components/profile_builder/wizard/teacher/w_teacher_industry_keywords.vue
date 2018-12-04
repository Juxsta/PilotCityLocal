<template>
    <div class="mt-5 d-flex justify-content-center">
        <industry_tagging
            name ="Industries"
            placeholder="What industries would your classrooms be excited about?"
            :keywords="industry_keywords"
            :selected_keywords="teacher_data.selected_industry_keywords"
        />
        <next_button
            route='w_teacher_skills_keywords'
            :conditions=conditions
            :collection=collection
        />
        <router-link :to="{ name: 'w_teacher_class_schedule' }" 
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
export default {
    name: "w_teacher_industry_keywords",
    data () {
        return {
            industry_keywords: [
                'Trades','Heathcare','Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
            teacher_data: {
                selected_industry_keywords:[]
            },
            collection:["teachers"]
        }
    },
    components: {
        industry_tagging:tagging,
        next_button:button
    },
    methods:{

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
    }
}
</script>
<style scoped>
.pc-tag {
    margin: 5px;
    font-size: 12px;
    padding-right:20px;
    padding-left:0px;

}
.tag-capitalize {
    text-transform: capitalize;
}
.icon-clear {
    font-size:15px;
    color:white;
    padding: 5px;
    font-weight:300;
}

.icon-add {
    font-size:15px;
    padding:5px;
    color:white;
}

.Raleway {
    font-weight:700;
    letter-spacing: 1px;

}

.pc-panel-tagspanel {
    border: dashed 1px #dbdcde;
    border-radius:50px;
    width: 1000px;
    padding-top:20px;
    padding-bottom:20px;
}

.pc-keyword-title {
    font-family: Raleway;
    font-size:20px;
    font-weight: 700;
    color:#939597;
    padding-top:9px;
    margin-left:30px;
    width:100px;
}

.pc-input-box {
    border:solid 0px #ffffff;
    font-family: "Raleway";
    color:#dbdcde;
    font-style: italic;
    font-size:20px;
    padding-left:30px;
    width:850px;
}

.pc-input-box::placeholder{
    color:#dbdcde;
    font-weight:300;
}

.frame-line-break {
    border-style: dashed;
}

.pc-purple {
    background-color: #ae90b0;
}
.pc-pink {
    background-color: #eca0be;
}
.pc-green {
    background-color: #6eba7f
}
.pc-blue {
    background-color: #3c9ccc
}
.pc-orange {
    background-color: #f79960
}
.pc-yellow {
    background-color: #fdd25a
}
.pc-red {
    background-color: #ea6763
}

</style>
