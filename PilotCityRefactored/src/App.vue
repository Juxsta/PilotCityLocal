<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { bus } from '@/main'
import firebase from '@/firebase/init'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
        bus.$on('re-render',function () {
          location.reload()
        })
    }
}
</script>

<style>

</style>
