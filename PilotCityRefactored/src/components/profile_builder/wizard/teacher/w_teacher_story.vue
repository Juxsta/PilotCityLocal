<template>
    <div class="container-fluid mt-5 mx-auto Raleway">
        <h4 class="font-weight-bold">
            <div>
                <h2 class="story-title">What's your story?</h2>
            </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-center">
                <p class="teacher-story">My name is</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="First Name" class="badge-pill pc-button" v-model="user_data.first_name" >
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Last Name" class="badge-pill pc-button" v-model="user_data.last_name"> 
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center mr-5" >
            <div class="p-2 align-self-center">
                <p class="teacher-story">and I am a teacher at</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School Name" class="badge-pill pc-button" v-model="teacher_data.school_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="teacher-story">of the </p>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School District" class="badge-pill pc-button" v-model="teacher_data.school_district">
            </div>
            <div class="p-2 align-self-center">
                <p class="teacher-story">My phone number is</p>
            </div>
            <div class="p-2 align-self-start">
                    <input type="number" placeholder="Mobile Number" class="badge-pill pc-button" v-model="user_data.phone">
            </div>
        </div>
        </h4>
        <next_button 
            route='w_teacher_address'
            :conditions="conditions"
            :collection="collection"
            />

    </div>
</template>

<script>

import { Prompter } from '@/main'
import button from '@/components/profile_builder/wizard/components/button.vue'
import firebase from '@/firebase/init'
export default {
    name:"w_teacher_story",
    data() {
        return {
            user_data: {
                first_name:null,
                last_name: null,
                phone: null
            },
            teacher_data: {
                school_name:null,
                school_district:null
            },
            collection:['teachers','Users']
        }
    },
    components: {
        next_button:button
    },
    computed: {
        conditions() {
            return [this.teacher_data, this.user_data]
        }
    },
    created () {
        var self = this
        //create an array reference to user and teacher data
        let data = [self.teacher_data,self.user_data]
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

<style>
.pc-button {
        font-family: "Raleway";
        font-weight:300;
        font-style: Italic;
        background-color: #eca0be;
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
    color:#eca0be !important;

}
.teacher-story{
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
    color:#eca0be;
    margin-bottom:50px;
    margin-top:70px;
}

input:focus{
    outline: none !important;
}

.badge-pill {
    text-transform: capitalize;
}

</style>
