<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light Raleway">
  			<router-link to="/">
				<img id="logo-pilotcity" src="@/assets/pilotCitylogo.png" alt="Pilot City Logo">
		  	</router-link> 
			<div class="btn-group ml-auto" role="group">
				<Login id="component-login" />
				<Signup id="component-signup" />
				<Logout id="component-logout" />
			</div>
	</nav>
</div>
</template>

<script>
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import firebase from '@/firebase/init'

export default {
  name: 'Navbar',
  components: {
	  Signup,
		Login,
		Logout 
  },
  data () {
    return {
		authUser: null,
    }
  },
  methods: {

	},
	created(){
		var self = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.authUser = user;
				if (firebase.auth().currentUser && firebase.auth().currentUser.emailVerified){
					$("#component-login").hide();
					$("#component-signup").hide();
					$("#component-logout").show();
					self.$router.push('/demo');
				}
			} else {
				$("#component-login").show();
				$("#component-signup").show();
				$("#component-logout").hide();
			}
		});
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

@import url('https://fonts.googleapis.com/css?family=Raleway');

#logo-pilotcity{
	cursor: pointer;
	height: 50px;
	margin-left:35px;
}

.navbar {
    background-color: #404041 !important;
}

#component-logout{
    background-color:transparent;
	border: transparent;
	border: solid 1px #ffffff !important;
}

#component-logout:hover{
    transition: border 0.1s;
	border: solid 1px #ffffff !important;
    background-color:#939597 !important;
}

#component-logout:focus{
	outline: none;
}

.btn-navbar {
	background-color: #404041;
	border: solid 1px #404041 !important;
    font-size: 15px;
    font-family: "Raleway";
    font-weight: 700;
    cursor:pointer;
    transition: border 0.5s;
    text-align: center;
    border-radius: 50px;
	padding-left : 30px;
    padding-right: 30px;
    margin: auto 5px;
}

.btn-navbar:hover{
    transition: border 1s;
	background: #939597;
}

#logo-heart{
    padding-bottom: 20px;
    height: 100px;
    width: 80px;
    margin-top:25px;
}

#logo-hand{
    padding: 20px;
    height: 100px;
    width: 120px;
    margin-top:15px;
}

.input-group-text {
    border-radius:50px;
    border: solid 1px #939597;
    padding: 10px 10px 10px 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    height:50px;

}

.form-active-credentials{
    font-size: 15px;
    font-weight:500;
    font-family: 'Raleway';
    border-radius: 50px;
    background-color: #414042;
    border: solid 1px #939597;
    padding: 10px 10px 10px 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    height:50px;
    color: #939598;
}

.form-active-credentials:focus{
    background-color:#414042;
    color: #ffffff;
    font-weight: 500;
}


.icon-blue{
    background-color: #3c9ccc;
}

.icon-green{
    background-color: #6eba7f;
}

#icon_username {
    color:white;
    padding-left: 4px;
}

#icon_password {
    color:white;
    padding-left: 4px;
}

.btn-modal-login{
    height: 45px;
    width: 175px;
    border-color: #6eba7f;
    background-color: #6eba7f;
    margin-bottom:25px;
    margin-top:20px;
    font-weight:700;
    border-radius: 50px;
    font-size: 18px;
    font-family: 'Raleway';
    color: white;
    text-align: center;

}
.btn-modal-login:hover, .btn-modal-login:focus{
    background-color: #6eba7f;
    border-color: white;
    outline: none;
}

.btn-modal-signup{
    height: 45px;
    width: 175px;
    border-color: #3c9ccc;
    background-color: #3c9ccc;
    margin-bottom:25px;
    margin-top:20px;
    font-weight:700;
    border-radius: 50px;
    font-size: 18px;
    font-family: 'Raleway';
    color: white;
    text-align: center;
}
.btn-modal-signup:hover, .btn-modal-signup:focus{
    background-color: #3c9ccc;
    border-color: white;
    outline: none;
}


#btn-signup {
    border-radius: 100px;
	border: solid 1px #ffffff;
    font-size: 15px;
    background-color: #404041;
    font-family: "Raleway";
    font-weight: 600;
    cursor:pointer;
    transition: border 0.5s;
    padding-left : 40px;
	padding-right: 40px;
    margin-left:10px;
    margin-right:50px;
    text-align: center;
}

#btn-signup:hover {
	background-color: #939597;
}

#btn-login {
    width: 138px;
    background-color: #4d4d4f;
    cursor:pointer;
}

#btn-login:hover{
    background-color: #939597;
}

#btn-login .active {
    transition: border 0.5s;
}
#btn-login  .active:hover {
  transition: border 1s;
	border: solid 1px #ffffff;
}
#btn-login:focus, #btn-signup:focus{
    outline: none;
}

#login-modal{
    transition: all 0.7s;
}

.modal-content  {
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    border-color:transparent;
    background-color:transparent;
}

.modal-body {
    background-color: #404041;
    border-radius: 30px;
    border-color: transparent;
}

.fa-dizzy {
    color:#939597;
    font-size: 18px;
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






</style>


