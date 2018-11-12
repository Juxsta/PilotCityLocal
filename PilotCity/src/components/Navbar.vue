<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light">
  		<img src="@/assets/pilotCitylogo.png" alt="Pilot City Logo" id="PLogo">
			<div class="btn-group ml-auto" role="group">
				<Login />
				<Signup />
			</div>
	</nav>
</div>
</template>

<script>
import Signup from '@/components/Signup'
import Login from '@/components/Login'
export default {
  name: 'Navbar',
  components: {
	  Signup,
	  Login
  },
  data () {
    return {

    }
  },
  methods: {

	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#PLogo {
	padding: 20px 0 20px 0 !important;
	height: 120px !important;
	width: 80px !important;
}
.navbar {
    background-color: #404041
}
</style>
