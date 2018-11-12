<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light">
  		<img id="logo-pilotcity" src="@/assets/pilotCitylogo.png" alt="Pilot City Logo">
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
				$("#component-login").hide();
				$("#component-signup").hide();
				$("#component-logout").show();
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
	height: 70px;
}
#component-logout{
	display: none;
}
#btn-logout{
    cursor: pointer !important;
}
#btn-logout:focus{
    outline: none;
}

.Raleway {
	font-family: 'Raleway';
	font-weight: 700;
}

.navbar-btn {
	border-radius: 50px;
	background-color: #404041 !important;
	border: solid 2px #404041 !important;
	padding-left : 40px;
	padding-right: 40px;
  margin: auto 20px;
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

#logout{
	cursor: pointer !important;
}

#logout:hover{
  transition: border 1s;
	border: solid 2px #ffffff !important;
}
</style>


