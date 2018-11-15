<template>
    <div class="mt-5">
        <skills_tag
            :name=name[0]
            :keywords=product_keywords
        ></skills_tag>
        <skills_tag class="mt-5"
            :name=name[1]
            :keywords=service_keywords
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
            name: ["Product", "Service"],
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

</style>
