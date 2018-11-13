<template>
   <div class="container ">
        <form class="mt-3" v-for="address in addresses" :key="address.id"> 
            <div class="form-group">
                <label for="inputAddress">Employer Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="435 Portage Ave," v-model="address.street">
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
                    <input type="text" class="form-control" id="inputZip">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputType">Type</label>
                    <input type="text" class="form-control" id="inputType" placeholder="Primary/HQ" v-model="address.type">
                </div>
            </div>
        </form>
        <span>
            <button type ="button" class="btn btn-primary btn-block btn-address-purple" @click="addAddress">
                <i class="material-icons">add</i>
            </button>
        </span>
   </div>
</template>

<script>
/*
   address: {
                street: null,
                city: null,
                state: null,
                zip: null,
                type: null,
                arr: [0],
            },
*/
export default {
    name: "w-address",
    data(){
        return{
            addresses:[
            {
                id: 0,
                street: "",
                city: "",
                state: "",
                zip: "",
                type: "",
            }]
        }
    },
    methods:{
        addAddress: function(){
            this.addresses.push({});
        }
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
 