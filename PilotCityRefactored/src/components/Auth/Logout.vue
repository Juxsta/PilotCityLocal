<template>
       <button @click="logout" id="logout-button" type="button" class="navbar-btn btn-primary btn-lg active Raleway float-right " style="cursor:pointer">
            Logout
        </button>
</template>

<script>
import firebase from '@/firebase/init'
export default {
    name: "Logout",
    methods: {
        logout(){
            firebase.auth().signOut()
        }
    }
}
</script>

<style>

.navbar-btn {
	border-radius: 50px;
	background-color: #404041 !important;
	border: solid 1px #404041 !important;
	padding-left : 40px;
	padding-right: 40px;
    margin: auto 20px;
}
#logout:hover{
  transition: border 1s;
	border: solid 3px #ffffff !important;
}

#logout-button {
	border: solid 1px #ffffff;
    }


</style>


