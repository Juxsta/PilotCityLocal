<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light Raleway">
      <router-link to="/">
        <img id="logo-pilotcity" src="@/assets/images/pilotCitylogo.png" alt="Pilot City Logo">
      </router-link>
      <b-navbar-nav class="btn-group ml-auto" role="group">
        <b-link class="navbar_dashboard_button" v-if="authUser"></b-link>
        <b-link
          class="navbar_match_button"
          :to="{name : getMatch}"
          v-if="authUser && match_ready"
        >Match</b-link>
        <b-link class="navbar_profile_button" :to="{name:'ClassPicker'}" v-if="authUser">Profile</b-link>
        <Login v-if="!authUser || emailNotVerified" id="component-login"/>
        <Signup v-if="!authUser || emailNotVerified" id="component-signup"/>
        <Logout v-if="authUser && !emailNotVerified"/>
      </b-navbar-nav>
    </nav>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import Login from "@/components/auth/Login";
import Logout from "@/components/auth/Logout";
import Signup from "@/components/auth/Signup";
import matchmaking from "@/components/matchmaking/matchmaking";
import { mapActions } from 'vuex'
import { bus } from '@/main'
export default {
  name: "Navbar",
  components: {
    Login,
    Logout,
    Signup,
    matchmaking
  },
  data() {
    return {
      authUser: null,
      emailNotVerified: false,
      class_data: null
    };
  },
  computed: {
    match_ready() {
		return this.$store.getters.match_ready
	},
	user_data() {
		return this.$store.getters.class_data
	},
    getMatch() {
      return this.$store.getters.user_data.isEmployer
        ? "mm_employer"
        : this.user_data.isTeacher
        ? "mm_teacher"
        : "mm_student";
    }
  },
  methods: {
	  ...mapActions([
		  'getUser'
	  ])
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
		//   console.log(user.uid)
		this.authUser=user
		  this.getUser(user)
      }
    });
    bus.$on("EmailNotVerified", () => {
      self.emailNotVerified = true;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.navbar_dashboard_button {
  &:hover {
    color: white;
    text-decoration: none;
  }
}
#logo-pilotcity {
  cursor: pointer;
  height: 50px;
  margin-left: 35px;
}
#component-logout {
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


