<template>
       <button @click="logout" id="navbar_logout_button" type="button" style="cursor:pointer">
            Logout
        </button>
</template>

<script>
import firebase from '@/firebase/init'
import { bus } from '@/main'
import "@/assets/SASS/utils/_navbar.scss";
export default {
    name: "Logout",
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({name: 'Index'})
                bus.$emit('re-render')
            })
        }
    }
}
</script>

<style>






</style>


