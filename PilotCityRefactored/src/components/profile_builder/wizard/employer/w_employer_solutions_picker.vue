<template>
    <div class="container-fluid mt-5">
        <div class="d-flex justify-content-center">
                <h1 class="Raleway solutions-picker-label">Do you have a product and/or service?</h1>
        </div>
        <div class="row justify-content-center mt-5">
            <div class = "col-md-3 col-sm-12 pl-5 pb-4">
                <button class="btn button-square solutions-picker-btn color-blue" 
                data-toggle="buttons" 
                @click="employer_data.isProduct = !employer_data.isProduct"
                :class="{border_gray:employer_data.isProduct}">Product</button>
            </div>
            <div class = "col-md-3 col-sm-12 pl-5 pb-4">
                 <button class="btn button-square solutions-picker-btn color-yellow" data-toggle="buttons"
                 @click="employer_data.isService = !employer_data.isService"
                 :class="{border_gray:employer_data.isService}">Service</button>
            </div>
                
        </div>


        
        <next_button
            route='w_employer_solution_keywords'
            :conditions="conditions"
            :collection="collection"
            :pass="pass"
            />
        <router-link :to="{ name: 'w_employer_industry_keywords' }" 
            class="prev_button btn btn-secondary btn-lg">
            Back
        </router-link>
    </div>
</template>

<script>
import { bus } from '@/main'
import { Prompter } from '@/main'
import button from '@/components/profile_builder/wizard/components/button'
import firebase from '@/firebase/init'

export default {
    name:'w_employer_solutions_picker',
    data () {
        return {
            employer_data:{
                isProduct:false,
                isService:false
            },
        collection: ['employers']
        }
    },
    components: {
        
        next_button:button
    },
    computed: {
        conditions(){
            return [this.employer_data]
        },
        pass() {
            return (this.employer_data.isService || this.employer_data.isProduct)
        }
    },
    methods: {

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

<style scoped>
.border_gray {
    border: solid 5px lightgray;
}
.button-regular {
    background-color:#6eba7f;
    width:250px;
    height:96px;
    border-radius: 50px;
    margin: auto 20px;
}

.button-square {
    background-color:#6eba7f;
    width:250px;
    height:250px;
    border-radius: 50px;
}

.solutions-picker-btn {
    margin: auto 20px;
    color: white;
    font-size: 30px;
    font-weight: 700;
}

.color-pink{
    background-color: rgb(226, 165, 190);
}

.color-purple{
    background-color: rgb(169, 145, 174);
}

.color-blue{
    background-color:#3c9ccc;
}

.color-yellow{
    background-color:#fdd25a;
}

.color-orange{
    background-color:#f79960;
}

.solutions-picker-label{
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
}
.solutions-picker-btn:active{
    transition: all 0.5s;
    border-color: rgb(222, 223, 224) !important;
    outline: none !important;
}

</style>
