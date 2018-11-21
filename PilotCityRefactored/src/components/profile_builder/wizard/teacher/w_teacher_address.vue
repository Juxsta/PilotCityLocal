<template>
   <div class="container mt-5 pt-5">
        <form class="mt-5"> 
            <div class="form-group">
                <label for="inputAddress">School Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="2250 Bancroft Avenue" v-model="data.school_address.street" >
            </div>
            <div class="form-row" >
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" placeholder="San Leandro" v-model="data.school_address.city">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputState">State</label>
                    <input type="text" class="form-control" id="inputState" placeholder="CA" v-model="data.school_address.state">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="number" class="form-control" id="inputZip" placeholder="94577"  v-model="data.school_address.zip">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputType">Room #</label>
                    <input type="text" class="form-control" id="inputType" placeholder="101A" v-model="data.room_number">
                </div>
            </div>
            <div class="form-row">
            </div>
        </form>
        <next_button 
            route='w_teacher_class'
            :conditions="data"
            collection="teachers"
            />
   </div>
</template>

<script>
import { bus } from '@/main'
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
import button from '@/components/profile_builder/wizard/components/button.vue'

export default {
    name: "w_teacher_address",
    data(){
        return{
            data: {
                school_address: {
                    street: null,
                    city: null,
                    state: null,
                    zip: null,
                    },
                room_number: null,
            }
        }
    },
    components: {
        next_button:button
    },
    created () {
        let data = {
                school_address: {
                    street: null,
                    city: null,
                    state: null,
                    zip: null,
                    },
                room_number: null,
            }
        let user = firebase.auth().currentUser
        const db = firebase.firestore()
        db.collection("teachers").doc(user.uid).get().then((doc) => {
            let obj = doc.data()
            if (Object.keys(data).every((field) => {
                return obj.hasOwnProperty(field)
            })){
                this.data=obj
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
    border-color: #c6c8ca !important;
 }
</style>
 