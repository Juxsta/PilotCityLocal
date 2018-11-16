<template>
    <div class="container ">
        <skills_tag class="d-flex flex-col justify-content-center"
            name="Product"
            :keywords=product_keywords
            placeholder ="Enter keywords here to describe your product"
        ></skills_tag>
        <skills_tag class="d-flex flex-col justify-content-center mt-5"
            name="Service"
            :keywords=service_keywords
            placeholder ="Enter keywords here to describe your service"
        ></skills_tag>
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
                'Medical Devices', 'Cloud Networking', '3D Printers', 'Mapping Software', 'Cybersecurity Software', 'Bioprinter', 'Internet of Things', 'Apparel', 'Microchips', 'Sensors', 'Artificial Intelligence', 'Virtual Reality', 'Augmented Reality', 'Mixed Reality', '360 Cameras', 'Robotics', 'Drones', 'Autonomous Vehicles', 'Software', 'Hardware'],
            service_keywords: ['Manufacturing', 'Economic Development', 'Metal Fabrication', '3D Printing', '3D Design', 'Game Design', 'Policing', 'Firefighting', 'Logistics', 'Transportation', 'Information Technology', 'Healthcare', 'Energy', 'Digital Design', 'Research & Development']
        }
    },
    components: {
        skills_tag:tagging
    }
}
</script>
<style scoped>

.container {
    margin-top:50px;
}

</style>
