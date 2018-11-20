<template>
    <router-link  tag="button" class="btn btn-secondary btn-lg" 
    id="the_best_next_button" :to="{name: route}" disabled>{{ text }}</router-link>
</template>

<script>
export default {
    props: {
        route: {
            type:String,
            required: true
        },
        text: {
            type: String,
            default: 'Next'
        }
    }
}
</script>

<style>
#the_best_next_button {
  position: absolute;
  bottom: 100px;
  right: 100px;
  font-weight: 600;
  font-size: 3vh;
}
</style>

