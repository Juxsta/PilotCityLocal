<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center">
            <p class="Raleway">Who are you?</p>
        </div>
        <div class="d-flex justify-content-center mt-5">
                <button class="btn button-square class-picker-btn color-pink" @click="pickRole(0)">Teacher</button>
                <button class="btn button-square class-picker-btn color-purple" @click="pickRole(1)">Employer</button>
                <button class="btn button-square class-picker-btn" @click="pickRole(2)">Student</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'Classpicker',
    data() {
        return {

        }
    },

}
</script>

<style>
.button-regular {
    background-color:#6eba7f;
    width:250px;
    height:96px;
    border-radius: 50px;
    margin: auto 20px;
}

.button-square {
    background-color:#6eba7f;
    width:250px;
    height:250px;
    border-radius: 50px;
}

.class-picker-btn {
    margin: auto 20px;
}
.class-picker-btn:active{
    outline-color: rgb(222, 223, 224) !important;
}
</style>
