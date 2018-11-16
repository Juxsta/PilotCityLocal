<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" id="btn-login" class="navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#login-modal">
        Login
        </button>

        <!-- Modal -->
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" >
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/2_Heart.png' alt="Heart Logo" id='Heartlogo' >
                </div>
                <form>
                <div class="col-auto form-margin">
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div class="input-group-text icon-green">
                            <i class="material-icons" id="account_circle_login">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-control form-rounded padding form-active form-active" id="login-input-username" placeholder="Email" v-model="login_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group padding">
                        <div class="input-group-prepend">
                            <div class="input-group-text icon-green">
                            <i class="large material-icons" id="lock_login">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-control form-rounded padding form-active" id="login-input-password" placeholder="Password" v-model="login_input_password">
                    </div>
                    <div>
                        <i class="far fa-dizzy mr-auto" style="cursor:pointer" @click="forgotPassword"></i>
                    </div>

                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="login" class="btn btn-primary button-regular pc-green model-btn-login">Login</button>    
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
@import url('https://fonts.googleapis.com/css?family=Raleway');
.Raleway {
	font-family: 'Raleway';
	font-weight:800;
}

.navbar-btn {
	border-radius: 100px;
	background-color: #404041 !important;
	border: solid 1px #404041;
    font-size: 15px;
    font-family: "Raleway";
    font-weight: 700;
    cursor:pointer !important;
    transition: border 0.5s;
    margin: auto 20px;
    text-align: center;
}

.modal-content  {
    -webkit-border-radius: 30px !important;
    -moz-border-radius: 30px !important;
    border-radius: 30px !important; 
}
#Heartlogo{
    padding-bottom: 20px;
    height: 100px;
    width: 80px;
    margin-top:25px;
}
.padding{
    padding: 15px;
}
.form-rounded {
    border-radius: 50px;
    background-color: #414042;
    color: #ffffff !important;
    border-color:#939597;

}
.form-active:focus-within {
    color: #000000 !important;
}
.icon-blue{
    background-color: #3c9ccc;
}

.icon-green{
    background-color: #6eba7f;
}

#account_circle_login {
    color:white;
}

#lock_login {
    color:white;
}

.form-margin {
    margin: 2px 0 2px 0;
}
.button-regular {
    width:300px;
    font-weight:700;
    border-radius: 50px;
    font-size: 20px;
    font-family: 'Raleway';
    color: white;
    text-align: center;
    margin:15px;
}

.pc-green {
    background-color: #6eba7f;
    color: white;
}
.pc-light-gray{
    background-color: rgba(65, 64, 66, .95) !important;
}

#login-modal{
    transition: all 0.7s;
}

.form-active:focus{
    background-color:#414042;
}
.form-active{
    padding: 10px !important;
    font-size: 15px;
    font-weight:300;
    font-family: 'Raleway';
    color: #939598 !important;
}

.form-active:focus{
    color: #939598 !important;
}

.input-group-text {
    border-radius:50px;
    border-color:#939597;

}
#btn-login {
    width: 138px;
    background-color: #4d4d4f !important;

}

#btn-login:hover{
    background-color: #939597 !important;
}

.model-btn-login{
    height: 45px !important;
    width: 175px !important;
    border-color: #6eba7f;
    background-color: #6eba7f !important;
    margin-bottom:25px !important;
    margin-top:20px !important;
}
.model-btn-login:hover, .model-btn-login:focus{
    background-color: #6eba7f !important;
    border-color: white !important;
}

.fa-dizzy {
    color:#939597;
    font-size: 15px;
    text-align: center;
    margin-top:0px;
    padding-left: 375px;
    padding-right:100px;
}

.text-danger {
    font-family:raleway;

}

.text-success {
    font-family:raleway; 
}

#login-input-username{
    font-weight: 500;

}

#login-input-password{
    font-weight: 500;
}


</style>
