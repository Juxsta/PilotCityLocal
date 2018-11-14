<template>
    <div>
    <button type="button"  @click="goforward" class="btn btn-secondary btn-lg" id="the_best_next_button" disabled>Next</button>
    <button type="button" @click="goback" class="btn btn-secondary btn-lg" id="the_best_prev_button" >Back</button>
    </div>
</template>

<script>
import { bus } from '../main'
export default {
    name: "Button_next",
    data(){
        return{
            role: null,
            step: 0,
        }
    },
    methods:{
        grabDataFromForm: function(){
            switch(this.step){
                case 1:
                    if (this.role == 'teacher')
                        bus.$emit('grab_data', { step: 'story_teacher'});
                break ;
                case 2:
                    if (this.role  == 'teacher')
                        bus.$emit('grab_data', { step: 'story_teacher_address'});
                break ;
                case 3:
                    if (this.role  == 'teacher')
                        bus.$emit('grab_data', { step: 'teacher_industry'});
                break ;
                case 4:
                    if (this.role  == 'teacher')
                        bus.$emit('grab_data', { step: 'teacher_class'});
                break ;
            }
        },
        increment: function(){
            bus.$emit('move', {dirct: 'right', step: this.step++});
        },
        goforward: function(){
            this.grabDataFromForm();
        },
        goback: function(){
            if (this.step > 1){}
                bus.$emit('move', {dirct: 'left', step: --this.step});
        }
    },
    created(){
        var self = this;
        bus.$on('pickedRole', function(role){
            self.step++;
            self.role = role;
        });
        bus.$on('validated', ()=> { self.increment() });
    }
}
</script>

<style>
#the_best_next_button{
    width: 150px;
    position: fixed;
    bottom: 10vh;
    right: 10vw; 
    font-weight: bold;
    border-radius: 50px;
    background-color: rgb(220, 221, 222);
    border-color: rgb(220, 221, 222);
}   

#the_best_prev_button{
    display: none;
    width: 150px;
    position: fixed;
    bottom: 10vh;
    left: 10vw; 
    font-weight: bold;
    border-radius: 50px;
    background-color: rgb(220, 221, 222);
    border-color: rgb(220, 221, 222);
}
</style>
