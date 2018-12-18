<template>
  <div id="app">
    <Navbar v-if=render_nav />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { bus } from '@/main'
import firebase from '@/firebase/init'

export default {
  name: 'App',
  data() {
    return {
      render_nav:true
    }
  },
  components: {
    Navbar
  },
  created() {
        bus.$on('re-render',function () {
          location.reload()
        })
        		bus.$on('re-render nav',function () {
          this.render_nav=false;
          this.render_nav=true
        })
    }
}
</script>

<style>

</style>
