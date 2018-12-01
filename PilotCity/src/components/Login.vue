<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" id="btn-login" class="btn-navbar btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#login-modal">
        Login
        </button>

        <!-- Modal -->
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/2_Heart.png' alt="Heart Logo" id='logo-heart' >
                </div>
                <form>
                <div class="col-auto form-margin">
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div class="input-group-text icon-green">
                            <i class="material-icons" id="icon_username">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-control form-rounded padding form-active-credentials" placeholder="Email" v-model="login_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group padding">
                        <div class="input-group-prepend">
                            <div class="input-group-text icon-green">
                            <i class="large material-icons" id="icon_password">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-control form-rounded padding form-active-credentials" placeholder="Password" v-model="login_input_password">
                    </div>
                    <div>
                        <i class="far fa-dizzy mr-auto" style="cursor:pointer" @click="forgotPassword"></i>
                    </div>

                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="login" class="btn-modal-login">Login</button>    
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
import { bus } from '../main'

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
            var self = this;
            firebase.auth().signInWithEmailAndPassword(this.login_input_username, this.login_input_password).then((user)=> {
                if (firebase.auth().currentUser && !firebase.auth().currentUser.emailVerified){
                    self.errormsg = "You have not verified your email account."
                    firebase.auth().signOut()
                    return ;
                }
                self.login_input_username = "";
                self.login_input_password = "";
                bus.$emit('userSignedIn', user);
                $('#login-modal').modal('hide');
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

</style>
