<template>
    <div>
        <div class="d-flex justify-content-center">
            <h1 class="Raleway problem-picker-label">If you had a flock of students to create solutions for you, what problems would you have them solve?</h1>
        </div>
        <flock_tag class=" container d-flex flex-col justify-content-center"
        name="Problems"
        placeholder="Enter keywords that describe problems you want students to solve"
        :keywords=flock_keywords
        :selected_keywords=question_keywords
        ></flock_tag>
    </div>
</template>

<script>
import { bus } from '../../../main'
import { Prompter } from '../../../main'
import tagging from "@/components/wizard/tools/tagging.vue"
export default {
    name:"w_flock",
    data () {
        return {
            flock_keywords: ['Identifying Use Cases' , 'Developing Case Studies' , 'Community Engagement' , 
            'Automation' , 'Sales' , 'Training Talent' , 'Implementing Technology' , 'Technology Adoption' , 
            'Partnerships' , 'Public Relations' , 'Social Media Marketing' , 'Entrepreneurial Culture' , 
            'Women Empowerment' , 'Diversity & Inclusion'],
            question_keywords:[]
        }
    },
    components: {
        flock_tag: tagging
    },
    created() {
         var self = this;
        bus.$on('grab_data', function(obj){
        if (obj.step != 'employer_flock')
            return ;
        if (self.question_keywords.length){
            var obj = {};
            obj['employer_question_keywords'] = {
                selected_question_keywords: self.question_keywords
            }
            bus.$emit('form_completed', obj);
            bus.$emit('validated');
            console.log('validated')
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

.problem-picker-label {
    color: rgb(222, 223, 224);
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
    margin-bottom:50px;
    margin-top:50px;
    width:850px;
    text-align: center;
}

</style>
