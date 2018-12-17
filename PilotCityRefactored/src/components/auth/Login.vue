<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" id="navbar_login_button" data-toggle="modal" data-target="#login-modal">
        Login
        </button>

        <!-- Modal -->
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/images/2_Heart.png' alt="Heart Logo" id='Heartlogo' >
                </div>
                <form>
                <div class="col-auto form-margin">
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div>
                            <i class="material-icons" id="account_circle_login">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-active form_active_login" id="login-input-username" placeholder="Enter Email" v-model="login_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group padding">
                        <div class="input-group-prepend">
                            <div>
                            <i class="large material-icons" id="lock_login">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-active form_active_login" id="login-input-password" placeholder="Enter Password" v-model="login_input_password">
                    </div>
                   
                    <div class="forgot_password" style="cursor:pointer" @click="forgotPassword">Forgot Password?</div>

                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="login" class="model-btn-login">Login</button>    
                </div>
                <div class="d-flex justify-content-center">
                        <small class="text-danger ml-auto mr-auto" v-if="errormsg">{{errormsg}}</small>
                        <small class="text-success ml-auto mr-auto" v-if="resetmsg">{{resetmsg}}</small>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/init'
import { bus } from '@/main'
import ClassPickerVue from '../profile_builder/wizard/ClassPicker.vue';
import "@/assets/SASS/utils/_navbar.scss";

export default {
    name: 'Login',
    data() {
        return{
            login_input_username: "",
            login_input_password: "",
            errormsg: "",
            resetmsg:""
        }
    },
    methods:{
        login: function(){
            var testEnv = true
            //var testEnv = false; // delete this when in prodcution env
            var self = this;
            firebase.auth().signInWithEmailAndPassword(this.login_input_username, this.login_input_password).then((cred)=> {
                if (testEnv && firebase.auth().currentUser && !firebase.auth().currentUser.emailVerified){
                    self.errormsg = "You have not verified your email account."
                    bus.$emit("EmailNotVerified");
                    firebase.auth().signOut();
                }
                else {
                    self.login_input_username = "";
                    self.login_input_password = "";
                    $('#login-modal').modal('hide');
                    this.$router.push({name: 'ClassPicker'})
                }

            }).catch(err => {
                self.errormsg = err.message; 
                this.resetmsg=""
            })
        },
        forgotPassword: function() {
            firebase.auth().sendPasswordResetEmail(this.login_input_username).then( () =>
            {
                this.errormsg=""
                this.resetmsg="Password reset email sent."
            }).catch(()=>{
                this.errormsg="Enter your email."
            })
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway');



</style>
