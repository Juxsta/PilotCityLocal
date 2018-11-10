<template>
  <div id="app">
    <Navbar />
    <h1>HELLO WORLD</h1>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
