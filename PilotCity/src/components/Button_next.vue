<template>
    <button type="button" @click="increment" class="btn btn-secondary btn-lg" id="the_best_next_button" disabled>Next</button>
</template>

<script>
import { bus } from '../main'
export default {
    name: "Button_next",
    data(){
        return{
            counter: 0,
        }
    },
    methods:{
        increment: function(){
            this.counter++;
            bus.$emit('next', this.counter);
        }
    }
}
</script>

<style>
#the_best_next_button{
    position: fixed;
    bottom: 10vh;
    right: 10vw; 
    font-weight: bold;
    border-radius: 20px;
    background-color: rgb(220, 221, 222);
    border-color: rgb(220, 221, 222);
}
</style>
