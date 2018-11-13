<template>
    <button type="button" @click="increment" class="btn btn-secondary btn-lg" id="the_best_next_button" disabled>Next</button>
</template>

<script>
import { bus } from '../main'
export default {
    name: "Button_next",
    data(){
        return{
            role: null,
            step: 1,
        }
    },
    methods:{
        grabDataFromForm: function(){
            switch(this.step){
                case 1:
                    if (role == 'teacher')
                        bus.$emit('grab_story_teacher');
                break ;
                case 2:
                    if (role == 'teacher')
                        bus.$emit('grab_story_address');
                break ;                
                case 3:
                break ;
            }
        },
        increment: function(){
            bus.$emit('next', this.step++);
        }
    },
    created(){
        bus.$on('pickedRole', function(role){
            this.role = role;
        });
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
