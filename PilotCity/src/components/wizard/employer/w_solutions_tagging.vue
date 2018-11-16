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
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
            service_keywords: ['stuff']
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
