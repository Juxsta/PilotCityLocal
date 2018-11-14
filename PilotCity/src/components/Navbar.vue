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
				$("#component-login").hide();
				$("#component-signup").hide();
				$("#component-logout").show();
				self.$router.push('/demo');
				
			} else {
				$("#component-login").show();
				$("#component-signup").show();
				$("#component-logout").hide();
				self.$router.push('/');
			}
		});
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#logo-pilotcity{
	cursor: pointer;
	height: 50px;
	margin-left:35px;
}
#component-logout{
	display: none;
}
.Raleway {
	font-family: "Raleway";
	font-weight: 800;
}

#PLogo {
	padding: 20px 0 20px 0 !important;
	height: 120px !important;
	width: 80px !important;
}
.navbar {
    background-color: #404041;
}
</style>


