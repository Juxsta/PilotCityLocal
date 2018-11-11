<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light">
  		<img src="@/assets/pilotCitylogo.png" alt="Pilot City Logo">
		  <div class="nav-cont">
			  <router-link to="">
				  <span class="btn btn-primary btn-lg active Raleway active" 
				  @click="toActive()"
				  :class= "{ active: hover }">Log In</span>
			  </router-link>
			  <router-link to="">
				  <span class="Raleway">Sign-up</span>
			  </router-link>
		  </div>
	</nav>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
		hover: false
    }
  },
  methods: {
	  toActive() {
		  this.hover = !this.hover;
		  console.log(this.hover)
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
    margin:0px;
    padding:0px;
        box-sizing: border-box;
}
​
.navbar {
    background-color: #404041
}

.Raleway {
	font-family: Raleway
}

.navbar .btn {
	border-radius: 50px;
	background-color: #404041 !important;
	border: #404041
}

.active {
	border: #ffffff !important;
}
</style>
