<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light">
  		<img src="@/assets/pilotCitylogo.png" alt="Pilot City Logo">
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

</style>
