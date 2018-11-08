 
Vue.component('pc-nav-bar', {

	template:`

		<div>
			<b-navbar toggleable="lg" type="dark" variant="dark">

			      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

			      <b-navbar-brand href="#"><img class="nav-pclogo-img" src="img/logo.png"></b-navbar-brand>

        		  <b-collapse is-nav id="nav_collapse">

    

			          	<!-- Right aligned nav items -->
			          	<b-navbar-nav class="ml-auto">

				            <b-navbar-nav  >
					              <b-nav-item href="#">Sign Up</b-nav-item>
					              <b-nav-item href="#" >Login</b-nav-item>
					              <b-nav-item href="#"><img class="nav-settings-img" src="img/settings.png"></b-nav-item>

				            </b-navbar-nav>

			          	</b-navbar-nav>

       		 		</b-collapse>
    		</b-navbar>



		</div>

	`,

	data(){

		return{

			items:["Sign Up" , "Login"],
			page:["landing"]
		}
	}


})





 window.app = new Vue({
        el: "#app",
        data: {
          name: ''
        },
        computed: {
           
        }
      })