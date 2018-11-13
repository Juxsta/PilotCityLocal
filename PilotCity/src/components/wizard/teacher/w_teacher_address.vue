<template>
   <div class="container mt-5 pt-5">
        <form class="mt-5"> 
            <div class="form-group">
                <label for="inputAddress">School Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="435 Portage Ave" v-model="address.street"  @keyup.enter="skip">
            </div>
            <div class="form-row" >
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" placeholder="Palo Alto" v-model="address.city">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputState">State</label>
                    <input type="text" class="form-control" id="inputState" placeholder="CA" v-model="address.state">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" class="form-control" id="inputZip" placeholder="55555"  v-model="address.zip">
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
        emitAddress: function(){
            var obj = {};
            obj['teacher_address'] = this.address;
            bus.$emit('teacher_address_finished', obj);
            bus.$emit('validated'); 
        }, /** delete this skip when in production */
        skip: function(){
            bus.$emit('validated');
        } 
    },
    created(){
        var self = this;
        bus.$on('grab_story_teacher_address', ()=>{
            if (self.address.street && self.address.city && self.address.state && self.address.zip && self.address.room )
                self.emitAddress();
            else
                Prompter().failed("missing field(s)!");
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
 