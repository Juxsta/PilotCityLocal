<template>
       <button @click="logout" type="button" id="component-logout" class="btn-navbar btn-primary btn-lg active Raleway float-right " style="cursor:pointer">
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

</style>


