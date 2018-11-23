<template>
    <div class="container">
        <div class="container d-flex flex-col justify-content-center">
            <industry_tag
            name="Industry"
            :keywords=industry_keywords
            placeholder ="Enter keywords here to describe your industry"
            :selected_keywords="keywords"
            ></industry_tag>
        </div>
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
            keywords:[],
            industry_keywords: [
                'Drones','Robotics','Data Science','Internet of Things','Sustainability','Space',
                'Artificial Inteligence','Automotive','Bioprinting','Data','Drones','Gaming','Healthcare','Lifestyle'
                ],
        }
    },
    components:{
        industry_tag: tagging
    },
        created(){
        var self = this;
        bus.$on('grab_data', function(obj){
            if (obj.step != 'employer_industry'){
                return ;
            }
            if (self.keywords.length) {
                var obj = {};
                obj['employer_industry'] = self.keywords
                
                bus.$emit('form_completed', obj);
                bus.$emit('validated');
                return ;
            }
            else
                Prompter().failed("You're missing a few things","Hey there,");
        });
    }
}
</script>
<style scoped>

.container {
    margin-top:50px;
}

</style>
