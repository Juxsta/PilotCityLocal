<template>
   <div class="container mt-5 pt-5">
        <form class="mt-5"> 
            <div class="form-group">
                <label for="inputAddress">School Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="123 Sesame Street" v-model="teacher_data.school_address.street" >
            </div>
            <div class="form-row" >
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" placeholder="Dreamland" v-model="teacher_data.school_address.city">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputState">State</label>
                    <input type="text" class="form-control" id="inputState" placeholder="NY" v-model="teacher_data.school_address.state">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="number" class="form-control" id="inputZip" placeholder="12345"  v-model="teacher_data.school_address.zip">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputType">Room #</label>
                    <input type="text" class="form-control" id="inputType" placeholder="101A" v-model="teacher_data.room_number">
                </div>
            </div>
            <div class="form-row">
            </div>
        </form>
        <next_button 
        route='w_teacher_class'
        :conditions="conditions"
        :collection="collection"
        :callback="convert_address_to_coordinate"
        />
        <router-link :to="{ name: 'w_teacher_story' }" 
            class="prev_button btn btn-secondary btn-lg">
            Back
        </router-link>
   </div>
</template>

<script>
import { bus } from '@/main'
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
import button from '@/components/profile_builder/wizard/components/button.vue'
import axios from 'axios'

export default {
    name: "w_teacher_address",
    data(){
        return{
            teacher_data: {
                school_address: {
                    street: null,
                    city: null,
                    state: null,
                    zip: null,
                    },
                room_number: null,
                coordinate: null
            },
            collection: ['teachers']
        }
    },
    methods: {
        convert_address_to_coordinate(){
            var self = this;
            var link = "https://maps.googleapis.com/maps/api/geocode/json?address="
            var address = this.teacher_data.school_address.street
            + this.teacher_data.school_address.city
            + this.teacher_data.school_address.state;
            address = address.split(' ').join('+');
            var key = "&key=AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE"
            
            return (axios.get(link + address + key));
        }
    },
    components: {
        next_button:button
    },
    computed: {
        conditions (){
            return [this.teacher_data]
        }
    },
    created () {
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

<style>
.btn-address-purple{
    border-style: dotted;
    background-color: white;
    border-color: #ae90b0;
    color: #ae90b0;
}

.btn-address-purple:hover, 
.btn-address-purple:active{
    background-color: #ae90b0 !important;
    border-color: #ae90b0  !important;
    color: white;
}
.btn-address-purple:focus{
    outline: none !important;
}
</style>

<style scoped>
label {
    color: #eca0be;
    font-weight: bold;
    font-size:15px;
    margin-left:15px;
}

input, input:focus{
    border-radius: 50px;
    font-size: 18px;
    padding-left:20px;
    font-weight:300;
    font-family: "Raleway";
    background-color: rgb(222, 223, 224);
    color: white;
    outline: none !important;
    height: 50px;
    border-color: #dbdcde;
    box-shadow: none !important;
}
input::placeholder { 
    font-weight:300;
    color: white;
    font-style:italic;

}

 input:focus, select:focus, .dropdown-class:focus{
    border-color: #939597 !important;
 }
</style>
 