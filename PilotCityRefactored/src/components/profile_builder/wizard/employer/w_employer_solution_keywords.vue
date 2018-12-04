<template>
    <div class="container mt-5">
        <product_tag v-if="employer_data.isProduct"
            class="d-flex flex-col justify-content-center"
            name="Product"
            :keywords="product_keywords"
            placeholder ="Enter keywords here to describe your product"
            :selected_keywords="employer_data.selected_product_keywords"
        />
        <service_tag v-if="employer_data.isService"
            class="d-flex flex-col justify-content-center mt-3"
            name="Service"
            v-bind:keywords="service_keywords"
            placeholder ="Enter keywords here to describe your service"
            :selected_keywords="employer_data.selected_service_keywords"
        />
        <next_button
            route='w_employer_department'
            :conditions="conditions"
            :collection="collection"
            :force_pass="force_pass"
        />
        <router-link :to="{ name: 'w_employer_solutions_picker' }" 
            class="prev_button btn btn-secondary btn-lg" tag='prev_button'>
            Back
        </router-link>
    </div>
</template>

<script>

import { bus } from '@/main'
import { Prompter } from '@/main'
import tagging from '@/components/profile_builder/wizard/components/tagging.vue'
import button from '@/components/profile_builder/wizard/components/button'
import firebase from '@/firebase/init'
export default {
    name: "w_employer_solution_keywords",
    data () {
        return {
            product_keywords: [
                '3D Printers', 'Mapping Software', 
                'Bioprinter', 'Internet of Things', 'Microchips', 
                'Sensors', 'Artificial Intelligence', 'Virtual Reality', 'Augmented Reality', 
                '360 Cameras', 'Robotics', 'Drones', 'Autonomous Vehicles', 'Software', 
                'Hardware'],
            service_keywords: ['Manufacturing', 'Economic Development', 'Metal Fabrication', '3D Printing', 
                '3D Design', 'Game Design', 'Policing', 'Firefighting', 'Logistics', 'Transportation', 
                'Information Technology', 'Healthcare', 'Energy', 'Digital Design', 'Research & Development'],
            employer_data:{   
                selected_product_keywords: [],
                selected_service_keywords:[],
                isProduct:false,
                isService:false
            },
            collection: ["employers"],
        }
    },
    components: {
        product_tag:tagging,
        service_tag:tagging,
        next_button:button,
    }, 
    computed: {
        conditions(){
            return [this.employer_data]
        },
        force_pass(){
            let data = this.employer_data
            if ((!data.isProduct && data.isService) || (data.isProduct && !data.isService)){
                 if (data.selected_product_keywords.length || data.selected_service_keywords.length){
                     return true
                 } 
            }
            if(data.isproduct && data.isService)
            {
                if (data.selected_product_keywords.length || data.selected_service_keywords.length){
                        return true
                 }   
            }
            return false
        }
    },
    created() {
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
    });
    }
}
</script>
<style scoped>

.container {
    margin-top:50px;
}

</style>
