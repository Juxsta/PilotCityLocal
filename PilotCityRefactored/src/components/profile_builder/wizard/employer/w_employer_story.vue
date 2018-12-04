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
                <input type="text" placeholder="First Name" class="badge-pill pc-button" v-model="user_data.first_name" >
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Last Name" class="badge-pill pc-button" v-model="user_data.last_name"> 
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center mr-5" >
            <div class="p-2 align-self-center">
                <p class="employer-story">and I am a liaison at</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Organization Name" class="badge-pill pc-button" v-model="employer_data.company_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="employer-story">and my position is </p>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-start">
                <input type="text" placeholder="Position Name" class="badge-pill pc-button" v-model="employer_data.position_name">
            </div>
            <div class="p-2 align-self-center">
                <p class="employer-story">My phone number is</p>
            </div>
            <div class="p-2 align-self-start">
                    <the-mask class="badge-pill pc-button" :mask="['(###) ###-####']"  v-model="user_data.phone" placeholder="(555) 555-5555"/>
            </div>
        </div>
        </h4>
        <next_button
            route='w_employer_address'
            :conditions="conditions"
            :collection="collection"
            />
    </div>
</template>

<script>
import { bus } from '@/main'
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
import button from '@/components/profile_builder/wizard/components/button'
import { TheMask } from 'vue-the-mask'
export default {
    name:"w_employer_story",
    data() {
        return {
            user_data: {
                first_name:null,
                last_name:null,
                phone:null
            },
            employer_data: {
                company_name:null,
                position_name:null,
            },
            collection: ['Users','employers']
        }
    },
    components: {
        next_button:button,
        TheMask,
    },
    computed: {
        conditions () {
            return [this.user_data,this.employer_data]
        },
        pass() {
            this.user_data
        }
    },
    created(){
        var self = this
        let data = [self.user_data,self.employer_data]
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
