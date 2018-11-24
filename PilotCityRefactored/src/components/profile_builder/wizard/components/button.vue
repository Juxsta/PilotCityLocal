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
            type: Array, //array of objects
            required: true
        },
        collection:{
            type:Array, //array of strings
            required: true
        },
        pass: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        pushRoute() {
            var self = this
            if(self.conditions.length == self.collection.length) {
                firebase.auth().onAuthStateChanged((user)=> {
                    if(user) {
                        for(let i = 0; i < self.conditions.length; i++){
                            if (self.pass && Object.values(self.conditions[i]).every((data) => {
                                return data != null
                                })) {
                                const db = firebase.firestore()
                                db.collection(self.collection[i]).doc(user.uid).set(self.conditions[i],{merge:true}).then(() => {
                                    self.$router.push({name: self.route})  
                                })
                            }
                            else{
                                Prompter().failed("You're missing a few things","Hey there,")
                            }
                        }
                    }
                })
            }
            else 
                Prompted().failed("Length of Conditions and collections must match")
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

