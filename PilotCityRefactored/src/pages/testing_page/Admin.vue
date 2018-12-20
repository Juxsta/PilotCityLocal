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
                    var arr  =[];
                    qs.forEach(doc => {
                        arr.push(doc)
                    });
                    var link = "https://www.googleapis.com/geolocation/v1/geolocate?key="
                    for (let i = 0; i < arr.length(); i++)
                    {
                        if (!arr[i].data().coordinate)
                        {
                            arr[i].data().coordinate 
                        }
                        
                    }
                    
                   
                });
             }

         })

    }
}
</script>

<style>

</style>
