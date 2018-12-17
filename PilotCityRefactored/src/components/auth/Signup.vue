<template>
    <div>
        <!-- Button trigger modal -->
        <button  type="button" id="navbar_signup_button" data-toggle="modal" data-target="#signup-modal" >
        Sign-up
        </button>

        <!-- Modal -->
        <div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/images/3_Hand.png' alt="Hand Logo" id='Handlogo' >
                </div>
                <form>
                <div class="col-auto form-margin">

                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div>
                            <i class="material-icons" id="account_circle_signup">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-active form_active_signup" id="signup-input-username"  placeholder="Enter Email" v-model="signup_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                            <div>
                            <i class="large material-icons" id="lock_signup">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-active form_active_signup" id="signup-input-password" placeholder="Enter Password" v-model="signup_input_password">
                    </div>
                      <small class="text-danger pl-3" v-if="errorMessage">{{errorMessage}}</small>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="signup" class="model-btn-signup">Sign-up</button>
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
import { Prompter } from '@/main'
import "@/assets/SASS/utils/_navbar.scss";

export default {
    name: 'Signup',
    data() {
        return{
            signup_input_username: null,
            signup_input_password: null,
            errorMessage: null
        }
    },
    methods: {
        signup: function(){
            var self = this;
            if (this.signup_input_username && this.signup_input_password){
                firebase.auth().createUserWithEmailAndPassword(self.signup_input_username, self.signup_input_password).then( user => {
                    self.signup_input_username = ""
                    self.signup_input_password = ""
                    $('#signup-modal').modal('hide');
                    firebase.auth().currentUser.sendEmailVerification().then(function() {
                        Prompter().success('____', 'Email sent');
                        firebase.auth().signOut()
                    });
                }).catch(function(error) {
                    self.errorMessage = error.message;
                });
            }
        }
    }
}
</script>
<style>


</style>

