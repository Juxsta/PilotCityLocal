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
            <div class="p-2 align-self-center">
                <input type="text" placeholder="First Name" class="badge-pill pc-button" v-model="first_name">
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Last Name" class="badge-pill pc-button" v-model="last_name"> 
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center mr-5" >
            <div class="p-2 align-self-center">
                <p class="teacher-story">and I am a teacher at</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School Name" class="badge-pill pc-button" v-model="school_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="teacher-story">of the </p>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School District" class="badge-pill pc-button" v-model="school_district">
            </div>
            <div class="p-2 align-self-center">
                <p class="teacher-story">My phone number is</p>
            </div>
            <div class="p-2 align-self-start">
                    <input type="text" placeholder="Mobile Number" class="badge-pill pc-button" v-model="phone">
            </div>
        </div>
        </h4>
    </div>
</template>

<script>
import { bus } from '../../../main'
export default {
    name:"w_story",
    data() {
        return {
            first_name:null,
            last_name:null,
            school_name:null,
            school_district:null,
            phone:null
        }
    },
    method:{
        emitStory: function(){
            var obj = {};
            obj['teacher_story'] = {
                first_name: this.first_name,
                last_name: this.last_name,
                school_name: this.school_name,
                school_district: this.school_district,
                phone: this.phone
            }
            bus.$emit('story_finished', obj);
        }
    },
    created(){
        bus.$on('grab_story_teacher', function(){
            
        });
    }
}
</script>

<style>
.pc-button {
        font-family: "Raleway";
        font-weight:100;
        font-style: Italic;
        background-color: #eca0be;
        color: white;
        border-radius: 50px;
        font-size:25px;
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
    color:white !important;
}
.teacher-story{
    font-family: "Raleway";
    font-size: 25px;
    color: #c6c8ca;
    margin-top:10px;
}

.story-title {
    text-align: center;
    font-family: "Raleway-ExtraBold";
    font-style: Italic;
    font-weight:800;
    font-size:30px;
    color:#eca0be;
    margin-bottom:50px;
    margin-top:70px;
}

input:focus{
    outline: none !important;
}
</style>
