<template>
    <div class="container-fluid mt-5 mx-auto Raleway main_div">
        <h4 class="font-weight-bold">
            <div>
                <h2 class="story-title">What's your story?</h2>
            </div>
        <div class="d-flex flex-row justify-content-left mr-5">
            <div class="p-2 align-self-center">
                <p class="teacher-story">My name is</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="First Name" class="badge-pill pc-button" v-model="user_data.first_name" >
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Last Name" class="badge-pill pc-button" v-model="user_data.last_name"> 
            </div>
            <p class="teacher-story"> and I am a student at </p>
        </div>
        <div class="d-flex flex-row justify-content-left mr-5" >
            <div class="p-2 align-self-center">
            
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School Name" class="badge-pill pc-button" v-model="student_data.school_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="teacher-story">of the </p>
            </div>
            <input type="text" placeholder="School District" class="badge-pill pc-button" v-model="student_data.school_district">
                <p class="teacher-story"> school district. My grade is </p>
            
        </div>
        <div class="d-flex flex-row justify-content-left">
           <div class="p-2 align-self-center">
            
            </div>
            <div class="p-2 align-self-start">
                    <input type="text" placeholder="Grade Level" class="badge-pill pc-button"   v-model="student_data.grade"/>
            </div>
            <div class="p-2 align-self-center">
                <p class="teacher-story"> and my phone number is</p>
            </div>
            <div class="p-2 align-self-start">
                    <the-mask class="badge-pill pc-button" :mask="['(###) ###-####']"  v-model="user_data.phone" placeholder="(555) 555-5555"/>
            </div>
        </div>
        </h4>

        <next_button 
            route='w_student_demographic'
            :conditions="conditions"
            :collection="collection"
            />
    </div>
</template>

<script>

import { Prompter } from '@/main'
import button from '@/components/profile_builder/wizard/components/button.vue'
import firebase from '@/firebase/init'
import { TheMask } from 'vue-the-mask'

export default {
    name:"w_student_story",
    data(){
        return{
            user_data: {
                first_name:null,
                last_name:null,
                phone:null,
                email:null,
            },
            student_data: {
                school_name:null,
                school_district:null,
                grade:null,
            },
            collection:['students', 'Users'],
        }
    },
    components: {
        next_button:button,
        TheMask
    },
    computed: {
        conditions() {
            return [this.student_data, this.user_data]
        }
    },
    
    created() {
         var self = this
        //create an array reference to user and teacher data
        let data = [self.student_data,self.user_data]
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                const db = firebase.firestore()
                for(let i = 0;i<self.collection.length;i++){
                    db.collection(self.collection[i]).doc(user.uid).get().then((doc) => {
                        let obj = doc.data()
                        for (let field in data[i]) {
                            if(obj.hasOwnProperty(field)) {
                                data[i][field]=obj[field]
                            }    
                        }
                    })
                }
            }
        })
    }



}
</script>

<style scoped>
.main_div {
  width: 100%;
  padding-left: 100px;
    
}
.pc-button {
    font-family: "Raleway";
    font-weight:300;
    font-style: Italic;
    background-color: #6eba7f;
    color: white;
    border-radius: 50px;
    font-size:20px;
    height: 50px;
    width: 250px;
    text-align: center;
    padding-left: 30px;
    padding-right:30px;
    margin-left:5px;
    margin-right:5px;
    border-color: transparent;
}
.pc-button::placeholder {
    color:white;
    font-weight:500i;
    font-size:20px;
    text-align: center;

}

.pc-button::placeholder:focus {
    color:#6eba7f !important;

}
.student-story{
    font-family: "Raleway";
    font-style:Italic;
    font-size: 25px;
    color: #dbdcde;
    margin-top:10px;
}

.story-title {
    text-align: center;
    font-family: "Raleway";
    font-style: Italic;
    font-weight:700;
    font-size:30px;
    color:#6eba7f;
    margin-bottom:50px;
    margin-top:70px;
}

input:focus{
    outline: none !important;
}

.badge-pill {
    text-transform: capitalize;
}
p{
    font-family: "Raleway";
    font-style: Italic;
    font-weight:300;
    font-size:30px;
    
}


</style>