<template>
    <button  tag="button" class="btn btn-secondary btn-lg" 
    id="the_best_next_button"  @click="pushRoute">{{ text }}</button>
</template>

<script>
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
export default {
    props: {
        route: {
            type:String,
            required: true
        },
        text: {
            type: String,
            default: 'Save and Next'
        },
        conditions: {
            type: Object,
            required: true
        },
        collection:{
            type:String,
            required: true
        },
        pass: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        user: function () {
            return firebase.auth().currentUser

        }
    },
    methods: {
        pushRoute() {
            if (this.pass && Object.values(this.conditions).every((data) => {
                return data != null
            })){
                const db = firebase.firestore()
                db.collection(this.collection).doc(this.user.uid).set(this.conditions,{merge:true}).then(() => {
                    this.$router.push({name: this.route})  
                })
            }
            else{
                Prompter().failed("You're missing a few things","Hey there,")
            }
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

