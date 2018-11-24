<template>
   <div class="container p-auto mt-5 pt-5">
        <form class="mt-3" > 
            <div class="form-group-address col-md-10 pl-0 pr-0 justify-content-center">
                <label for="inputAddress">Employer Address</label>
                <input type="text" class="form-control"  placeholder="435 Portage Avenue" v-model="address.street" @keyup.ctrl="skip">
            </div>
            <div class="form-row justify-content-center" >
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control"  placeholder="Palo Alto" v-model="address.city">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputState">State</label>
                    <input type="text" class="form-control"  placeholder="CA" v-model="address.state">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" class="form-control"  placeholder="94577" v-model="address.zip">
                </div>
            </div>
        </form>
   </div>
</template>

<script>

import { bus } from '../../../main'
import { Prompter } from '../../../main'

export default {
    name: "w_address",
    data(){
        return{
            address:
            {
                street: "",
                city: "",
                state: "",
                zip: "",
            }
        }
    },
        created(){
        var self = this;
        bus.$on('grab_data', obj =>{ 
            if (obj.step != 'story_employer_address')
                return ;
            if (self.address.street && self.address.city && self.address.state && self.address.zip ){
                var obj = {};
                obj['employer_address'] = self.address;
                bus.$emit('form_completed', obj);
                bus.$emit('validated'); 
            } else { 
                console.log(self.address)
                Prompter().failed("You're missing a few things","Hey there,");
            }
                
        });
    }
}
</script>

<style scoped>

.form-group-address{
    margin:auto;
    margin-bottom: 20px;
}
.btn-address-purple{
    border-style: dotted;
    background-color: white;
    border-color: #ae90b0;
    color: #ae90b0;
    border-radius:50px;
    height: 50px;
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
    color: #ae90b0;
    font-weight: bold;
    font-size:15px;
    margin-left:15px;
}

input, input:focus{
    border-radius: 50px;
    font-size: 18px;
    padding-left:20px;
    font-weight:300;
    font-style:italic;
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
 
 