<template>
    <div>
        <!-- Button trigger modal -->
        <button  type="button" class="btn navbar-btn btn-primary btn-lg active Raleway float-right active" data-toggle="modal" data-target="#signup-modal">
        Signup
        </button>

        <!-- Modal -->
        <div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content pc-light-gray">
            <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src='@/assets/2_Heart.png' alt="Heart Logo" id='Heartlogo' >
                </div>
                <form>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Username</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                        <div class="input-group-text icon-gray">
                            <i class="material-icons">account_circle</i>
                        </div>
                        </div>
                        <input type="email" class="form-control form-rounded padding form-active form-active" id="signup-input-username"  placeholder="Username" v-model="signup_input_username">
                    </div>
                </div>
                <div class="col-auto form-margin">
                    <label class="sr-only" for="inlineFormInputGroup">Password</label>
                    <div class="input-group mb-2 padding">
                        <div class="input-group-prepend">
                            <div class="input-group-text icon-gray">
                            <i class="large material-icons">lock</i>
                            </div>
                        </div>
                        <input type="password" class="form-control form-rounded padding form-active" id="signup-input-password" placeholder="Password" v-model="signup_input_password">
                    </div>
                      <small class="text-danger pl-3" v-if="errorMessage">{{errorMessage}}</small>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="signup" class="btn btn-primary button-regular pc-blue">Signup</button>
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
                    $('#signup-modal').modal('hide')
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
	border: solid 2px #404041 !important;
	padding-left : 40px;
    padding-right: 40px;
    transition: border 0.5s;
    margin: auto 20px;
}

.navbar-btn:hover{
    transition: border 1s;
	border: solid 2px #ffffff !important;
}
#btn-login .active {
    transition: border 0.5s;
}
#btn-login  .active:hover {
  transition: border 1s;
	border: solid 2px #ffffff !important;
}
#btn-login:focus, #btn-signup:focus{
    outline: none;
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
}
.padding{
    padding: 15px;
}
.form-rounded {
    border-radius: 50px;
    background-color: #414042;
    color: #ffffff !important;

}
.form-active:focus-within {
    color: #000000 !important;
}
.icon-gray{
    background-color: #939598;
}

.form-margin {
    margin: 2px 0 2px 0;
}
.button-regular {
    width:200px;
    border-radius: 50px;
    font-size: 20px;
    font-family: Raleway;
    color: white;
    text-align: center;
    margin:15px auto;
}
.pc-blue {
    background-color:#3C93CD;
}

.pc-light-gray{
    background-color: #58595b
}
#btn-login{
	cursor:pointer !important;
}

#login-modal{
    transition: all 0.7s;
}

.form-active:focus{
    background-color:#414042;
    caret-color:#939598;

}
.form-active{
    color: #939598 !important;
}

.form-active:focus{
    color: #939598 !important;
}
</style>

