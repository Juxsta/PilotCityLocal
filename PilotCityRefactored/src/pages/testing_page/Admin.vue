<template>
    <div>
        <h1> HELLO FUCKING WORLD </h1>
    </div>
</template>

<script>

import firebase from "@/firebase/init";
import axios from 'axios'
import { retry } from 'async';
export default {
    name: "Admin",
    methods:{
        getMuddersResult(uid){
            var MUDDERSLINK = "http://35.197.64.87:5000/matchmaker/classroomranking?employer_id="  
            return axios.get(MUDDERSLINK + uid);
        },
    },
    created(){
        var self = this;
         firebase.auth().onAuthStateChanged(user => {
             if (user)
             {
                const db = firebase.firestore();
                db.collection("employers").get()
                    .then(qs => {
                    var uid_arr  =[];
                    qs.forEach(doc => { 
                    });
                    
                    // for (let i = 0; i < uid_arr.length; i++){
                    //     console.log("prosessing...." + uid_arr[i])
                    //     db.collection("sortedClassroom").doc(uid_arr[i]).get().then(doc => {
                    //         if (!doc.exists || (doc.data() && !Array.isArray(doc.data().result))){
                    //             self.getMuddersResult(uid_arr[i]).then(ret => {
                    //                 console.log("result... is" + ret);
                    //                 db.collection("sortedClassroom").doc(uid_arr[i]).set({result: ret.data.result}).then(() => {
                    //                     console.log(uid_arr[i] + ".....done.")
                    //                 }).catch(err => {console.log(err.message)});
                    //             }).catch(err => {console.log(err.message)});
                    //         }
                    //     })
                    // }
                });
             }

         })

    }
}
</script>

<style>

</style>
