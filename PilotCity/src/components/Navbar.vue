<template>
<div>
	<nav class="navbar navbar-expand-lg navbar-light">
  		<img src="@/assets/pilotCitylogo.png" alt="Pilot City Logo">
		  <div class="navbar-text ml-auto">
			  <router-link to="">
				  <span class="btn btn-primary btn-lg active Raleway active">Log In</span>
			  </router-link>
			  <router-link to="">
				  <span class="btn btn-primary btn-lg active Raleway active">Sign-up</span>
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
@import url('https://fonts.googleapis.com/css?family=Raleway');
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
	font-family: Raleway;
	font-weight: 800
}

.navbar .btn {
	border-radius: 50px;
	background-color: #404041 !important;
	border: solid 2px #404041 !important;
	padding-left : 40px;
	padding-right: 40px;
	margin: auto 20px;
}

.active:hover {
	border: solid 2px #ffffff !important;
}
</style>
