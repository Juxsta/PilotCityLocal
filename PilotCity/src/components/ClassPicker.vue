<template>

    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center">
            <h1 class="Raleway label-title-gray">Who are you?</h1>
        </div>
        <div class="d-flex justify-content-center mt-5">
                <button class="btn button-square pc-pink" @click="pickRole(0)">Teacher</button>
                <button class="btn button-square pc-purple" @click="pickRole(1)">Employer</button>
                <button class="btn button-square pc-green" @click="pickRole(2)">Student</button>
        </div>
    </div>
</template>

<script>
import { bus } from '../main'
import { Prompter } from '../main'
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
/*                     Prompter().info(" ", "Employer to come soon.")
                    return ; */
                    bus.$emit('pickedRole', 'employer');
                    break ;
                case 2:
                    Prompter().info(" ", "Student to come soon.")
                    return ;
                    bus.$emit('pickedRole', 'student');
                    break ;
            }
        }
    }
}
</script>

<style scoped>
    

/* Move */


.button-square {
    width:250px;
    height:250px;
    border-radius: 50px;
    margin: auto 20px;
    color: white;
    font-size: 30px;
    font-weight: 700;
}

.pc-purple {
    background-color: #ae90b0;
}
.pc-pink {
    background-color: #eca0be;
}
.pc-green {
    background-color: #6eba7f;
}
.pc-blue {
    background-color: #3c9ccc;
}
.pc-orange {
    background-color: #f79960;
}
.pc-yellow {
    background-color: #fdd25a;
}
.pc-red {
    background-color: #ea6763;
}

.label-title-gray {
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
    font-family: "Raleway";
}



/* Don't Move */



</style>
