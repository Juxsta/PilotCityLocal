<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center">
            <h1 class="Raleway class-picker-label">Who are you?</h1>
        </div>
        <div class="d-flex justify-content-center mt-5">
                <button class="btn button-square class-picker-btn .offset-border color-pink" @click="pickRole(0)">Teacher</button>
                <button class="btn button-square class-picker-btn color-purple" @click="pickRole(1)">Employer</button>
                <button class="btn button-square class-picker-btn" @click="pickRole(2)">Student</button>
        </div>
    </div>
</template>

<script>
import { bus } from '../main'
export default {
    name:'ClassPicker',
    methods:{
        pickRole: function(role){
            switch(role)
            {
                case 0:
                    bus.$emit('pickedRole', 'teacher');
                    break ;
                case 1:
                    bus.$emit('pickedRole', 'employer');
                    break ;
                case 2:
                    bus.$emit('pickedRole', 'student');
                    break ;
            }
        }
    }
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
    color: white;
    font-size: 30px;
    font-weight: 700;
}

.color-pink{
    background-color: rgb(226, 165, 190);
}

.color-purple{
    background-color: rgb(169, 145, 174);
}

.class-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 800;
}
</style>
