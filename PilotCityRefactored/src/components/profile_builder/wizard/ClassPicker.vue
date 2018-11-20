<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center">
            <h1 class="Raleway class-picker-label">Who are you?</h1>
        </div>
        <div class="d-flex justify-content-center mt-5">
                <button class="btn button-square class-picker-btn color-pink" @click="pickRole(0)">Teacher</button>
                <button class="btn button-square class-picker-btn color-purple" @click="pickRole(1)">Employer</button>
                <button class="btn button-square class-picker-btn" @click="pickRole(2)">Student</button>
        </div>
    </div>
</template>

<script>
import { bus } from '@/main'
import { Prompter } from '@/main'
import firebase from '@/firebase/init'

export default {
    name:'ClassPicker',
    data () {
        return {
            userdata: {
                Email: "null",
                isEmployer: false,
                isStudent: false,
                isTeacher: false,
            }
        }
    },
    watch: {
        userdata: {
            handler () {
                const db = firebase.firestore();
                let user = firebase.auth().currentUser
                db.collection("Users").doc(user.uid).set(this.userdata).then( () => {
                    console.log(user)
                })
            },
            deep:true
        }
    },
    methods:{
        pickRole: function(role){
            switch(role)
            {
                case 0:
                    this.userdata.isEmployer=false;
                    this.userdata.isStudent=false;
                    this.userdata.isTeacher=true;
                    this.$router.push({name: 'w_story'})
                    break ;
                case 1:
                    this.userdata.isEmployer=true;
                    this.userdata.isStudent=false;
                    this.userdata.isTeacher=false;
                    break ;
                case 2:
                    Prompter().info(" ", "Student to come soon.")
                    return ;
                    bus.$emit('pickedRole', 'student');
                    break ;
            }
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
    font-weight: 700;
    font-size: 30px;
}
.class-picker-btn:active{
    transition: all 0.5s;
    border-color: rgb(222, 223, 224) !important;
    outline: none !important;
}

</style>
