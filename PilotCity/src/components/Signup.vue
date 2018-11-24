<template>
    <div>
        <!-- Button trigger modal -->
        <button  type="button" class="btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#signup-modal" id=btn-signup>
        Sign-up
        </button>

        <!-- Modal -->
        <div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/3_Hand.png' alt="Hand Logo" id='logo-hand' >
                </div>
                <form>
                <div class="col-auto form-margin">

                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div class="input-group-text icon-blue">
                            <i class="material-icons" id="icon_username">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-control form-rounded padding form-active-credentials" placeholder="Email" v-model="signup_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                            <div class="input-group-text icon-blue">
                            <i class="large material-icons" id="icon_password">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-control form-rounded padding form-active-credentials" placeholder="Password" v-model="signup_input_password">
                    </div>
                      <small class="text-danger pl-3" v-if="errorMessage">{{errorMessage}}</small>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="signup" class="btn-modal-signup">Sign-up</button>
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
import { bus } from '../main'
import { Prompter } from '../main'

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
                    bus.$emit('userSignedIn', user);
                    $('#signup-modal').modal('hide');
                    firebase.auth().currentUser.sendEmailVerification().then(function() {
                        Prompter().success('____', 'Email sent');
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

