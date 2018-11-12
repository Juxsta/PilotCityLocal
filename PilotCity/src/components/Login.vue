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
                    <img src='@/assets/3_Hand.png' alt="Heart Logo" id='Heartlogo' >
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
                        <input type="email" class="form-control form-rounded padding form-active form-active" id="login-input-username" placeholder="Username" v-model="login_input_username">
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
                        <input type="password" class="form-control form-rounded padding form-active" id="login-input-password" placeholder="Password" v-model="login_input_password">
                    </div>
                      <small class="text-danger pl-3" v-if="errormsg">{{errormsg}}</small>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" @click.prevent="login" class="btn btn-primary button-regular pc-blue">Login</button>
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
    name: 'Login',
    data() {
        return{
            login_input_username: "",
            login_input_password: "",
            errormsg: ""
        }
    },
    methods:{
        login: function(){
            var self = this;
            firebase.auth().signInWithEmailAndPassword(this.login_input_username, this.login_input_password).then(()=> {
                self.login_input_username = "";
                self.login_input_password = "";
                $('#login-modal').modal('hide')
            }).catch(err => {
                self.errormsg = err.message; 
            })
        }
    }
}
</script>

<style>

.navbar-btn {
	border-radius: 50px;
	background-color: #404041 !important;
	border: solid 2px #404041 ;
	padding-left : 40px;
	padding-right: 40px;
    margin: auto 20px;
    cursor:pointer !important;
    transition: border 0.5s;
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
