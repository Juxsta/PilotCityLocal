<template>
   <div class="container mt-5 pt-5">
        <form class="mt-3" v-for="address in addresses" :key="address.id"> 
            <div class="form-group">
                <label for="inputAddress">Employer Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="435 Portage Avenue" v-model="address.street" @keyup.ctrl="skip">
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
                    <input type="text" class="form-control" id="inputZip" placeholder="94577">
                </div>
                <div class="form-group col-md-2">
                    <label for="inputType">Type</label>
                    <input type="text" class="form-control" id="inputType" placeholder="Primary/HQ" v-model="address.type">
                </div>
            </div>
        </form>
   </div>
</template>

<script>

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
 
 