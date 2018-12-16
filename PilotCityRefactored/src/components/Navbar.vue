<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light Raleway">
  			<router-link to="/">
				<img id="logo-pilotcity" src="@/assets/images/pilotCitylogo.png" alt="Pilot City Logo">
		  	</router-link> 
			<div class="btn-group ml-auto" role="group">
				<b-link  :to ="{name : 'ClassPicker'}" v-if="authUser">Wizard</b-link>
				<b-link :to="{name : 'mm_employer'}" v-if="match_ready">Match</b-link>
				<Login v-if="!authUser || emailNotVerified" id="component-login" />  
				<Signup v-if="!authUser || emailNotVerified" id="component-signup" />
				<Logout  v-if="authUser && !emailNotVerified"/>
			</div>
	</nav>
</div>
</template>

<script>

import firebase from '@/firebase/init'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Signup from '@/components/auth/Signup'
import { bus } from '@/main'
export default {
  name: 'Navbar',
  components: {
	  Login,
	  Logout,
	  Signup,
  },
  data () {
    return {
		authUser: null,
		emailNotVerified: false,
		user_data: null
    }
  },
  computed: {
	  match_ready() {
		  return this.authUser && this.user_data && this.user_data.selected_challenge_keywords
	  }
  },
  methods: {

	},
	created() {
		var self = this;
		firebase.auth().onAuthStateChanged((user) => {
			this.authUser=user
			const db = firebase.firestore()
			db.collection("employers").doc(user.uid).get().then(doc => {
				self.user_data = doc.data()
			})
		});
		bus.$on('EmailNotVerified', () => {
			self.emailNotVerified = true;
		})
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
	border: solid 1px #ffffff;

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


