<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center" id="Sector-Prompt">
            <h1 class="Raleway class-picker-label">What sector are you coming from?</h1>
        </div>
        <div class="d-flex justify-content-center align-items-end" >
                <button class="btn btn-circle" 
                v-for="(sector,index) in sector_types" :key="index"
                :class="colors[index]" @click="changeSector(index)">{{sector_types[index]}}</button>
        </div>
        <next_button
            route='w_employer_industry_keywords'
            text='save and continue'
            :conditions="conditions"
            v-bind:collection="collection"
            />
    </div>
</template>

<script>
import { bus } from '@/main'
import { Prompter } from '@/main'
import button from '@/components/profile_builder/wizard/components/button'
import firebase from '@/firebase/init'
export default {
    name: "w_sector",
    data () {
        return {
            employer_data: {
                sector: null
            },
            sector_types: ["Industry", "Government", "Education", "Community"],
            colors:["pc-green","pc-blue","pc-orange","pc-yellow"],
            collection: ['employers']
        }
    },
    components: {
        next_button:button
        
    },
    computed: {
        conditions(){
            return [this.employer_data]
        }
    },
    methods: {
        changeSector (index) {
            this.employer_data.sector = this.sector_types[index]
        }
    },
    created(){
         var self = this
        let data = [self.employer_data]
        firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            const db = firebase.firestore()
            for(let i = 0;i<self.collection.length;i++)
            db.collection(self.collection[i]).doc(user.uid).get().then((doc) => {
                let obj = doc.data()
                for (let field in data[i]) {
                    if(obj.hasOwnProperty(field)) {
                        data[i][field]=obj[field]
                    }    
                }
            })
        }
    })

    }
}
</script>

<style>

.btn-circle {
    width:250px;
    height:250px;
    border-radius: 250px;
    margin: auto 15px;
    padding: 35px 35px 35px 35px;
    font-family: 'Raleway';
    font-weight:700 !important;
    font-size: 30px;
    color: #ffffff
}
.pc-green {
    background-color: #6eba7f
}
.pc-blue {
    background-color: #3c9ccc
}
.pc-orange {
    background-color: #f79960
}
.pc-yellow {
    background-color: #fdd25a
}
#Sector-Prompt {
    margin: 50px 0px 50px 0;
    font-family: 'Raleway';
}

.class-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
}

.class-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
}

.class-picker-btn:active {
    transition: all 0.5s;
    border-color: rgb(222, 223, 224) !important;
    outline: none !important;
}

</style>
