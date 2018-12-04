<template>
    <button  tag="button" class="btn btn-secondary btn-lg" 
    id="the_best_next_button"  @click="pushRoute">{{ text }}</button>
</template>

<script>
import { Prompter } from '@/main'
import firebase from '@/firebase/init'
import { bus } from '@/main'
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
        collection: {
            type:Array, //array of strings
            required: true
        },
        pass: {
            type: Boolean,
            default: true
        },
        force_pass: {
            type: Boolean,
            default: false,
        },
        errormsg: {
            type: String,
            default: "You're missing a few things"
        }
    },
    methods: {
        pushRoute() {
            var self = this
            if(self.conditions.length == self.collection.length) {
                firebase.auth().onAuthStateChanged((user)=> {
                    if(user) {
                        if (self.force_pass || (self.pass && self.conditions.every((condition) => {
                            return Object.values(condition).every((data) => {
                                return ((data != null && data != false) || data === false)
                                })
                        }))) {
                            for(let i in self.conditions){
                                const db = firebase.firestore()
                                db.collection(self.collection[i]).doc(user.uid).set(self.conditions[i],
                                {merge:true}).then(() => {
                                    if (self.route == 'teacher-thankyou-modal'){
                                        bus.$emit('teacher_finish')
                                    }
                                    else
                                        self.$router.push({name: self.route})  
                                })
                            }
                        }
                        else{
                            if(self.errormsg)
                                Prompter().failed(self.errormsg,"Hey there,")
                            else
                                Prompter().failed("You're missing a few things","Hey there,")
                        }

                    }
                })
            }
            else 
                Prompter().failed("Length of Conditions and collections must match")
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

