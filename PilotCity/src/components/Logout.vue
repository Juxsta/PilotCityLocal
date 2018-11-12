<template>
       <button @click="logout" id="logout" type="button" class="navbar-btn btn-primary btn-lg active Raleway float-right " style="cursor:pointer">
            Log out
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

