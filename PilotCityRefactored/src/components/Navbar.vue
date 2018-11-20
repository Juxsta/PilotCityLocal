<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light Raleway">
  			<router-link to="/">
				<img id="logo-pilotcity" src="@/assets/pilotCitylogo.png" alt="Pilot City Logo">
		  	</router-link> 
			<div class="btn-group ml-auto" role="group">
			</div>
	</nav>
</div>
</template>

<script>

import firebase from '@/firebase/init'

export default {
  name: 'Navbar',
  components: {

  },
  data () {
    return {
		authUser: null,
    }
  },
  methods: {

	},
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


