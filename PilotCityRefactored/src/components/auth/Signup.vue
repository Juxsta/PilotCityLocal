<template>
    <div>
        <!-- Button trigger modal -->
        <button  type="button" class="btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#signup-modal" id=SignupBtn>
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
                        <div class="input-group-text icon-blue">
                            <i class="material-icons" id="account_circle_signup">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-control form-rounded padding form-active" id="signup-input-username"  placeholder="Email" v-model="signup_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                            <div class="input-group-text icon-blue">
                            <i class="large material-icons" id="lock_signup">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-control form-rounded padding form-active" id="signup-input-password" placeholder="Password" v-model="signup_input_password">
                    </div>
                      <small class="text-danger pl-3" v-if="errorMessage">{{errorMessage}}</small>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="signup" class="btn btn-primary button-regular pc-blue model-btn-signup">Sign-up</button>
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

.navbar-btn {
	border-radius: 50px;
	background-color: #404041 !important;
	border: solid 1px #404041 !important;
	padding-left : 30px !important;
    padding-right: 30px !important;
    transition: border 0.5s;
    margin: auto 5px !important;

}

#SignupBtn {
    border-radius: 100px;
	border: solid 1px #ffffff;
    font-size: 15px;
    background-color: #404041;
    font-family: "Raleway";
    font-weight: 700;
    cursor:pointer !important;
    transition: border 0.5s;
    padding-left : 40px;
	padding-right: 40px;
    margin-left:10px;
    margin-right:50px;
    text-align: center;
    letter-spacing: .5px;
}

#SignupBtn:hover {
	background-color: #939597;
    
}

.navbar-btn:hover{
    transition: border 1s;
	background: #939597 !important;
}
#btn-login .active {
    transition: border 0.5s;
}
#btn-login  .active:hover {
  transition: border 1s;
	border: solid 1px #ffffff !important;
}
#btn-login:focus, #btn-signup:focus{
    outline: none;
}

.modal-content  {
    -webkit-border-radius: 30px !important;
    -moz-border-radius: 30px !important;
    border-radius: 30px !important; 
}

#Handlogo{
    padding: 20px;
    height: 100px;
    width: 120px;
    margin-top:15px;
}
.form-rounded {
    border-radius: 50px;
    background-color: #414042 !important;
    color: #ffffff;

}
.form-active:focus-within {
    color: #000000 !important;
}

.icon-blue{
    background-color: #3c9ccc;
}

#account_circle_signup {
    color:white;
}

#lock_signup {
    color:white;
}


.form-margin {
    margin: 2px 0 2px 0;
}
.button-regular {
    width:150px;
    border-radius: 50px;
    font-size: 18px;
    font-family: 'Raleway';
    color: white;
    text-align: center;
    margin:15px;
}

.pc-blue {
    background-color:#3C93CD;
}

.pc-light-gray{
    background-color: #58595b;
}
#btn-login{
	cursor:pointer !important;
}

#login-modal{
    transition: all 0.7s;
}

.form-active:focus{
    background-color:#414042;

}
.form-active{
    color: #939598 !important;
}

.form-active:focus{
    color: #939598 !important;
}

.model-btn-signup{
    height: 45px !important;
    width: 175px !important;
    border-color: #3c9ccc;
    background-color: #3c9ccc !important;
    margin-bottom:25px !important;
    margin-top:20px !important;
}
.model-btn-signup:hover, .model-btn-signup:focus{
    background-color: #3c9ccc;
    border-color: white;
}

#signup-input-username{
    font-weight: 500;
}

#signup-input-password{
    font-weight: 500;
}

</style>

