<template>
    <div class="container ">
        <product_tag v-if="isProduct"
            class="d-flex flex-col justify-content-center"
            name="Product"
            :keywords=product_keywords
            placeholder ="Enter keywords here to describe your product"
            :selected_keywords="selected_product_keywords"
        ></product_tag>
        <service_tag v-if="isService"
            class="d-flex flex-col justify-content-center mt-5"
            name="Service"
            :keywords=service_keywords
            placeholder ="Enter keywords here to describe your service"
            :selected_keywords="selected_service_keywords"
        ></service_tag>
    </div>
</template>

<script>

import { bus } from '../../../main'
import { Prompter } from '../../../main'
import tagging from '@/components/wizard/tools/tagging.vue'
export default {
    name: "w_solutions_tagging",
    data () {
        return {
            product_keywords: [
                'Medical Devices', 'Cloud Networking', '3D Printers', 'Mapping Software', 
                'Cybersecurity Software', 'Bioprinter', 'Internet of Things', 'Apparel', 'Microchips', 
                'Sensors', 'Artificial Intelligence', 'Virtual Reality', 'Augmented Reality', 
                'Mixed Reality', '360 Cameras', 'Robotics', 'Drones', 'Autonomous Vehicles', 'Software', 
                'Hardware'],
            service_keywords: ['Manufacturing', 'Economic Development', 'Metal Fabrication', '3D Printing', 
            '3D Design', 'Game Design', 'Policing', 'Firefighting', 'Logistics', 'Transportation', 
            'Information Technology', 'Healthcare', 'Energy', 'Digital Design', 'Research & Development'],
            selected_product_keywords: [],
            selected_service_keywords:[],
            isProduct:false,
            isService:false
        }
    },
    components: {
        product_tag:tagging,
        service_tag:tagging
    },
    created() {
        bus.$on('solution_type',(data) => {
            this.isProduct=data[0],
            this.isService=data[1]
        });
        var self = this;
        bus.$on('grab_data', function(obj){
        if (obj.step != 'employer_solution_keywords')
            return ;
        if (self.product_keywords.length || self.service_keywords.length){
            var obj = {};
            obj['employer_solution_keywords'] = {
                selected_product_keywords: self.selected_product_keywords,
                selected_service_keywords: self.selected_service_keywords
            }
            bus.$emit('form_completed', obj);
            bus.$emit('validated');
            return;
        }
        else{
            Prompter().failed("You're missing a few things","Hey there,");
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
