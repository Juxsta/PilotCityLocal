<template>
    <div class="container-fluid mt-5 mx-auto Raleway">
        <h4 class="font-weight-bold">
            <div>
                <h2 class="story-title">What's your story?</h2>
            </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-center">
                <p class="employer-story">My name is</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="First Name" class="badge-pill pc-button" v-model="first_name" >
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Last Name" class="badge-pill pc-button" v-model="last_name"> 
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center mr-5" >
            <div class="p-2 align-self-center">
                <p class="employer-story">and I am a liaison at</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Organization Name" class="badge-pill pc-button" v-model="company_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="employer-story">and my position is </p>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Position Name" class="badge-pill pc-button" v-model="position_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="employer-story">My phone number is</p>
            </div>
            <div class="p-2 align-self-start">
                    <input type="number" placeholder="Mobile Number" class="badge-pill pc-button" v-model="phone">
            </div>
        </div>
        </h4>
    </div>
</template>

<script>
import { bus } from '../../../main'
import { Prompter } from '../../../main'

export default {
    name:"w_employer_story",
    data() {
        return {
            first_name:null,
            last_name:null,
            company_name:null,
            position_name:null,
            phone:null
        }
    },
    methods:{
      /** delete this skip when in production */
        skip: function(){
            bus.$emit('validated');
        } 
    },
    created(){
        var self = this;
        bus.$on('grab_data', function(obj){
            if (obj.step != 'story_employer')
                return ;
            if (self.first_name && self.last_name && self.company_name && self.position_name && self.phone){
                var obj = {};
                obj['employer_story'] = {
                    first_name: self.first_name,
                    last_name: self.last_name,
                    company_name: self.company_name,
                    position_name: self.position_name,
                    phone: self.phone
                }
                bus.$emit('form_completed', obj);
                bus.$emit('validated');
                return;
            }
            else
                Prompter().failed("You're missing a few things","Hey there,");
        });
    }
}
</script>

<style scoped>
.pc-button {
        font-family: "Raleway";
        font-weight:300;
        font-style: Italic;
        background-color: #ae90b0;
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
    font-weight:300;
    font-size:20px;
    text-align: center;

}

.pc-button::placeholder:focus {
    color:#ae90b0 !important;
    border:transparent;

}
.employer-story{
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
    color:#ae90b0;
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
