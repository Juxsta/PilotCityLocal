<template>
    <div class="container-fluid mt-5 mx-auto Raleway">
        <h4 class="font-weight-bold">
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-center">
                <p>My name is</p>
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
                <p>and I am a teacher at</p>
            </div>
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School Name" class="badge-pill pc-button" v-model="school_name">
            </div>
            <div class="p-2 align-self-center">
                <p>of the </p>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center">
            <div class="p-2 align-self-start">
                <input type="text" placeholder="School District Name" class="badge-pill pc-button" v-model="school_district">
            </div>
            <div class="p-2 align-self-center">
                <p>My phone number is</p>
            </div>
            <div class="p-2 align-self-start">
                    <input type="text" placeholder="Mobile Number" class="badge-pill pc-button" v-model="phone">
            </div>
        </div>
        </h4>
    </div>
</template>

<script>
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
    }
}
</script>

<style>
.pc-button {
        font-family: Raleway;
        background-color: #eca0be;
        color: white;
        border-radius: 20px;
        height: 50px;
        width: 270px;
        text-align: center;
        padding: 10px;
        border-color: transparent;
}
.pc-button::placeholder {
    color:white !important;
}
</style>
