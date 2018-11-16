<template>
    <div class="container">
        <industry_tag
        name="Industries"
        :keywords=industry_keywords
        placeholder ="Industry here"
        ></industry_tag>
    </div>
</template>

<script>

import { bus } from '../../../main'
import { Prompter } from '../../../main'
import tagging from "@/components/wizard/tools/tagging.vue"
export default {
    name: "w_tags",
    data () {
        return {
            name: "Industry",
            industry_keywords: [
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
        }
    },
    components:{
        industry_tag: tagging
    }
}
</script>
<style scoped>

</style>
