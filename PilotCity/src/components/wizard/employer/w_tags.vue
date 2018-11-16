<template>
    <div class="container d-flex flex-col justify-content-center">
        <industry_tag
        name="Industry"
        :keywords=industry_keywords
        placeholder ="Enter keywords here to describe your industry"
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

.container {
    margin-top:50px;
}

</style>
