<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center">
            <p class="Raleway">Who are you?</p>
        </div>
        <div class="d-flex justify-content-center">
                <button class="btn button-square class-picker-btn .offset-border" @click>Teacher</button>
                <button class="btn button-square class-picker-btn">Employer</button>
                <button class="btn button-square class-picker-btn">Student</button>
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

.offset-border:active {
    outline:5px solid #dbdcde !important;
    outline-offset: 30px !important;
}
.class-picker-btn {
    margin: auto 20px;
}
</style>
