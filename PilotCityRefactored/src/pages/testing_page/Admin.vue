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
             if (false && "this makesure everyone in employers has a coordinate")
             {
                const db = firebase.firestore();
                db.collection("employers").get()
                    .then(qs => {
                    var arr  =[];
                    qs.forEach(doc => {
                        arr.push(doc)
                    });
                    var link = "https://maps.googleapis.com/maps/api/geocode/json?address="
                    var address;
                    var key = "&key=AIzaSyDfuNr3RaCZkituTfoB7b7pR2u2rWuraWE"
                    for (let i = 0; i < arr.length; i++)
                    {
                        if (!arr[i].data().coordinate && arr[i].data().address)
                        {

                            console.log(arr[i].data())
                            console.log("doesnt have coordinate");
                            address = arr[i].data().address.street + '+' + arr[i].data().address.city + '+'
                            + arr[i].data().address.state;
                            address = address.split(' ').join('+');
                            console.log(link + address + key);
                            axios.get(link + address + key).then(ret => {
                                db.collection("employers").doc(arr[i].id).update({ coordinate: ret.data.results[0].geometry.location}).then( ()=> {
                                    console.log("OK")
                                })
                            })
                            
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
