<template>
   <div class="container mt-5 pt-5">
        <form class="mt-5"> 
            <div class="form-group">
                <label for="inputAddress">School Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="2250 Bancroft Avenue" v-model="address.street" >
            </div>
            <div class="form-row" >
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" placeholder="San Leandro" v-model="address.city">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputState">State</label>
                    <input type="text" class="form-control" id="inputState" placeholder="CA" v-model="address.state">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="number" class="form-control" id="inputZip" placeholder="94577"  v-model="address.zip">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputType">Room #</label>
                    <input type="text" class="form-control" id="inputType" placeholder="101A" v-model="address.room">
                </div>
            </div>
            <div class="form-row">
            </div>
        </form>
   </div>
</template>

<script>
import { bus } from '../../../main'
import { Prompter } from '../../../main'

export default {
    name: "w_teacher_address",
    data(){
        return{
            address: {
                street: null,
                city: null,
                state: null,
                zip: null,
                room: null,
            }
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
        bus.$on('grab_data', obj =>{ 
            if (obj.step != 'story_teacher_address')
                return ;
            if (self.address.street && self.address.city && self.address.state && self.address.zip && self.address.room ){
                var obj = {};
                obj['teacher_address'] = self.address;
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
    font-weight:100;
    font-family: "Raleway";
    background-color: rgb(222, 223, 224);
    color: white;
    outline: none !important;
    height: 50px;
    border-color: #dbdcde;
    box-shadow: none !important;
}
input::placeholder { 
    font-weight:100;
    color: white;
    font-style:italic;

}

 input:focus, select:focus, .dropdown-class:focus{
    border-color: #c6c8ca !important;
 }
</style>
 